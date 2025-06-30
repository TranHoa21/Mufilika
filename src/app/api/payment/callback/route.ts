import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const query = Object.fromEntries(url.searchParams.entries());

        const vnp_HashSecret = process.env.VNP_HASHSECRET || "YOUR_SECRET";
        const vnp_SecureHash = query["vnp_SecureHash"];
        delete query["vnp_SecureHash"];

        // 🔹 Tạo chuỗi query theo chuẩn VNPAY
        const sortedParamsString = new URLSearchParams(query).toString();

        // 🔹 Tạo chữ ký bảo mật
        const hmac = crypto.createHmac("sha512", vnp_HashSecret);
        const signed = hmac.update(sortedParamsString, "utf8").digest("hex");

        if (signed !== vnp_SecureHash) {
            return NextResponse.json({ error: "Chữ ký không hợp lệ" }, { status: 400 });
        }

        // 🔹 Kiểm tra `orderId` có hợp lệ không
        const orderId = Number(query["vnp_TxnRef"]);
        if (isNaN(orderId)) {
            return NextResponse.json({ error: "Mã đơn hàng không hợp lệ" }, { status: 400 });
        }

        const responseCode = query["vnp_ResponseCode"];

        if (responseCode === "00") {
            // 🔹 Lấy thông tin đơn hàng hiện tại
            const existingOrder = await prisma.order.findUnique({
                where: { id: orderId },
            });

            if (!existingOrder) {
                return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
            }

            // 🔹 Xử lý `paymentTime`
            const rawPayDate = query["vnp_PayDate"]; // "YYYYMMDDHHMMSS"
            let paymentTime: Date | null = null;

            if (rawPayDate && rawPayDate.length === 14) {
                const year = rawPayDate.substring(0, 4);
                const month = rawPayDate.substring(4, 6);
                const day = rawPayDate.substring(6, 8);
                const hours = rawPayDate.substring(8, 10);
                const minutes = rawPayDate.substring(10, 12);
                const seconds = rawPayDate.substring(12, 14);
                paymentTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);
            }

            // 🔹 Cập nhật trạng thái đơn hàng thành "PAID"
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    totalPrice: Number(query["vnp_Amount"]) / 100, // Chia 100 vì VNPAY trả về x100 lần
                    transactionNo: query["vnp_TransactionNo"] || "",
                    paymentTime: paymentTime,
                    status: OrderStatus.PAID,
                },
            });

            return NextResponse.redirect(new URL(`/`, req.url));
        } else {
            return NextResponse.redirect(new URL(`/checkout-failed?orderId=${orderId}`, req.url));
        }
    } catch (error) {
        console.error("Lỗi xử lý callback:", error);
        return NextResponse.json({ error: "Lỗi xử lý callback" }, { status: 500 });
    }
}

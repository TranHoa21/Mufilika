import { NextResponse } from "next/server";
import crypto from "crypto";
import moment from "moment";

export async function POST(req: Request) {
    let orderId: string | undefined;
    try {
        let body;
        try {
            body = await req.json();
        } catch (err) {
            console.error("Lỗi khi parse JSON từ request:", err);
            return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ" }, { status: 400 });
        }

        const { amount, bankCode } = body;
        orderId = body.orderId;
        if (!orderId || !amount) {
            console.error("Thiếu orderId hoặc amount:", { orderId, amount });
            return NextResponse.json({ error: "Thiếu thông tin thanh toán" }, { status: 400 });
        }

        const vnp_TmnCode = process.env.VNP_TMNCODE;
        const vnp_HashSecret = process.env.VNP_HASHSECRET;
        const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        const vnp_ReturnUrl = "http://localhost:3000/api/payment/callback";

        if (!vnp_TmnCode || !vnp_HashSecret) {
            return NextResponse.json({ error: "Thiếu cấu hình VNPay" }, { status: 500 });
        }

        const formattedAmount = Number(amount);
        if (isNaN(formattedAmount) || formattedAmount <= 0) {
            return NextResponse.json({ error: "Số tiền không hợp lệ" }, { status: 400 });
        }

        const createDate = moment().format("YYYYMMDDHHmmss");
        const orderInfo = `Thanh toán đơn hàng ${orderId}`;
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
        const txnRef = orderId;

        const vnp_Params: Record<string, string> = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode,
            vnp_Amount: (formattedAmount * 100).toString(), // Định dạng số tiền
            vnp_CurrCode: "VND",
            vnp_TxnRef: txnRef,
            vnp_OrderInfo: orderInfo,
            vnp_OrderType: "billpayment",
            vnp_Locale: "vn",
            vnp_ReturnUrl,
            vnp_CreateDate: createDate,
            vnp_IpAddr: ip,
        };

        if (bankCode) {
            vnp_Params["vnp_BankCode"] = bankCode;
        }

        // Sắp xếp tham số theo thứ tự alphabet
        const sortedKeys = Object.keys(vnp_Params).sort();
        const sortedParams = new URLSearchParams();

        sortedKeys.forEach(key => {
            sortedParams.append(key, vnp_Params[key]);
        });


        // Tạo chữ ký SHA512
        const hmac = crypto.createHmac("sha512", Buffer.from(vnp_HashSecret, "ascii"));
        const signed = hmac.update(sortedParams.toString()).digest("hex");


        sortedParams.append("vnp_SecureHash", signed);
        const paymentUrl = `${vnp_Url}?${sortedParams.toString()}`;


        return NextResponse.json({ paymentUrl });
    } catch (error) {
        console.error("Lỗi tạo thanh toán:", error);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${orderId}`, {
                method: "DELETE",
            });
            console.log("Đã huỷ đơn hàng vì tạo link thanh toán thất bại");
        } catch (deleteError) {
            console.error("Không thể huỷ đơn hàng:", deleteError);
        }

        return NextResponse.json({ error: "Lỗi tạo thanh toán" }, { status: 500 });
    }
}

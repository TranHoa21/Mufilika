import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "ID không hợp lệ." }, { status: 400 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                bookingItems: {
                    include: {
                        tour: {
                            select: { name: true }
                        }
                    }
                }
            }
        });

        if (!booking) {
            return NextResponse.json({ error: "Không tìm thấy booking." }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            booking: {
                ...booking,
                bookingItems: booking.bookingItems.map((item) => ({
                    ...item,
                    tourName: item.tour?.name || "Không xác định",
                })),
            },
        });
    } catch (err) {
        console.error("Lỗi khi lấy booking:", err);
        return NextResponse.json({ error: "Lỗi khi lấy thông tin booking." }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const { id, ...updateFields } = data;

        if (!id) {
            return NextResponse.json({ error: "Thiếu ID booking." }, { status: 400 });
        }

        const existingBooking = await prisma.booking.findUnique({ where: { id } });
        if (!existingBooking) {
            return NextResponse.json({ error: "Không tìm thấy booking." }, { status: 404 });
        }

        // Trường cho phép cập nhật
        const allowedFields = ["status", "name", "email", "phone", "totalPrice", "paymentMethod", "transactionNo", "paymentTime", "userId"];
        const validUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([key, value]) =>
                value !== undefined &&
                value !== null &&
                allowedFields.includes(key) &&
                existingBooking[key as keyof typeof existingBooking] !== value
            )
        );

        if (Object.keys(validUpdateFields).length === 0) {
            return NextResponse.json({ message: "Không có thay đổi nào." }, { status: 200 });
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: validUpdateFields,
        });

        return NextResponse.json({ success: true, booking: updatedBooking }, { status: 200 });
    } catch (err) {
        console.error("Lỗi cập nhật booking:", err);
        return NextResponse.json({ error: "Lỗi khi cập nhật booking" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();
        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID booking' }, { status: 400 });
        }

        // Xoá các BookingItem trước nếu cần
        await prisma.bookingItem.deleteMany({ where: { bookingId: id } });

        await prisma.booking.delete({ where: { id } });

        return NextResponse.json({ message: 'Đã xóa booking thành công' }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi xóa booking:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

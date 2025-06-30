// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        const whereClause = userId ? { userId } : undefined;

        const bookings = await prisma.booking.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: {
                bookingItems: {
                    include: {
                        tour: {
                            select: { name: true },
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            bookings: bookings.map((booking) => ({
                ...booking,
                bookingItems: booking.bookingItems.map((item) => ({
                    ...item,
                    tourName: item.tour?.name || "Không xác định",
                })),
            })),
        });
    } catch (err) {
        console.error("Lỗi khi lấy danh sách booking:", err);
        return NextResponse.json(
            { error: "Lỗi khi lấy danh sách booking." },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            name,
            email,
            phone,
            paymentMethod,
            totalPrice,
            items,
            userId,
        } = body;

        if (!name || !email || !phone || !paymentMethod || !totalPrice || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: "Thiếu thông tin bắt buộc của booking." }, { status: 400 });
        }

        const newBooking = await prisma.booking.create({
            data: {
                name,
                email,
                phone,
                paymentMethod,
                totalPrice: parseFloat(totalPrice),
                userId,
            },
        });

        for (const item of items) {
            const { tourId, quantity, price } = item;

            await prisma.bookingItem.create({
                data: {
                    bookingId: newBooking.id,
                    tourId,
                    quantity: parseInt(quantity),
                    price: parseFloat(price),
                },
            });
        }

        await prisma.notification.create({
            data: {
                title: "🛖 Booking mới!",
                content: `Khách hàng ${name} vừa đặt tour.`,
                userId: "644c7c93-a4f6-4dac-888e-e8b427eaf971",
                bookingId: newBooking.id,
            },
        });

        return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
    } catch (err) {
        console.error("Lỗi tạo booking:", err);
        return NextResponse.json({ error: "Lỗi khi tạo booking." }, { status: 500 });
    }
}

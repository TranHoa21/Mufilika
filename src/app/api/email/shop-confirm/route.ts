// app/api/email/shop-confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '@/app/api/email/mail';

export async function POST(req: NextRequest) {
    try {
        const { name, email, orderId } = await req.json();

        await transporter.sendMail({
            from: `"Custom Order Shop" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Đơn hàng đã được xác nhận bởi cửa hàng',
            html: `
        <p>Xin chào <strong>${name}</strong>,</p>
        <p>Đơn hàng <strong>#${orderId}</strong> của bạn đã được cửa hàng xác nhận và đang được chuẩn bị.</p>
        <p>Cảm ơn bạn đã mua sắm tại shop!</p>
        <p>Trân trọng,</p>
        <p>Custom Order Shop</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Lỗi gửi email xác nhận từ shop:', error);
        return NextResponse.json({ error: 'Không gửi được email từ shop' }, { status: 500 });
    }
}

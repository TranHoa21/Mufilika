// app/api/email/order-confirmation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '@/app/api/email/mail';

export async function POST(req: NextRequest) {
    try {
        const { name, email, orderId, totalPrice } = await req.json();

        await transporter.sendMail({
            from: `"Custom Order Shop" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Xác nhận đơn hàng thành công',
            html: `
        <p>Xin chào <strong>${name}</strong>,</p>
        <p>Cảm ơn bạn đã đặt hàng tại shop. Đơn hàng <strong>#${orderId}</strong> của bạn đã được ghi nhận với tổng giá trị <strong>${totalPrice.toLocaleString()}đ</strong>.</p>
        <p>Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>
        <p>Trân trọng,</p>
        <p>Custom Order Shop</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Lỗi gửi email xác nhận đơn hàng:', error);
        return NextResponse.json({ error: 'Không gửi được email xác nhận' }, { status: 500 });
    }
}

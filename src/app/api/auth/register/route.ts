import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Vui lòng nhập đầy đủ email và mật khẩu.' }, { status: 400 });
        }

        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'Email đã được sử dụng.' }, { status: 409 });
        }

        // Mã hoá mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'ADMIN',
            },
        });

        return NextResponse.json({ message: 'Đăng ký thành công', user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        console.error('Register Error:', error);
        return NextResponse.json({ error: 'Lỗi server khi đăng ký' }, { status: 500 });
    }
}

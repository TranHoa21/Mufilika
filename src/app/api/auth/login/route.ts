import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: 'Email không tồn tại' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Mật khẩu không đúng' }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return NextResponse.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Đăng nhập thất bại' }, { status: 500 });
    }
}

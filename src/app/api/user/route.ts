// app/api/users/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET: Lấy danh sách tất cả người dùng
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true,
                comments: true,
                notification: true,
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error('Lỗi GET user >>>', error);
        return NextResponse.json({ error: 'Lỗi lấy danh sách người dùng' }, { status: 500 });
    }
}

// POST: Tạo người dùng mới
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, name, role } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email và mật khẩu là bắt buộc' }, { status: 400 });
        }

        const user = await prisma.user.create({
            data: {
                email,
                password,
                name,
                role,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Lỗi POST user >>>', error);
        return NextResponse.json({ error: 'Lỗi tạo người dùng' }, { status: 500 });
    }
}

// app/api/users/[id]/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Helper: Lấy ID từ URL
function extractIdFromUrl(req: NextRequest): string | null {
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1];
    return id && id.length >= 10 ? id : null; // check sơ nếu là UUID
}

// GET user theo ID
export async function GET(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                posts: true,
                comments: true,
                notification: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'Không tìm thấy user' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Lỗi GET user by ID >>>', error);
        return NextResponse.json({ error: 'Lỗi server khi lấy user' }, { status: 500 });
    }
}

// PUT: cập nhật user
export async function PUT(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });

    try {
        const body = await req.json();

        const updatedUser = await prisma.user.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Lỗi PUT user >>>', error);
        return NextResponse.json({ error: 'Lỗi cập nhật user' }, { status: 500 });
    }
}

// DELETE user
export async function DELETE(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });

    try {
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Xóa user thành công' });
    } catch (error) {
        console.error('Lỗi DELETE user >>>', error);
        return NextResponse.json({ error: 'Lỗi xóa user' }, { status: 500 });
    }
}

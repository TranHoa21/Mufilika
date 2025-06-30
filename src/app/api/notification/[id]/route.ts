import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Lấy thông báo theo ID
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID thông báo' }, { status: 400 });
        }

        const notification = await prisma.notification.findUnique({
            where: { id },
            include: { order: true },
        });

        if (!notification) {
            return NextResponse.json({ error: 'Không tìm thấy thông báo' }, { status: 404 });
        }

        return NextResponse.json({ success: true, notification });
    } catch (error) {
        console.error('Lỗi khi lấy thông báo:', error);
        return NextResponse.json({ error: 'Lỗi khi lấy thông báo' }, { status: 500 });
    }
}

// PUT /api/notifications/:id/read
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: "Thiếu ID thông báo." }, { status: 400 });
        }

        const updated = await prisma.notification.update({
            where: { id },
            data: { seen: true },
        });

        return NextResponse.json({ success: true, notification: updated });
    } catch (err) {
        console.error("Lỗi cập nhật trạng thái thông báo:", err);
        return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
    }
}
// Xóa thông báo theo ID
export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID thông báo' }, { status: 400 });
        }

        await prisma.notification.delete({ where: { id } });
        return NextResponse.json({ success: true, message: 'Đã xóa thông báo' });
    } catch (error) {
        console.error('Lỗi khi xóa thông báo:', error);
        return NextResponse.json({ error: 'Lỗi khi xóa thông báo' }, { status: 500 });
    }
}
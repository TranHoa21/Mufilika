import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
        // GET comment theo ID
        try {
            const comment = await prisma.comment.findUnique({
                where: { id },
                include: {
                    user: {
                        select: { id: true, name: true },
                    },
                },
            });

            if (!comment) {
                return NextResponse.json({ error: 'Không tìm thấy comment' }, { status: 404 });
            }

            return NextResponse.json(comment);
        } catch (error) {
            console.error('[COMMENT_GET_BY_ID_ERROR]', error);
            return NextResponse.json({ error: 'Lỗi khi lấy comment' }, { status: 500 });
        }
    }

    // GET tất cả comment đã được duyệt (tuỳ postId nếu có)
    const postId = searchParams.get('postId');
    const where = postId ? { postId, status: 'approved' } : { status: 'approved' };

    try {
        const comments = await prisma.comment.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { id: true, name: true },
                },
            },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error('[COMMENT_GET_ALL_ERROR]', error);
        return NextResponse.json({ error: 'Lỗi khi lấy danh sách comment' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Thiếu id comment' }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { content, status } = body;

        const updated = await prisma.comment.update({
            where: { id },
            data: {
                ...(content && { content }),
                ...(status && { status }),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('[COMMENT_PUT_ERROR]', error);
        return NextResponse.json({ error: 'Lỗi khi cập nhật comment' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Thiếu id comment' }, { status: 400 });
    }

    try {
        const deleted = await prisma.comment.delete({
            where: { id },
        });

        return NextResponse.json(deleted);
    } catch (error) {
        console.error('[COMMENT_DELETE_ERROR]', error);
        return NextResponse.json({ error: 'Lỗi khi xoá comment' }, { status: 500 });
    }
}

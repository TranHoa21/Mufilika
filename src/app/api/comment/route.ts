import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');

        const whereClause = postId ? { postId, status: 'approved' } : { status: 'approved' };

        const comments = await prisma.comment.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error('[COMMENT_GET_ERROR]', error);
        return NextResponse.json({ error: 'Lỗi khi lấy comment' }, { status: 500 });
    }
}

// Tạo Comment mới
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { postId, userId, content } = body;

        if (!postId || !content) {
            return NextResponse.json({ error: 'postId và content là bắt buộc' }, { status: 400 });
        }

        const newComment = await prisma.comment.create({
            data: {
                postId,
                userId,
                content,
                // status mặc định là 'pending'
            },
        });

        return NextResponse.json(newComment);
    } catch (error) {
        console.error('[COMMENT_POST_ERROR]', error);
        return NextResponse.json({ error: 'Lỗi khi tạo comment' }, { status: 500 });
    }
}
import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        if (!id) return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });

        const tag = await prisma.tag.findUnique({ where: { id } });
        if (!tag) return NextResponse.json({ error: 'Không tìm thấy tag' }, { status: 404 });
        return NextResponse.json(tag);
    } catch (error) {
        console.log("check err >>>", error)
        return NextResponse.json({ error: 'Lỗi lấy tag' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        if (!id) return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });

        const body = await req.json();
        const updatedTag = await prisma.tag.update({ where: { id }, data: body });
        return NextResponse.json(updatedTag);
    } catch (error) {
        console.log("check err >>>", error)
        return NextResponse.json({ error: 'Lỗi cập nhật tag' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        if (!id) return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });

        await prisma.tag.delete({ where: { id } });
        return NextResponse.json({ message: 'Xóa tag thành công' });
    } catch (error) {
        console.log("check err >>>", error)
        return NextResponse.json({ error: 'Lỗi xóa tag' }, { status: 500 });
    }
}

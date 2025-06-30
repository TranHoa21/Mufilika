import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Lấy danh mục theo ID
export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        if (!id) return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });

        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) return NextResponse.json({ error: 'Không tìm thấy danh mục' }, { status: 404 });
        return NextResponse.json(category);
    } catch (error) {
        console.log("check err >>>", error)

        return NextResponse.json({ error: 'Lỗi lấy danh mục' }, { status: 500 });
    }
}

// Cập nhật danh mục
export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        if (!id) return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });

        const body = await req.json();
        const updatedCategory = await prisma.category.update({ where: { id }, data: body });
        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.log("check err >>>", error)

        return NextResponse.json({ error: 'Lỗi cập nhật danh mục' }, { status: 500 });
    }
}

// Xóa danh mục
export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        if (!id) return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });

        await prisma.category.delete({ where: { id } });
        return NextResponse.json({ message: 'Xóa danh mục thành công' });
    } catch (error) {
        console.log("check err >>>", error)
        return NextResponse.json({ error: 'Lỗi xóa danh mục' }, { status: 500 });
    }
}
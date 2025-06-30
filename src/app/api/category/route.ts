import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Lấy danh sách danh mục
export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    } catch (error) {
        console.log("check err >>>", error)
        return NextResponse.json({ error: 'Lỗi lấy danh mục' }, { status: 500 });
    }
}

// Thêm danh mục mới
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const category = await prisma.category.create({ data: body });
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.log("check err >>>", error)
        return NextResponse.json({ error: 'Lỗi thêm danh mục' }, { status: 500 });
    }
}

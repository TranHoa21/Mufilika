import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    try {
        const tags = await prisma.tag.findMany();
        return NextResponse.json(tags);
    } catch (error) {
        console.log("check err >>>", error);
        return NextResponse.json({ error: 'Lỗi lấy danh sách danh mục' }, { status: 500 });
    }
}
// Tạo danh mục mới
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const newTag = await prisma.tag.create({ data: body });
        return NextResponse.json(newTag);
    } catch (error) {
        console.log("check err >>>", error)
        return NextResponse.json({ error: 'Lỗi tạo danh mục' }, { status: 500 });
    }
}

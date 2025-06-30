import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Lấy danh sách thông báo
export async function GET() {
    const notifications = await prisma.notification.findMany({
        where: { seen: false, userId: "a60284ea-625e-45a8-b6c8-40e851273581" }, // Lấy chưa đọc
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notifications);
}




import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


// Lấy hình ảnh theo ID
export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "ID hình ảnh không hợp lệ." }, { status: 400 });
        }

        const image = await prisma.postImage.findUnique({
            where: { id: Number(id) },
        });

        if (!image) {
            return NextResponse.json({ error: "Không tìm thấy hình ảnh." }, { status: 404 });
        }

        return NextResponse.json({ success: true, image }, { status: 200 });
    } catch (error) {
        console.error("Lỗi khi lấy hình ảnh:", error);
        return NextResponse.json({ error: "Lỗi khi lấy thông tin hình ảnh." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const { id, ...updateFields } = data;

        if (!id) {
            return NextResponse.json(
                { error: "Thiếu ID hình ảnh." },
                { status: 400 }
            );
        }

        const existingImage = await prisma.postImage.findUnique({ where: { id } });

        if (!existingImage) {
            return NextResponse.json(
                { error: "Không tìm thấy hình ảnh." },
                { status: 404 }
            );
        }

        const allowedFields = ["imageUrl", "altText"];
        const validUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([key, value]) => {
                return (
                    value !== undefined &&
                    value !== null &&
                    allowedFields.includes(key) &&
                    existingImage[key as keyof typeof existingImage] !== value
                );
            })
        );

        if (Object.keys(validUpdateFields).length === 0) {
            return NextResponse.json(
                { message: "Không có thay đổi nào." },
                { status: 200 }
            );
        }

        const updatedImage = await prisma.postImage.update({
            where: { id },
            data: validUpdateFields,
        });

        return NextResponse.json(
            { success: true, image: updatedImage },
            { status: 200 }
        );
    } catch (err) {
        console.error("Lỗi cập nhật hình ảnh:", err);
        return NextResponse.json(
            { error: "Lỗi khi cập nhật hình ảnh" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // 👉 Lấy params từ URL
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID hình ảnh' }, { status: 400 });
        }

        // 👉 Xóa hình ảnh với ID
        await prisma.postImage.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: 'Đã xóa hình ảnh thành công' }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi xóa hình ảnh:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}


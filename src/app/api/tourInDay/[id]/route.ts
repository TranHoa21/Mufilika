import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

// ✅ Lấy TourInDay theo ID
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID TourInDay' }, { status: 400 });
        }

        const day = await prisma.tourInDay.findUnique({ where: { id } });

        if (!day) {
            return NextResponse.json({ error: 'TourInDay không tồn tại' }, { status: 404 });
        }

        return NextResponse.json(day);
    } catch (error) {
        console.error('Lỗi khi lấy TourInDay:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID TourInDay' }, { status: 400 });
        }

        const formData = await req.formData();
        const name = formData.get('name') as string | null;
        const slug = formData.get('slug') as string | null;
        const slugTour = formData.get('slugTour') as string | null;
        const description = formData.get('description') as string | null;

        if (!name || !slug || !slugTour || !description) {
            return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 });
        }

        // ✅ Xử lý ảnh nếu có
        let newImageUrl: string | null = null;
        const imageFile = formData.get('image') as File | null;

        if (imageFile && imageFile.type.startsWith('image/')) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const upload = await cloudinary.uploader.upload(`data:${imageFile.type};base64,${buffer.toString('base64')}`, {
                folder: 'tour-in-day',
            });

            newImageUrl = upload.secure_url;
        }

        // ✅ Cập nhật TourInDay
        const updatedDay = await prisma.tourInDay.update({
            where: { id },
            data: {
                name,
                slug,
                slugTour,
                description,
                image: newImageUrl || undefined, // giữ ảnh cũ nếu không có ảnh mới
            },
        });

        return NextResponse.json({ success: true, day: updatedDay }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi cập nhật TourInDay:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID TourInDay' }, { status: 400 });
        }

        const day = await prisma.tourInDay.findUnique({ where: { id } });

        if (!day) {
            return NextResponse.json({ error: 'TourInDay không tồn tại' }, { status: 404 });
        }

        await prisma.tourInDay.delete({ where: { id } });

        return NextResponse.json({ success: true, message: 'Xoá TourInDay thành công' }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi xoá TourInDay:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

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

        const day = await prisma.tourdatas.findUnique({ where: { id: Number(id) } });

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
        const name_day = formData.get('name_day') as string | null;
        const name_day_title = formData.get('name_day_title') as string | null;
        const name_hotel = formData.get('name_hotel') as string | null;
        const schedule = formData.get('schedule') as string | null;
        const hotel_introduction = formData.get('hotel_introduction') as string | null;

        if (!name_day || !name_day_title || !schedule) {
            return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
        }

        // ✅ Xử lý ảnh image_in_day
        let newImageInDayUrl: string | null = null;
        const imageInDayFile = formData.get('image_in_day') as File | null;

        if (imageInDayFile && imageInDayFile.type.startsWith('image/')) {
            const arrayBuffer = await imageInDayFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const upload = await cloudinary.uploader.upload(
                `data:${imageInDayFile.type};base64,${buffer.toString('base64')}`,
                { folder: 'tour-in-day' }
            );

            newImageInDayUrl = upload.secure_url;
        }

        // ✅ Xử lý ảnh image_hotel
        let newImageHotelUrl: string | null = null;
        const imageHotelFile = formData.get('image_hotel') as File | null;

        if (imageHotelFile && imageHotelFile.type.startsWith('image/')) {
            const arrayBuffer = await imageHotelFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const upload = await cloudinary.uploader.upload(
                `data:${imageHotelFile.type};base64,${buffer.toString('base64')}`,
                { folder: 'tour-in-day' }
            );

            newImageHotelUrl = upload.secure_url;
        }

        // Lấy dữ liệu cũ để giữ ảnh nếu không có ảnh mới
        const currentDay = await prisma.tourdatas.findUnique({
            where: { id: Number(id) },
        });

        const updatedDay = await prisma.tourdatas.update({
            where: { id: Number(id) },
            data: {
                name_day,
                name_day_title,
                name_hotel: name_hotel || undefined,
                schedule,
                hotel_introduction: hotel_introduction || undefined,
                image_in_day: newImageInDayUrl || currentDay?.image_in_day || null,
                image_hotel: newImageHotelUrl || currentDay?.image_hotel || null,
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

        const day = await prisma.tourdatas.findUnique({ where: { id: Number(id) } });

        if (!day) {
            return NextResponse.json({ error: 'TourInDay không tồn tại' }, { status: 404 });
        }

        await prisma.tourdatas.delete({ where: { id: Number(id) } });

        return NextResponse.json({ success: true, message: 'Xoá TourInDay thành công' }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi xoá TourInDay:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

import cloudinary from '@/lib/cloudinary';
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tourId = searchParams.get('tourId');

        if (!tourId) {
            return NextResponse.json({ message: 'Missing tourId' }, { status: 400 });
        }

        const tourInDays = await prisma.tourdatas.findMany({
            where: {
                tourId: Number(tourId),
            },
            orderBy: {
                id: 'asc',
            },
        });

        return NextResponse.json(tourInDays);
    } catch (error) {
        console.error('[GET Tourdatas]', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}



export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const tourIdRaw = formData.get('tourId') as string | null;
        const name_day = formData.get('name_day') as string | null;
        const name_day_title = formData.get('name_day_title') as string | null;
        const name_hotel = formData.get('name_hotel') as string | null;
        const schedule = formData.get('schedule') as string | null;
        const hotel_introduction = formData.get('hotel_introduction') as string | null;

        const tourId = tourIdRaw ? parseInt(tourIdRaw) : null;

        if (!tourId || isNaN(tourId)) {
            return NextResponse.json({ error: 'Thiếu tourId ' }, { status: 400 });
        }

        // Upload image_in_day
        let image_in_day: string | null = null;
        const imageInDayFile = formData.get('image_in_day') as File | null;

        if (imageInDayFile && imageInDayFile.type.startsWith('image/')) {
            const buffer = Buffer.from(await imageInDayFile.arrayBuffer());
            const upload = await cloudinary.uploader.upload(`data:${imageInDayFile.type};base64,${buffer.toString('base64')}`, {
                folder: 'tour-in-day/image-in-day',
            });
            image_in_day = upload.secure_url;
        }

        // Upload image_hotel
        let image_hotel: string | null = null;
        const imageHotelFile = formData.get('image_hotel') as File | null;

        if (imageHotelFile && imageHotelFile.type.startsWith('image/')) {
            const buffer = Buffer.from(await imageHotelFile.arrayBuffer());
            const upload = await cloudinary.uploader.upload(`data:${imageHotelFile.type};base64,${buffer.toString('base64')}`, {
                folder: 'tour-in-day/image-hotel',
            });
            image_hotel = upload.secure_url;
        }

        // Tạo mới dữ liệu trong bảng Tourdatas
        const newTourInDay = await prisma.tourdatas.create({
            data: {
                tourId,
                name_day,
                name_day_title,
                name_hotel,
                image_in_day,
                image_hotel,
                schedule,
                hotel_introduction,
            },
        });

        return NextResponse.json({ success: true, day: newTourInDay }, { status: 201 });

    } catch (error) {
        console.error('Lỗi khi tạo TourInDay:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}


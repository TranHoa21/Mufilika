import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');  // Lấy slug từ query params

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        const tourDays = await prisma.tourInDay.findMany({
            where: {
                slugTour: slug,  // Lọc theo slug
            },
        });

        return NextResponse.json(tourDays);
    } catch (error) {
        console.error('Lỗi khi lấy TourInDay:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}


// ✅ Tạo mới TourInDay
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const name = formData.get('name') as string | null;
        const slug = formData.get('slug') as string | null;
        const slugTour = formData.get('slugTour') as string | null;
        const description = formData.get('description') as string | null;

        if (!name || !slug || !slugTour || !description) {
            return NextResponse.json({ error: 'Thiếu thông tin TourInDay' }, { status: 400 });
        }

        // ✅ Xử lý ảnh nếu có
        let imageUrl: string | null = null;
        const imageFile = formData.get('image') as File | null;

        if (imageFile && imageFile.type.startsWith('image/')) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const upload = await cloudinary.uploader.upload(`data:${imageFile.type};base64,${buffer.toString('base64')}`, {
                folder: 'tour-in-day',
            });

            imageUrl = upload.secure_url;
        }

        // ✅ Kiểm tra tour gốc có tồn tại không
        const tour = await prisma.tour.findUnique({
            where: { slug: slugTour },
        });

        if (!tour) {
            return NextResponse.json({ error: 'Tour không tồn tại' }, { status: 404 });
        }

        const newTourInDay = await prisma.tourInDay.create({
            data: {
                name,
                slug,
                slugTour,
                description,
                image: imageUrl ?? null,
            },
        });

        return NextResponse.json({ success: true, day: newTourInDay }, { status: 201 });
    } catch (error) {
        console.error('Lỗi khi tạo TourInDay:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

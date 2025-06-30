import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// ✅ Lấy sản phẩm theo ID
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const slug = url.pathname.split('/').pop();

        if (!slug) {
            return NextResponse.json({ error: 'Thiếu slug tour' }, { status: 400 });
        }

        const tour = await prisma.tour.findUnique({
            where: { slug },
            include: {
                days: true,
                bookings: true,
                reviews: true,
            },
        });

        if (!tour) {
            return NextResponse.json({ error: 'Tour không tồn tại' }, { status: 404 });
        }

        return NextResponse.json(tour, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi lấy tour:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const slug = url.pathname.split('/').pop();

        if (!slug) {
            return NextResponse.json({ error: 'Thiếu slug tour' }, { status: 400 });
        }

        const formData = await req.formData();
        const name = formData.get('name') as string | null;
        const newSlug = formData.get('slug') as string | null;
        const address = formData.get('address') as string | null;
        const description = formData.get('description') as string | null;
        const duration = formData.get('duration') as string | null;
        const maxGuests = formData.get('maxGuests') as string | null;
        const price = formData.get('price') as string | null;
        const included = formData.getAll('included') as string[];
        const notIncluded = formData.getAll('notIncluded') as string[];

        if (!name || !newSlug || !address || !description || !duration || !maxGuests || !price) {
            return NextResponse.json({ error: 'Thiếu thông tin tour' }, { status: 400 });
        }

        let newImageUrl: string | null = null;
        const imageFile = formData.get('image') as File | null;

        if (imageFile && imageFile.type.startsWith('image/')) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const upload = await cloudinary.uploader.upload(`data:${imageFile.type};base64,${buffer.toString('base64')}`, {
                folder: 'tours',
            });

            newImageUrl = upload.secure_url;
        }

        const updatedTour = await prisma.tour.update({
            where: { slug },
            data: {
                name,
                slug: newSlug,
                address,
                description,
                duration: parseInt(duration),
                maxGuests: parseInt(maxGuests),
                price: parseFloat(price),
                included,
                notIncluded,
                image: newImageUrl || undefined,
            },
        });

        return NextResponse.json({ success: true, tour: updatedTour }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi cập nhật tour:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}



// ✅ Xóa sản phẩm
export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const slug = url.pathname.split('/').pop();

        if (!slug) {
            return NextResponse.json({ error: 'Thiếu slug tour' }, { status: 400 });
        }

        const tour = await prisma.tour.findUnique({ where: { slug } });

        if (!tour) {
            return NextResponse.json({ error: 'Tour không tồn tại' }, { status: 404 });
        }

        // Xoá bản ghi liên quan nếu cần
        await prisma.tour.delete({ where: { slug } });

        return NextResponse.json({ success: true, message: 'Xóa tour thành công' }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi xoá tour:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}


import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// ✅ API GET: Lấy tất cả sản phẩm
export async function GET() {
    try {
        const tours = await prisma.tour.findMany();
        return NextResponse.json(tours);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi lấy danh sách tour' }, { status: 500 });
    }
}

// ✅ API POST: Thêm sản phẩm mới
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const name = formData.get('name') as string | null;
        const slug = formData.get('slug') as string | null;
        const address = formData.get('address') as string | null;
        const description = formData.get('description') as string | null;
        const duration = formData.get('duration') as string | null;
        const maxGuests = formData.get('maxGuests') as string | null;
        const price = formData.get('price') as string | null;
        const included = formData.getAll('included') as string[];
        const notIncluded = formData.getAll('notIncluded') as string[];

        if (!name || !slug || !address || !description || !duration || !maxGuests || !price) {
            return NextResponse.json({ error: 'Thiếu thông tin tour' }, { status: 400 });
        }

        // Upload ảnh đại diện
        let imageUrl: string | null = null;
        const imageFile = formData.get('image') as File | null;

        if (imageFile) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const upload = await cloudinary.uploader.upload(`data:${imageFile.type};base64,${buffer.toString('base64')}`, {
                folder: 'tours',
            });

            imageUrl = upload.secure_url;
        }

        // Lưu tour vào DB
        const newTour = await prisma.tour.create({
            data: {
                name,
                slug,
                address,
                description,
                duration: parseInt(duration),
                maxGuests: parseInt(maxGuests),
                price: parseFloat(price),
                image: imageUrl ?? '',
                included,
                notIncluded,
            },
        });

        return NextResponse.json({ success: true, tour: newTour }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi tạo tour' }, { status: 500 });
    }
}


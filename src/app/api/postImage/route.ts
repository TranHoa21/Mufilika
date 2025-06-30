import { NextRequest, NextResponse } from 'next/server';
import cloudinary from "@/lib/cloudinary";
import { prisma } from '@/lib/prisma';

// Lấy danh sách hình ảnh bài viết
export async function GET() {
    try {
        const images = await prisma.postImage.findMany();

        return NextResponse.json(images);
    } catch (error) {
        console.log("Lỗi lấy danh sách hình ảnh >>>", error);
        return NextResponse.json({ error: 'Lỗi lấy danh sách hình ảnh' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const altText = formData.get("altText") as string || "";

        if (!altText) {
            return NextResponse.json({ error: "Alt text không được cung cấp." }, { status: 400 });
        }

        const uploadedImages: { imageUrl: string; altText?: string }[] = [];

        // Lấy tất cả các file ảnh
        const imageFiles = formData.getAll("file") as File[];
        for (let i = 0; i < imageFiles.length; i++) {
            const file = imageFiles[i];

            if (!file) continue;

            // Chuyển đổi File thành Buffer để upload lên Cloudinary
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Upload lên Cloudinary
            const upload = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "postImages" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            uploadedImages.push({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                imageUrl: (upload as any).secure_url,
                altText: altText,
            });
        }

        // Lưu hình ảnh vào cơ sở dữ liệu
        const newImages = await prisma.postImage.createMany({
            data: uploadedImages.map((img) => ({
                imageUrl: img.imageUrl,
                altText: img.altText,
            })),
        });

        console.log("Hình ảnh mới được lưu vào DB: ", newImages); // Log hình ảnh vừa lưu

        return NextResponse.json({
            success: true,
            images: uploadedImages.map(img => ({
                url: img.imageUrl, // Đổi từ imageUrl sang url (SunEditor cần trường này)
                alt: img.altText,
                name: "Uploaded Image",
            })),
        }, { status: 201 });
    } catch (error) {
        console.error("Lỗi khi tải hình ảnh lên:", error);
        return NextResponse.json({ error: "Lỗi khi tải hình ảnh lên." }, { status: 500 });
    }
}
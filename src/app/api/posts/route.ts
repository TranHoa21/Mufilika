// app/api/posts/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';
import cloudinary from "@/lib/cloudinary";
// GET tất cả bài viết
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const published = formData.get("published") === "true";
        const readingTime = parseInt(formData.get("readingTime") as string, 10);
        const slug = slugify(title, { lower: true, strict: true });

        if (!title || !content) {
            console.log("check lỗi >>", "thiếu title hoặc content")
            return NextResponse.json({ error: "Tiêu đề và nội dung không được để trống" }, { status: 400 });
        }

        const uploadedImages: { imageUrl: string; altText?: string }[] = [];

        // Upload ảnh nếu có (giống PUT)
        const imageFile = formData.get("image") as File | null;
        if (imageFile && typeof imageFile === "object") {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const upload = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "posts" },
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
                altText: "",
            });
        }

        // Tạo bài viết mới
        const newPost = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                imageUrl: uploadedImages.length > 0 ? uploadedImages[0].imageUrl : null,
                metaTitle: formData.get("metaTitle")?.toString() ?? title,
                metaDescription: formData.get("metaDescription")?.toString() ?? "",
                keywords: formData.get("keywords")?.toString() ?? "",
                canonicalUrl: formData.get("canonicalUrl")?.toString() ?? "",
                published,
                views: 0,
                readingTime: isNaN(readingTime) ? null : readingTime,
                categoryId: formData.get("categoryId")?.toString(),
                authorId: formData.get("authorId")?.toString(),
                images: {
                    create: uploadedImages.map((img) => ({
                        imageUrl: img.imageUrl,
                        altText: img.altText,
                    })),
                },
            },
        });

        return NextResponse.json({ success: true, post: newPost }, { status: 201 });
    } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error);
        return NextResponse.json({ error: "Lỗi khi tạo bài viết" }, { status: 500 });
    }
}



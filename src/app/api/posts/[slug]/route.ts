import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import slugify from 'slugify';
import cloudinary from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
    try {
        const urlParts = req.nextUrl.pathname.split("/");
        const slug = urlParts[urlParts.length - 1];

        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                images: true,
                category: true,
                tags: true,
                author: true
            }
        });

        if (!post) {
            return NextResponse.json({ error: "Bài viết không tồn tại" }, { status: 404 });
        }

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        return NextResponse.json({ error: "Lỗi khi lấy bài viết" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const urlParts = req.nextUrl.pathname.split('/');
        const slug = urlParts[urlParts.length - 1];

        const formData = await req.formData();

        const title = formData.get("title") as string;
        const newSlug = slugify(title, { lower: true, strict: true });

        const content = formData.get("content") as string;
        const metaTitle = formData.get("metaTitle") as string;
        const metaDescription = formData.get("metaDescription") as string;
        const keywords = formData.get("keywords") as string;
        const canonicalUrl = formData.get("canonicalUrl") as string;
        const published = formData.get("published") === "true";
        const categoryId = formData.get("categoryId") as string;
        const authorId = formData.get("authorId") as string | null;

        const tags = formData.getAll("tags") as string[];

        // Upload ảnh nếu có
        const uploadedImages: { imageUrl: string; altText?: string }[] = [];

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
                altText: "", // nếu có altText thì lấy thêm
            });
        }

        const updatedPost = await prisma.post.update({
            where: { slug },
            data: {
                title,
                slug: newSlug,
                content,
                metaTitle,
                metaDescription,
                keywords,
                canonicalUrl,
                published,
                categoryId,
                authorId,
                imageUrl: uploadedImages.length > 0 ? uploadedImages[0].imageUrl : null,
                images: {
                    deleteMany: {},
                    create: uploadedImages.map(img => ({
                        imageUrl: img.imageUrl,
                        altText: img.altText
                    }))
                },
                tags: {
                    set: [], // Xóa tag cũ
                    connect: tags.map(id => ({ id })) // Thêm tag mới
                }
            }
        });

        return NextResponse.json({ success: true, post: updatedPost });
    } catch (error) {
        console.error("Lỗi khi cập nhật bài viết:", error);
        return NextResponse.json({ error: "Lỗi khi cập nhật bài viết" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const urlParts = req.nextUrl.pathname.split("/");
        const slug = urlParts[urlParts.length - 1];

        // Xóa bài viết và ảnh liên quan
        await prisma.post.delete({ where: { slug } });

        return NextResponse.json({ success: true, message: "Xóa bài viết thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
        return NextResponse.json({ error: "Lỗi khi xóa bài viết" }, { status: 500 });
    }
}

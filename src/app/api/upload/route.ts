import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// Disable Next.js body parser for file upload
export const config = {
    api: {
        bodyParser: false,
    },
};


export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: 'custom-orders' }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
            .end(buffer);
    });

    return NextResponse.json(uploadResult);
}

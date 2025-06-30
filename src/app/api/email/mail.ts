import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
    service: 'Gmail', // hoặc SMTP provider khác
    auth: {
        user: process.env.EMAIL_USER,     // ví dụ: customorder.shop@gmail.com
        pass: process.env.EMAIL_PASS,     // app password từ Google
    },
});
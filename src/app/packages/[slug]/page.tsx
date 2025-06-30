'use client';
import React from 'react';
import TourDetails from "@/components/sections/packages/TourDetails";
import Link from "next/link";
import Gallery from "@/components/sections/home/Gallery";
import BookingForm from "@/components/sections/home/BookingForm";

const PackagePage = () => {
    return (
        <>
            <div
                className="text-center text-white py-24"
                style={{
                    backgroundImage: `url(/images/closeup-shot-elephants-standing-near-lake-sunset.webp)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h1 className="text-4xl font-bold mb-4">Packages</h1>
                <h6 className="text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/packages" className="hover:underline">Packages</Link>
                </h6>
            </div>
            <TourDetails />
            <Gallery />
            <BookingForm />
        </>
    );
};

export default PackagePage;

'use client';
import React from 'react';
import DesertSafariPackages from "@/components/sections/home/DesertSafariPackages";
import Link from "next/link";
import SpecialOfferSection from "@/components/sections/packages/SpecialOfferSection";
import CustomPackageSection from "@/components/sections/packages/CustomPackageSection"
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
            <DesertSafariPackages />
            <SpecialOfferSection />
            <CustomPackageSection />
        </>
    );
};

export default PackagePage;

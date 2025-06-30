'use client';
import React from 'react';
import DesertTourHero from "@/components/sections/home/About";
import Link from "next/link";
import ValuesMissionVision from "@/components/sections/about/ValuesMissionVision";
import AchievementsSection from "@/components/sections/about/AchievementsSection"
const AboutPage = () => {
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
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <h6 className="text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/about" className="hover:underline">About Us</Link>
                </h6>
            </div>
            <DesertTourHero />
            <ValuesMissionVision />
            <AchievementsSection />
        </>
    );
};

export default AboutPage;

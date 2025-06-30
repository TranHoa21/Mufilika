"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser, FaComment } from "react-icons/fa";
import { motion, Variants } from "framer-motion";

const blogPosts = [
    {
        title: "A Journey Through South Luangwa: Wildlife Encounters Like No Other",
        description:
            "Experience the raw beauty of South Luangwa National Park with Mufilika. From game drives to walking safaris, discover why it's one of Zambia’s top destinations for nature lovers.",
        image: "/images/south-luangwa-wildlife.jpg",
        date: "April 18, 2025",
        author: "Mufilika Team",
        comments: 2,
        link: "/blog_detail/south-luangwa-safari",
    },
    {
        title: "5 Reasons Why Zambia Should Be Your Next Travel Destination",
        description:
            "Zambia is more than Victoria Falls. Explore unique cultures, friendly locals, untouched landscapes, and thrilling safari adventures with Mufilika Tours & Safaris.",
        image: "/images/zambia-travel-reasons.jpg",
        date: "March 30, 2025",
        author: "Admin",
        comments: 5,
        link: "/blog_detail/why-visit-zambia",
    },
    {
        title: "Meet the Locals: Cultural Experiences Beyond the Safari",
        description:
            "Go beyond the game drive. Connect with Zambia’s rich traditions through village visits, local cuisine, and authentic storytelling curated by Mufilika’s local guides.",
        image: "/images/zambia-cultural-experience.jpg",
        date: "March 10, 2025",
        author: "Mufilika Team",
        comments: 1,
        link: "/blog_detail/cultural-experiences-zambia",
    },
];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut', // hoặc dùng cubicBezier nếu muốn tuỳ chỉnh
        },
    }),
};

const BlogSection: React.FC = () => {
    return (
        <section className="py-20 bg-[#e6e9dd]">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#1f1f1f] mb-4">Our Latest Blog</h1>
                    <p className="text-base text-[#4a4a4a] leading-relaxed">
                        Discover travel stories, insider tips, and unforgettable safari moments across Zambia. Stay inspired for your next adventure with Mufilika Tours & Safaris.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white rounded-xl overflow-hidden shadow-md transition duration-300"
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            custom={index}
                        >
                            <div className="relative w-full h-60">
                                <Link href={post.link}>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                    />
                                </Link>
                                <span className="absolute bottom-0 right-0 m-4 bg-[#c08b5c] text-white text-xs font-semibold px-4 py-2 rounded-tl-lg">
                                    {post.date}
                                </span>
                            </div>

                            <div className="p-6">
                                <ul className="flex items-center gap-4 mb-4 text-gray-500 text-sm">
                                    <li className="flex items-center gap-2">
                                        <FaUser className="w-4 h-4" />
                                        By - {post.author}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaComment className="w-4 h-4" />
                                        {post.comments} comments
                                    </li>
                                </ul>

                                <h4 className="text-lg font-bold text-[#1f1f1f] mb-2 transition-colors duration-300 group-hover:text-[#c08b5c] leading-snug">
                                    <Link href={post.link}>{post.title}</Link>
                                </h4>

                                <p className="text-[#555] text-sm leading-relaxed">{post.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;

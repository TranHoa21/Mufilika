'use client';

import Image from 'next/image';
import { FaPlay, FaPhoneAlt } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion, cubicBezier } from 'framer-motion';
const stats = [
    { value: 99000, suffix: 'K', label: 'Happy Travellers' },
    { value: 21, suffix: '+', label: 'Top Destinations' },
    { value: 35, suffix: '+', label: 'Expert Guides' },
    { value: 87, suffix: '%', label: 'Repeat Bookings' },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: cubicBezier(0.25, 0.1, 0.25, 1), // ✔️ đúng kiểu
        },
    },
};

const DesertTourHero = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <motion.div
            className="bg-amber-50 pt-40 lg:py-16 md:py-16 px-6 sm:px-8 lg:px-16"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header with Icon */}
                <div className="flex items-center pt-10 gap-4 mb-8">
                    <div className="w-12 h-12 relative">
                        <Image
                            src="https://demo.deverust.com/sandtrail/wp-content/uploads/sites/21/2024/12/icon-tree-brown.png"
                            alt="Desert icon"
                            fill
                            className="object-contain"
                            loading="lazy"
                            priority={false}
                        />
                    </div>
                    <span className="text-amber-700 font-medium uppercase text-sm tracking-wider">
                        About Us
                    </span>
                </div>

                {/* Main Content */}
                <motion.div
                    className="bg-[#fdfaf6] px-6 py-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                >
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
                        <div>
                            <h1 className="text-4xl font-bold text-black">
                                Authentic Desert Journeys with Mufilika
                            </h1>
                            <p className="mt-2 text-gray-600 max-w-xl">
                                Experience the soul of the desert through curated adventures led by local experts...
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-y-4">
                            <div className="flex justify-center sm:justify-start -space-x-4">
                                {['img-UY36FX8', 'img-CRRG6WR', 'img-L6UXDWV'].map((img, i) => (
                                    <Image
                                        key={i}
                                        src={`https://demo.deverust.com/sandtrail/wp-content/uploads/sites/21/2024/12/${img}.jpg`}
                                        alt={`User ${i + 1}`}
                                        width={40}
                                        height={40}
                                        className="rounded-full border-2 border-white"
                                        loading="lazy"
                                        priority={false}
                                    />
                                ))}
                                <div className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center text-sm font-semibold border-2 border-white">
                                    99K
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 max-w-xs text-center sm:text-left">
                                Join 99k adventurers...
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Images with Play Button and Contact Box */}
                <div className="bg-[#fdfaf6] p-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
                        <motion.div
                            className="relative w-full md:w-1/3"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeInUp}
                        >
                            <Image
                                src="/images/about1.webp"
                                alt="Camel Ride"
                                width={400}
                                height={500}
                                className="object-cover w-full h-full rounded"
                                loading="lazy"
                                priority={false}
                            />
                            <div className="absolute -right-10 bottom-1/2 translate-y-1/2 bg-[#4d553f] w-24 h-24 rounded-full flex items-center justify-center border-4 border-white">
                                <FaPlay className="text-white text-2xl ml-1" />
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative w-full md:w-2/3"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeInUp}
                        >
                            <Image
                                src="/images/fedf2c08346a04570eb0fe0004b7569b.jpg"
                                alt="Desert Sunset"
                                width={800}
                                height={500}
                                className="object-cover w-full h-full rounded"
                                loading="lazy"
                                priority={false}
                            />
                            <div className="absolute bottom-6 right-6 bg-white shadow-md rounded-md flex items-center gap-4 p-4">
                                <button className="bg-[#b1835e] text-white px-6 py-2 font-medium rounded hover:opacity-90">
                                    Get In Touch
                                </button>
                                <div className="flex items-center text-sm text-gray-700">
                                    <FaPhoneAlt className="text-[#b1835e] mr-2" />
                                    <div>
                                        <p className="font-medium">Contact us at</p>
                                        <p className="text-[#4a5a7a]">474 – 937–8270</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Stats */}
                <motion.div
                    className="bg-[#fdfaf6] py-16 border-t border-gray-200"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <div ref={ref} className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <h3 className="text-5xl font-bold text-[#4d553f]">
                                    {inView ? (
                                        <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                                    ) : (
                                        `0${stat.suffix}`
                                    )}
                                </h3>
                                <p className="mt-2 text-sm text-black font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DesertTourHero;

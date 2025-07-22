"use client";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaCalendarAlt, FaUsers, FaClock } from "react-icons/fa";
import Image from "next/image";
import { useParams } from "next/navigation";

interface TourInDay {
    id: string;
    name: string;
    slug: string;
    slugTour: string;
    description: string;
    image: string;
}

interface Tour {
    id: string;
    name: string;
    slug: string;
    address: string;
    description: string;
    duration: number;
    maxGuests: number;
    price: number;
    image: string;
    included: string[];
    notIncluded: string[];
    days: TourInDay[];
}

export default function PackageDetail() {
    const params = useParams();
    const slug = params.slug as string;
    const [tour, setTour] = useState<Tour | null>(null);
    const [openIndex, setOpenIndex] = useState<number>(-1);

    const normalizeArray = (input: string[] | string): string[] => {
        if (Array.isArray(input)) {
            return input.flatMap(item => item.split(",").map(i => i.trim()).filter(Boolean));
        }
        return input.split(",").map(i => i.trim()).filter(Boolean);
    };

    useEffect(() => {
        async function fetchTour() {
            try {
                const res = await fetch(`/api/tours/${slug}`);
                const data = await res.json();
                const included = normalizeArray(data.included);
                const notIncluded = normalizeArray(data.notIncluded);
                setTour({ ...data, included, notIncluded });
            } catch (error) {
                console.error("Failed to fetch tour:", error);
            }
        }
        fetchTour();
    }, [slug]);

    if (!tour) return <p className="text-center py-10">Loading...</p>;

    return (
        <>
            {/* Hero Banner */}
            <div className="relative h-[70vh] w-full mt-16">
                <Image src={tour.image} alt={tour.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center px-8">
                    <div className="text-white max-w-xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{tour.name}</h1>
                        <div className="flex flex-wrap gap-6 text-lg mb-4">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-green-400" />
                                <span>Duration: {tour.duration} days</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaUsers className="text-yellow-300" />
                                <span>Max Guests: {tour.maxGuests}</span>
                            </div>
                        </div>
                        <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition">
                            BOOK NOW
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <section className="bg-[#fdfaf5] px-4 py-16 lg:px-24 text-[#1c1c1c]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
                    {/* Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <p className="text-[#777] uppercase text-xs tracking-widest">
                            {tour.address.toUpperCase()} • {tour.duration}-DAY TOUR
                        </p>
                        <p className="text-lg text-gray-700">{tour.description}</p>

                        {/* Included/Not Included */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Included</h3>
                                <ul className="space-y-2 text-sm">
                                    {tour.included.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <FaCheck className="text-green-600 mt-1" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Not Included</h3>
                                <ul className="space-y-2 text-sm">
                                    {tour.notIncluded.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <FaTimes className="text-red-400 mt-1" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Itinerary */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Itinerary</h3>
                            <div className="border-t border-[#ddd] divide-y divide-[#eee]">
                                {Array.isArray(tour.days) &&
                                    tour.days.map((item, index) => (
                                        <div key={item.id} className="py-4">
                                            <div
                                                className="flex items-center justify-between text-[#a56f45] font-semibold cursor-pointer"
                                                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                                            >
                                                <span>{item.name}</span>
                                                <span>{openIndex === index ? "—" : "+"}</span>
                                            </div>
                                            {openIndex === index && (
                                                <div className="mt-4 flex flex-col lg:flex-row gap-4">
                                                    <div className="text-sm text-gray-700 flex-1">{item.description}</div>
                                                    {item.image && (
                                                        <div className="relative w-full lg:w-64 h-40 rounded shadow overflow-hidden">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover"
                                                                loading="lazy"
                                                                unoptimized
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white border shadow">
                            <Image
                                src={tour.image}
                                alt="Tour image"
                                width={800}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 space-y-4">
                                <div className="text-sm text-gray-500 space-y-1">
                                    <div className="flex gap-2 items-center">
                                        <FaClock /> <span>{tour.duration} days</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <FaUsers /> <span>{tour.maxGuests} guests</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 line-through">$2500</p>
                                    <p className="text-2xl font-bold text-[#a56f45]">${tour.price}</p>
                                </div>
                                <button className="w-full bg-[#a56f45] text-white py-2 rounded hover:bg-[#8c5933] transition">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-100 text-center py-12">
                <h2 className="text-2xl font-bold mb-2">Call us to start planning your trip today</h2>
                <p className="mb-4">An unforgettable journey awaits. Customize it with our experts.</p>
                <p className="text-xl font-semibold">+250 736 173 331</p>
                <a href="/booking" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                    BOOK NOW
                </a>
            </section>
        </>
    );
}

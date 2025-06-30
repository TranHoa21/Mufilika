import Image from "next/image";

export default function AchievementsSection() {
    return (
        <section className="bg-[#eef0e6] py-16 px-4 md:px-20 text-[#1e1e1e]">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-start">
                {/* Text section */}
                <div>
                    <p className="uppercase text-sm tracking-wide text-[#a87c4f] mb-2">🎉 Celebrating success</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Sandtrail&apos;s proud achievements</h2>

                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <span className="text-3xl">🌵</span>
                            <div>
                                <p className="font-semibold text-lg">Best Desert Tour Provider</p>
                                <p className="text-sm text-gray-600">Desert Travel Magazine (2024)</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-3xl">🏎️</span>
                            <div>
                                <p className="font-semibold text-lg">Top Adventure Tourism</p>
                                <p className="text-sm text-gray-600">Global Travel Awards (2023)</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-3xl">🌙</span>
                            <div>
                                <p className="font-semibold text-lg">Certificate of Excellence</p>
                                <p className="text-sm text-gray-600">Traveler’s Choice (2022 & 2023)</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-3xl">🌍</span>
                            <div>
                                <p className="font-semibold text-lg">Most Eco-Friendly Tour</p>
                                <p className="text-sm text-gray-600">Sustainable Tourism Initiative (2022)</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Center Image + Box */}
                <div className="flex flex-col gap-6">
                    <Image
                        src="/images/Livingstone-Zambia.webp"
                        alt="Man in Desert"
                        width={600}
                        height={400}
                        className="object-cover w-full h-full rounded"
                    />

                    <div className="border border-[#b2b88e] p-6 bg-white text-sm">
                        <p className="font-semibold mb-2">What These Awards Mean to Us</p>
                        <p className="text-gray-600 mb-4">Each award is a testament to our passion and dedication.</p>
                        <button className="bg-[#9d6a44] text-white px-5 py-2 text-sm font-medium">
                            More Awards
                        </button>
                    </div>
                </div>

                {/* Right image */}
                <div>
                    <Image
                        src="/images/bg-center.webp"
                        alt="Woman playing in sand"
                        width={600}
                        height={800}
                        className="object-cover w-full h-full rounded"
                    />
                </div>
            </div>
        </section>
    );
}

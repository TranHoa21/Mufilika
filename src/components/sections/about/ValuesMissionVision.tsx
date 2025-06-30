import Image from 'next/image'

export default function ValuesMissionVision() {
    return (
        <section className="bg-[#3c1f19] text-white py-16 px-4 md:px-20">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="rounded-lg overflow-hidden">
                    <Image
                        src="/images/image.jpg"
                        alt="Desert Explorer"
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Text Content */}
                <div>
                    <p className="uppercase tracking-widest text-sm text-[#f6d7a7] mb-2">What drives us</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our values, mission & vision</h2>
                    <p className="text-[#e3c7b2] mb-6">
                        At Mufilika Tours and Safaris, we are driven by a deep passion for sharing the beauty and spirit of Africa with the world. Our values reflect our commitment to authentic, responsible, and unforgettable travel experiences:                    </p>
                    <div className="flex flex-wrap gap-4 mb-6 text-sm font-medium text-white">
                        <span className="flex items-center gap-2">✔️ Cultural Respect </span>
                        <span className="flex items-center gap-2">✔️ Conservation & Sustainability</span>
                        <span className="flex items-center gap-2">✔️ Guest-Centered Excellence</span>
                        <span className="flex items-center gap-2">✔️ Honesty & Integrity</span>
                    </div>
                    <div className="border-t border-[#ffffff22] pt-6 grid sm:grid-cols-2 gap-6">
                        {/* Mission */}
                        <div>
                            <div className="text-2xl mb-2">🏝 Mission</div>
                            <p className="text-[#e3c7b2] text-sm">
                                To provide unforgettable, authentic, and ethical travel experiences across Africa — connecting travelers with the land, wildlife, and cultures in meaningful ways while supporting conservation and local communities.                            </p>
                        </div>
                        {/* Vision */}
                        <div>
                            <div className="text-2xl mb-2">🏜 Vision</div>
                            <p className="text-[#e3c7b2] text-sm">
                                To become a leading name in African tourism — known for our integrity, sustainability, and commitment to enriching both travelers  lives and the regions we explore.                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

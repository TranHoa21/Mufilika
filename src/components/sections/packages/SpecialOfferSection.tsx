import Image from "next/image";

export default function SpecialOfferSection() {
    return (
        <section className="bg-[#44281b] text-white py-16 px-4 md:px-20">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-center">
                {/* Left image */}
                <div>
                    <Image
                        src="/images/images2.webp" // đặt đúng tên ảnh đã upload vào thư mục public
                        alt="Group Tour"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover rounded"
                    />
                </div>

                {/* Middle content */}
                <div className="text-center lg:text-left">
                    <p className="uppercase text-sm tracking-wide text-[#c9a789] mb-2">🎉 Special Offers</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
                        Save big on your next desert safari adventure
                    </h2>
                    <p className="text-[#e5c8b2] mb-6">
                        At Sandtrail, we love making your adventures more affordable with exclusive seasonal offers.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                            type="email"
                            placeholder="e.g. hello@deverust.com"
                            className="px-4 py-3 w-full sm:w-auto flex-1 bg-[#f1f3e7] text-black placeholder:text-gray-600 focus:outline-none"
                        />
                        <button className="bg-[#a56f45] text-white px-6 py-3 font-semibold hover:bg-[#8c5933] transition">
                            Get Offers
                        </button>
                    </div>
                </div>

                {/* Right image */}
                <div>
                    <Image
                        src="/images/South-Luangwa-National-Park.webp" // đặt đúng tên ảnh đã upload vào thư mục public
                        alt="Man using phone"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover rounded"
                    />
                </div>
            </div>
        </section>
    );
}

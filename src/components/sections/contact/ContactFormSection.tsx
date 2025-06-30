// components/ContactFormSection.tsx
import Image from "next/image";

export default function ContactFormSection() {
    return (
        <div className="bg-[#fdfaf4] px-4 py-10 flex justify-center">
            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 bg-white rounded-md overflow-hidden shadow-sm">
                {/* Left content */}
                <div className="bg-[#4b2e23] text-white px-10 py-12 flex flex-col justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-widest mb-4">Get in touch</p>
                        <h2 className="text-3xl font-semibold leading-snug mb-4">
                            We’re here to help you always
                        </h2>
                        <p className="text-[#d5cfc9]">
                            Whether you have questions, need assistance, or want to share feedback or
                            suggestions, our team is always ready to assist.
                        </p>
                    </div>
                    <div className="mt-8">
                        <Image
                            src="/images/image3.webp"
                            alt="People sitting"
                            width={500}
                            height={300}
                            className="rounded-md w-full h-auto object-cover"
                        />
                    </div>
                </div>

                {/* Right form */}
                <div className="p-10 bg-[#fdfaf4]">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="e. g. John Doe"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#a37d5e]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="e. g. hello@deverust.com"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#a37d5e]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Phone</label>
                                <input
                                    type="text"
                                    placeholder="e. g. +1 197 297 874"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#a37d5e]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Subject</label>
                                <input
                                    type="text"
                                    placeholder="e. g. Customizable Tour"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#a37d5e]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Message</label>
                            <textarea
                                placeholder="Write your message or questions here"
                                rows={5}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#a37d5e]"
                            ></textarea>
                        </div>

                        <div className="flex items-start gap-2">
                            <input type="checkbox" id="terms" className="mt-1" />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I have read and accepted terms and privacy
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#a37d5e] hover:bg-[#8d6951] text-white px-6 py-2 rounded-md"
                        >
                            Submit Button
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

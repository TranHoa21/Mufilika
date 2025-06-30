export default function CustomPackageSection() {
    return (
        <section className="bg-[#f0f2e7] py-16 px-4 md:px-20 text-[#1c1c1c]">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
                {/* Left Side */}
                <div>
                    <p className="uppercase text-sm tracking-wide text-[#a8764f] mb-2">🌼 Customizable Packages</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
                        Tailor your desert adventure with Sandtrail
                    </h2>
                    <p className="text-[#3b3b3b] mb-6 max-w-md">
                        That’s why we offer fully customizable packages, tailored to match your preferences and create an experience that’s truly your own.
                    </p>
                    <button className="bg-[#a56f45] text-white px-6 py-3 font-semibold hover:bg-[#8c5933] transition">
                        Book Now
                    </button>
                </div>

                {/* Right Side */}
                <div className="space-y-4">
                    {[
                        "Adventure Seeker’s Package",
                        "Romantic Desert Escape",
                        "Family-Friendly Safari",
                        "Luxury Upgrade",
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-start gap-3 border-b border-[#e5e5dc] pb-2"
                        >
                            <span className="text-[#a8764f]">✔</span>
                            <span className="font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Steps */}
            <div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
                {[
                    {
                        number: "01",
                        title: "Contact Us",
                        desc: "Share your preferences, group size, and special requests via our inquiry.",
                    },
                    {
                        number: "02",
                        title: "Plan Together",
                        desc: "Our team will design a personalized itinerary tailored to your needs.",
                    },
                    {
                        number: "03",
                        title: "Confirm & Enjoy",
                        desc: "Once you’re satisfied confirm your booking and prepare for an unforgettable experience.",
                    },
                ].map((step, idx) => (
                    <div
                        key={idx}
                        className="border border-[#a3b079] bg-[#f7f9f1] p-6 text-left"
                    >
                        <div className="text-4xl font-bold text-[#a56f45] mb-2">{step.number}</div>
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-[#3d3d3d]">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

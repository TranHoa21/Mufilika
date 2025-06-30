// components/Custom404.tsx

import Link from "next/link";

export default function Custom404() {
    return (
        <div className="min-h-screen bg-[#fdfaf4] flex items-center justify-center px-4">
            <div className="bg-[#422b21] text-white p-10 rounded-md max-w-xl w-full text-center relative">
                <div className="mb-2 text-sm tracking-widest uppercase font-semibold text-white/70 flex items-center justify-center gap-2">
                    <span>✼</span> Page Not Found
                </div>
                <h1 className="text-6xl font-bold mb-4">Error 404</h1>
                <p className="text-lg mb-8 text-white/90">
                    The page you are looking for might have been removed, had its name
                    changed or is temporarily unavailable.
                </p>
                <Link href="/">
                    <a className="bg-[#a37d5e] hover:bg-[#8a684d] transition-colors text-white font-semibold py-3 px-6 rounded-md shadow">
                        Bring Me To The Home
                    </a>
                </Link>
                {/* Optional: Background topography effect */}
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 pointer-events-none" />
            </div>
        </div>
    );
}

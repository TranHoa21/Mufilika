"use client"; // Component này chạy ở client

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Header />}
            {children}
            {!isAdminPage && <Footer />}
        </>
    );
}

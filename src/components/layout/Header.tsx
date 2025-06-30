'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-gradient-to-b from-white/90 to-transparent fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/">
          <div className="relative h-12 w-32">
            <Image
              src="/images/logo.png"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-800">
          <Link href="/" className="hover:text-[#14190f]">Home</Link>
          <Link href="/about" className="hover:text-[#14190f]">About us</Link>
          <Link href="/packages" className="hover:text-[#14190f]">Packages</Link>
          <Link href="/blog" className="hover:text-[#14190f]">Blog</Link>
          <Link href="/contact" className="hover:text-[#14190f]">Contact us</Link>
        </nav>

        {/* Book Now Button - Desktop */}
        <Link
          href="/book"
          className="hidden md:inline-block px-6 py-2 border border-gray-600 text-gray-800 hover:bg-[#14190f] hover:text-white rounded transition"
        >
          Book Now
        </Link>

        {/* Hamburger Menu - Mobile/Tablet */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-800"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3 text-sm font-medium text-gray-800">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block hover:text-[#14190f]">Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="block hover:text-[#14190f]">About us</Link>
          <Link href="/packages" onClick={() => setMenuOpen(false)} className="block hover:text-[#14190f]">Packages</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="block hover:text-[#14190f]">Blog</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-[#14190f]">Contact us</Link>
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="inline-block w-full text-center border border-gray-600 text-gray-800 hover:bg-[#14190f] hover:text-white rounded px-4 py-2 transition"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-zinc-200 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <Image
              src="/badhealth-logo.png"
              alt="BadHealth"
              width={40}
              height={40}
              className="rounded-lg"
              unoptimized
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-black hover:text-zinc-600 transition-colors [font-family:var(--font-google-sans)]"
            >
              Home
            </Link>
            <a
              href="/#about"
              className="text-sm font-medium text-black hover:text-zinc-600 transition-colors [font-family:var(--font-google-sans)]"
            >
              About
            </a>
            <Link
              href="/blog"
              className="text-sm font-medium text-black hover:text-zinc-600 transition-colors [font-family:var(--font-google-sans)]"
            >
              Blog
            </Link>

            {/* Download Link */}
            <a
              href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0B352B] px-4 py-2 text-sm font-medium text-white hover:bg-[#0e4a3f] transition-colors [font-family:var(--font-google-sans)]"
            >
              Download
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-black hover:text-zinc-600 transition-colors [font-family:var(--font-google-sans)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="/#about"
                className="text-sm font-medium text-black hover:text-zinc-600 transition-colors [font-family:var(--font-google-sans)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <Link
                href="/blog"
                className="text-sm font-medium text-black hover:text-zinc-600 transition-colors [font-family:var(--font-google-sans)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <a
                href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#0B352B] px-4 py-2 text-sm font-medium text-white hover:bg-[#0e4a3f] transition-colors text-center [font-family:var(--font-google-sans)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

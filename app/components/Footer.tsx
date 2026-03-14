"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/quiz")) return null;
  return (
    <footer className="border-t border-zinc-200 mt-auto bg-transparent">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <Image
                src="/badhealth-logo.png"
                alt="BadHealth"
                width={48}
                height={48}
                className="rounded-lg mb-4"
                unoptimized
              />
              <p className="text-sm text-black">
                Smart recipes for a healthier lifestyle.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-black hover:text-zinc-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="/#about" className="text-sm text-black hover:text-zinc-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-black hover:text-zinc-600 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Download */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">
                Download
              </h4>
              <a
                href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-black hover:text-zinc-600 transition-colors"
              >
                iOS App
              </a>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-sm text-black hover:text-zinc-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black hover:text-zinc-600 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 pt-8 border-t border-zinc-200">
            <div className="flex items-center justify-center gap-4">
              <p className="text-sm text-black">
                &copy; {new Date().getFullYear()} BadHealth. All rights reserved.
              </p>
              <Link href="/analytics" className="text-[10px] text-zinc-300 hover:text-zinc-500 transition-colors">
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

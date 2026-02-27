import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const googleSans = localFont({
  src: "./fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
  variable: "--font-google-sans",
});

const lora = localFont({
  src: [
    { path: "./fonts/Lora-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Lora-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Lora-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Lora-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./fonts/Lora-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Lora-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "./fonts/Lora-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Lora-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "BadHealth — Personalized Fridge Scan App for Families",
  description: "BadHealth scans your fridge and delivers personalized meal recommendations tailored to your health goals. Download the app today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${googleSans.variable} ${lora.variable} flex flex-col min-h-screen`}
      >
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

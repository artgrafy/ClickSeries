import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe AI - 맞춤형 레시피 검색",
  description: "사용자 요청 기반의 AI 레시피 생성 및 검색 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-base-100 pb-16 lg:pb-0`}
      >
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}

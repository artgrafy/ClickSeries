import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function MBTIPage() {
    return (
        <div className="min-h-screen bg-base-100 p-4">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/" className="btn btn-ghost btn-circle">
                    <ChevronLeft />
                </Link>
                <h1 className="text-2xl font-bold">Click MBTI</h1>
            </header>
            <main className="max-w-md mx-auto py-12 text-center">
                <div className="card bg-base-200 p-8 shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-base-content/50">콘텐츠 준비 중</h2>
                    <p className="text-base-content/30">나만의 성향 찾기 서비스, 곧 공개됩니다.</p>
                </div>
            </main>
        </div>
    );
}

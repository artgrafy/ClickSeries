import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function RecipePage() {
    return (
        <div className="min-h-screen bg-base-100 p-4">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/" className="btn btn-ghost btn-circle">
                    <ChevronLeft />
                </Link>
                <h1 className="text-2xl font-bold">Click Recipe</h1>
            </header>
            <main className="max-w-md mx-auto py-12 text-center">
                <div className="card bg-base-200 p-8 shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-base-content/50">콘텐츠 준비 중</h2>
                    <p className="text-base-content/30">AI 맞춤형 레시피 서비스가 준비 중입니다.</p>
                </div>
            </main>
        </div>
    );
}

import { Home, History, User, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe-area-inset-bottom z-50">
            <div className="max-w-md mx-auto grid grid-cols-4 h-16">
                <Link href="/" className="flex flex-col items-center justify-center space-y-1 text-primary">
                    <Home size={24} />
                    <span className="text-xs">홈</span>
                </Link>
                <Link href="/history" className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-primary transition-colors">
                    <History size={24} />
                    <span className="text-xs">기록</span>
                </Link>
                <Link href="/share" className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-primary transition-colors">
                    <Share2 size={24} />
                    <span className="text-xs">공유</span>
                </Link>
                <Link href="/profile" className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-primary transition-colors">
                    <User size={24} />
                    <span className="text-xs">내 정보</span>
                </Link>
            </div>
        </nav>
    );
}

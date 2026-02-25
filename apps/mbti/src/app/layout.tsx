import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { Zap, Share2, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: "ClickMBTI - 빠르고 정확한 나만의 성향 분석",
  description: "클릭 한 번으로 알아보는 나의 MBTI 유형! 퀵 스캔과 딥 다이브 모드로 더 정밀하게 분석해보세요.",
  keywords: ["MBTI", "성격테스트", "심리테스트", "ClickMBTI", "무료MBTI"],
  openGraph: {
    title: "ClickMBTI - 초고속 MBTI 진단",
    description: "로그인 없이 바로 시작하는 나만의 성향 분석 서비스",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="light">
      <body className="antialiased bg-slate-50 text-slate-900 font-sans min-h-screen">
        {/* PC 전용 배경 데코레이션 */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_50%)] from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 min-h-screen">

          {/* [PC] 좌측 컬럼: 브랜드 및 미션 */}
          <aside className="hidden lg:flex flex-col justify-center p-12 sticky top-0 h-screen">
            <div className="space-y-8">
              <div className="flex items-center space-x-3 text-primary">
                <Zap size={40} className="fill-current" />
                <span className="text-3xl font-black tracking-tighter italic">ClickMBTI</span>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight">
                  로그인 없이<br />
                  <span className="text-primary italic">1분 만에</span><br />
                  끝내는 성향 분석
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed break-keep">
                  불필요한 절차는 모두 제거했습니다.<br />
                  오직 당신의 성향에만 집중하는<br />
                  가장 빠른 MBTI 엔진을 경험하세요.
                </p>
              </div>
              <div className="flex items-center space-x-6 pt-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-800">12,584+</span>
                  <span className="text-sm text-gray-400 font-medium">오늘의 참여자</span>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-800">98%</span>
                  <span className="text-sm text-gray-400 font-medium">결과 정확도</span>
                </div>
              </div>
            </div>
          </aside>

          {/* [공통] 중앙 컬럼: 핵심 앱 영역 */}
          <main className="relative bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] min-h-screen lg:min-h-[90vh] lg:my-auto lg:rounded-[2.5rem] lg:border lg:border-slate-100 overflow-hidden">
            <div className="h-full overflow-y-auto hide-scrollbar pb-20 lg:pb-0">
              {children}
            </div>
          </main>

          {/* [PC] 우측 컬럼: 트렌드 및 홍보 */}
          <aside className="hidden lg:flex flex-col justify-center p-12 sticky top-0 h-screen">
            <div className="space-y-10">
              <div className="bg-slate-100 p-8 rounded-[2rem] space-y-6 border border-slate-200/50">
                <div className="flex items-center space-x-2 text-slate-800 font-bold">
                  <TrendingUp size={20} className="text-primary" />
                  <span>실시간 인기 성향</span>
                </div>
                <div className="space-y-3">
                  {['재기발랄한 ENFP', '용의주도한 INTJ', '대담한 ENTJ'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-slate-100 italic font-bold">
                      <span className="text-sm text-gray-600">{item}</span>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">HOT</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] text-white space-y-4">
                <div className="flex items-center space-x-2 font-bold">
                  <Share2 size={20} className="text-secondary" />
                  <span>바이럴 챌린지</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  "내 친구들 중 나랑 제일 잘 맞는 MBTI는 누구일까?"
                </p>
                <div className="pt-2">
                  <button className="w-full bg-white text-slate-900 font-black py-3 rounded-xl hover:bg-slate-100 transition-colors text-sm italic">
                    궁합 테스트 미리보기
                  </button>
                </div>
              </div>
            </div>
          </aside>

        </div>

        {/* 모바일 전용 하단 내비게이션 */}
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </body>
    </html>
  );
}

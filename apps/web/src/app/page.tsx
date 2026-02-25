import Link from "next/link";
import { Book, Brain, UtensilsCrossed, Database, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

async function getDbStatus() {
  try {
    const { error } = await supabase.from("_connection_test").select("*").limit(1);
    // 42P01: undefined_table (연결은 되었으나 테이블만 없는 상태도 성공으로 간주)
    if (error && error.code !== '42P01') return false;
    return true;
  } catch {
    return false;
  }
}

export default async function Home() {
  const isDbConnected = await getDbStatus();

  const apps = [
    {
      name: "Click Bible",
      description: "오늘의 성경 구절과 묵상",
      href: "/bible",
      icon: <Book className="w-10 h-10 text-primary" />,
      color: "bg-primary/10",
    },
    {
      name: "Click MBTI",
      description: "재미로 보는 나만의 MBTI 테스트",
      href: "/mbti",
      icon: <Brain className="w-10 h-10 text-secondary" />,
      color: "bg-secondary/10",
    },
    {
      name: "Click Recipe",
      description: "AI가 추천하는 오늘의 맞춤 레시피",
      href: "/recipe",
      icon: <UtensilsCrossed className="w-10 h-10 text-accent" />,
      color: "bg-accent/10",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-16 relative">
          {/* DB 상태 표시배지 */}
          <div className="absolute top-0 right-0">
            <div className={`badge badge-outline gap-2 py-3 px-4 ${isDbConnected ? 'badge-success text-success' : 'badge-error text-error'}`}>
              <Database size={14} />
              <span className="text-[10px] font-bold tracking-tighter uppercase">
                Supabase: {isDbConnected ? 'Connected' : 'Disconnected'}
              </span>
              {isDbConnected ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
            </div>
          </div>

          <h1 className="text-5xl font-bold text-base-content mb-4 tracking-tight">
            Click <span className="text-primary italic">Series</span>
          </h1>
          <p className="text-xl text-base-content/70">
            삶의 즐거움을 더하는 스마트 서비스 시리즈
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apps.map((app) => (
            <Link key={app.name} href={app.href} className="group">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-primary/20 h-full overflow-hidden">
                <div className={`${app.color} p-8 flex justify-center items-center group-hover:scale-105 transition-transform duration-300`}>
                  {app.icon}
                </div>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-2xl font-bold">{app.name}</h2>
                  <p className="text-base-content/70">{app.description}</p>
                  <div className="card-actions mt-4">
                    <button className="btn btn-primary btn-sm group-hover:btn-active">
                      시작하기
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-20 text-center text-base-content/50 text-sm">
          © 2026 ClickSeries. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

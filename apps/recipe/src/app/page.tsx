"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Flame, Clock, Star } from "lucide-react";
import { handleRecipeSearch } from "@/app/actions/recipe";

export default function Home() {
  const [query, setQuery] = useState("");
  const [extra, setExtra] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const popularRecipes = [
    {
      id: "1",
      title: "김치찌개",
      image: "https://images.unsplash.com/photo-1582910814790-2e7a477b4d2c?q=80&w=400&h=300&fit=crop",
      time: "30분",
      difficulty: "쉬움",
      rating: 4.8,
    },
    {
      id: "2",
      title: "불고기",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400&h=300&fit=crop",
      time: "45분",
      difficulty: "보통",
      rating: 4.9,
    },
    {
      id: "3",
      title: "떡볶이",
      image: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?q=80&w=400&h=300&fit=crop",
      time: "20분",
      difficulty: "쉬움",
      rating: 4.7,
    },
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const result = await handleRecipeSearch(query, extra);
      if (result.success && result.data) {
        router.push(`/recipe/${result.data.recipe_id}?status=${result.status}`);
      } else {
        alert(result.error || "레시피를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Section with Search */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          무엇을 <span className="text-primary">요리</span>할까요?
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          AI가 당신의 취향에 딱 맞는 레시피를 만들어 드립니다.
        </p>

        <div className="card bg-base-100 shadow-xl border border-base-200 mt-8">
          <div className="card-body p-6 space-y-4 text-left">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">요리 이름</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="예: 김치찌개, 파스타, 비빔밥..."
                  className="input input-bordered w-full pl-10 h-12"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">추가 요청사항 (선택)</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="예: 맵지 않게, 채식용으로, 냉장고의 두부 활용..."
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                disabled={isLoading}
              ></textarea>
            </div>

            <button
              className={`btn btn-primary w-full h-12 font-bold text-lg mt-4 ${isLoading ? 'loading' : ''}`}
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'AI가 레시피 구성 중...' : '레시피 찾기'}
            </button>
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="text-orange-500" />
          <h2 className="text-2xl font-bold">인기 레시피</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRecipes.map((recipe) => (
            <div key={recipe.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-base-200">
              <figure className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-xl">{recipe.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-base-content/60">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <div className="badge badge-outline badge-md">{recipe.difficulty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

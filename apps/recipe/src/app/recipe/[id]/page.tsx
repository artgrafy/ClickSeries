"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Clock, ChefHat, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RecipeDetail() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const status = searchParams.get('status'); // 'db' or 'new'

    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

    useEffect(() => {
        async function fetchRecipe() {
            const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .eq('recipe_id', id)
                .single();

            if (data) {
                setRecipe(data);
            }
            setLoading(false);
        }
        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-muted-foreground">레시피를 불러오는 중입니다...</p>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="text-center py-20 space-y-4">
                <h2 className="text-2xl font-bold">레시피를 찾을 수 없습니다.</h2>
                <Link href="/" className="btn btn-primary">홈으로 돌아가기</Link>
            </div>
        );
    }

    const toggleIngredient = (index: number) => {
        setCheckedIngredients(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="pb-10 animate-in slide-in-from-bottom-4 duration-500">
            <Link href="/" className="btn btn-ghost btn-sm mb-4 gap-2">
                <ArrowLeft size={16} /> 홈으로
            </Link>

            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden aspect-video shadow-xl mb-6">
                <img
                    src={recipe.image_url || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop`}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-extrabold mb-2">{recipe.title}</h1>
                            <div className="flex gap-2">
                                {recipe.tags?.map((tag: string) => (
                                    <span key={tag} className="badge badge-primary badge-outline text-xs">#{tag}</span>
                                ))}
                            </div>
                        </div>
                        {status && (
                            <div className={`badge ${status === 'new' ? 'badge-secondary' : 'badge-accent'} font-bold`}>
                                {status === 'new' ? '✨ 새로 생성됨' : '📂 DB에서 불러옴'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary Chips */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-base-200 rounded-2xl p-4 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-xl text-primary">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-base-content/60">소요 시간</p>
                        <p className="font-bold">{recipe.cooking_time || "정보 없음"}</p>
                    </div>
                </div>
                <div className="bg-base-200 rounded-2xl p-4 flex items-center gap-3">
                    <div className="bg-secondary/10 p-2 rounded-xl text-secondary">
                        <ChefHat size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-base-content/60">난이도</p>
                        <p className="font-bold">{recipe.difficulty || "정보 없음"}</p>
                    </div>
                </div>
            </div>

            {/* Ingredients Section */}
            <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-success" />
                    <h2 className="text-2xl font-bold">준비 재료</h2>
                </div>
                <div className="card bg-base-100 border border-base-200 shadow-sm">
                    <div className="card-body p-4 space-y-1">
                        {recipe.ingredients?.map((ing: any, idx: number) => (
                            <label
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-xl hover:bg-base-200 cursor-pointer transition-colors active:scale-95"
                                onClick={() => toggleIngredient(idx)}
                            >
                                <div className="flex items-center gap-3 min-h-[44px]">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        checked={!!checkedIngredients[idx]}
                                        readOnly
                                    />
                                    <span className={`text-lg font-medium ${checkedIngredients[idx] ? 'line-through text-base-content/40' : ''}`}>
                                        {ing.item}
                                    </span>
                                </div>
                                <span className="text-base-content/60 font-medium">{ing.amount}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instructions Section */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center font-bold">?</div>
                    <h2 className="text-2xl font-bold">조리 순서</h2>
                </div>
                <div className="space-y-4">
                    {recipe.steps?.map((step: any, idx: number) => (
                        <div key={idx} className="card bg-base-100 border border-base-200 shadow-sm overflow-hidden">
                            <div className="flex gap-4 p-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-base-200 flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </div>
                                <div className="flex-grow pt-1 leading-relaxed text-lg">
                                    {step.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

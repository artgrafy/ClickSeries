"use server";

import { supabase } from "@/lib/supabase";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function handleRecipeSearch(title: string, extra: string = "") {
    try {
        // 1. 1차 쿼리: 로컬 DB에서 해당 요리명이 있는지 확인
        const { data: existingRecipe, error: dbError } = await supabase
            .from('recipes')
            .select('*')
            .ilike('title', `%${title}%`)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (existingRecipe) {
            console.log("DB에서 레시피를 발견했습니다.");
            return { success: true, data: existingRecipe, status: 'db' };
        }

        // 2. 데이터가 없을 경우, 웹 검색 및 AI 정형화 (시뮬레이션)
        // 실제 운영 시에는 Serper API나 Google Search API 등을 연동해야 합니다.
        console.log("새로운 레시피를 생성합니다...");

        const prompt = `
      사용자가 '${title}' 요리 레시피를 찾고 있습니다. 
      추가 요청사항: '${extra}'
      
      이 정보를 바탕으로 정형화된 레시피 정보를 JSON으로 생성해주세요.
      반드시 다음 형식을 지켜주세요:
      {
        "title": "요리 이름",
        "tags": ["키워드1", "키워드2"],
        "ingredients": [
          {"item": "재료명", "amount": "수량/단위"}
        ],
        "steps": [
          {"order": 1, "desc": "조리 설명"}
        ],
        "cooking_time": "예: 30분",
        "difficulty": "쉬움/보통/어려움"
      }
      응답은 반드시 한국어로 작성해주세요.
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "당신은 요리 전문가이자 레시피 정형화 도우미입니다." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");

        // 3. DB에 즉시 저장 (Upsert)
        const { data: newRecipe, error: insertError } = await supabase
            .from('recipes')
            .insert({
                title: aiResponse.title,
                tags: aiResponse.tags,
                ingredients: aiResponse.ingredients,
                steps: aiResponse.steps,
                source: 'web_search', // 또는 'user_input'
                cooking_time: aiResponse.cooking_time,
                difficulty: aiResponse.difficulty,
            })
            .select()
            .single();

        if (insertError) throw insertError;

        return { success: true, data: newRecipe, status: 'new' };
    } catch (error) {
        console.error("Search error:", error);
        return { success: false, error: "레시피를 가져오는 중 오류가 발생했습니다." };
    }
}

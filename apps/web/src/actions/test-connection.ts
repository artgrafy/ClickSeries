import { supabase } from "@/lib/supabase";

export async function checkSupabaseConnection() {
    try {
        const { data, error } = await supabase.from("_connection_test").select("*").limit(1);

        // 테이블이 없더라도 에러 메시지가 'PGRST116' (no rows) 또는 '42P01' (undefined table)이면 
        // 연결 자체는 성사된 것입니다.
        if (error && error.code !== '42P01') {
            return { success: false, message: error.message };
        }

        return { success: true, message: "연결 성공" };
    } catch (err) {
        return { success: false, message: "연결 실패" };
    }
}

'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, Question } from '@/data/questions';
import { ChevronLeft, Zap, Search } from 'lucide-react';
import Link from 'next/link';

function TestContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const mode = searchParams.get('mode') || 'quick';

    const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    });
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        // 모드에 따라 질문 필터링
        const filtered = mode === 'quick'
            ? questions.filter(q => q.isQuickScan)
            : questions;
        setCurrentQuestions(filtered);
    }, [mode]);

    const handleAnswer = (value: string) => {
        const newAnswers = { ...answers, [value]: answers[value as keyof typeof answers] + 1 };
        setAnswers(newAnswers);

        if (currentIndex < currentQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            finishTest(newAnswers);
        }
    };

    const finishTest = (finalAnswers: typeof answers) => {
        setIsFinished(true);

        // MBTI 계산
        const mbti = [
            finalAnswers.E >= finalAnswers.I ? 'E' : 'I',
            finalAnswers.S >= finalAnswers.N ? 'S' : 'N',
            finalAnswers.T >= finalAnswers.F ? 'T' : 'F',
            finalAnswers.J >= finalAnswers.P ? 'J' : 'P',
        ].join('');

        // 로딩 효과 체감을 위해 약간의 지연 후 결과 페이지로 이동
        setTimeout(() => {
            router.push(`/result?mbti=${mbti}`);
        }, 2000);
    };

    if (currentQuestions.length === 0) return null;

    if (isFinished) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full mb-8"
                />
                <h2 className="text-2xl font-bold mb-2 animate-pulse">당신의 성향을 분석 중입니다...</h2>
                <p className="text-gray-500">잠시만 기다려주세요!</p>
            </div>
        );
    }

    const currentQuestion = currentQuestions[currentIndex];
    const progress = ((currentIndex + 1) / currentQuestions.length) * 100;

    return (
        <div className="px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/" className="p-2 -ml-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
                    {mode === 'quick' ? <Zap size={14} className="text-primary" /> : <Search size={14} className="text-secondary" />}
                    <span>{mode === 'quick' ? 'Quick Scan' : 'Deep Dive'}</span>
                </div>
                <div className="text-sm font-bold text-primary">
                    {currentIndex + 1} <span className="text-gray-300">/</span> {currentQuestions.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full mb-12 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary"
                />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[400px] flex flex-col justify-center"
                >
                    <div className="mb-10">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded mb-4">
                            Q{currentIndex + 1}
                        </span>
                        <h2 className="text-2xl font-bold leading-tight break-keep">
                            {currentQuestion.text}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option.value)}
                                className="w-full p-6 text-left bg-white border-2 border-slate-100 rounded-2xl hover:border-primary hover:bg-primary/5 active:scale-95 transition-all text-lg font-medium shadow-sm"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function TestPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        }>
            <TestContent />
        </Suspense>
    );
}

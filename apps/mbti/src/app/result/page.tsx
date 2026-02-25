'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { mbtiResults } from '@/data/mbtiTypes';
import { Share2, Download, RefreshCw, Trophy, ChevronRight, Loader2, X, Copy, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

function ResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const mbtiParam = searchParams.get('mbti');
    const mbti = (mbtiParam || 'ISTJ').toUpperCase();
    const result = mbtiResults[mbti];

    useEffect(() => {
        if (result) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
    }, [result]);

    // [최종 병기 명령] 이미지 캡처 후 DaisyUI 모달 열기
    const handleOpenCaptureModal = async () => {
        if (!cardRef.current || isProcessing) return;

        setIsProcessing(true);

        try {
            const { toPng } = await import('html-to-image');

            // 브라우저 호환성을 극대화한 고화질 PNG 생성
            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                pixelRatio: 2.5,
                backgroundColor: '#ffffff',
            });

            setCapturedUrl(dataUrl);
            setIsModalOpen(true); // DaisyUI 모달 활성화
        } catch (err) {
            console.error('Capture failed:', err);
            alert('이미지 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsProcessing(false);
        }
    };

    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    const shareToKakao = () => {
        alert('카카오톡 공유 기능 연동 중입니다.');
    };

    if (!result) return <div className="p-20 text-center">Loading...</div>;

    const charEmojiMap = ['💜', '💚', '💙', '💛', '🧡', '💖', '🤍', '🤎', '🔥', '✨', '🛠️', '🧠', '⚖️', '🎙️', '🤝', '👑'];

    return (
        <div className="px-6 py-12 flex flex-col items-center max-w-md mx-auto min-h-screen relative font-sans">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-primary font-black mb-1 tracking-[0.4em] text-[10px] uppercase opacity-50 italic">Personal DNA Profile</p>
                    <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter uppercase italic">{result.type}</h1>
                    <div className="inline-block bg-primary/5 px-6 py-1.5 rounded-full border border-primary/10">
                        <span className="text-primary font-bold text-sm tracking-tight">{result.title}</span>
                    </div>
                </div>

                {/* 📋 Result Card (Standard Design) */}
                <div className="relative mb-12 aspect-square w-full shadow-2xl rounded-[3rem] overflow-hidden group">
                    <div
                        ref={cardRef}
                        className={`relative h-full bg-gradient-to-br ${result.color || 'from-primary to-indigo-600'} p-12 text-white flex flex-col justify-between w-full`}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/3" />

                        <div className="relative z-10 flex flex-col h-full pointer-events-none text-center">
                            <div className="flex justify-between items-start text-left">
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {result.keywords.map((kw: string, idx: number) => (
                                            <span key={idx} className="bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 shadow-sm">#{kw}</span>
                                        ))}
                                    </div>
                                    <h2 className="text-2xl font-black leading-tight italic tracking-tight drop-shadow-md">{result.title}</h2>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl">
                                    <Trophy size={26} />
                                </div>
                            </div>

                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-[10.5rem] leading-none filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.45)] group-hover:scale-110 transition-transform duration-700 ease-out">
                                    {charEmojiMap[result.charIdx || 0]}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[18px] leading-relaxed font-black break-keep drop-shadow-md px-2 italic">"{result.description}"</p>
                                <div className="border-t border-white/25 pt-6 flex items-center justify-between opacity-80 font-bold text-left italic uppercase tracking-tighter">
                                    <span className="text-[10px]">ClickMBTI Analysis</span>
                                    <span className="text-[9px] tracking-widest opacity-60">success365.kr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mb-16 w-full px-2">
                    <button
                        onClick={handleOpenCaptureModal}
                        disabled={isProcessing}
                        className={`w-full flex items-center justify-center space-x-3 p-8 rounded-[2.5rem] transition-all active:scale-95 shadow-2xl ${isProcessing ? 'bg-slate-100 text-slate-300' : 'bg-primary text-white shadow-primary/30'}`}
                    >
                        {isProcessing ? (
                            <Loader2 size={24} className="animate-spin" />
                        ) : (
                            <Download size={24} />
                        )}
                        <span className="text-lg font-black italic tracking-tight underline underline-offset-4 decoration-2 tracking-tighter">이미지 저장 / 공유하기</span>
                    </button>
                </div>

                <button
                    onClick={() => router.push('/')}
                    className="w-full text-slate-400 p-6 font-bold hover:text-slate-600 transition-colors uppercase text-[10px] tracking-[0.4em] italic mb-10"
                >
                    <RefreshCw size={14} className="inline mr-2" />
                    RE-START SYSTEM
                </button>

                {/* 📷 [최종 병기 명령] DaisyUI 기반 이미지 저장 모달 */}
                <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                    <div className="modal-box max-w-sm p-4 rounded-[3rem] bg-white border-none shadow-2xl overflow-hidden relative">
                        {/* 닫기 버튼 */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="btn btn-sm btn-circle absolute right-4 top-4 bg-slate-100 border-none hover:bg-slate-200 text-slate-500 z-50"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex flex-col items-center pt-8 pb-4">
                            <h3 className="font-black text-xl text-slate-900 mb-6 tracking-tighter">저장 준비 완료!</h3>

                            {/* [가이드 준수] 반응형 이미지 */}
                            {capturedUrl && (
                                <div className="w-full relative shadow-xl rounded-[2.5rem] overflow-hidden border border-slate-50 mb-6">
                                    <img
                                        src={capturedUrl}
                                        alt="Result Card Export"
                                        className="w-full h-auto"
                                        onContextMenu={(e) => e.stopPropagation()}
                                    />
                                </div>
                            )}

                            {/* [가이드 준수] 강조된 안내 문구 */}
                            <div className="w-full text-center space-y-2 mb-8 px-2">
                                <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-2xl border border-yellow-200">
                                    <p className="font-black text-sm break-keep">이미지를 길게 누르거나 우클릭하여<br />사진첩에 저장하세요</p>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold tracking-tight">브라우저 보안 제약 없는 100% 안전한 방식입니다.</p>
                            </div>

                            {/* 공유 및 복사 버튼 조합 */}
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <button
                                    onClick={shareToKakao}
                                    className="btn btn-primary rounded-2xl flex-1 font-black text-xs h-14 bg-[#FAE100] border-none text-slate-900 hover:bg-[#F7E600]"
                                >
                                    <Share2 size={16} />
                                    <span>카톡 공유</span>
                                </button>
                                <button
                                    onClick={copyLink}
                                    className={`btn rounded-2xl flex-1 font-black text-xs h-14 border-none text-white ${copySuccess ? 'btn-success' : 'bg-slate-900 hover:bg-slate-800'}`}
                                >
                                    {copySuccess ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                    <span>{copySuccess ? '복사됨' : '링크 복사'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* 모달 밖 클릭 시 닫기 (백드롭) */}
                    <form method="dialog" className="modal-backdrop bg-slate-900/80 backdrop-blur-sm">
                        <button onClick={() => setIsModalOpen(false)}>close</button>
                    </form>
                </div>

            </motion.div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-primary" /></div>}>
            <ResultWrapper />
        </Suspense>
    );
}

function ResultWrapper() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    return isClient ? <ResultContent /> : null;
}

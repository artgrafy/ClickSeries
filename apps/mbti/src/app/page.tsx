'use client';

import { motion } from 'framer-motion';
import { Zap, Search, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    // 실제로는 Supabase 등에서 가져오겠지만, 데모를 위해 가짜 숫자 애니메이션
    setTotalParticipants(12584);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="px-6 py-12 flex flex-col items-center">
      {/* Hero Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-primary/30"
      >
        <Zap className="text-white w-12 h-12 fill-current" />
      </motion.div>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-extrabold text-center mb-4 tracking-tight"
      >
        <span className="text-primary">Click</span>MBTI
      </motion.h1>

      <motion.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 text-center mb-10 text-lg"
      >
        가장 빠르고 정확한<br />나만의 성향 분석 엔진
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full mb-12"
      >
        <Users size={16} className="text-gray-400" />
        <span className="text-sm font-medium text-gray-600">
          현재 <span className="text-primary font-bold">{totalParticipants.toLocaleString()}</span>명 참여 중
        </span>
      </motion.div>

      {/* Mode Selection */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full space-y-4"
      >
        <Link href="/test?mode=quick" className="block w-full">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-white border-2 border-primary/10 hover:border-primary p-6 rounded-2xl shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <Zap size={24} className="text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">⚡ 퀵 스캔 (8문항)</h3>
                  <p className="text-sm text-gray-400">바쁜 당신을 위한 1분 핵심 진단</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        </Link>

        <Link href="/test?mode=deep" className="block w-full">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-white border-2 border-slate-100 hover:border-secondary p-6 rounded-2xl shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary/10 p-3 rounded-xl group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Search size={24} className="text-secondary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">🔍 딥 다이브 (20문항)</h3>
                  <p className="text-sm text-gray-400">정밀 분석이 필요할 때 (추천)</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-secondary transition-colors" />
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Footer Info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-xs text-gray-400 text-center"
      >
        © 2026 ClickMBTI. All rights reserved.<br />
        로그인 없이 익명으로 안전하게 진행됩니다.
      </motion.p>
    </div>
  );
}

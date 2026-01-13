"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Search, GraduationCap, UserCircle, LogOut } from "lucide-react";
import useStore from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isAdmin, logout } = useStore();
  const router = useRouter();

  const containerAnimations = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnimations = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="p-6 flex justify-between items-center glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Leaf className="text-primary h-8 w-8" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-800">
            농비게이션
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <UserCircle className="w-5 h-5" />
                <span>{user.displayName || user.email} {isAdmin && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">관리자</span>}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                title="로그아웃"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                로그인
              </button>
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerAnimations}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.h1 variants={itemAnimations} className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
            성공 농사를 위한<br />
            <span className="text-primary">최고의 파트너</span>
          </motion.h1>

          <motion.p variants={itemAnimations} className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed break-keep">
            팜한농의 우수한 비료 제품 정보부터 맞춤형 시비 처방,
            그리고 매일 성장하는 비료 지식까지. 농비게이션이 함께합니다.
          </motion.p>

          <motion.div variants={itemAnimations} className="grid md:grid-cols-2 gap-6 pt-12">
            <Link href="/db">
              <div className="group relative overflow-hidden bg-white p-8 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Search className="w-32 h-32 text-primary" />
                </div>
                <div className="relative z-10 flex flex-col items-start text-left h-full">
                  <div className="p-3 bg-blue-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                    <Search className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">비료 지식 백과</h3>
                  <p className="text-gray-500 mb-8 flex-grow break-keep">
                    작물별, 시기별(기비/추비) 최적의 비료를 검색하고 상세한 사용법을 확인하세요.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    제품 검색하기 <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/learn">
              <div className="group relative overflow-hidden bg-white p-8 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap className="w-32 h-32 text-emerald-600" />
                </div>
                <div className="relative z-10 flex flex-col items-start text-left h-full">
                  <div className="p-3 bg-emerald-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">일일 학습 & AI 멘토</h3>
                  <p className="text-gray-500 mb-8 flex-grow break-keep">
                    비료 퀴즈로 지식을 쌓고, 궁금한 점은 24시간 AI 전문가에게 물어보세요.
                  </p>
                  <div className="flex items-center text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform">
                    지금 시작하기 <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

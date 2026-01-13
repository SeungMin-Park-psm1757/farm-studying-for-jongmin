"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useStore from "@/store/useStore";
import { motion } from "framer-motion";
import { Leaf, Lock, User, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const { setUser, setIsAdmin } = useStore();
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            setUser(result.user as any); // Type cast for now
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (isAdminMode) {
            if (email === "admin" && password === "1") {
                setUser({ email: "admin@farmhannong.com", displayName: "관리자", isAdmin: true } as any);
                setIsAdmin(true);
                router.push("/");
                return;
            } else {
                setError("관리자 아이디 또는 비밀번호가 잘못되었습니다.");
                setLoading(false);
                return;
            }
        }

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user as any);
            router.push("/");
        } catch (err: any) {
            console.error(err);
            setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden glass"
            >
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Leaf className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                        {isAdminMode ? "관리자 로그인" : "환영합니다"}
                    </h2>
                    <p className="text-center text-gray-500 mb-8 break-keep">
                        {isAdminMode ? "시스템 관리를 위해 로그인하세요" : "농비게이션과 함께 비료 전문가가 되어보세요"}
                    </p>

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">
                                {isAdminMode ? "아이디" : "이메일"}
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type={isAdminMode ? "text" : "email"}
                                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder={isAdminMode ? "admin" : "name@example.com"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">비밀번호</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder={isAdminMode ? "1" : "••••••••"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {loading ? "로그인 중..." : "로그인"}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {!isAdminMode && (
                        <>
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">또는</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                                Google로 계속하기
                            </button>
                        </>
                    )}

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsAdminMode(!isAdminMode)}
                            className="text-xs text-gray-400 hover:text-primary transition-colors"
                        >
                            {isAdminMode ? "일반 사용자 로그인으로 전환" : "관리자 로그인 (빠른 시연용)"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

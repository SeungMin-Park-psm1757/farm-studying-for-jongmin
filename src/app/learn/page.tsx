"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageSquare, Send, CheckCircle2, XCircle, RefreshCcw, ArrowLeft, ArrowRight, Bot, User } from "lucide-react";
import Link from "next/link";
import { askGemini } from "@/lib/gemini";

// Mock Quiz Data
const QUIZZES = [
    {
        id: 1,
        question: "고추 재배 시 웃거름(추비)으로 가장 적합한 성분 비율은?",
        options: ["20-10-10", "15-5-20 (NK비료)", "4-2-1", "비료를 주지 않는다"],
        correctIndex: 1,
        explanation: "고추는 생육 후기로 갈수록 칼륨(K) 요구량이 높아지므로 질소와 칼륨 위주의 NK 비료가 웃거름으로 적합합니다."
    },
    {
        id: 2,
        question: "'한번에측조' 비료의 가장 큰 장점은 무엇인가요?",
        options: ["가격이 매우 저렴하다", "이앙과 동시에 처리하여 수확 때까지 비료 효과가 지속된다", "물에 녹여서 사용하는 비료다", "모든 밭작물에 사용 가능하다"],
        correctIndex: 1,
        explanation: "한번에측조는 100% 코팅된 완효성 비료로, 이앙 시 측조시비기를 통해 한 번 처리하면 수확기까지 양분이 공급되어 추비(이삭거름) 노력을 절감해줍니다."
    },
    {
        id: 3,
        question: "다음 중 '완효성 비료(CRF)'의 특징이 아닌 것은?",
        options: ["비료 성분이 천천히 녹아나온다", "노동력을 절감할 수 있다", "환경 오염을 줄일 수 있다", "효과가 즉시 나타나고 1주일을 넘기지 않는다"],
        correctIndex: 3,
        explanation: "완효성 비료는 성분이 서서히 용출되므로 비효가 오랫동안 지속되는 것이 특징입니다. 즉각적인 효과 후 빨리 사라지는 속효성 비료와 대조됩니다."
    },
    {
        id: 4,
        question: "팜한농의 친환경 광분해 코팅 기술의 이름은?",
        options: ["에코뮬라 (Ecomula)", "스마트팜", "그린키퍼", "바이오솔루션"],
        correctIndex: 0,
        explanation: "에코뮬라(Ecomula)는 팜한농이 개발한 광분해 완효성 비료 기술로, 수확 후 피복 물질이 햇빛에 의해 분해되어 토양 오염을 방지합니다."
    }
];

export default function LearnPage() {
    const [activeTab, setActiveTab] = useState<"quiz" | "chat">("quiz");

    // Quiz State
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Chat State
    const [messages, setMessages] = useState<{ role: "user" | "model", text: string }[]>([
        { role: "model", text: "안녕하세요! 팜한농 비료 전문가 AI입니다.\n비료 사용법, 병해충 상담, 제품 추천 등 무엇이든 물어보세요." }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (index: number) => {
        if (selectedOption !== null) return; // Prevent re-selection
        setSelectedOption(index);
        const correct = index === QUIZZES[currentQuiz].correctIndex;
        setIsCorrect(correct);
    };

    const nextQuiz = () => {
        if (currentQuiz < QUIZZES.length - 1) {
            setCurrentQuiz(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            alert("오늘의 퀴즈를 모두 풀었습니다! 참 잘했어요.");
            setCurrentQuiz(0);
            setSelectedOption(null);
            setIsCorrect(null);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const newMsg = { role: "user" as const, text: inputMessage };
        setMessages(prev => [...prev, newMsg]);
        setInputMessage("");
        setIsLoading(true);

        const response = await askGemini(inputMessage);

        setMessages(prev => [...prev, { role: "model", text: response }]);
        setIsLoading(false);
    };

    // Scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-10 flex-none">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-800">일일 학습 & AI 상담</h1>
                    </div>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab("quiz")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'quiz' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
                        >
                            퀴즈
                        </button>
                        <button
                            onClick={() => setActiveTab("chat")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'chat' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
                        >
                            AI 전문가
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-3xl mx-auto w-full px-4 py-6">
                <AnimatePresence mode="wait">
                    {activeTab === "quiz" ? (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="h-full flex flex-col justify-center"
                        >
                            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
                                <div className="text-sm font-bold text-primary mb-4 tracking-wider uppercase">오늘의 퀴즈 {currentQuiz + 1}</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed break-keep">
                                    {QUIZZES[currentQuiz].question}
                                </h2>

                                <div className="space-y-3">
                                    {QUIZZES[currentQuiz].options.map((option, index) => {
                                        let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
                                        if (selectedOption === null) {
                                            btnClass += "border-gray-100 hover:border-primary/50 hover:bg-green-50 text-gray-700";
                                        } else if (index === QUIZZES[currentQuiz].correctIndex) {
                                            btnClass += "border-green-500 bg-green-50 text-green-700";
                                        } else if (index === selectedOption) {
                                            btnClass += "border-red-500 bg-red-50 text-red-700";
                                        } else {
                                            btnClass += "border-gray-100 text-gray-400 opacity-50";
                                        }

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleOptionClick(index)}
                                                disabled={selectedOption !== null}
                                                className={btnClass}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span>{option}</span>
                                                    {selectedOption !== null && index === QUIZZES[currentQuiz].correctIndex && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                                    {selectedOption !== null && index === selectedOption && index !== QUIZZES[currentQuiz].correctIndex && <XCircle className="w-5 h-5 text-red-600" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {selectedOption !== null && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 p-4 bg-gray-50 rounded-xl"
                                    >
                                        <p className="text-gray-700 font-medium mb-2">해설:</p>
                                        <p className="text-gray-600 text-sm leading-relaxed break-keep">{QUIZZES[currentQuiz].explanation}</p>
                                        <button
                                            onClick={nextQuiz}
                                            className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition w-full flex items-center justify-center gap-2"
                                        >
                                            다음 문제 <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                        >
                            <div className="flex-grow overflow-y-auto p-6 space-y-4">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user'
                                                ? 'bg-primary text-white rounded-tr-none'
                                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                            }`}>
                                            <div className="flex items-center gap-2 text-xs opacity-70 mb-1">
                                                {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                                                <span>{msg.role === 'user' ? '나' : 'AI 팜한농 전문가'}</span>
                                            </div>
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-keep">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-4 border-t bg-gray-50">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        placeholder="예: 고추 웃거름은 언제 주는 게 좋나요?"
                                        className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !inputMessage.trim()}
                                        className="p-3 bg-primary text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

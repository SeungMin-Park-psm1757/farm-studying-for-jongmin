"use client";

import { useState } from "react";
import { fertilizers, Fertilizer } from "@/data/fertilizers";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Droplet, Sprout, Leaf, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FertilizerDB() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSeason, setSelectedSeason] = useState<"All" | "Basal" | "Top">("All");
    const [selectedCrop, setSelectedCrop] = useState<string>("All");

    // Get unique crops
    const allCrops = Array.from(new Set(fertilizers.flatMap(f => f.crops)));

    const filteredFertilizers = fertilizers.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.type.includes(searchTerm);
        const matchesSeason = selectedSeason === "All" || f.season === selectedSeason;
        const matchesCrop = selectedCrop === "All" || f.crops.includes(selectedCrop);
        return matchesSearch && matchesSeason && matchesCrop;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-800">비료 지식 백과</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Search & Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="제품명, 작물, 또는 비료 특징을 검색해보세요..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <select
                                className="bg-transparent outline-none text-sm text-gray-700 font-medium"
                                value={selectedSeason}
                                onChange={(e) => setSelectedSeason(e.target.value as any)}
                            >
                                <option value="All">사용 시기 전체</option>
                                <option value="Basal">밑거름 (기비)</option>
                                <option value="Top">웃거름 (추비)</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                            <Sprout className="w-4 h-4 text-gray-500" />
                            <select
                                className="bg-transparent outline-none text-sm text-gray-700 font-medium"
                                value={selectedCrop}
                                onChange={(e) => setSelectedCrop(e.target.value)}
                            >
                                <option value="All">대상 작물 전체</option>
                                {allCrops.map(crop => (
                                    <option key={crop} value={crop}>{crop}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredFertilizers.map((fertilizer) => (
                            <motion.div
                                key={fertilizer.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full"
                            >
                                <div className="p-6 flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold mb-2 ${fertilizer.season === 'Basal' ? 'bg-orange-100 text-orange-700' :
                                                    fertilizer.season === 'Top' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                                }`}>
                                                {fertilizer.season === 'Basal' ? '밑거름' : fertilizer.season === 'Top' ? '웃거름' : '전천후'}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900">{fertilizer.name}</h3>
                                            <p className="text-sm text-primary font-medium">{fertilizer.type}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Leaf className="w-5 h-5 text-primary" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600">성분</div>
                                            <div className="text-sm pt-1.5 font-medium text-gray-800">{fertilizer.npk}</div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600">특징</div>
                                            <div className="flex flex-wrap gap-1 pt-1">
                                                {fertilizer.features.map(f => (
                                                    <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{f}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600">사용</div>
                                            <div className="text-sm pt-1.5 text-gray-600 break-keep">{fertilizer.usage}</div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 break-keep bg-gray-50 p-3 rounded-xl">
                                        {fertilizer.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredFertilizers.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>검색 결과가 없습니다.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

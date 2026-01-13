export interface Fertilizer {
    id: string;
    name: string;
    type: string; // e.g., "복합비료", "완효성비료(CRF)", "관주용", "엽면시비", "유기질"
    crops: string[]; // e.g., ["수도작(벼)", "고추", "마늘", "양파", "과수"]
    season: "Basal" | "Top" | "All"; // Basal (기비-밑거름), Top (추비-웃거름)
    npk: string; // e.g., "21-17-17"
    description: string;
    usage: string;
    features: string[];
}

export const fertilizers: Fertilizer[] = [
    {
        id: "f1",
        name: "한번에측조",
        type: "완효성비료(CRF)",
        crops: ["수도작(벼)"],
        season: "Basal",
        npk: "20-10-10",
        description: "국내 최초 100% 코팅 완효성 비료로, 이앙 시 한 번 처리로 수확기까지 비료 효과가 지속됩니다.",
        usage: "1000m²(300평)당 30~40kg 이앙 동시 측조 시비",
        features: ["노동력 절감", "100% 코팅", "이끼/잡초 저감", "도복 경감"]
    },
    {
        id: "f2",
        name: "한번에아리커",
        type: "완효성비료(CRF)",
        crops: ["마늘", "양파", "고추", "배추"],
        season: "Basal",
        npk: "23-6-8",
        description: "질산태 질소가 함유되어 초기 생육이 우수하며, 완효성 성분으로 웃거름 횟수를 획기적으로 줄여줍니다.",
        usage: "1000m²(300평)당 60~80kg (작물별 상이, 전층 시비)",
        features: ["웃거름 생략/절감", "질산태 질소 함유", "황/칼슘 함유", "품질 향상"]
    },
    {
        id: "f3",
        name: "유황엔",
        type: "복합비료",
        crops: ["고추", "마늘", "양파", "배추", "무"],
        season: "Basal",
        npk: "20-0-0+23S",
        description: "국내 유일 입상 유안비료로 질소와 유황을 동시에 공급하여 맛과 향을 좋게 합니다.",
        usage: "1000m²(300평)당 20~40kg",
        features: ["빠른 흡수", "맛/향 증진", "저장성 향상", "가스 피해 저감"]
    },
    {
        id: "f4",
        name: "파워성장엔",
        type: "복합비료",
        crops: ["고추", "오이", "토마토", "과수"],
        season: "Top",
        npk: "18-0-16",
        description: "속효성 성분으로 작물의 생육이 부진할 때 빠르게 회복시켜주는 웃거름 전용 비료입니다.",
        usage: "1000m²(300평)당 20~30kg",
        features: ["생육 부진 회복", "빠른 효과", "고품질 다수확"]
    },
    {
        id: "f5",
        name: "슈퍼오가닉",
        type: "유기질비료",
        crops: ["엽채류", "과수", "시설하우스"],
        season: "Basal",
        npk: "4-2-1",
        description: "최고급 유기질 원료를 사용하여 토양 물리성을 개선하고 뿌리 활착을 돕습니다.",
        usage: "1000m²(300평)당 100~200kg",
        features: ["토양 개량", "뿌리 발육", "유기농업자재", "염류 집적 해소"]
    },
    {
        id: "f6",
        name: "뿌리조은",
        type: "복합비료",
        crops: ["마늘", "양파", "대파", "고추"],
        season: "Basal",
        npk: "12-6-8+2Mg",
        description: "황산가리와 마그네슘이 함유되어 뿌리 발육을 좋게 하고 작물을 튼튼하게 합니다.",
        usage: "1000m²(300평)당 50~70kg",
        features: ["뿌리 활착 증진", "황산가리 함유", "마그네슘 보강"]
    },
    {
        id: "f7",
        name: "헬리앤드론",
        type: "특수비료",
        crops: ["수도작(벼)", "밭작물"],
        season: "Top",
        npk: "30-10-10",
        description: "드론 및 무인헬기 살포에 최적화된 고농도 비료로 물에 잘 녹습니다.",
        usage: "물 20L당 500g~1kg 희석 살포",
        features: ["항공 방제용", "우수한 용해성", "노동력 절감"]
    },
    {
        id: "f8",
        name: "에스피드",
        type: "관주용비료",
        crops: ["시설채소", "과수"],
        season: "Top",
        npk: "19-19-19",
        description: "용해도가 뛰어난 최고급 관주용 비료로 뿌리 발육 아미노산(PAA)을 함유하고 있습니다.",
        usage: "관주 시 1000m²(300평)당 5~10kg",
        features: ["100% 용해", "PAA 함유", "킬레이트 미량원소", "노즐 막힘 없음"]
    },
    {
        id: "f9",
        name: "엔피케이플러스",
        type: "엽면시비",
        crops: ["과수", "과채류"],
        season: "Top",
        npk: "12-8-6+TE",
        description: "액상 킬레이트 엽면시비제로 흡수가 빠르고 생육 증진 및 착색에 도움을 줍니다.",
        usage: "물 20L당 20~40ml (500~1000배) 희석 살포",
        features: ["빠른 효과", "착색 증진", "세력 회복", "미량요소 공급"]
    },
    {
        id: "f10",
        name: "롱스타",
        type: "완효성비료",
        crops: ["잔디", "조경수"],
        season: "Basal",
        npk: "21-5-10",
        description: "질소 용출 기간이 길어 잔디 및 조경수 관리에 적합한 완효성 비료입니다.",
        usage: "1000m²(300평)당 30~50kg",
        features: ["장기간 지속", "잔디 전용", "조경 관리 편의"]
    }
];

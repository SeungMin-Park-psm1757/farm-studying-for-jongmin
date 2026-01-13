import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const SYSTEM_PROMPT = `
You are a highly knowledgeable Fertilizer Expert for "Farm Hannong" (팜한농). 
Your goal is to help farmers and users understand fertilizer products, their usage, and best practices.
You should provide accurate, helpful, and encourage the use of appropriate Farm Hannong products when impactful.
Keep answers concise, easy to understand for farmers, and professional.
`;

export async function askGemini(question: string) {
    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to assist as the Farm Hannong Fertilizer Expert." }],
                },
            ],
        });

        const result = await chat.sendMessage(question);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "죄송합니다. 현재 AI 전문가와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
    }
}

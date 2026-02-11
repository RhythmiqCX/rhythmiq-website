"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface FaqGeneratorRequest {
    content: string;
    language: string;
    tone: string;
    count: number;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface FaqResponse {
    faqs: FaqItem[];
    error?: string;
}

export async function generateFaqsAction(data: FaqGeneratorRequest): Promise<FaqResponse> {
    const { content, language, tone, count } = data;
    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "webpage-to-faq";

    // Rate limiting
    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            faqs: [],
            error: "Usage limit exceeded. You have used your free daily allowance for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        // Truncate content to avoid token limits (approx 15k chars ~ 3-4k tokens)
        const truncatedContent = content.slice(0, 15000);

        const systemPrompt = `
            You are an expert content analyzer and FAQ generator.
            Your task is to analyze the provided text and generate ${count} Frequently Asked Questions (FAQs).
            
            Settings:
            - Language: ${language}
            - Tone: ${tone}
            - Count: EXACTLY ${count} questions
            
            Output Format:
            You must return a raw JSON array of objects, where each object has "question" and "answer" keys.
            Do not include any markdown formatting (like \`\`\`json). Just the raw JSON string.
            
            Example:
            [
                { "question": "What is...", "answer": "It is..." },
                { "question": "How do I...", "answer": "You can..." }
            ]
        `;

        const userPrompt = `
            Analyze the following content and generate FAQs:
            
            "${truncatedContent}"
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 4096,
        });

        const result = completion.choices[0]?.message?.content;

        if (!result) {
            throw new Error("No content generated");
        }

        // Clean up any potential markdown code blocks
        const cleanJson = result.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();

        try {
            const faqs: FaqItem[] = JSON.parse(cleanJson);
            return { faqs };
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Result:", cleanJson);
            return {
                faqs: [],
                error: "Failed to parse generated FAQs. Please try again."
            };
        }

    } catch (error) {
        console.error("FAQ Generation Error:", error);
        return {
            faqs: [],
            error: "Failed to generate FAQs. Please try again."
        };
    }
}

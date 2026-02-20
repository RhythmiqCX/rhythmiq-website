"use server";

import Groq from "groq-sdk";
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface QuotesRequest {
    topic: string;
    tone: string;
    style: string;
}

export interface QuotesResponse {
    quotes?: string[];
    error?: string;
}

export async function generateYouTubeQuotesAction(data: QuotesRequest): Promise<QuotesResponse> {
    const { topic, tone, style } = data;

    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "youtube-quotes-generator";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            error: "Usage limit exceeded. You have used your free daily allowance for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        const systemPrompt = `
            You are an expert YouTube content strategist and copywriter.
            Your task is to generate engaging, powerful, and viral-ready quotes for YouTube video descriptions.

            **Goal:**
            Generate 5 distinct quotes based on the user's topic, tone, and style.
            The quotes should be suitable for the first line of a YouTube description to hook viewers.

            **Inputs:**
            - Topic: ${topic}
            - Tone: ${tone}
            - Style: ${style}

            **Style Definitions:**
            - Short: Concise, punchy (under 10 words).
            - Deep: Thought-provoking, philosophical.
            - Viral: Clickbaity but honest, high curiosity.
            - Powerful: Strong statements, authoritative.
            - Minimal: Extremely brief, 1-5 words.

            **Output Rules:**
            1. Return ONLY a valid JSON object.
            2. The JSON object must have a key "quotes" which is an array of strings.
            3. Do not include numbering or bullet points in the strings themselves.
            4. Keep the quotes relevant to the topic.
        `;

        const userPrompt = `Generate 5 ${tone} quotes about "${topic}" in a ${style} style.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            response_format: { type: "json_object" },
            max_tokens: 1024,
        });

        const generatedContent = completion.choices[0]?.message?.content;

        if (!generatedContent) {
            throw new Error("No content generated");
        }

        const result = JSON.parse(generatedContent);

        if (!result.quotes || !Array.isArray(result.quotes)) {
            throw new Error("Invalid JSON structure returned");
        }

        return { quotes: result.quotes };

    } catch (error) {
        console.error("YouTube Quotes Generation Error:", error);
        return {
            error: "Failed to generate quotes. Please try again."
        };
    }
}

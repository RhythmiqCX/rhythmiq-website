"use server";

import Groq from "groq-sdk";
import { rateLimit } from "@/lib/rate-limit";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

interface VoiceScriptRequest {
    businessType: string;
    businessName: string;
    customerQuery: string;
    tone: string;
    language: string;
}

interface VoiceScriptResult {
    greeting: string;
    intentRecognition: string;
    informationResponse: string;
    callRouting: string;
    closing: string;
    fullScript: string;
    error?: string;
}

export async function generateVoiceScript(data: VoiceScriptRequest): Promise<VoiceScriptResult> {
    const { businessType, businessName, customerQuery, tone, language } = data;

    const TOOL_NAME = "ai-voice-agent-script-generator";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            greeting: "",
            intentRecognition: "",
            informationResponse: "",
            callRouting: "",
            closing: "",
            fullScript: "",
            error: "Usage limit exceeded. You have used your free requests for this tool.",
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        const systemPrompt = `
You are an expert AI voice script writer specializing in creating professional, natural-sounding scripts for AI voice agents, AI receptionists, and automated call center systems.

Your task is to generate a structured voice interaction script based on the provided details.

Tone: ${tone}
Language: ${language}

Input Details:
- Business Type: ${businessType}
- Business Name: ${businessName || "the company"}
- Customer Query / Scenario: ${customerQuery}

Requirements:
1. Greeting: A warm, professional opening that identifies the AI assistant and the business.
2. Intent Recognition: A natural acknowledgment of the customer's query showing understanding.
3. Information Response: A detailed, helpful response addressing the customer query with specific information relevant to the business type.
4. Call Routing: Options for next steps — either providing more info, connecting to a specialist, or scheduling a follow-up.
5. Closing: A polite, professional closing that reinforces the brand.

Guidelines:
- Write in a conversational, natural tone that sounds great when spoken aloud.
- Use short sentences suitable for text-to-speech systems.
- Avoid jargon unless it's common in the business type.
- Include natural pauses indicated by periods or commas.
- Make the script feel human, not robotic.
- Adapt the language and terminology to match the business type.
- Each section should be 2-4 sentences.

Output Format:
Return ONLY a valid JSON object. Do not include markdown formatting (like \`\`\`json).
{
  "greeting": "string",
  "intentRecognition": "string",
  "informationResponse": "string",
  "callRouting": "string",
  "closing": "string"
}
    `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Generate the AI voice agent script now." },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
            response_format: { type: "json_object" },
        });

        const result = completion.choices[0]?.message?.content;

        if (!result) {
            throw new Error("No response from AI");
        }

        const parsed = JSON.parse(result);

        const fullScript = [
            parsed.greeting,
            parsed.intentRecognition,
            parsed.informationResponse,
            parsed.callRouting,
            parsed.closing,
        ].join("\n\n");

        return {
            greeting: parsed.greeting,
            intentRecognition: parsed.intentRecognition,
            informationResponse: parsed.informationResponse,
            callRouting: parsed.callRouting,
            closing: parsed.closing,
            fullScript,
        };

    } catch (error) {
        console.error("Voice Script Generation Error:", error);
        return {
            greeting: "",
            intentRecognition: "",
            informationResponse: "",
            callRouting: "",
            closing: "",
            fullScript: "",
            error: "Failed to generate voice script. Please try again or check your input.",
        };
    }
}

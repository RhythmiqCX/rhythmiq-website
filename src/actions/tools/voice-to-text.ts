"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface VoiceToTextResponse {
    originalText?: string;
    translatedText?: string;
    detectedLanguage?: string;
    error?: string;
}

export async function processVoiceToTextAction(formData: FormData): Promise<VoiceToTextResponse> {
    const audioFile = formData.get("audio") as File;
    const targetLanguage = formData.get("targetLanguage") as string;
    const shouldTranslate = formData.get("shouldTranslate") === "true";

    if (!audioFile) {
        return { error: "No audio file provided." };
    }

    const { rateLimit } = await import("@/lib/rate-limit");
    const TOOL_NAME = "voice-to-text-converter";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            error: "Usage limit exceeded. You have used your free daily allowance for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);
        const transcription = await groq.audio.transcriptions.create({
            file: audioFile,
            model: "whisper-large-v3-turbo",
            response_format: "verbose_json",
        });

        const originalText = transcription.text;

        const detectedLanguage = (transcription as { language?: string }).language || "unknown";

        let translatedText = "";

        if (shouldTranslate && targetLanguage && originalText.trim()) {
            const translationPrompt = `Translate the following text to ${targetLanguage}. Output ONLY the translated text, nothing else. Text to translate: "${originalText}"`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "user", content: translationPrompt },
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.3,
            });

            translatedText = completion.choices[0]?.message?.content?.trim() || "";
        }

        return {
            originalText,
            translatedText,
            detectedLanguage,
        };

    } catch (error) {
        console.error("Voice to Text Error:", error);
        return {
            error: "Failed to process audio. Please try again."
        };
    }
}

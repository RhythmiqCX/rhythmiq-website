"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface TranslatorVoiceoverResponse {
    originalText?: string;
    translatedText?: string;
    detectedLanguage?: string;
    audioData?: string;
    error?: string;
}

export async function processLanguageTranslatorVoiceoverAction(formData: FormData): Promise<TranslatorVoiceoverResponse> {
    const audioFile = formData.get("audio") as File;
    const sourceLanguage = formData.get("sourceLanguage") as string;
    const targetLanguage = formData.get("targetLanguage") as string;
    const targetVoice = formData.get("targetVoice") as string;

    if (!audioFile) {
        return { error: "No audio file provided." };
    }

    const { rateLimit } = await import("@/lib/rate-limit");
    const TOOL_NAME = "language-translator-voiceover";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            error: "Usage limit exceeded. You have used your free daily allowance for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        // 1. Transcribe audio using Groq Whisper model
        const transcription = await groq.audio.transcriptions.create({
            file: audioFile,
            model: "whisper-large-v3-turbo",
            response_format: "verbose_json",
            // You can hint the language if specified
            // language: sourceLanguage !== "auto" ? sourceLanguage : undefined,
        });

        const originalText = transcription.text;
        const detectedLanguage = (transcription as { language?: string }).language || sourceLanguage;

        if (!originalText || originalText.trim() === "") {
            return { error: "No speech could be detected in the provided audio file." };
        }

        let translatedText = originalText;

        const translationPrompt = `Translate the following speech to ${targetLanguage}. Keep the tone and context identical. Output ONLY the translated text, nothing else. Text to translate: "${originalText}"`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "user", content: translationPrompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
        });

        translatedText = completion.choices[0]?.message?.content?.trim() || "";

        if (!translatedText) {
            return { error: "Failed to translate the text." };
        }

        let audioData = null;
        const isTargetHindi = targetLanguage.toLowerCase().includes("hindi");

        const sarvamApiKey = process.env.SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_API_KEY;

        if (isTargetHindi && sarvamApiKey) {
            const response = await fetch(`https://api.sarvam.ai/text-to-speech`, {
                method: "POST",
                headers: {
                    "api-subscription-key": sarvamApiKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: [translatedText.substring(0, 500)], // API limit safely
                    target_language_code: "hi-IN",
                    speaker: targetVoice || "anushka",
                    pace: 1.0,
                    model: "bulbul:v3"
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.audios && data.audios.length > 0) {
                    audioData = `data:audio/wav;base64,${data.audios[0]}`;
                }
            } else {
                console.error("Sarvam Error:", await response.text());
            }
        } else {
            // For English / other languages where Sarvam doesn't support easily, we could just return nothing for audio
            // OR use an alternative Text-to-Speech API if desired.
            // For the scope of this implementation, we will use Sarvam for English as well, adjusting the language code appropriately.
            const apiLangCode = targetLanguage.toLowerCase().includes("english") ? "en-IN" : "hi-IN"; // fallback

            if (sarvamApiKey) {
                const response = await fetch(`https://api.sarvam.ai/text-to-speech`, {
                    method: "POST",
                    headers: {
                        "api-subscription-key": sarvamApiKey,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        inputs: [translatedText.substring(0, 500)],
                        target_language_code: apiLangCode,
                        speaker: targetVoice || "anushka",
                        pace: 1.0,
                        model: "bulbul:v3"
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.audios && data.audios.length > 0) {
                        audioData = `data:audio/wav;base64,${data.audios[0]}`;
                    }
                } else {
                    console.error("Sarvam Fallback Error:", await response.text());
                }
            }
        }

        return {
            originalText,
            translatedText,
            detectedLanguage,
            audioData: audioData || undefined
        };

    } catch (error) {
        console.error("Voice Translator Error:", error);
        return {
            error: "Failed to process audio translation. Please try again."
        };
    }
}

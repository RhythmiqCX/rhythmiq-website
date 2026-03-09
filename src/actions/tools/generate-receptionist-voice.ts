"use server";

import { rateLimit } from "@/lib/rate-limit";

export interface ReceptionistVoiceRequest {
    text: string;
    language: "hi-IN" | "en-IN" | string;
    speaker: string;
}

export async function generateReceptionistVoiceAction(data: ReceptionistVoiceRequest) {
    const TOOL_NAME = "ai-hindi-english-receptionist-voice-generator";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return { error: "Usage limit exceeded. You have used your free daily requests for this tool." };
    }

    try {
        const sarvamApiKey = process.env.SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_API_KEY;
        if (!sarvamApiKey) {
            return { error: "Voice generation service is currently unavailable." };
        }

        await rateLimit.increment(TOOL_NAME);

        const response = await fetch(`https://api.sarvam.ai/text-to-speech`, {
            method: "POST",
            headers: {
                "api-subscription-key": sarvamApiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: [data.text],
                target_language_code: data.language,
                speaker: data.speaker,
                pace: 1.0,
                model: "bulbul:v3" // Based on existing pattern
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("Sarvam TTS Error:", err);
            return { error: "Failed to generate audio. Please check your text length and try again." };
        }

        const resData = await response.json();

        // Sarvam TTS usually returns base64 arrays in 'audios'
        if (resData.audios && resData.audios.length > 0) {
            return {
                audio: `data:audio/wav;base64,${resData.audios[0]}`,
            };
        } else {
            return { error: "Failed to process audio generation." };
        }
    } catch (error) {
        console.error("Server Action Error:", error);
        return { error: "An unexpected error occurred during audio generation." };
    }
}

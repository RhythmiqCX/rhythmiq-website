"use server";

export async function generateHindiAudioAction({
    text,
    model = "meera",
}: {
    text: string;
    model?: string;
}) {
    try {
        const sarvamApiKey = process.env.SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_API_KEY;
        if (!sarvamApiKey) {
            return { error: "Sarvam API Key not configured." };
        }

        const isV3 = true; // All supported voices work on v3

        const response = await fetch(`https://api.sarvam.ai/text-to-speech`, {
            method: "POST",
            headers: {
                "api-subscription-key": sarvamApiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: [text],
                target_language_code: "hi-IN",
                speaker: model,
                pace: 1.0,
                model: isV3 ? "bulbul:v3" : "bulbul:v3"
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("Sarvam TTS Error:", err);
            return { error: "Failed to generate audio from Sarvam AI." };
        }

        const data = await response.json();

        // Ensure returning correct base64 data URL
        if (data.audios && data.audios.length > 0) {
            return {
                audio: `data:audio/wav;base64,${data.audios[0]}`,
            };
        } else {
            return { error: "No audio data received." };
        }
    } catch (error) {
        console.error("Server Action Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Something went wrong.";
        return { error: errorMessage };
    }
}

"use server";

export async function generateScriptAction(topic: string, tone: string, language: string, duration: string) {
    try {
        const prompt = `Write a viral-ready, engaging short-form video script (for TikTok/Reels/Shorts) about "${topic}".
    Tone: ${tone}
    Language: ${language}
    Duration: ~${duration}
    
    The script should:
    - Have a strong, attention-grabbing hook in the first 3 seconds.
    - Be concise and punchy.
    - Include a clear call to action (CTA) at the end.
    - ONLY output the spoken script text without any director notes, visual cues, or bracketed text like [Intro] or [Action]. It must be purely the narration text.`;

        const groqApiKey = process.env.GROQ_API_KEY;
        if (!groqApiKey) return { error: "Groq API key not found" };

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${groqApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 500,
            })
        });

        if (!response.ok) throw new Error("Script generation failed");

        const data = await response.json();
        const scriptText = data.choices?.[0]?.message?.content?.trim();

        return { script: scriptText };
    } catch (error) {
        console.error("Action Error:", error);
        return { error: "Failed to generate script" };
    }
}

export async function generateVoiceAction({
    text,
    provider,
    voiceModel
}: {
    text: string;
    provider: "deepgram" | "sarvam";
    voiceModel: string
}) {
    try {
        if (provider === "deepgram") {
            const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
            if (!deepgramApiKey) return { error: "Deepgram API key not found" };

            const response = await fetch(`https://api.deepgram.com/v1/speak?model=${voiceModel}`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${deepgramApiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) throw new Error("Deepgram generation failed");

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Audio = buffer.toString("base64");
            return { audio: `data:audio/mp3;base64,${base64Audio}` };

        } else if (provider === "sarvam") {
            const sarvamApiKey = process.env.SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_API_KEY;
            if (!sarvamApiKey) return { error: "Sarvam API key not found" };

            const response = await fetch(`https://api.sarvam.ai/text-to-speech`, {
                method: "POST",
                headers: {
                    "api-subscription-key": sarvamApiKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: [text],
                    target_language_code: "hi-IN",
                    speaker: voiceModel,
                    pace: 1.0,
                    model: "bulbul:v3"
                })
            });

            if (!response.ok) throw new Error("Sarvam generation failed");

            const data = await response.json();
            if (data.audios && data.audios.length > 0) {
                return { audio: `data:audio/wav;base64,${data.audios[0]}` };
            } else {
                return { error: "No audio data received from Sarvam" };
            }
        } else {
            return { error: "Invalid provider" };
        }

    } catch (error) {
        console.error("Generation Error:", error);
        return { error: "Voice generation failed" };
    }
}

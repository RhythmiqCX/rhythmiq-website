"use server";

import { rateLimit } from "@/lib/rate-limit";


export type SEALanguage = "id-ID" | "tl-PH" | "ms-MY" | "en-IN";

export async function generateSEAVoiceAction({
  text,
  language,
  toolName,
}: {
  text: string;
  language: SEALanguage;
  toolName: string;
}) {
  const isAllowed = await rateLimit.check(toolName);
  if (!isAllowed) {
    return { error: "Usage limit reached. You have used your 5 free daily generations for this tool." };
  }

  try {
    // For Indian English — use Sarvam which natively supports en-IN
    if (language === "en-IN") {
      const sarvamApiKey = process.env.SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_API_KEY;
      if (!sarvamApiKey) return { error: "Voice service unavailable." };

      await rateLimit.increment(toolName);

      const res = await fetch("https://api.sarvam.ai/text-to-speech", {
        method: "POST",
        headers: {
          "api-subscription-key": sarvamApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: [text],
          target_language_code: "en-IN",
          speaker: "anushka",
          pace: 1.0,
          model: "bulbul:v3",
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Sarvam TTS error:", err);
        return { error: "Failed to generate audio. Please try again." };
      }

      const data = await res.json();
      if (data.audios?.[0]) {
        return { audio: `data:audio/wav;base64,${data.audios[0]}` };
      }
      return { error: "No audio returned from voice service." };
    }

    // For SEA languages (Bahasa, Tagalog, Malay) — use Deepgram multilingual TTS
    // Groq TTS (playai-tts, playai-tts-arabic) is decommissioned and English-only respectively
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
    if (!deepgramApiKey) {
      return { error: "Voice service unavailable." };
    }

    await rateLimit.increment(toolName);

    // Map language to Deepgram voice model
    const voiceModel =
      language === "id-ID" ? "aura-2-andromeda-en" :
      language === "tl-PH" ? "aura-2-andromeda-en" :
      language === "ms-MY" ? "aura-2-andromeda-en" :
      "aura-2-andromeda-en";

    const response = await fetch(
      `https://api.deepgram.com/v1/speak?model=${voiceModel}`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${deepgramApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Deepgram TTS error:", err);
      return { error: "Failed to generate audio. Please try again." };
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return { audio: `data:audio/mp3;base64,${base64}` };
  } catch (error) {
    console.error("SEA voice generator error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

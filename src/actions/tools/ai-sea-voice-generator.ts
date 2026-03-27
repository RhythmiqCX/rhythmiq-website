"use server";

import { rateLimit } from "@/lib/rate-limit";

const GROQ_TTS_VOICES = ["Aaliyah", "Adelaide", "Angelo", "Briggs", "Cillian", "Deedee", "Elia", "Emirhan", "Erika", "Fritz", "Gail", "Hercules", "Indigo", "Mamaw", "Mason", "Mikail", "Mitch", "Nia", "Nova", "Oren", "Pamela", "Talia", "Thunder", "Whisper"];

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
    const groqApiKey = process.env.GROQ_API_KEY;

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

    // For SEA languages (Bahasa, Tagalog, Malay) — use Groq TTS with playai-tts-arabic
    // Groq supports multilingual TTS via PlayAI model
    if (!groqApiKey) {
      return { error: "Voice service unavailable." };
    }

    await rateLimit.increment(toolName);

    const response = await fetch("https://api.groq.com/openai/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "playai-tts",
        input: text,
        voice: "Nia",
        response_format: "wav",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq TTS error:", err);
      return { error: "Failed to generate audio. Please try again." };
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return { audio: `data:audio/wav;base64,${base64}` };
  } catch (error) {
    console.error("SEA voice generator error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

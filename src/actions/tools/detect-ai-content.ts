
"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

interface DetectionRequest {
    text: string;
}

interface SentenceResult {
    sentence: string;
    aiProbability: number;
    riskLevel: "low" | "moderate" | "high";
    flags: string[];
}

interface DetectionResponse {
    overallAiScore: number;
    overallHumanScore: number;
    riskLevel: "low" | "moderate" | "high";
    summary: string;
    sentenceResults: SentenceResult[];
    detectionMetrics: {
        perplexityIndicator: number;
        burstinessIndicator: number;
        vocabularyRichness: number;
        sentenceUniformity: number;
    };
    error?: string;
}

export async function detectAIContent(data: DetectionRequest): Promise<DetectionResponse> {
    const { text } = data;
    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "ai-plagiarism-detector";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            overallAiScore: 0,
            overallHumanScore: 0,
            riskLevel: "low",
            summary: "",
            sentenceResults: [],
            detectionMetrics: {
                perplexityIndicator: 0,
                burstinessIndicator: 0,
                vocabularyRichness: 0,
                sentenceUniformity: 0,
            },
            error: "Usage limit exceeded. You have used your 5 free scans for this tool. Please try again after 24 hours.",
        };
    }

    if (text.trim().length < 50) {
        return {
            overallAiScore: 0,
            overallHumanScore: 0,
            riskLevel: "low",
            summary: "",
            sentenceResults: [],
            detectionMetrics: {
                perplexityIndicator: 0,
                burstinessIndicator: 0,
                vocabularyRichness: 0,
                sentenceUniformity: 0,
            },
            error: "Text is too short. Please provide at least 50 characters for accurate detection.",
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        // Truncate very long text to fit context window
        const truncatedText = text.slice(0, 12000);

        const systemPrompt = `You are an expert AI content detection system. Your job is to analyze the given text and determine:
1. How likely it is that the text was written by an AI (ChatGPT, Claude, Gemini, GPT-4, etc.)
2. What specific patterns indicate AI or human authorship

Analyze the text based on these signals:
- **Perplexity**: How predictable/formulaic is the language? AI tends to be low perplexity (very smooth, predictable).
- **Burstiness**: Human writing has more variable sentence lengths (bursty). AI is more uniform.
- **Vocabulary patterns**: AI overuses transition words like "furthermore", "moreover", "consequently", "utilize", "leverage", "facilitate".
- **Phrase patterns**: AI commonly uses phrases like "it is important to note", "in today's digital age", "delve into", "plays a crucial role".
- **Sentence structure**: AI tends to produce uniform, well-structured sentences of similar length.
- **Contractions**: Humans use contractions ("don't", "can't") more than AI.
- **Personal voice**: Humans have more distinctive voice, quirks, and style variations.

For each sentence, assess:
- The AI probability (0-100)
- The risk level ("low", "moderate", "high")
- Specific flags explaining why

IMPORTANT: Be rigorous and honest. Not all well-written text is AI. Analyze actual patterns, not just quality.

Return ONLY a valid JSON object (no markdown, no code fences):
{
  "overallAiScore": <number 0-100>,
  "overallHumanScore": <number 0-100, should equal 100 - overallAiScore>,
  "riskLevel": "<low|moderate|high>",
  "summary": "<2-3 sentence summary of the analysis>",
  "detectionMetrics": {
    "perplexityIndicator": <number 0-100, lower = more AI-like>,
    "burstinessIndicator": <number 0-100, lower = more uniform/AI-like>,
    "vocabularyRichness": <number 0-100>,
    "sentenceUniformity": <number 0-100, higher = more uniform/AI-like>
  },
  "sentenceResults": [
    {
      "sentence": "<the sentence text>",
      "aiProbability": <number 0-100>,
      "riskLevel": "<low|moderate|high>",
      "flags": ["<flag 1>", "<flag 2>"]
    }
  ]
}

RULES:
- Analyze UP TO 20 sentences maximum (pick the most representative ones if there are more).
- Each sentence in sentenceResults must be the actual sentence from the text.
- Flags should be specific and helpful (e.g., "Uses AI-typical transition 'furthermore'", "No contractions in formal tone").
- If a sentence has no AI indicators, set flags to ["No significant AI indicators detected"].`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Analyze this text for AI-generated content:\n\n${truncatedText}` },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 4096,
            response_format: { type: "json_object" },
        });

        const result = completion.choices[0]?.message?.content;

        if (!result) {
            throw new Error("No response from AI detection model");
        }

        const parsed = JSON.parse(result);

        return {
            overallAiScore: Math.max(0, Math.min(100, parsed.overallAiScore || 0)),
            overallHumanScore: Math.max(0, Math.min(100, parsed.overallHumanScore || 100)),
            riskLevel: parsed.riskLevel || "low",
            summary: parsed.summary || "",
            sentenceResults: (parsed.sentenceResults || []).map((s: SentenceResult) => ({
                sentence: s.sentence || "",
                aiProbability: Math.max(0, Math.min(100, s.aiProbability || 0)),
                riskLevel: s.riskLevel || "low",
                flags: s.flags || ["No flags"],
            })),
            detectionMetrics: {
                perplexityIndicator: parsed.detectionMetrics?.perplexityIndicator || 50,
                burstinessIndicator: parsed.detectionMetrics?.burstinessIndicator || 50,
                vocabularyRichness: parsed.detectionMetrics?.vocabularyRichness || 50,
                sentenceUniformity: parsed.detectionMetrics?.sentenceUniformity || 50,
            },
        };
    } catch (error) {
        console.error("AI Detection Error:", error);
        return {
            overallAiScore: 0,
            overallHumanScore: 0,
            riskLevel: "low",
            summary: "",
            sentenceResults: [],
            detectionMetrics: {
                perplexityIndicator: 0,
                burstinessIndicator: 0,
                vocabularyRichness: 0,
                sentenceUniformity: 0,
            },
            error: "Failed to analyze content. Please try again.",
        };
    }
}

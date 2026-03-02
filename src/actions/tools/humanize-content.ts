
"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

interface HumanizeRequest {
    text: string;
    tone: "casual" | "professional" | "academic" | "creative" | "conversational";
}

interface HumanizeResponse {
    humanizedText: string;
    changesSummary: string[];
    originalWordCount: number;
    humanizedWordCount: number;
    error?: string;
}

export async function humanizeContent(data: HumanizeRequest): Promise<HumanizeResponse> {
    const { text, tone } = data;
    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "ai-humanizer";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            humanizedText: "",
            changesSummary: [],
            originalWordCount: 0,
            humanizedWordCount: 0,
            error: "Usage limit exceeded. You have used your 5 free requests for this tool. Please try again after 24 hours.",
        };
    }

    if (text.trim().length < 30) {
        return {
            humanizedText: "",
            changesSummary: [],
            originalWordCount: 0,
            humanizedWordCount: 0,
            error: "Text is too short. Please provide at least 30 characters to humanize.",
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        const truncatedText = text.slice(0, 12000);
        const originalWordCount = truncatedText.split(/\s+/).filter((w) => w.length > 0).length;

        const toneInstructions: Record<string, string> = {
            casual: "Use a relaxed, friendly tone. Include contractions (don't, can't, it's), colloquial expressions, and a warm conversational style. Write as if talking to a friend.",
            professional: "Use a polished but natural professional tone. Keep it clear and authoritative but not stiff. Use contractions sparingly and maintain a confident, approachable voice.",
            academic: "Use a scholarly but readable tone. Maintain precision and depth while avoiding robotic phrasing. Vary sentence structure and use field-appropriate vocabulary naturally.",
            creative: "Use a vivid, engaging, and expressive tone. Add personality, metaphors, and varied rhythm. Make the writing feel alive and unique with distinctive voice.",
            conversational: "Write as if speaking directly to the reader. Use questions, short sentences mixed with longer ones, contractions, and a natural storytelling flow. Be relatable and engaging.",
        };

        const systemPrompt = `You are an expert writing humanizer. Your task is to transform AI-generated text into natural, authentic human writing.

TONE INSTRUCTION: ${toneInstructions[tone] || toneInstructions.conversational}

HUMANIZATION RULES (follow ALL of these):

1. **Vary sentence length dramatically** — Mix very short sentences (3-5 words) with longer complex ones. Humans don't write uniform sentences.

2. **Use contractions naturally** — Replace "do not" with "don't", "it is" with "it's", "cannot" with "can't", etc. Humans use contractions in most contexts.

3. **Remove AI-typical phrases** — Eliminate phrases like:
   - "It is important to note that..."
   - "In today's digital age..."
   - "Furthermore/Moreover/Additionally" (overuse)
   - "Delve into", "plays a crucial role"
   - "A myriad of", "a plethora of"
   - "Harness the power", "cutting-edge"
   - "Paradigm shift", "holistic approach"
   - "It goes without saying"
   Replace these with natural alternatives or restructure entirely.

4. **Break predictable patterns** — Don't start consecutive sentences the same way. Vary paragraph lengths. Occasionally use fragments or informal transitions.

5. **Add human touches** — Include occasional:
   - Parenthetical asides (like this one)
   - Direct reader address ("you", "your")
   - Rhetorical questions
   - Personal perspective cues ("honestly", "the thing is")
   - Imperfect but natural phrasing

6. **Simplify overly formal vocabulary** — Replace "utilize" with "use", "facilitate" with "help", "implement" with "put in place" or "set up", "leverage" with "use" or "take advantage of", "optimize" with "improve".

7. **Preserve the original meaning** — Don't change facts, data, or the core message. Only change HOW it's expressed.

8. **Make transitions natural** — Instead of "Furthermore", use "And", "Plus", "On top of that", "Here's the thing", or just start a new thought without a transition.

9. **Vary paragraph structure** — Some paragraphs should be 1-2 sentences. Others can be longer. Don't make them all the same.

Return ONLY a valid JSON object (no markdown, no code fences):
{
  "humanizedText": "<the fully humanized version of the text>",
  "changesSummary": ["<change 1>", "<change 2>", "<change 3>", "<change 4>", "<change 5>"]
}

The changesSummary should list 3-6 specific types of changes you made (e.g., "Replaced 8 AI-typical phrases with natural alternatives", "Added contractions throughout", "Varied sentence lengths from 4 to 28 words").

CRITICAL: The humanized text must maintain the SAME meaning and information as the original. Only change the style, not the substance.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Humanize this AI-generated text:\n\n${truncatedText}` },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.8,
            max_tokens: 4096,
            response_format: { type: "json_object" },
        });

        const result = completion.choices[0]?.message?.content;

        if (!result) {
            throw new Error("No response from AI humanizer");
        }

        const parsed = JSON.parse(result);
        const humanizedWordCount = (parsed.humanizedText || "")
            .split(/\s+/)
            .filter((w: string) => w.length > 0).length;

        return {
            humanizedText: parsed.humanizedText || "",
            changesSummary: parsed.changesSummary || [],
            originalWordCount,
            humanizedWordCount,
        };
    } catch (error) {
        console.error("Humanize Error:", error);
        return {
            humanizedText: "",
            changesSummary: [],
            originalWordCount: 0,
            humanizedWordCount: 0,
            error: "Failed to humanize content. Please try again.",
        };
    }
}

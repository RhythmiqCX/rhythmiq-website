
"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

interface RepurposeRequest {
    content: string;
    tone: string;
    type: "url" | "text";
}

interface RepurposeResponse {
    linkedin: string;
    twitter: string[];
    newsletter: string;
    error?: string;
}

export async function repurposeContent(data: RepurposeRequest): Promise<RepurposeResponse> {
    const { content, tone, type } = data;
    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "content-repurposer";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            linkedin: "",
            twitter: [],
            newsletter: "",
            error: "Usage limit exceeded. You have used your 5 free requests for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        let textToProcess = content;

        // Basic URL fetching logic (Simple MVP)
        if (type === "url") {
            try {
                // Validation for YouTube - we can't fetch transcripts without a heavy library/API
                if (content.includes("youtube.com") || content.includes("youtu.be")) {
                    return {
                        linkedin: "",
                        twitter: [],
                        newsletter: "",
                        error: "YouTube URLs are not supported directly yet. Please paste the video transcript manually."
                    }
                }

                const response = await fetch(content, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch URL");

                const html = await response.text();
                // Very naive HTML to text stripping for MVP
                textToProcess = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "")
                    .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, "")
                    .replace(/<[^>]+>/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                    .slice(0, 15000); // Limit context window

            } catch (err) {
                console.error("URL Fetch Error", err);
                return {
                    linkedin: "",
                    twitter: [],
                    newsletter: "",
                    error: "Could not read the content from this URL. Please paste the text manually."
                }
            }
        }

        if (textToProcess.length < 50) {
            return {
                linkedin: "",
                twitter: [],
                newsletter: "",
                error: "The content is too short to repurpose. Please provide more context."
            }
        }

        const systemPrompt = `
      You are an expert social media content strategist.
      Your task is to repurpose the provided input text into three distinct formats for social media.
      
      Tone: ${tone}
      
      Requirements:
      1. LinkedIn Post: Professional yet engaging, use appropriate emojis and hashtags. Structure it with a hook, value, and conclusion.
      2. Twitter Thread: A series of 3-7 short, punchy tweets. The first tweet should be a strong hook.
      3. Newsletter: A concise email summary (Subject line + Body) suitable for a subscriber list.
      
      Output Format:
      Return ONLY a valid JSON object. Do not include markdown formatting (like \`\`\`json).
      {
        "linkedin": "string",
        "twitter": ["string", "string", ...],
        "newsletter": "string"
      }
    `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Here is the content to repurpose:\n\n${textToProcess}` },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 2048,
            response_format: { type: "json_object" },
        });

        const result = completion.choices[0]?.message?.content;

        if (!result) {
            throw new Error("No response from AI");
        }

        const parsed = JSON.parse(result);

        return {
            linkedin: parsed.linkedin,
            twitter: parsed.twitter,
            newsletter: parsed.newsletter,
        };

    } catch (error) {
        console.error("Repurposing Error:", error);
        return {
            linkedin: "",
            twitter: [],
            newsletter: "",
            error: "Failed to generate content. Please try again or check your input.",
        };
    }
}

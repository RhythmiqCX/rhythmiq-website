"use server";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function enhancePromptWithAI(
    draftPrompt: string,
    frameworkName: string,
    model: string = "llama-3.3-70b-versatile"
) {
    if (!process.env.GROQ_API_KEY) {
        return { error: "API Key not configured" };
    }

    try {
        const systemPrompt = `
      You are an expert Prompt Engineer specializing in the ${frameworkName} framework.
      Your task is to ENHANCE the user's draft prompt.
      
      Rules:
      1. Keep the exact structure of the ${frameworkName} framework.
      2. Improve clarity, specificity, and impact.
      3. Add necessary context or constraints if missing (but keep them relevant).
      4. Ensure the tone is professional and ready for an LLM (ChatGPT/Claude).
      5. Output ONLY the enhanced prompt. No conversational filler.
    `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: draftPrompt },
            ],
            model: model,
            temperature: 0.3,
        });

        return { enhancedPrompt: completion.choices[0]?.message?.content || draftPrompt };
    } catch (error) {
        console.error("Groq Prompt Enhancement Error:", error);
        return { error: "Failed to enhance prompt. Please try again." };
    }
}

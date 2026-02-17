"use server";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


export async function chatWithWebsite(websiteText: string, messages: { role: string; content: string }[]) {
    if (!process.env.GROQ_API_KEY) {
        return { error: "API Key not configured" };
    }

    try {
        const systemPrompt = `
      You are an intelligent AI assistant capable of analyzing website content.
      You have been provided with the text content of a webpage below.
      
      Instructions:
      1. Answer the user's questions based PRIMARILY on the provided website content.
      2. If the answer is not in the content, state that clearly, but try to infer from context if possible.
      3. Keep answers concise, accurate, and professional.
      4. Use markdown for formatting (bold, italic, lists) to improve readability.
      5. If asked to summarize, provide a structured summary with key points.

      Website Content:
      """
      ${websiteText.slice(0, 50000)} 
      """
      (Note: Content may be truncated if too long)
    `;

        // Take the last 5 messages to preserve context but save tokens
        const recentMessages = messages.slice(-5);

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...recentMessages.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 1024,
        });

        return { response: completion.choices[0]?.message?.content || "No response generated." };
    } catch (error) {
        console.error("Groq Chat Error:", error);
        return { error: "Failed to generate response. Please try again." };
    }
}

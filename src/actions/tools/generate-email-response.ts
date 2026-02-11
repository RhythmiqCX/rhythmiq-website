"use server";

import Groq from "groq-sdk";
import { rateLimit } from "@/lib/rate-limit";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

interface EmailResponseRequest {
    receivedEmail: string;
    subject: string;
    goal: string;
    sender: string;
    recipient: string;
    language: string;
    tone: string;
}

interface EmailResponseResult {
    subject: string;
    body: string;
    error?: string;
}

export async function generateEmailResponse(data: EmailResponseRequest): Promise<EmailResponseResult> {
    const { receivedEmail, subject, goal, sender, recipient, language, tone } = data;

    const TOOL_NAME = "ai-email-response-generator";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            subject: "",
            body: "",
            error: "Usage limit exceeded. You have used your free requests for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        const systemPrompt = `
      You are an expert email communication specialist.
      Your task is to draft a professional and contextually appropriate email response based on the provided details.
      
      Tone: ${tone}
      Language: ${language}
      
      Input Details:
      - Received Email Context: ${receivedEmail}
      - Subject Line: ${subject}
      - Response Goal: ${goal}
      - Sender (Me): ${sender}
      - Recipient (They): ${recipient}
      
      Requirements:
      1. Subject: Generate a concise and relevant subject line (if the provided one is empty, create one; otherwise improve it if necessary).
      2. Body: Write a clear, polite, and professional email body.
      3. Structure: Use appropriate greeting, body paragraphs, and closing.
      
      Output Format:
      Return ONLY a valid JSON object. Do not include markdown formatting (like \`\`\`json).
      {
        "subject": "string",
        "body": "string"
      }
    `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Generate the email response now." },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
            response_format: { type: "json_object" },
        });

        const result = completion.choices[0]?.message?.content;

        if (!result) {
            throw new Error("No response from AI");
        }

        const parsed = JSON.parse(result);

        return {
            subject: parsed.subject,
            body: parsed.body,
        };

    } catch (error) {
        console.error("Email Generation Error:", error);
        return {
            subject: "",
            body: "",
            error: "Failed to generate email. Please try again or check your input.",
        };
    }
}

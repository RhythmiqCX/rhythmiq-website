"use server";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateAIEmails(
    firstName: string,
    lastName: string,
    domain: string,
) {
    if (!process.env.GROQ_API_KEY) {
        return { error: "API Key not configured" };
    }

    try {
        const prompt = `
      Analyze the company domain/name: "${domain}".
      ${firstName && lastName ? `Also consider the person: "${firstName} ${lastName}".` : ""}

      Please provide:
      1. The official company domain (verified if possible).
      2. The most likely corporate email format pattern (e.g., "first.last@domain.com").
      3. ${firstName && lastName ? "Likely professional email addresses for this person based on the pattern." : "IGNORE person emails."}
      4. Generic contact emails for key departments (HR, Sales, Support, Careers).
      
      Return a STRICT JSON object with no markdown keys:
      {
        "personEmails": ["email1", "email2"],  // Empty if no name provided
        "hrEmails": ["email1", "email2"],       // HR/Recruiting specific
        "companyIntelligence": {
           "officialDomain": "example.com",
           "emailPattern": "first.last@example.com",
           "departmentContacts": [
              { "department": "Sales", "email": "sales@..." },
              { "department": "Support", "email": "support@..." }
           ]
        }
      }
    `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that outputs only valid JSON.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1,
        });

        const text = chatCompletion.choices[0]?.message?.content || "{}";

        // Clean markdown if present
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("AI Generation Error:", error);
        return { error: "Failed to generate AI suggestions" };
    }
}

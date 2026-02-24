"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface SalesFunnelRequest {
    industry: string;
    productDescription: string;
    targetAudience: string;
    tone: string;
}

export interface SalesFunnelResponse {
    landingPage?: {
        headline: string;
        subheadline: string;
        valueProposition: string;
        benefits: string[];
        cta: string;
    };
    emailSequence?: {
        type: string;
        subject: string;
        body: string;
    }[];
    adCopy?: {
        type: string;
        copy: string;
    }[];
    linkedIn?: string;
    callScript?: string;
    objectionHandling?: {
        objection: string;
        response: string;
    }[];
    error?: string;
}

export async function generateSalesFunnelAction(data: SalesFunnelRequest): Promise<SalesFunnelResponse> {
    const { industry, productDescription, targetAudience, tone } = data;

    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "sales-funnel-builder";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            error: "Usage limit exceeded. You have used your free daily allowance for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        const systemPrompt = `
You are an expert copywriter, sales strategist, and funnel builder.
Your task is to generate perfectly optimized, high-converting sales funnel assets based on the user's inputs.

**Inputs:**
- Industry: ${industry}
- Product/Service: ${productDescription}
- Target Audience: ${targetAudience}
- Tone: ${tone}

**Required Structured Outputs (Must return valid JSON Object):**
1. "landingPage": Object with "headline", "subheadline", "valueProposition", "benefits" (array of strings), "cta".
2. "emailSequence": Array of objects with "type" (e.g., Cold Outreach, Follow-up 1, Follow-up 2, Breakup), "subject", "body". There must be exactly 4 emails.
3. "adCopy": Array of objects with "type" (e.g., Short Headline, Long-Form, Hook-Driven), "copy". 
4. "linkedIn": String. A short, impactful LinkedIn connection request or DM message.
5. "callScript": String. A complete sales call script covering Opening, Pain discovery, Value pitch, and Closing.
6. "objectionHandling": Array of objects with "objection" (e.g., Price, Trust, Timing, Skepticism) and "response". Give 4 common objections and responses.

**Rules:**
- ONLY return valid JSON. Do not return markdown blocks outside the JSON.
- Ensure the tone matches exactly.
- Keep the copy punchy, highly persuasive, and focused on solving the target audience's problems.
`;

        const userPrompt = `Build my full sales funnel for a ${industry} product described as: "${productDescription}". Target audience is: "${targetAudience}". Tone: ${tone}.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            response_format: { type: "json_object" },
            max_tokens: 4000,
        });

        const generatedContent = completion.choices[0]?.message?.content;

        if (!generatedContent) {
            throw new Error("No content generated");
        }

        const result = JSON.parse(generatedContent);

        if (!result.landingPage || !result.emailSequence) {
            throw new Error("Invalid JSON structure returned");
        }

        return result as SalesFunnelResponse;

    } catch (error) {
        console.error("Sales Funnel Generation Error:", error);
        return {
            error: "Failed to generate sales funnel. Please try again."
        };
    }
}

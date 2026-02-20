"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface B2BEmailRequest {
    industry: string;
    jobTitle: string;
    painPoint: string;
    productDescription: string;
    tone: string;
}

export interface B2BEmailResponse {
    mainEmail?: string;
    subjectLines?: string[];
    followUps?: string[];
    linkedIn?: string;
    shortPitch?: string;
    error?: string;
}

export async function generateB2BEmailAction(data: B2BEmailRequest): Promise<B2BEmailResponse> {
    const { industry, jobTitle, painPoint, productDescription, tone } = data;

    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "b2b-email-generator";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            error: "Usage limit exceeded. You have used your free daily allowance for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        const systemPrompt = `
            You are an expert B2B copywriter and sales strategist.
            Your task is to generate high-converting outreach content based on the user's inputs.

            **Inputs:**
            - Target Industry: ${industry}
            - Job Title: ${jobTitle}
            - Pain Point: ${painPoint}
            - Product/Service Description: ${productDescription}
            - Tone: ${tone}

            **Required Outputs:**
            1. mainEmail: The primary cold outreach email. (Keep it under 150 words. Focus on the pain point. Include a clear CTA.)
            2. subjectLines: A list of 3 captivating subject lines.
            3. followUps: A list of 2 follow-up emails for when they don't reply. (Keep them short).
            4. linkedIn: A short LinkedIn connection request message or DM (max 300 characters for connection request, or slightly longer for DM).
            5. shortPitch: A 1-2 sentence elevator pitch suitable for quick intros.

            **Output Rules:**
            1. Return ONLY a valid JSON object.
            2. The JSON object must have keys: "mainEmail", "subjectLines", "followUps", "linkedIn", "shortPitch".
            3. Do not include markdown code blocks in the string values (unless appropriate for emphasis), but the overall output must be raw JSON.
            4. Ensure tone matches the user's request.
        `;

        const userPrompt = `Generate the B2B outreach kit for a ${jobTitle} in the ${industry} industry facing "${painPoint}", selling "${productDescription}". Tone: ${tone}.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            response_format: { type: "json_object" },
            max_tokens: 2048,
        });

        const generatedContent = completion.choices[0]?.message?.content;

        if (!generatedContent) {
            throw new Error("No content generated");
        }

        const result = JSON.parse(generatedContent);

        if (!result.mainEmail || !result.subjectLines) {
            throw new Error("Invalid JSON structure returned");
        }

        return {
            mainEmail: result.mainEmail,
            subjectLines: result.subjectLines,
            followUps: result.followUps,
            linkedIn: result.linkedIn,
            shortPitch: result.shortPitch
        };

    } catch (error) {
        console.error("B2B Email Generation Error:", error);
        return {
            error: "Failed to generate email templates. Please try again."
        };
    }
}

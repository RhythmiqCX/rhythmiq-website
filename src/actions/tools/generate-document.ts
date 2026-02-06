"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export type DocumentType =
    | "sop"
    | "proposal"
    | "legal-notice"
    | "hr-policy"
    | "compliance-report"
    | "technical-doc";

export interface DocumentRequest {
    type: DocumentType;
    inputs: Record<string, string>;
}

export interface DocumentResponse {
    content: string; // The generated HTML content
    title: string;
    error?: string;
}

const TEMPLATE_PROMPTS: Record<DocumentType, string> = {
    "sop": `
        Create a **Standard Operating Procedure (SOP)**.
        Structure:
        1. **Title**: [Title]
        2. **Purpose**: Brief explanation of why this SOP exists.
        3. **Scope**: Who/what this applies to.
        4. **Prerequisites**: What is needed before starting.
        5. **Procedure**: Step-by-step instructions (numbered list).
        6. **Escalation**: When to ask for help.
        
        Style: Formal, clear, imperative (active voice).
    `,
    "proposal": `
        Create a **Business Proposal**.
        Structure:
        1. **Executive Summary**: Overview of the offer.
        2. **Problem Statement**: Understanding of the client's needs.
        3. **Proposed Solution**: Approach and deliverables.
        4. **Timeline**: schedule of key milestones.
        5. **Investment**: Pricing or budget overview.
        6. **Conclusion**: Call to action.

        Style: Professional, persuasive, client-focused.
    `,
    "legal-notice": `
        Create a **Formal Legal Notice (Draft)**.
        Structure:
        1. **Header**: Date, Recipient Details, Sender Details.
        2. **Subject Line**: CLEAR WARNING/NOTICE.
        3. **Body Paragraph 1**: Statement of facts/incident.
        4. **Body Paragraph 2**: Violation or legal basis.
        5. **Demand**: Specific action required.
        6. **Deadline**: Timeframe for compliance.
        7. **Sign-off**: Formal closing.

        Style: Strict, legalistic, objective. Disclaimer: "This is a draft for reference only."
    `,
    "hr-policy": `
        Create an **HR Policy Document**.
        Structure:
        1. **Policy Name**: [Name]
        2. **Effective Date**: [Date]
        3. **Policy Statement**: The core rule.
        4. **Purpose**: Why this policy matters.
        5. **Scope**: Who is covered.
        6. **Procedures/Guidelines**: Detailed rules and expectations.
        7. **Consequences**: What happens if violated.

        Style: Official, clear, non-discriminatory.
    `,
    "compliance-report": `
        Create a **Compliance Report**.
        Structure:
        1. **Report Title**: [Title]
        2. **Period Covered**: [Date Range]
        3. **Executive Summary**: High-level findings.
        4. **Methodology**: How the audit/check was done.
        5. **Findings**: Detailed observations (compliant/non-compliant).
        6. **Recommendations**: Corrective actions.
        7. **Conclusion**: Final assessment.

        Style: Objective, fact-based, analytical.
    `,
    "technical-doc": `
        Create **Technical Documentation**.
        Structure:
        1. **Title**: [Component/System Name]
        2. **Overview**: What it does.
        3. **Architecture/Design**: High-level structure.
        4. **Installation/Setup**: Steps to deploy/run.
        5. **Configuration**: Key settings.
        6. **API/Usage**: How to interact with it.
        7. **Troubleshooting**: Common issues.

        Style: Technical, precise, concise.
    `
};

export async function generateDocument(data: DocumentRequest): Promise<DocumentResponse> {
    const { type, inputs } = data;
    const { rateLimit } = await import("@/lib/rate-limit"); // Dynamic import to match pattern

    const TOOL_NAME = "ai-document-generator";

    // Rate limiting check
    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            content: "",
            title: "",
            error: "Usage limit exceeded. You have used your free daily allowance for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        // Construct the prompt
        const systemPrompt = `
            You are an expert professional document writer.
            Your task is to generate a "${type}" document based on the user's input.
            
            FAILURE TO FOLLOW FORMAT IS UNACCEPTABLE.
            
            ${TEMPLATE_PROMPTS[type]}
            
            **Output Rules:**
            - Output MUST be valid HTML (inside a <div>, using <h1>, <h2>, <p>, <ul>, <li>, <strong> etc.).
            - Do NOT include <html>, <head>, or <body> tags. Just the content div.
            - Use Tailwind CSS classes for basic styling if needed (e.g., class="text-xl font-bold mb-4"), but keep it minimal and semantic.
            - Ensure placeholders like [Date] or [Name] are filled if provided in inputs, otherwise generic placeholders.
            - NO Markdown. ONLY HTML.
        `;

        const userPrompt = `
            Here are the details for the document:
            ${JSON.stringify(inputs, null, 2)}
            
            Generate the full document now.
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3, // Lower temperature for more structured/ruled output
            max_tokens: 4096,
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) {
            throw new Error("No content generated");
        }

        // Clean up markdown code blocks if the model puts them in (e.g. ```html ... ```)
        const cleanContent = content.replace(/^```html/, '').replace(/```$/, '').trim();

        return {
            content: cleanContent,
            title: inputs.title || inputs.project_name || "Generated Document",
        };

    } catch (error) {
        console.error("Document Generation Error:", error);
        return {
            content: "",
            title: "",
            error: "Failed to generate document. Please try again."
        };
    }
}

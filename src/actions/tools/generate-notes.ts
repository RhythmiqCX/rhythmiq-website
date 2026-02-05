"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export type NoteStyle =
    | "outline"
    | "cornell"
    | "meeting"
    | "simplify"
    | "action-items";

export interface NotesRequest {
    content: string;
    style: NoteStyle;
}

export interface NotesResponse {
    content: string; // HTML content
    title: string;
    error?: string;
}

const STYLE_PROMPTS: Record<NoteStyle, string> = {
    "outline": `
        Create **Structured Outline Notes**.
        - Use hierarchical bullet points.
        - Group related concepts under clear headings.
        - Bold key terms and definitions.
        - Keep it concise and readable.
    `,
    "cornell": `
        Create **Cornell-style Notes**.
        - **Key Questions/Cues**: List important questions or keywords that trigger recall.
        - **Detailed Notes**: Provide the corresponding answers or explanations.
        - **Summary**: A distinct 2-3 sentence summary at the very end.
        
        Format as clear sections with headings: "Cues", "Notes", "Summary".
    `,
    "meeting": `
        Create **Meeting Minutes**.
        - **Agenda/Topic**: What was discussed?
        - **Key Discussion Points**: Main arguments or updates.
        - **Decisions Made**: What was agreed upon?
        - **Action Items**: Who needs to do what? (Use checkboxes if possible, e.g., [] Task).
    `,
    "simplify": `
        Create **Simplified Study Notes (ELI5)**.
        - Break down complex jargon into simple language.
        - Use analogies where helpful.
        - Focus on the "Big Picture" first, then details.
        - distinct "Key Takeaway" at the end.
    `,
    "action-items": `
        Create an **Action Plan**.
        - Extract ONLY actionable tasks and instructions.
        - Ignore general chatter or fluff.
        - Group tasks by owner or category if clear.
        - specific and imperative (e.g., "Email client by Friday").
    `
};

export async function generateNotes(data: NotesRequest): Promise<NotesResponse> {
    const { content, style } = data;
    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "ai-notes-generator";

    // Rate limiting check
    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            content: "",
            title: "",
            error: "Usage limit exceeded. You have used your free daily allowance for this tool."
        };
    }

    if (!content || content.length < 50) {
        return {
            content: "",
            title: "",
            error: "Input content is too short. Please provide at least 50 characters."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        const systemPrompt = `
            You are an expert note-taker and summarizer.
            Your task is to convert raw input text into clear, revision-ready notes using the "${style}" style.

            ${STYLE_PROMPTS[style]}

            **Rules:**
            1. Output MUST be valid, clean HTML (inside a <div>).
            2. Use <h2> for main sections, <h3> for subsections.
            3. Use <ul>/<li> for lists and <strong> for emphasis.
            4. Do NOT use <html>, <head>, or <body> tags.
            5. Do NOT include markdown blocks (no \`\`\`html).
            6. IGNORE filler words, repetitions, and non-essential text.
            7. Focus on clarity, structure, and retention.
        `;

        const userPrompt = `
            Here is the raw content to process:
            
            ${content}
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 4096,
        });

        const generatedContent = completion.choices[0]?.message?.content;

        if (!generatedContent) {
            throw new Error("No content generated");
        }

        const cleanContent = generatedContent.replace(/^```html/, '').replace(/```$/, '').trim();

        // Simple heuristic for title: first few words or generic
        const titleMatch = cleanContent.match(/<h2>(.*?)<\/h2>/);
        const title = titleMatch ? titleMatch[1] : "Generated Notes";

        return {
            content: cleanContent,
            title: title,
        };

    } catch (error) {
        console.error("Notes Generation Error:", error);
        return {
            content: "",
            title: "",
            error: "Failed to generate notes. Please try again."
        };
    }
}

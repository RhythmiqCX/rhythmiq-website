"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export type RoomType =
    | "bedroom"
    | "master_bedroom"
    | "kitchen"
    | "living"
    | "dining"
    | "bathroom"
    | "corridor"
    | "entrance";

export interface Room {
    id: string;
    type: RoomType;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    color?: string; // Optional in API response, we can add defaults on client
}

export interface FloorPlan {
    plotWidth: number;
    plotHeight: number;
    rooms: Room[];
}

export interface FloorPlanRequest {
    width: number;
    height: number;
    bedrooms: number;
    bathrooms: number;
    hasKitchen: boolean;
    hasLiving: boolean;
    hasDining: boolean;
}

export interface FloorPlanResponse {
    plan?: FloorPlan;
    error?: string;
}

export async function generateFloorPlanAction(data: FloorPlanRequest): Promise<FloorPlanResponse> {
    const { width, height, bedrooms, bathrooms, hasKitchen, hasLiving, hasDining } = data;
    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "ai-floor-plan-generator";

    // Rate limiting check
    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            error: "Usage limit exceeded. You have used your free daily allowance for this tool."
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        const systemPrompt = `
            You are an expert architect and floor plan designer.
            Your task is to generate a JSON representation of a 2D floor plan based on the user's plot size and room requirements.
            
            **Output Format:**
            Return ONLY a valid JSON object matching this structure:
            {
              "plotWidth": number,
              "plotHeight": number,
              "rooms": [
                {
                  "id": "string",
                  "type": "bedroom" | "master_bedroom" | "kitchen" | "living" | "dining" | "bathroom" | "corridor" | "entrance",
                  "x": number,
                  "y": number,
                  "width": number,
                  "height": number,
                  "label": "string"
                }
              ]
            }

            **Design Rules:**
            1. The total width and height of the rooms must fit within the plotWidth (~${width}) and plotHeight (~${height}).
            2. "x" and "y" are coordinates from top-left (0,0).
            3. Minimize wasted space (corridors).
            4. **Living Room / Entrance** should generally be at the bottom (front) or near the entrance.
            5. **Bedrooms** should be in quieter areas (back/top).
            6. **Kitchen** near Dining/Living.
            7. **Bathrooms** accessible but private.
            8. Ensure rooms do not overlap significantly (walls share coordinates).
            9. Room sizes must be realistic (e.g., Bedroom min 10x10, Bath min 5x6).
            10. Fill the plot as efficiently as possible.
        `;

        const userPrompt = `
            Create a floor plan for a plot of Size: ${width} ft (Width) x ${height} ft (Height).
            
            Requirements:
            - Bedrooms: ${bedrooms}
            - Bathrooms: ${bathrooms}
            - Kitchen: ${hasKitchen ? "Yes" : "No"}
            - Living Room: ${hasLiving ? "Yes" : "No"}
            - Dining Area: ${hasDining ? "Yes" : "No"}
            
            Generate the optimal layout JSON.
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2, // Low temperature for consistent JSON
            response_format: { type: "json_object" },
            max_tokens: 4096,
        });

        const generatedContent = completion.choices[0]?.message?.content;

        if (!generatedContent) {
            throw new Error("No content generated");
        }

        const plan = JSON.parse(generatedContent) as FloorPlan;

        // Basic validation check
        if (!plan.rooms || !Array.isArray(plan.rooms)) {
            throw new Error("Invalid JSON structure returned");
        }

        return { plan };

    } catch (error) {
        console.error("Floor Plan Generation Error:", error);
        return {
            error: "Failed to generate floor plan. AI model might be busy or produced invalid output."
        };
    }
}

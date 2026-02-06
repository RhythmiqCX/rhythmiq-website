"use server";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export type Priority = "High" | "Medium" | "Low";

export interface Task {
    id: string;
    name: string;
    duration: number; // in minutes
    priority: Priority;
    specificTime?: string; // Optional fixed time (HH:MM)
}

export interface ScheduleItem {
    time: string; // HH:MM format
    taskName: string;
    duration: number; // minutes
    type: "work" | "break";
}

export interface ScheduleRequest {
    tasks: Task[];
    startTime: string; // e.g. "09:00"
    endTime: string;   // e.g. "17:00"
}

export interface ScheduleResponse {
    schedule?: ScheduleItem[];
    error?: string;
}

export async function generateScheduleAction(data: ScheduleRequest): Promise<ScheduleResponse> {
    const { tasks, startTime, endTime } = data;
    const { rateLimit } = await import("@/lib/rate-limit");

    const TOOL_NAME = "ai-schedule-maker";

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
            You are an expert project manager and scheduler.
            Your task is to organize a list of tasks into an optimized daily schedule.

            **Input:**
            - Work Start Time: ${startTime}
            - Work End Time: ${endTime}
            - List of Tasks (Name, Duration, Priority, Specific Time [Optional])

            **Rules:**
            1. If a task has a "specificTime", you MUST schedule it at that exact time.
            2. Prioritize "High" priority tasks first (usually early in the day), but respect fixed specific times.
            3. Fit tasks within the start and end times.
            4. Insert short 5-10 min breaks after every 60-90 minutes of work.
            5. Ensure no tasks overlap.
            6. If tasks exceed available time, suggest the most important ones that fit.
            7. Return ONLY a valid JSON object.

            **Output JSON Format:**
            {
              "schedule": [
                {
                  "time": "HH:MM",
                  "taskName": "string",
                  "duration": number,
                  "type": "work" | "break"
                }
              ]
            }
        `;

        const userPrompt = `
            Please generate a schedule for these tasks:
            ${JSON.stringify(tasks)}
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
            response_format: { type: "json_object" },
            max_tokens: 4096,
        });

        const generatedContent = completion.choices[0]?.message?.content;

        if (!generatedContent) {
            throw new Error("No content generated");
        }

        const result = JSON.parse(generatedContent);

        if (!result.schedule || !Array.isArray(result.schedule)) {
            throw new Error("Invalid JSON structure returned");
        }

        return { schedule: result.schedule };

    } catch (error) {
        console.error("Schedule Generation Error:", error);
        return {
            error: "Failed to generate schedule. Please try again."
        };
    }
}

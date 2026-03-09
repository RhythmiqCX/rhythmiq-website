"use server";

import Groq from "groq-sdk";
import { rateLimit } from "@/lib/rate-limit";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface ReceptionistScriptRequest {
    businessName: string;
    industry: string;
    businessSize: string;
    phonePurpose: string[];
    hoursOfOperation: string;
    scenarios: string[];
    customScenario: string;
    tone: string;
    pace: string;
    includeFillers: boolean;
    callerPersona: string;
    language: string;
    scriptLength: string;
    includeInterruptionHandling: boolean;
    includeComplianceDisclaimer: boolean;
}

export interface ScriptBlock {
    scenarioId: string;
    scenarioLabel: string;
    content: string;
    wordCount: number;
    estimatedDuration: string;
}

export interface ReceptionistScriptResult {
    blocks: ScriptBlock[];
    fullScript: string;
    usageNotes: {
        estimatedAvgCallDuration: string;
        recommendedTone: string;
        interruptionRecoveryIncluded: boolean;
        complianceDisclaimerIncluded: boolean;
    };
    error?: string;
}

const SCENARIO_LABELS: Record<string, string> = {
    "greeting": "Opening Greeting",
    "business-hours": "Business Hours Inquiry",
    "transfer": "Transfer to Department / Team Member",
    "voicemail": "Leave a Message / Voicemail",
    "callback": "Call Back Request",
    "website-address": "Website / Address Inquiry",
    "appointment-booking": "Appointment Booking",
    "order-status": "Order Status / Tracking",
    "property-inquiry": "Property Inquiry / Viewing Request",
    "prescription-refill": "Prescription Refill Routing",
    "case-intake": "Case Intake / New Client Inquiry",
    "billing-payment": "Billing & Payment Questions",
    "emergency-escalation": "Urgent / Emergency Escalation",
    "returns-refunds": "Returns & Refunds",
    "lead-qualification": "Lead Qualification",
    "after-hours": "After-Hours Message",
    "custom": "Custom Scenario",
};

export async function generateReceptionistScript(
    data: ReceptionistScriptRequest
): Promise<ReceptionistScriptResult> {
    const TOOL_NAME = "ai-receptionist-script-generator";

    const isAllowed = await rateLimit.check(TOOL_NAME);
    if (!isAllowed) {
        return {
            blocks: [],
            fullScript: "",
            usageNotes: {
                estimatedAvgCallDuration: "",
                recommendedTone: "",
                interruptionRecoveryIncluded: false,
                complianceDisclaimerIncluded: false,
            },
            error: "Usage limit exceeded. You have used your free requests for this tool.",
        };
    }

    try {
        await rateLimit.increment(TOOL_NAME);

        const scenariosList = data.scenarios
            .map((s) => SCENARIO_LABELS[s] || s)
            .join(", ");

        const systemPrompt = `
You are an expert AI receptionist script writer. Generate deployment-ready phone scripts.

BUSINESS PROFILE:
- Business Name: ${data.businessName || "the company"}
- Industry: ${data.industry}
- Business Size: ${data.businessSize}
- Primary Phone Purpose: ${data.phonePurpose.join(", ")}
- Hours of Operation: ${data.hoursOfOperation || "9 AM - 5 PM, Monday to Friday"}

TONE & STYLE:
- Tone: ${data.tone}
- Pace: ${data.pace}
- Include natural filler phrases: ${data.includeFillers ? "Yes" : "No"}
- Caller Persona: ${data.callerPersona}
- Language: ${data.language}
- Script Length Preference: ${data.scriptLength}

ADDITIONAL SETTINGS:
- Include interruption handling lines: ${data.includeInterruptionHandling ? "Yes" : "No"}
- Include compliance/recording disclaimer: ${data.includeComplianceDisclaimer ? "Yes" : "No"}

SCENARIOS TO GENERATE:
${scenariosList}
${data.customScenario ? `\nCustom Scenario Description: ${data.customScenario}` : ""}

INSTRUCTIONS:
1. Generate a separate script block for EACH scenario listed above.
2. Each block should include both AI lines and caller prompt lines.
3. Format AI lines starting with "AI:" and caller lines with "Caller:".
4. Include system cues in brackets like [TRANSFER], [HOLD], [END CALL], [VOICEMAIL].
5. Make scripts sound natural and conversational when read aloud.
6. Adapt formality, vocabulary, and pacing to the industry and tone specified.
7. Each scenario block should be ${data.scriptLength === "concise" ? "2-3" : data.scriptLength === "detailed" ? "6-10" : "4-6"} exchanges long.
${data.includeInterruptionHandling ? "8. Add recovery lines for when the caller interrupts mid-sentence." : ""}
${data.includeComplianceDisclaimer ? "9. Prepend calls with a recording/compliance notice." : ""}

OUTPUT FORMAT:
Return ONLY a valid JSON object. Do not include markdown or preamble.
{
  "blocks": [
    {
      "scenarioId": "greeting",
      "scenarioLabel": "Opening Greeting",
      "content": "AI: Thank you for calling [Business]. This is your AI assistant.\\nHow can I help you today?\\n\\nCaller: [responds]\\n\\nAI: [responds appropriately]"
    }
  ],
  "estimatedAvgCallDuration": "~45 seconds"
}
`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                {
                    role: "user",
                    content: "Generate the AI receptionist script now.",
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 4096,
            response_format: { type: "json_object" },
        });

        const result = completion.choices[0]?.message?.content;
        if (!result) throw new Error("No response from AI");

        const parsed = JSON.parse(result);

        const blocks: ScriptBlock[] = (parsed.blocks || []).map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (block: any) => {
                const words = (block.content || "").split(/\s+/).length;
                const durationSec = Math.round(
                    words / (data.pace === "brisk" ? 3 : data.pace === "slow" ? 1.5 : 2.2)
                );
                return {
                    scenarioId: block.scenarioId,
                    scenarioLabel:
                        block.scenarioLabel ||
                        SCENARIO_LABELS[block.scenarioId] ||
                        block.scenarioId,
                    content: block.content || "",
                    wordCount: words,
                    estimatedDuration: `~${durationSec}s`,
                };
            }
        );

        const fullScript = [
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            `AI RECEPTIONIST SCRIPT — ${data.businessName || "Your Business"}`,
            `Generated by RhythmiqCX Script Generator`,
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            "",
            ...blocks.map(
                (b) =>
                    `[${b.scenarioLabel.toUpperCase()}]\n${b.content}\n`
            ),
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            `USAGE NOTES`,
            `- Estimated average call duration: ${parsed.estimatedAvgCallDuration || "~45 seconds"}`,
            `- Recommended voice tone: ${data.tone}`,
            `- Interruption recovery line included: ${data.includeInterruptionHandling ? "Yes" : "No"}`,
            `- Compliance disclaimer included: ${data.includeComplianceDisclaimer ? "Yes" : "No"}`,
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        ].join("\n");

        return {
            blocks,
            fullScript,
            usageNotes: {
                estimatedAvgCallDuration:
                    parsed.estimatedAvgCallDuration || "~45 seconds",
                recommendedTone: data.tone,
                interruptionRecoveryIncluded: data.includeInterruptionHandling,
                complianceDisclaimerIncluded: data.includeComplianceDisclaimer,
            },
        };
    } catch (error) {
        console.error("Receptionist Script Generation Error:", error);
        return {
            blocks: [],
            fullScript: "",
            usageNotes: {
                estimatedAvgCallDuration: "",
                recommendedTone: "",
                interruptionRecoveryIncluded: false,
                complianceDisclaimerIncluded: false,
            },
            error: "Failed to generate script. Please try again.",
        };
    }
}

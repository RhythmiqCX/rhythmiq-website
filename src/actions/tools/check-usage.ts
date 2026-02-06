"use server";

import { rateLimit } from "@/lib/rate-limit";

export async function checkUsageAction(toolName: string) {
    const remaining = await rateLimit.getRemaining(toolName);
    const isLimitReached = remaining === 0;

    return { remaining, isLimitReached };
}

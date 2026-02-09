
import { cookies } from "next/headers";

const COOKIE_NAME_PREFIX = "tool_usage_";
const MAX_REQUESTS_PER_TOOL = 5;

export const rateLimit = {

    check: async (toolName: string): Promise<boolean> => {
        const cookieStore = await cookies();
        const value = cookieStore.get(`${COOKIE_NAME_PREFIX}${toolName}`)?.value;
        const count = value ? parseInt(value, 10) : 0;
        return count < MAX_REQUESTS_PER_TOOL;
    },

    increment: async (toolName: string) => {
        const cookieStore = await cookies();
        const value = cookieStore.get(`${COOKIE_NAME_PREFIX}${toolName}`)?.value;
        const count = value ? parseInt(value, 10) : 0;

        cookieStore.set(`${COOKIE_NAME_PREFIX}${toolName}`, (count + 1).toString(), {
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });
    },

    getRemaining: async (toolName: string): Promise<number> => {
        const cookieStore = await cookies();
        const value = cookieStore.get(`${COOKIE_NAME_PREFIX}${toolName}`)?.value;
        const count = value ? parseInt(value, 10) : 0;
        return Math.max(0, MAX_REQUESTS_PER_TOOL - count);
    },
};

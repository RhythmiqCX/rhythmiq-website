
import fs from "fs";
import path from "path";
import { headers } from "next/headers";

const STORE_FILE = path.join(process.cwd(), "tool-usage-store.json");
const MAX_REQUESTS_PER_TOOL = 5;

interface UsageStore {
    [ip: string]: {
        [toolName: string]: number;
    };
}

function getStore(): UsageStore {
    try {
        if (!fs.existsSync(STORE_FILE)) {
            return {};
        }
        const data = fs.readFileSync(STORE_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading rate limit store:", error);
        return {};
    }
}

function saveStore(store: UsageStore) {
    try {
        fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
    } catch (error) {
        console.error("Error writing rate limit store:", error);
    }
}

// Get Client IP
async function getClientIp() {
    const headersList = await headers();
    return headersList.get("x-forwarded-for")?.split(",")[0] || "unknown";
}

export const rateLimit = {

    check: async (toolName: string): Promise<boolean> => {
        const ip = await getClientIp();
        const store = getStore();

        // Initialize if not exists
        if (!store[ip]) store[ip] = {};
        if (!store[ip][toolName]) store[ip][toolName] = 0;

        const count = store[ip][toolName];
        return count < MAX_REQUESTS_PER_TOOL;
    },

    increment: async (toolName: string) => {
        const ip = await getClientIp();
        const store = getStore();

        if (!store[ip]) store[ip] = {};
        if (!store[ip][toolName]) store[ip][toolName] = 0;

        store[ip][toolName] += 1;
        saveStore(store);
    },

    getRemaining: async (toolName: string): Promise<number> => {
        const ip = await getClientIp();
        const store = getStore();

        const count = store[ip]?.[toolName] || 0;
        return Math.max(0, MAX_REQUESTS_PER_TOOL - count);
    },
};

"use server";

import dns from "dns/promises";

export interface DomainCheckResult {
    domain: string;
    status: "available" | "taken" | "unknown";
    tld: string;
    error?: string;
}

export async function checkSingleDomain(domain: string): Promise<boolean> {
    try {
        await Promise.any([
            dns.resolve(domain, "A"),
            dns.resolve(domain, "AAAA"),
            dns.resolve(domain, "MX"),
            dns.resolve(domain, "NS"),
            dns.resolve(domain, "CNAME"),
            dns.resolve(domain, "SOA"),
            dns.resolve(domain, "TXT"),
        ]);
        return true; // Resolved, so taken
    } catch {
        return false; // Not resolved, likely available
    }
}

export async function checkDomainAvailability(
    baseName: string,
    tlds: string[]
): Promise<DomainCheckResult[]> {
    const results = await Promise.all(
        tlds.map(async (tld) => {
            const domain = `${baseName}${tld}`;
            try {
                const isTaken = await checkSingleDomain(domain);
                return {
                    domain,
                    status: isTaken ? "taken" : "available",
                    tld,
                };
            } catch {
                return {
                    domain,
                    status: "unknown",
                    tld,
                    error: "Failed to check",
                };
            }
        })
    );
    return results as DomainCheckResult[];
}

"use client"

// WaitlistForm.tsx – drop this component into your Next.js app
// TailwindCSS + shadcn/ui style guide (but works fine with plain Tailwind too)

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // optional toaster – remove if you don't use it

// --- Types --------------------------------------------------------------
interface FormData {
  firstName: string;
  email: string;
  company: string;
  role: string;
  tickets: string;
  useCases: string[];
  tools: string[];
  pain: string;
  phone: string;
  consent: boolean;
}

// --- Component ----------------------------------------------------------
export default function WaitlistForm() {
  const [data, setData] = useState<FormData>({
    firstName: "",
    email: "",
    company: "",
    role: "Support Lead",
    tickets: "<100",
    useCases: [],
    tools: [],
    pain: "",
    phone: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);

  // unified onChange for text/select inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.email || !data.consent) {
      toast.error("Please provide a work email and accept the consent checkbox.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network response not ok");
      toast.success("You're on the list! 🎉🎉🎉");
      setData((d) => ({ ...d, email: "" }));
    } catch (err) {
      toast.error("Something went wrong – please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // helpers
  const roles = [
    "Support Lead",
    "Product Manager",
    "Founder/CEO",
    "Engineer",
    "CX Agent",
    "Other"
  ];
  const ticketRanges = ["<100", "100-1000", "1000-10,000", "10,000+"];
  const useCaseOptions = [
    "Customer Support",
    "Internal Help‑desk",
    "E‑commerce FAQ",
    "IT / Sysadmin",
    "Other"
  ];
  const toolOptions = ["Intercom", "Zendesk", "Freshdesk", "None"];

  return (
    <Card className="max-w-xl mx-auto rounded-2xl shadow p-8">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Join the Waitlist
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Core 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="Name"
              value={data.firstName}
              onChange={handleChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={data.email}
              onChange={handleChange}
            />
          </div>

          {/* Useful 3 */}
          <Input
            // label="Company / organisation"
            name="company"
            placeholder="Company / Org"
            value={data.company}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role / title</label>
              <select
                name="role"
                value={data.role}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 text-black"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Monthly support tickets
              </label>
              <select
                name="tickets"
                value={data.tickets}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 text-black"
              >
                {ticketRanges.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Nice‑to‑know */}
          <fieldset>
            <legend className="text-sm font-medium mb-2">Primary use‑case</legend>
            <div className="flex flex-wrap gap-3">
              {useCaseOptions.map((uc) => (
                <label key={uc} className="flex items-center gap-1">
                  <Checkbox
                    name="useCases"
                    value={uc}
                    checked={data.useCases.includes(uc)}
                    onCheckedChange={(checked: boolean) => {
                        setData(prev => {
                          const next = checked
                            ? [...prev.useCases, uc]
                            : prev.useCases.filter(v => v !== uc);
                          return { ...prev, useCases: next };
                        });
                      }}
                  />
                  <span className="text-sm">{uc}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium mb-2">Current tooling</legend>
            <div className="flex flex-wrap gap-3">
              {toolOptions.map((tool) => (
                <label key={tool} className="flex items-center gap-1">
                  <Checkbox
                    name="tools"
                    value={tool}
                    checked={data.tools.includes(tool)}
                    onCheckedChange={(checked: boolean) => {
                        setData((prev) => {
                          const next = checked
                            ? [...prev.tools, tool]
                            : prev.tools.filter((v) => v !== tool);
                          return { ...prev, tools: next };
                        });
                      }}
                  />
                  <span className="text-sm">{tool}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <Textarea
            name="pain"
            placeholder="Pain points e.g. We spend hours triaging repetitive tickets. Also include any specific features/integrations you are looking for so we can prioritize it"
            rows={3}
            value={data.pain}
            onChange={handleChange}
          />

          {/* Optional phone */}
          <Input
            name="phone"
            placeholder="Phone (optional)"
            value={data.phone}
            onChange={handleChange}
          />

          {/* GDPR consent */}
          <label className="flex items-start gap-2 text-sm">
            <Checkbox
              name="consent"
              checked={data.consent}
              onCheckedChange={(checked: boolean) =>
                setData((prev) => ({ ...prev, consent: !!checked }))
              }
              required
            />
            <span>
              I agree to receive product updates and beta invites. Read our{' '}
              <a href="/privacy" className="underline" target="_blank">
                privacy policy
              </a>
              .
            </span>
          </label>

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={submitting}
          >
            {submitting ? "Joining…" : "Join waitlist"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}



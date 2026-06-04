"use client";

import { useState } from "react";
import { cn } from "@/lib";
import { APP_LOGIN_URL } from "@/constants/links";
import {
  DEMO_SCENARIOS,
  DEMO_FORM_FIELDS,
  type DemoScenario,
  type TranscriptLine,
} from "@/constants/demo-scenarios";

type Step = "scenario" | "details" | "preview";

type RestaurantInfo = {
  name: string;
  cuisine: string;
  city: string;
  busyHours: string;
  tone: string;
};

const EMPTY_FORM: RestaurantInfo = {
  name: "",
  cuisine: "",
  city: "",
  busyHours: "",
  tone: "",
};

const STEPS: { key: Step; label: string }[] = [
  { key: "scenario", label: "Scenario" },
  { key: "details", label: "Your restaurant" },
  { key: "preview", label: "Preview" },
];

function renderLine(line: TranscriptLine, name: string) {
  const restaurant = name.trim() || "your restaurant";
  const text = line.text.replace("{restaurant}", restaurant);
  if (line.hl && text.includes(line.hl)) {
    const [before, after] = text.split(line.hl);
    return (
      <>
        {before}
        <span className="hl">{line.hl}</span>
        {after}
      </>
    );
  }
  return text;
}

const DemoFlow = () => {
  const [step, setStep] = useState<Step>("scenario");
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [form, setForm] = useState<RestaurantInfo>(EMPTY_FORM);

  const scenario: DemoScenario | undefined = DEMO_SCENARIOS.find(
    (s) => s.id === scenarioId,
  );
  const activeIndex = STEPS.findIndex((s) => s.key === step);

  return (
    <section className="section pt-8" aria-label="Interactive demo">
      <div className="wrap">
        <div className="max-w-3xl mx-auto">
          {/* Stepper */}
          <ol className="flex items-center justify-center gap-2 sm:gap-4">
            {STEPS.map((s, i) => {
              const state =
                i < activeIndex ? "done" : i === activeIndex ? "active" : "todo";
              return (
                <li key={s.key} className="flex items-center gap-2 sm:gap-4">
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-6 h-6 rounded-full grid place-items-center font-mono text-[12px] font-semibold",
                        state === "active" && "bg-coral text-white",
                        state === "done" && "bg-ink text-paper",
                        state === "todo" && "bg-paper2 text-ink3 border border-ink/10",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-[13px] font-medium hidden sm:inline",
                        state === "todo" ? "text-ink3" : "text-ink",
                      )}
                    >
                      {s.label}
                    </span>
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="w-6 sm:w-10 h-px bg-ink/15" />
                  )}
                </li>
              );
            })}
          </ol>

          <div key={step} className="mt-8 animate-[fade_0.35s_ease]">
            {/* STEP 1 — pick a scenario */}
            {step === "scenario" && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="h-section">Pick a moment to see it handled</h2>
                  <p className="lede mt-3 max-w-[48ch] mx-auto">
                    These are the calls that slip through on a busy service. Choose
                    one and watch how Rhythmiq would take it.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {DEMO_SCENARIOS.map((s) => {
                    const selected = s.id === scenarioId;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setScenarioId(s.id)}
                        aria-pressed={selected}
                        className={cn(
                          "text-left rounded-[16px] bg-white p-5 transition-all",
                          selected
                            ? "ring-2 ring-coral"
                            : "hover:-translate-y-[2px]",
                        )}
                        style={
                          selected
                            ? undefined
                            : { border: "1px solid var(--line-soft)" }
                        }
                      >
                        <span className="font-mono text-[11px] tracking-[0.04em] text-ink3">
                          {s.tag}
                        </span>
                        <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ink mt-2">
                          {s.title}
                        </h3>
                        <p className="text-ink2 text-sm mt-1.5 leading-relaxed">
                          {s.blurb}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    disabled={!scenarioId}
                    onClick={() => setStep("details")}
                    className={cn(
                      "btn btn-dark",
                      !scenarioId && "opacity-40 cursor-not-allowed",
                    )}
                  >
                    Continue <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — restaurant details */}
            {step === "details" && (
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="h-section">Tell us about your place</h2>
                  <p className="lede mt-3 max-w-[44ch] mx-auto">
                    Just enough to make the preview feel like your restaurant. Only
                    the name is required.
                  </p>
                </div>
                <div className="grid gap-4">
                  {DEMO_FORM_FIELDS.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-ink mb-1.5"
                      >
                        {field.label}
                        {field.required && <span className="text-coral"> *</span>}
                      </label>
                      {field.options ? (
                        <select
                          id={field.name}
                          value={form[field.name]}
                          onChange={(e) =>
                            setForm({ ...form, [field.name]: e.target.value })
                          }
                          className="w-full rounded-lg bg-white border border-ink/15 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral"
                        >
                          <option value="">Select one</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.name}
                          type="text"
                          value={form[field.name]}
                          placeholder={field.placeholder}
                          onChange={(e) =>
                            setForm({ ...form, [field.name]: e.target.value })
                          }
                          className="w-full rounded-lg bg-white border border-ink/15 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink3 focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <button
                    type="button"
                    onClick={() => setStep("scenario")}
                    className="btn btn-ghost"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!form.name.trim()}
                    onClick={() => setStep("preview")}
                    className={cn(
                      "btn btn-dark",
                      !form.name.trim() && "opacity-40 cursor-not-allowed",
                    )}
                  >
                    See the call <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — preview + sign-up gate */}
            {step === "preview" && scenario && (
              <div>
                <div className="text-center mb-6">
                  <span className="font-mono text-[11px] tracking-[0.04em] text-ink3">
                    {scenario.tag}
                  </span>
                  <h2 className="h-section mt-2">{scenario.title}</h2>
                </div>

                <div className="win max-w-xl mx-auto">
                  <div className="win-bar">
                    <div className="win-dots">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span className="addr">
                      {(form.name.trim() || "your restaurant").toLowerCase()} · live call
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="transcript">
                      {scenario.transcript.map((line, i) => (
                        <div key={i} className={cn("bubble", line.who)}>
                          <small>
                            {line.who === "ai" ? "Rhythmiq AI" : "Caller"}
                          </small>
                          {renderLine(line, form.name)}
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex justify-center">
                      <span className="tagpill ok">{scenario.outcome}</span>
                    </div>
                  </div>
                </div>

                {/* Sign-up gate */}
                <div className="text-center mt-8 max-w-xl mx-auto">
                  <h3 className="h-feature">Want to hear this on your own number?</h3>
                  <p className="text-ink2 mt-2 leading-relaxed">
                    That was a preview. Create your account to set up your AI host
                    and take a real call from your own phone.
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap mt-5">
                    <a href={APP_LOGIN_URL} rel="noopener" className="btn btn-accent">
                      Talk to the AI live <span className="arrow">→</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setStep("scenario")}
                      className="btn btn-ghost"
                    >
                      Try another scenario
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoFlow;

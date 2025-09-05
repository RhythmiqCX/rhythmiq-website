"use client";

import { useEffect, useState } from "react";
import AIAgentSection from "./agents";
import IntegrationSection from "./integration";
import UseCasesTestimonials from "./use";
import FinAiEngine from "./engine";

const sections = [
  {
    id: "system",
    label: "SYSTEM",
    content: <AIAgentSection />,
  },
  {
    id: "performance",
    label: "INTEGRATION",
    content: <IntegrationSection />,
  },
  {
    id: "technology",
    label: "TECHNOLOGY",
    content: <FinAiEngine />,
  },
];

export default function ScrollSnapLayout() {
  const [active, setActive] = useState("system");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      {
        root: null, // main page scroll container
        threshold: 0.5, // section must be at least 50% visible
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="sticky top-16 h-screen w-56 bg-background/80 text-white p-6">
        <ul className="space-y-4">
          {sections.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className={`block transition ${
                  active === sec.id
                    ? "text-orange-400 font-bold"
                    : "text-gray-400"
                }`}
              >
                {sec.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Sections */}
      <div className="flex-1">
        {sections.map((sec) => (
          <section
            key={sec.id}
            id={sec.id}
            className="h-screen snap-start bg-background/80 flex items-center justify-center px-8 overflow-hidden"
          >
            {/* Inner wrapper ensures content doesn't overflow the section */}
            <div className="w-full h-full overflow-y-auto no-scrollbar flex items-center justify-center">
              {sec.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

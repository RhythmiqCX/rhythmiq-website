"use client";

import { useEffect, useState } from "react";
import AIAgentSection from "./agents";
import IntegrationSection from "./integration";
import AiEngine from "./engine";

const sections = [
  { id: "system", label: "SYSTEM", content: <AIAgentSection /> },
  { id: "performance", label: "INTEGRATION", content: <IntegrationSection /> },
  { id: "technology", label: "TECHNOLOGY", content: <AiEngine /> },
];
const Divider = () => (
      <hr style={{ borderTop: '2px solid #ccc', margin: '2rem 0' }} />
    );

export default function ScrollSnapLayout() {
  const [active, setActive] = useState("system");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      {/* Sidebar */}
<aside className="hidden lg:block sticky top-36 h-[calc(100vh-3rem)] w-56 bg-background/80 text-white p-6 shrink-0">
  <ul className="space-y-4">
    {sections.map((sec) => (
      <li key={sec.id}>
        <a
          href={`#${sec.id}`}
          className={`block transition ${
            active === sec.id
              ? "text-indigo-400 font-bold"
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
      <div className="flex-1 overflow-x-hidden">
        {sections.map((sec, i) => (
          <section
            key={sec.id}
            id={sec.id}
            className={`min-h-screen snap-start ${
              i === 0 ? "snap-always" : ""
            } bg-background/80 px-4 sm:px-6 lg:px-12 py-12 flex overflow-x-hidden`}
          >
            {/* Scrollable content */}
            <div className="w-full max-w-7xl mx-auto overflow-x-hidden">
              {sec.content}
              <Divider />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

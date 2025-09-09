"use client";

import { useState, useMemo } from "react";
import AIAgentSection from "./agents";
import IntegrationSection from "./integration";
import AiEngine from "./engine";

const sections = [
  { id: "system", label: "SYSTEM" },
  { id: "integration", label: "INTEGRATION" },
  { id: "technology", label: "TECHNOLOGY" },
];

export default function ScrollSnapLayout() {
  const [active, setActive] = useState("system");

  const handleSectionClick = (sectionId: string) => {
    console.log('Clicking section:', sectionId, 'Current active:', active);
    if (sectionId !== active) {
      setActive(sectionId);
    }
  };

  const renderContent = () => {
    try {
      switch (active) {
        case "integration":
          return <IntegrationSection />;
        case "system":
          return <AIAgentSection />;
        case "technology":
          return <AiEngine />;
        default:
          console.warn('Unknown section:', active);
          return <IntegrationSection />;
      }
    } catch (error) {
      console.error('Error rendering section:', error);
      return <div className="text-white">Error loading section</div>;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-x-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:block sticky top-0 h-screen w-56 bg-background/80 text-white p-6 shrink-0">
        <ul className="space-y-4">
          {sections.map((sec) => (
            <li key={sec.id}>
              <button
                onClick={() => handleSectionClick(sec.id)}
                className={`block w-full text-left transition ${
                  active === sec.id
                    ? "text-indigo-400 font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {sec.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Active Section */}
      <div className="flex-1 overflow-hidden">
        <section className="h-screen w-full bg-background/80 px-4 sm:px-6 lg:px-12 flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-7xl overflow-hidden">
            {renderContent()}
          </div>
        </section>
      </div>
    </div>
  );
}

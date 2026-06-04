import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import ScheduleMakerTool from "@/components/tools/ai-schedule-maker/tool";
import {
  ChevronLeft,
  CalendarCheck,
  Clock,
  ListChecks,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "AI Schedule Maker | Smart Daily Planner",
  description:
    "Automatically generate optimized daily schedules based on your tasks, priorities, and available hours.",
  alternates: {
    canonical: "/tools/ai-schedule-maker",
  },
});

const AiScheduleMakerPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-6">
            <Link
              href="/tools"
              className="flex items-center gap-2 text-sm text-ink3 hover:text-ink transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            <div className="flex flex-col gap-3 max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-coral/20 bg-coralSoft px-3 py-1 text-sm font-medium text-coral w-fit">
                <CalendarCheck className="mr-2 h-4 w-4" />
                Productivity Booster
              </div>
              <h1 className="h-section">AI Schedule Maker</h1>
              <p className="lede max-w-2xl">
                Stop stressing about time management. Enter your tasks and let
                our AI optimize your day for maximum productivity and balance.
              </p>
            </div>
          </div>

          <ScheduleMakerTool />
          <ToolsCTA />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Smart Allocation</h3>
              <p className="text-ink2">
                AI intelligently fits tasks into your available hours, ensuring
                you stay on track.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <ListChecks className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Priority First</h3>
              <p className="text-ink2">
                High-priority tasks are automatically scheduled during peak
                hours for effectiveness.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Auto-Breaks</h3>
              <p className="text-ink2">
                Prevents burnout by automatically inserting short rest periods
                between deep work sessions.
              </p>
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default AiScheduleMakerPage;

import React from "react";
import Container from "@/components/global/container";
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
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-6">
            <Link
              href="/tools"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm w-fit">
                <CalendarCheck className="mr-2 h-4 w-4" />
                Productivity Booster
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                AI Schedule Maker
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stop stressing about time management. Enter your tasks and let
                our AI optimize your day for maximum productivity and balance.
              </p>
            </div>
          </div>

          <ScheduleMakerTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Smart Allocation</h3>
              <p className="text-muted-foreground">
                AI intelligently fits tasks into your available hours, ensuring
                you stay on track.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <ListChecks className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Priority First</h3>
              <p className="text-muted-foreground">
                High-priority tasks are automatically scheduled during peak
                hours for effectiveness.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Auto-Breaks</h3>
              <p className="text-muted-foreground">
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

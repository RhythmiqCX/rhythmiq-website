"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Clock,
  Ticket,
  Bot,
  TrendingUp,
  Calculator,
} from "lucide-react";

export default function ChatbotROICalculatorTool() {
  const [hourlyCost, setHourlyCost] = useState<number>(25);
  const [monthlyTickets, setMonthlyTickets] = useState<number>(1000);
  const [timePerTicket, setTimePerTicket] = useState<number>(15);
  const [automationPercent, setAutomationPercent] = useState<number>(50);
  const [aiCost, setAiCost] = useState<number>(948);

  const calculateROI = () => {
    // Annual Cost of Manual Support
    const annualTickets = monthlyTickets * 12;
    const hoursPerYear = (annualTickets * timePerTicket) / 60;
    const manualCost = hoursPerYear * hourlyCost;

    // AI Automation
    const ticketsAutomated = annualTickets * (automationPercent / 100);
    const hoursSaved = (ticketsAutomated * timePerTicket) / 60;
    const grossSavings = hoursSaved * hourlyCost;

    // Final Metrics
    const totalSavings = grossSavings - aiCost;
    const costAfterAI = manualCost - grossSavings + aiCost;
    const roi = aiCost > 0 ? (totalSavings / aiCost) * 100 : 0;

    return {
      manualCost,
      costAfterAI,
      totalSavings,
      hoursSaved,
      roi,
    };
  };

  const results = calculateROI();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
    }).format(val);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Inputs */}
        <MagicCard
          className="p-8 border-border/50 shadow-2xl h-full"
          gradientColor="rgba(16, 185, 129, 0.05)" // Emerald tint
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Support Data</h2>
            </div>

            <p className="text-muted-foreground text-sm">
              Adjust the sliders or enter your metrics manually to calculate
              your potential savings.
            </p>

            <div className="space-y-8 pt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="hourlyCost"
                    className="flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    Agent Cost Per Hour
                  </Label>
                  <span className="font-semibold">
                    {formatCurrency(hourlyCost)}
                  </span>
                </div>
                <Slider
                  id="hourlyCost"
                  min={10}
                  max={150}
                  step={1}
                  value={[hourlyCost]}
                  onValueChange={(val) => setHourlyCost(val[0])}
                  className="[&>.bg-primary]:bg-emerald-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="monthlyTickets"
                    className="flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4 text-blue-500" />
                    Monthly Support Tickets
                  </Label>
                  <span className="font-semibold">
                    {formatNumber(monthlyTickets)}
                  </span>
                </div>
                <Slider
                  id="monthlyTickets"
                  min={100}
                  max={50000}
                  step={100}
                  value={[monthlyTickets]}
                  onValueChange={(val) => setMonthlyTickets(val[0])}
                  className="[&>.bg-primary]:bg-blue-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="timePerTicket"
                    className="flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4 text-orange-500" />
                    Mins to Resolve Ticket
                  </Label>
                  <span className="font-semibold">
                    {formatNumber(timePerTicket)} mins
                  </span>
                </div>
                <Slider
                  id="timePerTicket"
                  min={1}
                  max={60}
                  step={1}
                  value={[timePerTicket]}
                  onValueChange={(val) => setTimePerTicket(val[0])}
                  className="[&>.bg-primary]:bg-orange-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="automationPercent"
                    className="flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4 text-indigo-500" />% Automated by AI
                  </Label>
                  <span className="font-semibold">{automationPercent}%</span>
                </div>
                <Slider
                  id="automationPercent"
                  min={0}
                  max={100}
                  step={5}
                  value={[automationPercent]}
                  onValueChange={(val) => setAutomationPercent(val[0])}
                  className="[&>.bg-primary]:bg-indigo-500"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <Label
                  htmlFor="aiCost"
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  Annual AI Subscription Cost ($)
                </Label>
                <Input
                  id="aiCost"
                  type="number"
                  value={aiCost}
                  onChange={(e) => setAiCost(Number(e.target.value) || 0)}
                  className="bg-background/50 text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </MagicCard>

        {/* Right Column: Results */}
        <div className="space-y-6 flex flex-col justify-start">
          <Card className="border-emerald-500/20 shadow-lg shadow-emerald-500/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -z-10" />
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Yearly Savings
                  </p>
                  <h3 className="text-5xl font-bold text-emerald-500 tracking-tight">
                    {formatCurrency(results.totalSavings)}
                  </h3>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg shadow-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Hours Saved Per Year</p>
                <span className="text-2xl font-bold">
                  {formatNumber(results.hoursSaved)}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    hrs
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg shadow-indigo-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Annual ROI</p>
                <span className="text-3xl font-bold text-indigo-500">
                  {formatNumber(results.roi)}%
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border/50 bg-muted/20">
              <p className="text-sm text-muted-foreground mb-1">
                Manual Support Cost
              </p>
              <p className="text-xl font-semibold line-through text-muted-foreground/50">
                {formatCurrency(results.manualCost)}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-muted/20">
              <p className="text-sm text-muted-foreground mb-1">
                Cost After Automation
              </p>
              <p className="text-xl font-semibold text-foreground">
                {formatCurrency(results.costAfterAI)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Loader2, Download, Maximize2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import {
  generateFloorPlanAction,
  type FloorPlan,
  type RoomType,
} from "@/actions/tools/generate-floor-plan";
import { checkUsageAction } from "@/actions/tools/check-usage";
import { useEffect } from "react";

// --- Constants & Config ---
const ROOM_COLORS: Record<RoomType, string> = {
  master_bedroom: "#e0f2fe", // sky-100
  bedroom: "#f0f9ff", // sky-50
  kitchen: "#fef3c7", // amber-100
  living: "#ecfccb", // lime-100
  dining: "#f5f5f4", // stone-100
  bathroom: "#e0e7ff", // indigo-100
  corridor: "#ffffff", // white
  entrance: "#f3f4f6", // gray-100
};

export default function FloorPlanGeneratorTool() {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(40);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [hasKitchen, setHasKitchen] = useState(true);
  const [hasLiving, setHasLiving] = useState(true);
  const [hasDining, setHasDining] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<FloorPlan | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const checkLimit = async () => {
      const { isLimitReached } = await checkUsageAction(
        "ai-floor-plan-generator",
      );
      setIsLimitReached(isLimitReached);
    };
    checkLimit();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setPlan(null); // Clear previous plan while loading

    try {
      const result = await generateFloorPlanAction({
        width,
        height,
        bedrooms,
        bathrooms,
        hasKitchen,
        hasLiving,
        hasDining,
      });

      if (result.error) {
        toast.error(result.error);
      } else if (result.plan) {
        // Apply colors based on room type since AI might not return them
        const coloredPlan = {
          ...result.plan,
          rooms: result.plan.rooms.map((r) => ({
            ...r,
            color: ROOM_COLORS[r.type] || "#ffffff",
          })),
        };
        setPlan(coloredPlan);
        toast.success("AI Floor Plan generated!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
      const { isLimitReached } = await checkUsageAction(
        "ai-floor-plan-generator",
      );
      setIsLimitReached(isLimitReached);
    }
  };

  const handleDownload = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `floor_plan_${width}x${height}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
      {/* --- Controls --- */}
      <Card className="lg:col-span-1 h-fit">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Set your plot dimensions and requirements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">
              Plot Dimensions (ft)
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Width: {width} ft</Label>
                <Slider
                  min={10}
                  max={100}
                  step={1}
                  value={[width]}
                  onValueChange={(v) => setWidth(v[0])}
                />
              </div>
              <div className="space-y-2">
                <Label>Height: {height} ft</Label>
                <Slider
                  min={10}
                  max={100}
                  step={1}
                  value={[height]}
                  onValueChange={(v) => setHeight(v[0])}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Rooms</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Select
                  value={bedrooms.toString()}
                  onValueChange={(v) => setBedrooms(parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n} BHK
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Select
                  value={bathrooms.toString()}
                  onValueChange={(v) => setBathrooms(parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Zones</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="kitchen" className="flex items-center gap-2">
                  Kitchen
                </Label>
                <Switch
                  id="kitchen"
                  checked={hasKitchen}
                  onCheckedChange={setHasKitchen}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="living" className="flex items-center gap-2">
                  Living Room
                </Label>
                <Switch
                  id="living"
                  checked={hasLiving}
                  onCheckedChange={setHasLiving}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dining" className="flex items-center gap-2">
                  Dining Area
                </Label>
                <Switch
                  id="dining"
                  checked={hasDining}
                  onCheckedChange={setHasDining}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating || isLimitReached}
          >
            {isLimitReached ? (
              <>Limit Reached (5/5)</>
            ) : isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Designing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" /> Generate with AI
              </>
            )}
          </Button>
          {isLimitReached && (
            <p className="text-xs text-red-500 text-center">
              You have reached your daily limit of 5 generations for this tool.
            </p>
          )}
        </CardFooter>
      </Card>

      {/* --- Preview --- */}
      <Card className="lg:col-span-2 min-h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Floor Plan Preview</CardTitle>
            <CardDescription>
              2D Layout Visualization {plan && `(${width}x${height} ft)`}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!plan}
            >
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center bg-muted/20 p-4 md:p-8 rounded-b-lg overflow-hidden relative">
          {!plan ? (
            <div className="text-center text-muted-foreground flex flex-col items-center gap-3">
              {isGenerating ? (
                <div className="flex flex-col items-center animate-pulse">
                  <Wand2 className="h-12 w-12 text-primary opacity-50 mb-2" />
                  <p>Consulting AI Architect...</p>
                </div>
              ) : (
                <>
                  <Maximize2 className="h-12 w-12 opacity-20" />
                  <p>Enter details and click generate to see the layout</p>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white shadow-lg border border-border/50 rounded-lg p-4 relative">
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox={`-2 -2 ${plan.plotWidth + 4} ${plan.plotHeight + 4}`}
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
              >
                {/* Plot Outline */}
                <rect
                  x="0"
                  y="0"
                  width={plan.plotWidth}
                  height={plan.plotHeight}
                  fill="none"
                  stroke="black"
                  strokeWidth="0.5"
                />

                {/* Grid Lines (Subtle) */}
                <pattern
                  id="grid"
                  width="1"
                  height="1"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 1 0 L 0 0 0 1"
                    fill="none"
                    stroke="gray"
                    strokeWidth="0.05"
                    opacity="0.2"
                  />
                </pattern>
                <rect
                  width={plan.plotWidth}
                  height={plan.plotHeight}
                  fill="url(#grid)"
                />

                {/* Rooms */}
                {plan.rooms.map((room) => (
                  <g
                    key={room.id}
                    transform={`translate(${room.x}, ${room.y})`}
                  >
                    <rect
                      width={room.width}
                      height={room.height}
                      fill={room.color || "#ffffff"}
                      stroke="black"
                      strokeWidth="0.2" // Inner walls
                      className="transition-all hover:opacity-80 cursor-pointer"
                    />
                    <text
                      x={room.width / 2}
                      y={room.height / 2}
                      fontSize={Math.min(room.width, room.height) * 0.15}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#374151"
                      fontWeight="bold"
                    >
                      {room.label}
                    </text>
                    <text
                      x={room.width / 2}
                      y={
                        room.height / 2 +
                        Math.min(room.width, room.height) * 0.15
                      }
                      fontSize={Math.min(room.width, room.height) * 0.1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#6b7280"
                    >
                      {Math.round(room.width)}ft x {Math.round(room.height)}ft
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

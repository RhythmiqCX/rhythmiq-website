"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2, CalendarClock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  generateScheduleAction,
  type Task,
  type Priority,
  type ScheduleItem,
} from "@/actions/tools/generate-schedule";
import { checkUsageAction } from "@/actions/tools/check-usage"; // Import check action
import { useEffect } from "react";

export default function ScheduleMakerTool() {
  // Input State
  const [taskName, setTaskName] = useState("");
  const [duration, setDuration] = useState("30");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [specificTime, setSpecificTime] = useState("");

  // App State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    const checkLimit = async () => {
      const { isLimitReached } = await checkUsageAction("ai-schedule-maker");
      setIsLimitReached(isLimitReached);
    };
    checkLimit();
  }, []);

  const addTask = () => {
    if (!taskName.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).slice(2, 9),
      name: taskName,
      duration: parseInt(duration),
      priority,
      specificTime: specificTime || undefined,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setDuration("30");
    setPriority("Medium");
    setSpecificTime("");
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleGenerate = async () => {
    if (tasks.length === 0) {
      toast.error("Please add at least one task.");
      return;
    }

    setIsGenerating(true);
    setSchedule(null);

    try {
      const result = await generateScheduleAction({
        tasks,
        startTime,
        endTime,
      });

      if (result.error) {
        toast.error(result.error);
      } else if (result.schedule) {
        setSchedule(result.schedule);
        toast.success("Schedule generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    } finally {
      setIsGenerating(false);
      // Re-check limit after attempt
      const { isLimitReached } = await checkUsageAction("ai-schedule-maker");
      setIsLimitReached(isLimitReached);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
      {/* --- Left: Input Panel --- */}
      <div className="lg:col-span-1 space-y-6">
        {/* Available Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Work Hours</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Task Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Task Name</Label>
              <Input
                placeholder="e.g. Write Report"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (min)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">1 hr</SelectItem>
                    <SelectItem value="90">1.5 hrs</SelectItem>
                    <SelectItem value="120">2 hrs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(v) => setPriority(v as Priority)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Specific Time (Optional)</Label>
              <Input
                type="time"
                value={specificTime}
                onChange={(e) => setSpecificTime(e.target.value)}
              />
            </div>
            <Button onClick={addTask} className="w-full" variant="secondary">
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          </CardContent>
        </Card>

        {/* Task List */}
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex justify-between">
              <span>Task Queue</span>
              <span className="text-muted-foreground text-sm font-normal">
                {tasks.length} items
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full pr-4">
              {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No tasks added yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-2 rounded-md border bg-muted/40 hover:bg-muted/60 transition-colors"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">{task.name}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[10px] items-center ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-700"
                                : task.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {task.priority}
                          </span>
                          <span>{task.duration} min</span>
                          {task.specificTime && (
                            <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full text-[10px]">
                              @{task.specificTime}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive/50 hover:text-destructive"
                        onClick={() => removeTask(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            <div className="mt-4 pt-4 border-t">
              <Button
                className="w-full"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating || tasks.length === 0 || isLimitReached}
              >
                {isLimitReached ? (
                  <>Limit Reached (5/5)</>
                ) : isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Optimizing...
                  </>
                ) : (
                  <>
                    <CalendarClock className="mr-2 h-4 w-4" /> Generate Schedule
                  </>
                )}
              </Button>
              {isLimitReached && (
                <p className="text-xs text-red-500 text-center mt-2">
                  You have reached your daily limit of 5 generations for this
                  tool.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- Right: Results Panel --- */}
      <div className="lg:col-span-2">
        <Card className="min-h-[600px] flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-primary" />
              Your Optimized Schedule
            </CardTitle>
            <CardDescription>
              AI-generated timeline based on priorities and energy levels.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {!schedule ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4 opacity-50">
                <CalendarClock className="w-16 h-16" />
                <p>Add tasks and generate your schedule to see it here.</p>
              </div>
            ) : (
              <div className="relative border-l-2 border-primary/20 ml-4 pl-8 space-y-8 my-6">
                {schedule.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Dot */}
                    <div
                      className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background ${
                        item.type === "break" ? "bg-green-500" : "bg-primary"
                      }`}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                      <span className="text-sm font-mono font-medium text-muted-foreground flex-shrink-0 w-16">
                        {item.time}
                      </span>

                      <div
                        className={`flex-1 p-4 rounded-xl border ${
                          item.type === "break"
                            ? "bg-green-50/50 border-green-100 text-green-900 border-dashed"
                            : "bg-card border-border shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className={`font-semibold ${item.type === "break" ? "text-green-700" : ""}`}
                          >
                            {item.taskName}
                          </h4>
                          <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                            {item.duration} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* End Marker */}
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 h-3 w-3 rounded-full bg-border" />
                  <span className="text-sm text-muted-foreground ml-0 pl-0">
                    End of Day
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

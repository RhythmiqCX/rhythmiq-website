"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { motion } from "framer-motion";

// Bubble dataset
const initialData = [
  {
    name: "AGI Hype",
    year: 2021,
    hype: 120,
    scale: 300,
    color: "#FF6B6B",
    category: "AGI",
  },
  {
    name: "Agentic AI",
    year: 2024,
    hype: 240,
    scale: 420,
    color: "#FFB84C",
    category: "Agentic",
  },
  {
    name: "AI Chatbots",
    year: 2022,
    hype: 180,
    scale: 310,
    color: "#4ECDC4",
    category: "Chatbots",
  },
  {
    name: "AI in Customer Support",
    year: 2023,
    hype: 210,
    scale: 260,
    color: "#1A73E8",
    category: "Support",
  },
  {
    name: "AI Automation",
    year: 2020,
    hype: 100,
    scale: 180,
    color: "#9C27B0",
    category: "Automation",
  },
  {
    name: "Reality Check",
    year: 2025,
    hype: 80,
    scale: 120,
    color: "#8BC34A",
    category: "Reality",
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, year, hype, scale, category } = payload[0].payload;
    return (
      <div className="bg-background/95 border border-border p-3 rounded-xl shadow-xl text-left">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">Year: {year}</p>
        <p className="text-sm text-muted-foreground">Hype Index: {hype}</p>
        <p className="text-sm text-muted-foreground">Funding Scale: {scale}</p>
        <p className="text-sm text-muted-foreground">Category: {category}</p>
      </div>
    );
  }
  return null;
};

export default function BubbleChart() {
  const [data, setData] = useState(initialData);

  // Gentle floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((d) => ({
          ...d,
          hype: d.hype + Math.sin(Date.now() / 500 + d.scale) * 2, // subtle float
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full h-[600px] flex justify-center items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <ResponsiveContainer width="95%" height="100%">
        <ScatterChart margin={{ top: 30, right: 30, bottom: 30, left: 10 }}>
          <XAxis
            type="number"
            dataKey="year"
            domain={[2019, 2026]}
            tickCount={8}
            label={{ value: "Year", position: "bottom", offset: 0 }}
          />
          <YAxis
            type="number"
            dataKey="hype"
            domain={[0, 300]}
            label={{ value: "Hype Level", angle: -90, position: "insideLeft" }}
          />
          <ZAxis type="number" dataKey="scale" range={[150, 900]} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: "3 3" }}
          />

          {data.map((entry, index) => (
            <Scatter
              key={index}
              data={[entry]}
              fill={entry.color}
              shape={(props: any) => {
                const { cx, cy, fill } = props; // pick only the SVG attributes you need

                return (
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    fill={fill}
                    r={entry.scale / 18}
                    animate={{
                      r: [entry.scale / 20, entry.scale / 18, entry.scale / 22],
                      opacity: [0.8, 1, 0.9],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 3 + index * 0.5,
                    }}
                    style={{ cursor: "pointer" }}
                  />
                );
              }}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="absolute bottom-4 bg-background/70 backdrop-blur-md px-4 py-2 rounded-xl flex gap-4 text-sm">
        {initialData.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: d.color }}
            ></span>
            <span className="text-muted-foreground">{d.category}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

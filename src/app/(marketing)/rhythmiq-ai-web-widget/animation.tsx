"use client";

import { motion } from "framer-motion";

export default function EngineAnimation() {
  return (
    <div className="relative flex justify-center items-center">
      <svg
        width={320}
        height={640}
        viewBox="0 0 320 640"
        xmlns="http://www.w3.org/2000/svg"
        className="object-contain"
      >
        <defs>
          {/* Purple gradient for flow lines */}
          <linearGradient id="flowPurple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Flow lines (data streams) */}
        {[80, 160, 240].map((x, i) => (
          <motion.rect
            key={i}
            x={x}
            y={0}
            width={2}
            height={640}
            fill="url(#flowPurple)"
            initial={{ y: -640 }}
            animate={{ y: 640 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "linear",
            }}
          />
        ))}

        {/* Moving message dots on streams */}
        {[80, 160, 240].map((x, i) =>
          Array.from({ length: 3 }).map((_, j) => (
            <motion.circle
              key={`${i}-${j}`}
              cx={x}
              cy={0}
              r={4}
              fill="#c084fc"
              initial={{ cy: -20 }}
              animate={{ cy: 660 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.6 + j * 1,
                ease: "linear",
              }}
            />
          ))
        )}

        {/* Central glowing core */}
        <motion.circle
          cx={160}
          cy={320}
          r={60}
          fill="url(#flowPurple)"
          style={{ filter: "blur(2px)" }}
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rocket */}
        <motion.g
          initial={{ y: 640 }}
          animate={{ y: -40 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          {/* Rocket body */}
          <ellipse
            cx={160}
            cy={0}
            rx={8}
            ry={20}
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth={1}
          />
          {/* Rocket nose */}
          <path
            d="M152 0 L160 -15 L168 0 Z"
            fill="#ef4444"
            stroke="#dc2626"
            strokeWidth={1}
          />
          {/* Rocket fins */}
          <path
            d="M152 15 L148 25 L156 25 Z"
            fill="#6b7280"
            stroke="#4b5563"
            strokeWidth={1}
          />
          <path
            d="M168 15 L172 25 L164 25 Z"
            fill="#6b7280"
            stroke="#4b5563"
            strokeWidth={1}
          />
          {/* Rocket flame */}
          <motion.ellipse
            cx={160}
            cy={20}
            rx={6}
            ry={15}
            fill="#fbbf24"
            initial={{ scaleY: 1, opacity: 0.8 }}
            animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Core outline */}
        <circle
          cx={160}
          cy={320}
          r={65}
          stroke="#a855f7"
          strokeWidth={2}
          strokeOpacity={0.5}
          fill="none"
        />

        {/* Expanding glow rings */}
        {[90, 120].map((r, i) => (
          <motion.circle
            key={i}
            cx={160}
            cy={320}
            r={r}
            stroke="#a855f7"
            strokeWidth={1.5}
            strokeOpacity={0.3}
            fill="none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: [0.3, 0, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

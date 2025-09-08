'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  height?: string; // default full screen
}

export default function AnimatedSection({ children, height = "h-screen" }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: false });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`${height} w-full flex items-center justify-center snap-start`}
    >
      {children}
    </motion.section>
  );
}

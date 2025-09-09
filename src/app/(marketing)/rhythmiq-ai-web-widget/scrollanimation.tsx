"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  height?: string; // default: full height
  disableOnMobile?: boolean;
}

export default function AnimatedSection({
  children,
  height = "min-h-screen",
  disableOnMobile = false,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Run only on client
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const shouldAnimate = !(disableOnMobile && isMobile);

  return (
    <motion.section
      ref={ref}
      initial={shouldAnimate ? { opacity: 0, y: 80, scale: 0.95 } : {}}
      animate={
        shouldAnimate
          ? isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 80, scale: 0.95 }
          : {}
      }
      transition={shouldAnimate ? { duration: 0.8, ease: "easeInOut" } : {}}
      className={`
        relative
        ${height} w-full snap-start snap-always scroll-mt-16
        px-4 sm:px-6 lg:px-12
        py-12 sm:py-16 lg:py-20
        flex flex-col items-center justify-center
        overflow-x-hidden
      `}
    >
      {/* Subtle animated background overlay */}
      {shouldAnimate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none"
        />
      )}

      <div className="w-full max-w-7xl relative z-10 overflow-x-hidden">{children}</div>
    </motion.section>
  );
}

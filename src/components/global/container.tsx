"use client";

import { cn } from "@/lib";
import { motion } from "framer-motion";

interface Props {
    className?: string;
    children: React.ReactNode;
    delay?: number;
    reverse?: boolean;
    simple?: boolean;
    disableAnimation?: boolean;
}

const Container = ({ children, className, delay = 0.2, reverse, simple, disableAnimation }: Props) => {
    if (disableAnimation) {
        return <div className={cn("w-full h-full", className)}>{children}</div>;
      }

    return (
        <motion.div
            className={cn("w-full h-full", className)}
            initial={{ opacity: 0, y: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: simple ? 0.2 : 0.4, type: simple ? "keyframes" : "spring", stiffness: simple && 100 }}
        >
            {children}
        </motion.div>
    )
};

export default Container

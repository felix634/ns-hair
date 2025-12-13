import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Akkor indul, ha látható

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
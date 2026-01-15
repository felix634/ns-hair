import React from "react";
import { motion } from "framer-motion";

export default function HeroTitle() {
  const name = "Nagy Sándor";
  const sub = "Hair & Beauty";

  return (
    <div className="text-center">
      {/* Név animáció - HALVÁNYÍTVA */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-4 leading-tight"
      >
        {/* Gradiens átlátszóbb lett (from-white/70) */}
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/70 to-gray-500/50 drop-shadow-2xl">
          {name}
        </span>
      </motion.h1>

      {/* Alcím animáció - HALVÁNYÍTVA */}
      <motion.h2 
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "auto" }}
        transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
        // text-ns-silver helyett text-white/40, border is halványabb
        className="text-lg md:text-2xl lg:text-3xl text-white/40 uppercase tracking-[0.3em] md:tracking-[0.5em] font-light border-b border-gray-600/30 pb-6 inline-block whitespace-nowrap overflow-hidden"
      >
        {sub}
      </motion.h2>
    </div>
  );
}
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ServiceCard({ title, items, isFemale }) {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    setRotation({ x: yPct * -10, y: xPct * 10 }); // Max 10 fokos dőlés
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative bg-white/5 p-8 rounded-xl border border-white/10 hover:border-ns-red/50 transition duration-300 hover:bg-white/10 overflow-hidden group"
    >
      {/* Fény effekt */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <h3 className="text-2xl font-bold text-ns-red mb-6 border-b border-gray-700 pb-4 relative z-10">
        {title}
      </h3>
      <ul className="space-y-4 text-gray-200 text-lg relative z-10">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{item.name}</span> <span className="font-bold text-ns-silver">{item.price}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.9,
  scale = false,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const directions = {
      up: { y: 50, x: 0 },
      down: { y: -50, x: 0 },
      left: { y: 0, x: 60 },
      right: { y: 0, x: -60 },
      none: { y: 0, x: 0 },
    };

    const dir = directions[direction] || directions.up;

    const anim = gsap.from(ref.current, {
      opacity: 0,
      y: dir.y,
      x: dir.x,
      scale: scale ? 0.95 : 1,
      duration: duration,
      delay: delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.kill();
    };
  }, [delay, direction, duration, scale]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
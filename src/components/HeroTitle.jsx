import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroTitle() {
  const nameRef = useRef(null);
  const subRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate each letter of the name
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".hero-char");
      tl.from(chars, {
        y: 80,
        opacity: 0,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.04,
        ease: "back.out(1.7)",
      });
    }

    // Animate the decorative line
    if (lineRef.current) {
      tl.from(lineRef.current, {
        scaleX: 0,
        duration: 1,
        ease: "power3.inOut",
      }, "-=0.3");
    }

    // Animate the subtitle
    if (subRef.current) {
      tl.from(subRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");
    }
  }, []);

  const name = "Nagy Sándor";

  return (
    <div className="text-center">
      {/* Name with per-character animation */}
      <h1
        ref={nameRef}
        className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold uppercase tracking-tight mb-4 leading-tight"
        style={{ perspective: "1000px" }}
      >
        {name.split("").map((char, i) => (
          <span
            key={i}
            className="hero-char inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-ns-gold/60"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Decorative line */}
      <div
        ref={lineRef}
        className="w-32 h-[1px] mx-auto bg-gradient-to-r from-transparent via-ns-gold to-transparent mb-6"
        style={{ transformOrigin: "center" }}
      ></div>

      {/* Subtitle */}
      <h2
        ref={subRef}
        className="text-lg md:text-2xl lg:text-3xl text-ns-gold/70 uppercase tracking-[0.3em] md:tracking-[0.5em] font-light font-serif"
      >
        Hair & Beauty
      </h2>
    </div>
  );
}
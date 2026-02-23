import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  function initAnimations() {
    // --- SCROLL PROGRESS BAR ---
    const progressBar = document.querySelector("#scroll-progress");
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    }

    // --- NAVBAR BACKGROUND ---
    const navbar = document.querySelector("#main-navbar");
    if (navbar) {
      ScrollTrigger.create({
        start: "top -80",
        onEnter: () => navbar.classList.add("nav-scrolled"),
        onLeaveBack: () => navbar.classList.remove("nav-scrolled"),
      });
    }

    // --- PARALLAX HERO BACKGROUND ---
    const heroBg = document.querySelector("#hero-bg");
    if (heroBg) {
      gsap.to(heroBg, {
        y: 200,
        scale: 1.1,
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // --- HERO CONTENT FADE ON SCROLL ---
    const heroContent = document.querySelector("#hero-content");
    if (heroContent) {
      gsap.to(heroContent, {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: "#hero-section",
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // --- SECTION REVEALS ---
    const sections = document.querySelectorAll(".gsap-section");
    sections.forEach((section) => {
      const heading = section.querySelector(".gsap-heading");
      const accentLine = section.querySelector(".accent-line");
      const subtext = section.querySelector(".gsap-subtext");
      const content = section.querySelectorAll(".gsap-content");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none none",
        },
      });

      if (heading) {
        tl.from(heading, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          immediateRender: false,
        });
      }

      if (accentLine) {
        tl.from(accentLine, {
          scaleX: 0,
          duration: 0.8,
          ease: "power2.out",
          immediateRender: false,
        }, "-=0.5");
      }

      if (subtext) {
        tl.from(subtext, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          immediateRender: false,
        }, "-=0.4");
      }

      if (content.length > 0) {
        tl.from(content, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          immediateRender: false,
        }, "-=0.3");
      }
    });

    // --- GALLERY STAGGER ---
    const galleryCards = document.querySelectorAll(".gallery-card");
    if (galleryCards.length > 0) {
      gsap.from(galleryCards, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#munkaink",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // --- STAT COUNTERS ---
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString("hu-HU");
        },
      });
    });

    // --- CONTACT SECTION SLIDE ---
    const contactLeft = document.querySelector("#contact-info");
    const contactRight = document.querySelector("#contact-map");

    if (contactLeft) {
      gsap.from(contactLeft, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#idopont",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    if (contactRight) {
      gsap.from(contactRight, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#idopont",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // --- FLOATING DECORATIVE ELEMENTS ---
    const floatingEls = document.querySelectorAll(".float-element");
    floatingEls.forEach((el, i) => {
      gsap.to(el, {
        y: `random(-30, 30)`,
        x: `random(-15, 15)`,
        duration: `random(4, 7)`,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.5,
      });
    });
  }

  return null; // This is a side-effect-only component
}

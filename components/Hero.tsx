"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SparklesPreview } from "@/components/SparklesPreview";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import MarqueeText from "@/components/MarqueeText";

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  // Intersection Observer untuk memantau Hero Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeroVisible(true);
          } else {
            setIsHeroVisible(false);
          }
        });
      },
      { threshold: 0.5 } // Tuning threshold agar lebih responsif
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Floating Navbar: No motion effect */}
      <div className="fixed top-5 left-0 w-full z-[10]">
        <FloatingNav
          navItems={[
            { name: "Home", link: "/", icon: <span>🏠</span> },
            { name: "About", link: "/about", icon: <span>📖</span> },
            { name: "Contact", link: "/contact", icon: <span>✉️</span> },
          ]}
        />
      </div>

      {/* Sparkles Preview with motion effect */}
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate={isHeroVisible ? "visible" : "hidden"}
        className="flex justify-center relative"
      >
        <SparklesPreview />
      </motion.div>

      {/* Marquee Text (Tanpa Animasi) */}
      <div className="absolute bottom-0 w-full">
        <MarqueeText />
      </div>
    </section>
  );
};

export default Hero;

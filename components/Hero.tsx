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
    <motion.section
      id="hero-section"
      ref={sectionRef}
      className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden"
      initial="hidden"
      animate={isHeroVisible ? "visible" : "hidden"}
      variants={fadeInVariants} // Gunakan varian animasi
    >
      {/* Floating Navbar */}
      <motion.div
        variants={fadeInVariants}
        className="fixed top-5 left-0 w-full z-[10]"
      >
        <FloatingNav
          navItems={[
            { name: "Home", link: "/", icon: <span>🏠</span> },
            { name: "About", link: "/about", icon: <span>📖</span> },
            { name: "Contact", link: "/contact", icon: <span>✉️</span> },
          ]}
        />
      </motion.div>

      {/* Sparkles Preview */}
      <motion.div
        variants={fadeInVariants}
        className="flex justify-center relative"
      >
        <SparklesPreview />
      </motion.div>

      {/* Marquee Text (Tanpa Animasi) */}
      <div className="absolute bottom-0 w-full">
        <MarqueeText />
      </div>
    </motion.section>
  );
};

export default Hero;

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HoverEffect } from "@/components/ui/CardHover";
import { memberItems } from "@/data/members";

const ITEMS_PER_PAGE = 6; // Jumlah kartu yang ditampilkan per halaman

const OurMember: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE); // State untuk melacak jumlah kartu yang terlihat

  // Intersection Observer untuk memantau viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0, rootMargin: "200px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Fungsi untuk memuat lebih banyak kartu
  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <motion.section
      id="our-member"
      ref={sectionRef}
      className="relative min-h-screen bg-transparent text-white overflow-hidden z-[1]"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Title */}
      <motion.h1
        className="absolute top-10 left-5 right-5 z-10 text-3xl md:text-6xl font-bold text-left"
        initial={{ opacity: 0, y: -50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        OUR MEMBER
      </motion.h1>

      {/* Cards */}
      <div className="relative z-10 pt-16 px-5">
        <HoverEffect
          items={memberItems.slice(0, visibleCount).map((member) => ({
            ...member,
            content: (
              <div>
                <div className="text-lg font-bold">{member.title}</div>
                {member.role && (
                  <div className="text-sm text-gray-400 mt-1">
                    {member.role}
                  </div>
                )}
              </div>
            ),
          }))}
        />
      </div>

      {/* Load More Button */}
      {visibleCount < memberItems.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Load More
          </button>
        </div>
      )}
    </motion.section>
  );
};

export default OurMember;

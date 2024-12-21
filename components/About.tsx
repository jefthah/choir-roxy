"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { InfiniteMovingCards } from "../components/ui/InfiniteMovingCards";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Data untuk InfiniteMovingCards
  const items = [
    {
      quote: "Singing praises brings us closer to God.",
      name: "John Doe",
      title: "Choir Member",
    },
    {
      quote: "Through music, we find hope and faith.",
      name: "Jane Smith",
      title: "Outreach Coordinator",
    },
    {
      quote: "Every note we sing is a prayer.",
      name: "Emily Johnson",
      title: "Conductor",
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 sm:px-12 "
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      {/* Layout Mobile */}
      <div className="flex flex-col gap-6 md:hidden items-center">
        <h2 className="text-5xl font-extrabold text-center">About Us</h2>
        <div className="w-[90%] rounded-lg overflow-hidden">
          <Image
            src="/paralax/member.jpeg"
            alt="Pelayanan Gereja"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
        <p className="text-xl text-gray-300 text-center leading-relaxed px-4">
          Our mission is to serve the church community with love, compassion,
          and dedication. Through our choir and outreach programs, we aim to
          bring hope and inspiration to those we serve, reflecting the values
          and teachings of Christ.
        </p>
      </div>

      {/* Layout Desktop */}
      <div className="hidden md:flex flex-row items-center gap-12 max-w-[90%] mx-auto md:mt-16 ml-40"> {/* Tambahkan md:mt-16 untuk geser */}
        {/* Bagian Teks */}
        <div className="flex-1 text-left">
          <h2 className="text-5xl font-extrabold mb-8">About Us</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our mission is to serve the church community with love, compassion,
            and dedication. Through our choir and outreach programs, we aim to
            bring hope and inspiration to those we serve, reflecting the values
            and teachings of Christ.
          </p>
        </div>

        {/* Bagian Gambar */}
        <div className="flex-1">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/paralax/p1.jpeg"
              alt="Pelayanan Gereja"
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Infinite Moving Cards */}
      <div className="mt-8 w-full md:mt-16">
  <InfiniteMovingCards
    items={items}
    direction="left"
    speed="normal"
    pauseOnHover={true}
    className="gap-2 sm:gap-4 md:gap-8" // Perbaiki gap sesuai kebutuhan
  />
</div>


    </motion.section>
  );
};

export default About;

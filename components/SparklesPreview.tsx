"use client";
import React, { useEffect, useState } from "react";
import { SparklesCore } from "./ui/sparkles";
import { motion } from "framer-motion";
import { bible } from "../data/bible"; // Import data dari file bible.ts
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

export function SparklesPreview() {
  const [quote, setQuote] = useState(bible[0]);

  useEffect(() => {
    const randomQuote = bible[Math.floor(Math.random() * bible.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center overflow-hidden relative " // Memusatkan elemen
    >
      {/* Sparkles Core */}
      <div className="absolute top-0 left-0 w-full h-full">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Konten Utama */}
      <div className="relative flex flex-col text-center items-center space-y-4 z-[1] max-w-[80%]">
        {" "}
        {/* Tambahkan z-[1] */}
        {/* Judul */}
        <h1
          className="font-bold text-white leading-snug typewriter"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)", // Font responsif
            whiteSpace: "nowrap",
            overflow: "hidden",
            textAlign: "center",
            maxWidth: "90vw",
          }}
        >
          Tiberias <span className="text-[#CBACF9]">Choir Roxy</span>
          <span className="blinking text-[#CBACF9]">|</span>
        </h1>
        {/* Kutipan Alkitab */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="mt-2 px-8 py-6 bg-black/50 rounded-lg shadow-lg w-full max-w-[90%] text-center"
        >
          <p className="text-[#CBACF9] text-lg md:text-2xl italic leading-relaxed break-words">
            &quot;Then Jesus spoke to them again, saying, I am the light of the
            world. He who follows Me shall not walk in darkness, but have the
            light of life&quot;
          </p>
          <p className="mt-1 text-sm text-white/75">- John 8:12</p>
        </motion.div>
      </div>
    </div>
  );
}

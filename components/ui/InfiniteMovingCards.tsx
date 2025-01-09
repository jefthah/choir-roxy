"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    title: string;
    image: string; // Tambahan properti untuk gambar
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const setDirection = useCallback(() => {
    if (containerRef.current) {
      const animationDirection = direction === "left" ? "forwards" : "reverse";
      containerRef.current.style.setProperty(
        "--animation-direction",
        animationDirection
      );
    }
  }, [direction]);

  const setSpeed = useCallback(() => {
    if (containerRef.current) {
      let duration = "40s"; // Default speed (normal)
      if (speed === "fast") duration = "20s";
      if (speed === "slow") duration = "80s";

      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplikasi elemen untuk efek scroll tanpa henti
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setDirection();
      setSpeed();
    }
  }, [setDirection, setSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden h-[450px]", // Tinggi diperbesar
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max justify-start shrink-0 gap-8 sm:gap-12 md:gap-16 py-6 flex-nowrap animate-scroll", // Gap lebih besar
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="min-w-[300px] sm:min-w-[400px] md:min-w-[600px] max-w-full relative rounded-lg border border-slate-700 flex items-center px-8 sm:px-12 py-6 sm:py-8 gap-6" // Gambar dan teks lebih besar
          >
            {/* Gambar dengan rounded kecil */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 flex-shrink-0 overflow-hidden rounded-lg"> {/* Tambahkan rounded-lg */}
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                className="object-cover w-full h-full rounded-lg" // Tambahkan rounded kecil
              />
            </div>
            {/* Teks */}
            <blockquote className="flex-1">
              <span className="relative z-20 text-base sm:text-lg md:text-xl leading-[1.8] text-gray-100 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-4 sm:mt-6">
                <span className="text-sm sm:text-base md:text-lg leading-[1.8] text-gray-400 font-bold">
                  {item.title}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

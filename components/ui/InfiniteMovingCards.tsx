"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
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

  // Fungsi untuk menambahkan animasi scrolling
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
        "scroller relative z-20 w-full overflow-hidden h-[350px]", // Height tetap untuk pembungkus
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max justify-start shrink-0 gap-6 sm:gap-8 md:gap-12 py-4 flex-nowrap animate-scroll", // Gap dinamis berdasarkan ukuran layar
          pauseOnHover && "hover:[animation-play-state:paused]" // Pause saat hover
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="min-w-[250px] sm:min-w-[350px] md:min-w-[500px] max-w-full relative rounded-2xl border border-slate-700 px-8 sm:px-12 py-6 sm:py-8" // Sesuaikan ukuran padding
          >
            <blockquote>
              <span className="relative z-20 text-sm sm:text-base md:text-lg leading-[1.8] text-gray-100 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-4 sm:mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm sm:text-base md:text-lg leading-[1.8] text-gray-400 font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm sm:text-base md:text-lg leading-[1.8] text-gray-400 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

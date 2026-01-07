"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";

export type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  isVideo?: boolean;
};

export const Carousel = ({
  items,
  initialScroll = 0,
}: {
  items: JSX.Element[];
  initialScroll?: number;
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  const handleScroll = () => {
    if (!carouselRef.current || isScrolling) return;
    setIsScrolling(true);

    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / cardWidth);

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }

    setTimeout(() => setIsScrolling(false), 150);
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex gap-4 px-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="snap-center min-w-[85vw] md:min-w-[60vw] lg:min-w-[40vw]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useOutsideClick(cardRef, () => {
    setIsHovered(false);
  });

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout={layout}
      className={cn(
        "relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden group cursor-pointer"
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Background Video/Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={card.src}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {card.isVideo ? (
            <video
              src={card.src}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={card.src}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <p className="text-sm md:text-base font-medium text-white/80 mb-2">
            {card.category}
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {card.title}
          </h3>
        </motion.div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/20">
                {card.content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover Indicator */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/60"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};


import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Carousel, Card, type Card as CardType } from "@/components/ui/apple-cards-carousel";

const videoData: CardType[] = [
  {
    category: "Marketing Campaign",
    title: "Creative Excellence",
    src: "/work done/marketing/vid1.mp4",
    isVideo: true,
    content: (
      <div className="text-white/90 text-sm md:text-base space-y-2">
        <p>
          Our marketing campaigns combine creativity with data-driven strategies to deliver 
          exceptional results. Each video tells a story that resonates with your audience.
        </p>
      </div>
    ),
  },
  {
    category: "Brand Storytelling",
    title: "Engaging Narratives",
    src: "/work done/marketing/vid2.mp4",
    isVideo: true,
    content: (
      <div className="text-white/90 text-sm md:text-base space-y-2">
        <p>
          We craft compelling narratives that connect with audiences on an emotional level, 
          driving engagement and building lasting brand relationships.
        </p>
      </div>
    ),
  },
  {
    category: "Digital Marketing",
    title: "Innovative Solutions",
    src: "/work done/marketing/vid3.mp4",
    isVideo: true,
    content: (
      <div className="text-white/90 text-sm md:text-base space-y-2">
        <p>
          Leveraging cutting-edge digital marketing techniques to amplify your brand's 
          presence and reach your target audience effectively.
        </p>
      </div>
    ),
  },
  {
    category: "Content Creation",
    title: "Visual Storytelling",
    src: "/work done/marketing/vid4.mp4",
    isVideo: true,
    content: (
      <div className="text-white/90 text-sm md:text-base space-y-2">
        <p>
          High-quality video content that captures attention and communicates your message 
          with clarity and impact.
        </p>
      </div>
    ),
  },
  {
    category: "Campaign Strategy",
    title: "Results-Driven Approach",
    src: "/work done/marketing/vid5.mp4",
    isVideo: true,
    content: (
      <div className="text-white/90 text-sm md:text-base space-y-2">
        <p>
          Every campaign is designed with measurable outcomes in mind, ensuring your 
          marketing investment delivers tangible business results.
        </p>
      </div>
    ),
  },
  {
    category: "Marketing Innovation",
    title: "Future of Marketing",
    src: "/work done/marketing/vid6.mp4",
    isVideo: true,
    content: (
      <div className="text-white/90 text-sm md:text-base space-y-2">
        <p>
          Pioneering new approaches to marketing that set trends and create memorable 
          experiences for your audience.
        </p>
      </div>
    ),
  },
];

export const VideoCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = videoData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section 
      ref={ref}
      className="w-full py-20 bg-[#E3E7ED]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl pl-4 mx-auto mb-12"
      >
        <h2 className="text-xl md:text-5xl font-bold text-[#0F122E] font-sans">
          Marketing <span className="text-[#6B50A2]">Excellence</span>
        </h2>
        <p className="text-[#645876] text-sm md:text-lg mt-4 max-w-2xl">
          Explore our portfolio of successful marketing campaigns that drive results and engage audiences.
        </p>
      </motion.div>
      <Carousel items={cards} />
    </section>
  );
};


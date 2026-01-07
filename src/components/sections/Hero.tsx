import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#E3E7ED]">
      {/* Animated Background with subtle patterns */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Subtle wavy pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(107, 80, 162, 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Content Container */}
      <div className="relative z-10 section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-tight text-[#0F122E]"
            >
              BRING ALL YOUR<br />
              IDEAS TO LIFE WITH OUR<br />
              <span className="text-[#6B50A2]">CREATIVE MAGIC</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-[#645876] max-w-xl leading-relaxed"
            >
              Our creative team gets to work, crafting a custom design that's not only beautiful but functional. We develop your landing page using the latest technologies and best practices.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <a href="#contact" className="btn-hero-secondary flex items-center gap-2 group">
                Get started
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <button className="w-14 h-14 rounded-full bg-[#0F122E] flex items-center justify-center text-white hover:bg-[#1a1f3a] transition-all duration-300 hover:scale-110 shadow-lg">
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Abstract Shape */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[600px] lg:h-[700px]"
          >
            {/* Abstract 3D Shape */}
            <div className="abstract-3d-container absolute inset-0">
              <div className="abstract-3d-shape" />
              {/* Additional gradient layers for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6B50A2]/20 via-[#8B6FC5]/30 to-[#A88ED8]/20 rounded-full blur-3xl" />
            </div>

            {/* Overlay Card - Qualified team */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-20 right-0 glass-card p-6 max-w-xs"
            >
              <h3 className="text-xl font-bold text-[#6B50A2] mb-3">Qualified team</h3>
              <p className="text-sm text-[#645876] leading-relaxed mb-4">
                We delve deep into your business target audience, and competitive landscape. Armed with this
              </p>
              <button className="w-10 h-10 rounded-full bg-[#0F122E] flex items-center justify-center text-white hover:bg-[#1a1f3a] transition-all duration-300 ml-auto">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Geometric Shape at bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="20" cy="50" r="15" fill="none" stroke="#0F122E" strokeWidth="2" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="#0F122E" strokeWidth="2" />
                <circle cx="80" cy="50" r="15" fill="none" stroke="#0F122E" strokeWidth="2" />
                <line x1="35" y1="50" x2="65" y2="50" stroke="#0F122E" strokeWidth="2" />
                <line x1="65" y1="50" x2="95" y2="50" stroke="#0F122E" strokeWidth="2" />
                <polygon points="95,50 85,45 85,55" fill="#0F122E" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

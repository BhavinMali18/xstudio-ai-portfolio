import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Lightbulb, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Deep dive into your business, audience, and goals to understand what makes you unique.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Lightbulb,
    title: "Strategize",
    description: "Craft a data-driven strategy powered by AI insights and creative thinking.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Transform strategy into stunning visuals and compelling brand experiences.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Code2,
    title: "Build",
    description: "Develop robust solutions using cutting-edge technology and best practices.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deploy with precision, ensuring everything works flawlessly from day one.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: TrendingUp,
    title: "Scale with AI",
    description: "Continuously optimize and grow using AI-powered analytics and automation.",
    color: "from-rose-500 to-orange-500",
  },
];

export const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding relative overflow-hidden bg-secondary/20" ref={ref}>
      <div className="absolute inset-0 ai-grid-bg opacity-20" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Process</span>
          <h2 className="section-title mt-4 mb-6">
            From Idea to <span className="gradient-text">AI-Powered Success</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our proven 6-step process ensures every project is delivered with excellence, 
            on time, and optimized for growth.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-card-hover p-8 h-full">
                {/* Step Number */}
                <div className="absolute top-6 right-6 text-5xl font-bold text-muted/30 font-display">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connection Line (visual only for desktop) */}
                {index < steps.length - 1 && index !== 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-border to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-hero-primary inline-flex items-center gap-2">
            Start Your Project
            <Rocket className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

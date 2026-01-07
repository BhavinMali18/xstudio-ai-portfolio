import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Palette,
  Megaphone,
  Globe,
  Smartphone,
  Database,
  TrendingUp,
  Bot,
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Marketing & Automation",
    description: "Leverage machine learning to automate campaigns, optimize ad spend, and predict customer behavior for maximum ROI.",
  },
  {
    icon: Palette,
    title: "Brand Strategy & Identity",
    description: "Craft compelling brand narratives and visual identities that resonate with your audience and stand the test of time.",
  },
  {
    icon: Megaphone,
    title: "Graphic Design & Content",
    description: "Create stunning visuals, from social media graphics to comprehensive brand collateral that captivates and converts.",
  },
  {
    icon: Globe,
    title: "Social Media Management",
    description: "Build and engage your community with data-driven social strategies that amplify your brand voice across platforms.",
  },
  {
    icon: Smartphone,
    title: "Website & App Development",
    description: "Design and develop responsive websites and mobile apps that deliver exceptional user experiences and drive conversions.",
  },
  {
    icon: Database,
    title: "CRM & Custom Software",
    description: "Build tailored software solutions and CRM systems that streamline operations and enhance customer relationships.",
  },
  {
    icon: TrendingUp,
    title: "SEO & Performance Marketing",
    description: "Dominate search rankings and maximize marketing performance with AI-powered optimization strategies.",
  },
  {
    icon: Bot,
    title: "AI Chatbots & Voice Assistants",
    description: "Deploy intelligent conversational AI that handles customer queries 24/7 while collecting valuable insights.",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-secondary/20" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 ai-grid-bg opacity-20" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[150px]" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Services</span>
          <h2 className="section-title mt-4 mb-6">
            Full-Stack Solutions for{" "}
            <span className="gradient-text">Modern Brands</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From strategy to execution, we offer end-to-end services that transform your 
            vision into reality with the power of AI and creative excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass-card-hover p-6"
            >
              {/* Icon */}
              <div className="service-icon mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold font-display mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover Indicator */}
              <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Learn more</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

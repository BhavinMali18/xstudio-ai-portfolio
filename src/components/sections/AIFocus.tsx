import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  BarChart3, 
  Zap, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  Brain 
} from "lucide-react";

const aiFeatures = [
  {
    icon: BarChart3,
    title: "AI-Driven Audience Analysis",
    description: "Deep learning algorithms analyze your target audience to uncover insights that drive personalized marketing strategies.",
  },
  {
    icon: Zap,
    title: "Automated Campaigns",
    description: "Set up intelligent automation that optimizes campaigns in real-time based on performance data and user behavior.",
  },
  {
    icon: FileText,
    title: "Smart Content Generation",
    description: "AI-powered content creation tools that generate engaging copy, visuals, and multimedia tailored to your brand voice.",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots & Voice Systems",
    description: "Deploy conversational AI that handles customer interactions 24/7 while continuously learning and improving.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Marketing Insights",
    description: "Forecast trends, predict customer behavior, and make data-driven decisions with our advanced analytics platform.",
  },
];

const stats = [
  { value: 3, suffix: "x", label: "Average Growth" },
  { value: 40, suffix: "%", label: "Cost Reduction" },
  { value: 60, suffix: "%", label: "Time Saved" },
  { value: 24, suffix: "/7", label: "AI Support" },
];

const AnimatedCounter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="stat-number">
      {count}{suffix}
    </span>
  );
};

export const AIFocus = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai-focus" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Glowing Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered</span>
          </div>
          <h2 className="section-title mb-6">
            AI at the Core of{" "}
            <span className="gradient-text">Everything We Do</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We don't just use AI—we build with it. Our AI-first approach ensures every 
            solution we deliver is optimized for performance, scalability, and results.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="glass-card p-6 text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* AI Features */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Feature List */}
          <div className="space-y-6">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group flex gap-5 p-5 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div className="service-icon flex-shrink-0 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold font-display mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - AI Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-card p-8 md:p-12">
              {/* Animated Flow Diagram */}
              <div className="relative aspect-square max-w-sm mx-auto">
                {/* Center Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary z-10">
                  <Brain className="w-10 h-10 text-primary-foreground" />
                </div>

                {/* Orbiting Elements */}
                {[
                  { icon: "📊", label: "Data", angle: 0 },
                  { icon: "🎯", label: "Strategy", angle: 72 },
                  { icon: "✨", label: "Content", angle: 144 },
                  { icon: "🚀", label: "Launch", angle: 216 },
                  { icon: "📈", label: "Growth", angle: 288 },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 30, 
                      repeat: Infinity, 
                      ease: "linear",
                    }}
                    style={{ 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                    }}
                    className="w-0 h-0"
                  >
                    <div 
                      className="absolute glass-card px-4 py-3 flex items-center gap-2 whitespace-nowrap"
                      style={{
                        transform: `rotate(${item.angle}deg) translateX(120px) rotate(-${item.angle}deg)`,
                      }}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: 'center' }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

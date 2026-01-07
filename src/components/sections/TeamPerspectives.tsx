import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Target, ArrowUpRight } from "lucide-react";

const perspectives = [
  {
    role: "Developers",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    quotes: [
      "We build with cutting-edge technologies, ensuring scalability and performance from day one.",
      "Clean code, modern frameworks, and best practices are at the core of everything we develop.",
      "Every line of code is written with the user experience in mind, creating seamless digital experiences."
    ]
  },
  {
    role: "Designers",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    quotes: [
      "Design isn't just about aesthetics—it's about solving problems and creating meaningful connections.",
      "We craft visual experiences that tell your story and resonate with your audience on an emotional level.",
      "Every pixel is intentional, every color choice strategic, every animation purposeful."
    ]
  },
  {
    role: "Strategists",
    icon: Target,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    quotes: [
      "Data-driven insights guide every decision, ensuring your brand reaches the right audience at the right time.",
      "We analyze market trends, competitor landscapes, and user behavior to craft winning strategies.",
      "Strategic thinking combined with creative execution—that's how we deliver measurable results."
    ]
  }
];

export const TeamPerspectives = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team-perspectives" className="section-padding relative overflow-hidden bg-[#E3E7ED]" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#6B50A2]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#6B50A2]/5 rounded-full blur-[150px]" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#6B50A2] text-sm font-semibold uppercase tracking-wider">Our Team</span>
          <h2 className="section-title mt-4 mb-6 text-[#0F122E]">
            Different <span className="text-[#6B50A2]">Perspectives</span>, One Vision
          </h2>
          <p className="section-subtitle mx-auto text-[#645876]">
            Hear from our team members about what drives them and how they approach their craft.
          </p>
        </motion.div>

        {/* Perspective Cards */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {perspectives.map((perspective, index) => (
              <motion.div
                key={perspective.role}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="flex h-full"
              >
                <div className={`glass-card p-6 md:p-8 ${perspective.bgColor} border-2 ${perspective.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full w-full relative`}>
                  {/* Icon */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${perspective.color} flex items-center justify-center mb-6 shadow-lg flex-shrink-0`}>
                    <perspective.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl md:text-2xl font-bold font-display mb-4 ${perspective.textColor} flex-shrink-0`}>
                    What {perspective.role} Say
                  </h3>

                  {/* Quotes */}
                  <div className="space-y-3 flex-grow">
                    {perspective.quotes.map((quote, qIndex) => (
                      <motion.p
                        key={qIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.2 + qIndex * 0.1 }}
                        className="text-sm text-[#645876] leading-relaxed"
                      >
                        {quote}
                      </motion.p>
                    ))}
                  </div>

                  {/* Arrow Indicator */}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#0F122E] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer flex-shrink-0"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid md:grid-cols-3 gap-6"
        >
          {[
            { label: "Developers", value: "15+", desc: "Expert coders" },
            { label: "Designers", value: "12+", desc: "Creative minds" },
            { label: "Strategists", value: "8+", desc: "Data experts" }
          ].map((stat, index) => (
            <div key={stat.label} className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-[#6B50A2] mb-2">{stat.value}</div>
              <div className="text-sm font-semibold text-[#0F122E] mb-1">{stat.label}</div>
              <div className="text-xs text-[#645876]">{stat.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


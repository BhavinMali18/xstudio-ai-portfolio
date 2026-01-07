import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const categories = ["All", "Branding", "Marketing", "IT Solutions", "Mobile Apps"];

const projects = [
  {
    id: 1,
    title: "NeoBank Rebrand",
    category: "Branding",
    description: "Complete brand identity redesign for a digital-first banking startup.",
    tags: ["Brand Strategy", "Visual Identity", "Guidelines"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "GrowthAI Campaign",
    category: "Marketing",
    description: "AI-powered marketing automation that increased conversions by 340%.",
    tags: ["AI Marketing", "Automation", "Analytics"],
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    title: "HealthTech Dashboard",
    category: "IT Solutions",
    description: "Custom analytics platform for healthcare providers with real-time insights.",
    tags: ["Dashboard", "React", "Data Viz"],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "FitLife App",
    category: "Mobile Apps",
    description: "AI-powered fitness app with personalized workout recommendations.",
    tags: ["React Native", "AI/ML", "UX Design"],
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    title: "EcoStart Identity",
    category: "Branding",
    description: "Sustainable brand identity for an eco-conscious startup accelerator.",
    tags: ["Logo Design", "Brand Voice", "Packaging"],
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 6,
    title: "SaaS Growth Engine",
    category: "Marketing",
    description: "Full-funnel marketing strategy that scaled MRR from $10K to $100K.",
    tags: ["SEO", "Content", "Paid Media"],
    gradient: "from-blue-500 to-indigo-600",
  },
];

export const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden bg-secondary/20" ref={ref}>
      <div className="absolute inset-0 ai-grid-bg opacity-20" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Work</span>
          <h2 className="section-title mt-4 mb-6">
            Featured <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Explore our portfolio of successful projects spanning branding, marketing, 
            and technology solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group glass-card-hover overflow-hidden"
            >
              {/* Project Image/Gradient */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-black/30 backdrop-blur-sm rounded text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold font-display mt-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="btn-hero-secondary inline-flex items-center gap-2">
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

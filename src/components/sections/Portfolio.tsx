import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, ArrowUpRight, X, ChevronLeft, ChevronRight, Star, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = ["All", "Branding", "Marketing", "IT Solutions", "Mobile Apps", "SaaS"];

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  images?: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NeoBank Rebrand",
    category: "Branding",
    description: "Complete brand identity redesign for a digital-first banking startup. Modern, trustworthy, and innovative visual system.",
    tags: ["Brand Strategy", "Visual Identity", "Guidelines", "UI/UX"],
    gradient: "from-cyan-500 to-blue-600",
    images: [
      "/work done/neobank_files/Screenshot 2026-01-07 225911.png",
      "/work done/neobank_files/Screenshot 2026-01-07 225929.png",
      "/work done/neobank_files/Screenshot 2026-01-07 225950.png",
      "/work done/neobank_files/Screenshot 2026-01-07 230008.png",
      "/work done/neobank_files/Screenshot 2026-01-07 230323.png",
      "/work done/neobank_files/Screenshot 2026-01-07 230336.png",
      "/work done/neobank_files/Screenshot 2026-01-07 230353.png",
      "/work done/neobank_files/Screenshot 2026-01-07 230406.png",
      "/work done/neobank_files/Screenshot 2026-01-07 230429.png",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Our Creative",
    category: "Branding",
    description: "Showcasing our creative excellence through innovative design solutions and visual storytelling.",
    tags: ["Creative Design", "Visual Identity", "Branding", "UI/UX"],
    gradient: "from-emerald-500 to-teal-600",
    images: [
      "/work done/1seclookofourwork/Screenshot 2026-01-07 232416.png",
      "/work done/1seclookofourwork/Screenshot 2026-01-07 232425.png",
      "/work done/1seclookofourwork/Screenshot 2026-01-07 232437.png",
      "/work done/1seclookofourwork/Screenshot 2026-01-07 232446.png",
      "/work done/1seclookofourwork/Screenshot 2026-01-07 232454.png",
    ],
    featured: true,
  },
  {
    id: 3,
    title: "SaaS Growth Engine",
    category: "SaaS",
    description: "Full-funnel marketing strategy that scaled MRR from $10K to $100K. Comprehensive SEO and content marketing solution for SaaS platforms.",
    tags: ["SEO", "Content", "Paid Media", "Growth Strategy"],
    gradient: "from-blue-500 to-indigo-600",
    images: [
      "/work done/seoworkengine/Screenshot 2026-01-07 231014.png",
    ],
    featured: true,
  },
];

export const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Keyboard navigation for image gallery
  useEffect(() => {
    if (!selectedProject || !selectedProject.images) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => 
          prev === 0 ? selectedProject.images!.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => 
          prev === selectedProject.images!.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedProject]);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden bg-[#E3E7ED]" ref={ref}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(107, 80, 162, 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-[#6B50A2] text-sm font-semibold uppercase tracking-wider">Our Work</span>
          <h2 className="section-title mt-4 mb-6 text-[#0F122E]">
            Featured <span className="text-[#6B50A2]">Case Studies</span>
          </h2>
          <p className="section-subtitle mx-auto text-[#645876]">
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
                  ? "bg-[#6B50A2] text-white"
                  : "bg-white/50 text-[#645876] hover:text-[#0F122E] hover:bg-white/80 border border-[#645876]/20"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredProjects.map((project, index) => (
              <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative bg-gradient-to-br from-[#0F122E] to-[#1a1f3a] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col ${
                    project.featured ? "ring-2 ring-[#6B50A2]/30" : ""
                  }`}
                >
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-2 py-1 bg-[#6B50A2] text-white rounded-full text-xs font-semibold">
                      <Star className="w-3 h-3 fill-white" />
                      Featured
                    </div>
                  )}

                  {/* Project Image */}
                  <div 
                    className="relative h-64 overflow-hidden cursor-pointer"
                    onClick={() => {
                      if (project.images && project.images.length > 0) {
                        setSelectedProject(project);
                        setCurrentImageIndex(0);
                      }
                    }}
                  >
                    {project.images && project.images.length > 0 ? (
                      <>
                        <img 
                          src={project.images[0]} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F122E]/80 via-transparent to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm rounded text-white">
                            {project.images.length} images
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`}>
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      <span className="text-xs text-[#6B50A2] font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold font-display mt-2 mb-3 text-white">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <button
                      onClick={() => {
                        if (project.images && project.images.length > 0) {
                          setSelectedProject(project);
                          setCurrentImageIndex(0);
                        }
                      }}
                      className="mt-auto w-full bg-white text-[#0F122E] font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group/btn"
                    >
                      Learn More
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white/90 hover:bg-white border-[#645876]/20 text-[#0F122E]" />
          <CarouselNext className="right-0 bg-white/90 hover:bg-white border-[#645876]/20 text-[#0F122E]" />
        </Carousel>

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

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {selectedProject && selectedProject.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-[#0F122E] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Project Info */}
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-gray-400 text-sm">{selectedProject.description}</p>
              </div>

              {/* Image Display */}
              <div className="relative h-[calc(90vh-120px)] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === 0 ? selectedProject.images!.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === selectedProject.images!.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {selectedProject.images.length > 1 && (
                <div className="p-4 border-t border-gray-800 overflow-x-auto">
                  <div className="flex gap-2 justify-center">
                    {selectedProject.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-[#6B50A2] scale-110"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

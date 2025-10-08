"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, memo, useCallback } from "react";
import { 
  RiFileDownloadFill, 
  RiCodeSSlashLine, 
  RiPaletteLine, 
  RiLightbulbLine,
  RiRocketLine,
  RiShieldStarLine,
  RiDatabase2Line,
  RiCloudLine,
  RiSettings4Line,
  RiFlaskLine
} from "react-icons/ri";
import { 
  BsGithub, 
  BsLinkedin, 
  BsTwitter, 
  BsWhatsapp, 
  BsArrowLeft, 
  BsCalendar3, 
  BsGeoAlt,
  BsAward,
  BsLaptop,
  BsGraphUp,
  BsCpu,
  BsGlobe,
  BsShieldCheck,
  BsLightning,
  BsRocket,
  BsStar
} from "react-icons/bs";
import { 
  AiOutlineMail, 
  AiOutlinePhone,
  AiOutlineGithub,
  AiOutlineLinkedin
} from "react-icons/ai";
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt,
  FaDocker,
  FaAws,
  FaMicrosoft,
  FaJs
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiMongodb, 
  SiMysql,
  SiRedis,
  SiElasticsearch,
  SiPrometheus,
  SiKong,
  SiAzuredevops,
  SiGithubactions,
  SiExpress
} from "react-icons/si";
import { 
  TbBrandFramerMotion, 
  TbBrandVercel,
  TbBrandDocker,
  TbBrandMongodb,
  TbApi,
  TbDatabase,
  TbCloud,
  TbRocket
} from "react-icons/tb";

// Simplified background elements for better performance
const FloatingBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-float" />
    <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-accent-400/10 to-primary-400/10 rounded-full blur-3xl animate-float-delayed" />
    <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-gradient-to-r from-secondary-400/10 to-accent-400/10 rounded-full blur-3xl animate-float-slow" />
  </div>
);

const SkillBar = ({ skill, level, delay }: { skill: string; level: number; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    className="mb-6"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{level}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full relative"
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </motion.div>
    </div>
  </motion.div>
);

const Profile = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('frontend');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skillsByCategory = {
    frontend: [
      { icon: FaReact, name: "React.js", level: 95, color: "from-cyan-400 to-blue-500", description: "Modern UI Development" },
      { icon: SiNextdotjs, name: "Next.js", level: 90, color: "from-gray-700 to-gray-900", description: "Full-Stack Framework" },
      { icon: SiTailwindcss, name: "Tailwind CSS", level: 92, color: "from-teal-400 to-cyan-400", description: "Utility-First CSS" },
      { icon: SiTypescript, name: "TypeScript", level: 88, color: "from-blue-500 to-indigo-500", description: "Type-Safe Development" }
    ],
    backend: [
      { icon: FaNodeJs, name: "Node.js", level: 95, color: "from-green-500 to-emerald-500", description: "Server-Side JavaScript" },
      { icon: RiCodeSSlashLine, name: "Vendure.js", level: 88, color: "from-purple-500 to-pink-500", description: "E-commerce Backend" },
      { icon: SiKong, name: "Kong Gateway", level: 87, color: "from-red-500 to-orange-500", description: "API Management" },
      { icon: SiRedis, name: "Redis", level: 89, color: "from-red-600 to-red-800", description: "In-Memory Cache" },
      { icon: SiElasticsearch, name: "Elasticsearch", level: 83, color: "from-yellow-500 to-orange-500", description: "Search Engine" },
      { icon: SiMongodb, name: "MongoDB", level: 86, color: "from-green-600 to-green-800", description: "NoSQL Database" }
    ],
    devops: [
      { icon: FaDocker, name: "Docker", level: 91, color: "from-blue-600 to-indigo-600", description: "Containerization" },
      { icon: SiGithubactions, name: "GitHub Actions", level: 84, color: "from-gray-600 to-gray-800", description: "CI/CD Automation" },
      { icon: SiPrometheus, name: "Prometheus", level: 78, color: "from-orange-500 to-red-500", description: "Monitoring & Metrics" },
      { icon: SiAzuredevops, name: "Azure DevOps", level: 82, color: "from-blue-500 to-purple-500", description: "Cloud Platform" }
    ]
  };

  const categories = [
    { id: 'frontend', name: 'Frontend', icon: RiPaletteLine, color: 'from-cyan-500 to-blue-500' },
    { id: 'backend', name: 'Backend', icon: RiCodeSSlashLine, color: 'from-green-500 to-emerald-500' },
    { id: 'devops', name: 'DevOps', icon: RiSettings4Line, color: 'from-purple-500 to-pink-500' }
  ];

  const experiences = [
    {
      title: "Backend Developer / API Engineer",
      company: "Digital Qatalyst",
      period: "Nov 2024 – Present",
      type: "Full-time",
      location: "Hybrid",
      description: "Building scalable e-commerce backends and API infrastructure with cutting-edge technologies.",
      achievements: [
        "Built scalable e-commerce backend using Vendure.js with Azure AD B2C integration",
        "Developed event-driven sync system reducing Dynamics 365 CRM sync delays by 60%",
        "Enhanced product search with Elasticsearch, cutting query latency by 40%",
        "Containerized backend with Docker and automated CI/CD pipelines",
        "Deployed Kong API Gateway with multi-workspace setup",
        "Automated token generation cutting provisioning time by 80%"
      ],
      icon: RiRocketLine,
      color: "from-blue-500 to-purple-500",
      tech: ["Vendure.js", "Azure AD B2C", "BullMQ", "Elasticsearch", "Docker", "Kong Gateway"]
    },
    {
      title: "Freelance Full-Stack Developer",
      company: "Self-Employed",
      period: "Aug 2022 – Aug 2023",
      type: "Freelance",
      location: "Remote",
      description: "Delivering full-stack solutions for various clients with focus on performance and user experience.",
      achievements: [
        "Rebuilt Christian Union website with React.js and Node.js",
        "Implemented Redis caching and MongoDB optimization",
        "Boosted user engagement by 65% through improved UX",
        "Delivered multiple e-commerce platforms",
        "Optimized API performance and database queries"
      ],
      icon: RiCodeSSlashLine,
      color: "from-green-500 to-blue-500",
      tech: ["React.js", "Node.js", "MongoDB", "Redis", "Tailwind CSS"]
    }
  ];

  const projects = [
    {
      title: "Secure E-Commerce Platform",
      description: "CIAM-enabled backend with Azure AD B2C, BullMQ, and Elasticsearch",
      tech: ["Vendure.js", "Azure AD B2C", "BullMQ", "Elasticsearch", "Docker"],
      icon: RiShieldStarLine,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Kong API Gateway Automation",
      description: "Multi-workspace Kong setup with Lua scripting & Prometheus monitoring",
      tech: ["Kong Gateway", "Lua Scripts", "Prometheus", "Docker"],
      icon: TbApi,
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Christian Union Website",
      description: "Full-stack solution with React.js, improving UX and engagement by 65%",
      tech: ["React.js", "Node.js", "MongoDB", "Redis", "Tailwind CSS"],
      icon: RiDatabase2Line,
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const achievements = [
    { 
      icon: BsLightning, 
      title: "40% Performance Boost", 
      description: "Reduced Elasticsearch query latency",
      metric: "-40% latency"
    },
    { 
      icon: BsGraphUp, 
      title: "60% Sync Improvement", 
      description: "Streamlined enterprise integrations",
      metric: "-60% sync time"
    },
    { 
      icon: BsShieldCheck, 
      title: "80% Automation Gain", 
      description: "Token generation automation",
      metric: "-80% provisioning"
    },
    { 
      icon: BsRocket, 
      title: "65% Engagement Rise", 
      description: "Christian Union website improvements",
      metric: "+65% engagement"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <FloatingBackground />
      
      {/* Animated Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
              <Link
                href="/"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
              <BsArrowLeft className="text-lg" />
              Back to Portfolio
              </Link>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-right"
          >
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent animate-gradient">
              Bravine.dev
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-poppins font-medium">Software Engineer Profile</p>
          </motion.div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Hero Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="relative mb-12"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-[2px]">
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
            </div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Profile Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotateY: -90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:col-span-1 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 p-8 flex flex-col items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="w-56 h-56 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/40 shadow-2xl relative"
                  >
                    <Image
                      src="/fig.jpeg"
                      alt="Bravine Mmbayia"
                      width={224}
                      height={224}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent" />
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-4xl font-playfair font-bold text-white mb-2"
                  >
                    Bravine Mmbayia
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-xl font-playfair text-white/90 mb-2"
                  >
                    Software Engineer
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-lg font-poppins text-white/80 mb-6"
                  >
                    3+ Years Experience
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex gap-4 justify-center"
                  >
                    {[
                      { icon: BsGithub, href: "https://github.com/luckyBravine", label: "GitHub", color: "hover:bg-gray-800" },
                      { icon: BsLinkedin, href: "https://www.linkedin.com/in/bravine-alusiola-896ab3217/", label: "LinkedIn", color: "hover:bg-blue-600" },
                      { icon: BsTwitter, href: "https://twitter.com/LuckyBravine", label: "Twitter", color: "hover:bg-blue-400" },
                      { icon: BsWhatsapp, href: "https://wa.me/254799117106", label: "WhatsApp", color: "hover:bg-green-500" }
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 1.1 + index * 0.1, type: "spring", stiffness: 200 }}
                        className={`w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 ${social.color} shadow-lg`}
                      >
                        <social.icon className="text-xl" />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Profile Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="lg:col-span-2 p-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-8"
                >
                  <h3 className="text-3xl font-playfair font-bold text-gray-800 dark:text-white mb-6">
                    Professional Summary
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                    Backend Engineer with 3+ years of experience building scalable APIs, e-commerce platforms, and event-driven systems. 
                    Specialized in Node.js, Vendure.js, and Azure AD B2C for secure authentication and RBAC. Proven success optimizing 
                    performance with Elasticsearch (-40% latency) and streamlining enterprise integrations with BullMQ & Redis (-60% sync time).
                  </p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl"
                    >
                      <BsGeoAlt className="text-2xl text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                      <p className="font-semibold text-gray-800 dark:text-white text-sm">Location</p>
                      <p className="text-gray-600 dark:text-gray-300 text-xs font-poppins font-medium">Nairobi, Kenya</p>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-4 bg-gradient-to-br from-secondary-50 to-accent-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl"
                    >
                      <AiOutlineMail className="text-2xl text-secondary-600 dark:text-secondary-400 mx-auto mb-2" />
                      <p className="font-semibold text-gray-800 dark:text-white text-sm">Email</p>
                      <p className="text-gray-600 dark:text-gray-300 text-xs font-poppins font-medium">bravinemmbayia@gmail.com</p>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-4 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl"
                    >
                      <AiOutlinePhone className="text-2xl text-accent-600 dark:text-accent-400 mx-auto mb-2" />
                      <p className="font-semibold text-gray-800 dark:text-white text-sm">Phone</p>
                      <p className="text-gray-600 dark:text-gray-300 text-xs font-poppins font-medium">+254-799-117-106</p>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl"
                    >
                      <BsCalendar3 className="text-2xl text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <p className="font-semibold text-gray-800 dark:text-white text-sm">Experience</p>
                      <p className="text-gray-600 dark:text-gray-300 text-xs font-poppins font-medium">3+ Years</p>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.a
                    href="/static/BravineMmbayiaresume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 btn-primary flex items-center justify-center gap-3 py-4 text-lg shadow-lg hover:shadow-xl"
                  >
                    <RiFileDownloadFill className="text-xl" />
                    Download Resume
                  </motion.a>
                  
                  <motion.a
                href="https://github.com/luckyBravine"
                target="_blank"
                rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <BsGithub className="text-xl" />
                    View GitHub
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 mb-12"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-playfair font-bold text-gray-800 dark:text-white mb-4 text-center"
          >
            Technical Expertise
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg font-poppins text-gray-600 dark:text-gray-300 text-center mb-8"
          >
            Crafting exceptional digital experiences with cutting-edge technologies
          </motion.p>
          
          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-2 flex gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`px-6 py-3 rounded-xl font-poppins font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <category.icon className="text-lg" />
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Skills Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillsByCategory[activeCategory as keyof typeof skillsByCategory].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
                className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50 overflow-hidden relative"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg`}
                    >
                      <skill.icon className="text-3xl text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-playfair font-bold text-gray-800 dark:text-white mb-1">
                        {skill.name}
                      </h4>
                      <p className="text-sm font-poppins font-medium text-gray-600 dark:text-gray-300">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-poppins font-semibold text-gray-700 dark:text-gray-300">Proficiency</span>
                      <span className="text-lg font-playfair font-bold text-primary-600 dark:text-primary-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                      >
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 mb-12"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-playfair font-bold text-gray-800 dark:text-white mb-8 text-center"
          >
            Professional Experience
          </motion.h3>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50"
              >
                <div className="flex items-start gap-6">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${exp.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <exp.icon className="text-3xl text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{exp.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <h5 className="text-xl font-semibold text-primary-600 dark:text-primary-400">{exp.company}</h5>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                              {exp.type}
                            </span>
                            <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium">
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-lg font-poppins font-semibold text-gray-600 dark:text-gray-300">{exp.period}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg font-poppins">
                      {exp.description}
                    </p>
                    
                    <div className="mb-6">
                      <h6 className="font-poppins font-semibold text-gray-800 dark:text-white mb-3">Key Achievements:</h6>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                          >
                            <BsStar className="text-primary-500 mt-1 flex-shrink-0" />
                            <span className="font-poppins">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="font-poppins font-semibold text-gray-800 dark:text-white mb-3">Technologies Used:</h6>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-poppins font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 mb-12"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-playfair font-bold text-gray-800 dark:text-white mb-8 text-center"
          >
            Key Achievements
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
                className="text-center p-6 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-700/50 dark:via-gray-600/50 dark:to-gray-500/50 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg"
                >
                  <achievement.icon className="text-3xl text-white" />
                </motion.div>
                <h4 className="text-xl font-playfair font-bold text-gray-800 dark:text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm font-poppins">
                  {achievement.description}
                </p>
                <div className="text-2xl font-playfair font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {achievement.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-playfair font-bold text-gray-800 dark:text-white mb-8 text-center"
          >
            Featured Projects
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 5, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <project.icon className="text-3xl text-white" />
                </div>
                <h4 className="text-xl font-playfair font-bold text-gray-800 dark:text-white mb-3">
                  {project.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-poppins">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-poppins font-medium text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
});

Profile.displayName = 'Profile';

export default Profile;
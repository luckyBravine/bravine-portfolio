"use client";
import { BiHappyHeartEyes } from "react-icons/bi";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiOutlineWhatsApp,
  AiOutlineGithub,
  AiOutlineMail,
} from "react-icons/ai";
import {
  BsGithub,
  BsDatabaseCheck,
  BsFillSendFill,
  BsFillMoonStarsFill,
  BsArrowDown,
  BsCodeSlash,
  BsLightning,
  BsPalette,
} from "react-icons/bs";
import { DiReact } from "react-icons/di";
import { FaPhp, FaNodeJs } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight, MdWork, MdSchool } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { SiTailwindcss, SiTypescript, SiNextdotjs, SiJavascript } from "react-icons/si";
import { TbBrandReactNative, TbBrandFramerMotion } from "react-icons/tb";
import Image from "next/image";
import { useForm, ValidationError } from "@formspree/react";
import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import React, { ReactNode, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// Simplified background elements for better performance
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-400/10 to-secondary-400/10 rounded-full blur-xl animate-float" />
    <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-accent-400/10 to-primary-400/10 rounded-full blur-xl animate-float-delayed" />
    <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-secondary-400/10 to-accent-400/10 rounded-full blur-xl animate-float-slow" />
  </div>
);

const Home = memo(() => {
  const [darkMode, setDarkMode] = useState(false);
  const [state, handleSubmit] = useForm("mrgwzzrr");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newMode ? "dark" : "light");
      }
      return newMode;
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setDarkMode(savedTheme === "dark");
      } else {
        setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="glass max-w-md mx-auto p-8 rounded-2xl shadow-hard">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <BiHappyHeartEyes className="text-6xl text-primary-500 mx-auto mb-4" />
            <h4 className="text-2xl font-playfair font-semibold text-gray-800 dark:text-white mb-2">
              Thank You!
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Your message has been sent successfully. I'll get back to you as soon as possible.
            </p>
            <Link
              href="/"
              className="btn-primary inline-flex items-center gap-2"
            >
              Back to Portfolio
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <FloatingElements />
        
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-burtons bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
              >
                Bravine.dev
              </motion.h1>
              <div className="flex items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <BsFillMoonStarsFill className="text-xl text-gray-700 dark:text-gray-300" />
                </motion.button>
                <Link
                  href="/Profile"
                  className="btn-primary"
                >
                  <MdWork className="mr-2" />
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <motion.div
            style={{ y }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-hard">
                <Image
                  src="/fig.jpeg"
                  alt="Bravine Alusiola"
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                />
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-playfair font-bold mb-4"
              >
                <motion.span 
                  className="gradient-text"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  Bravine
                </motion.span>
                <br />
                <motion.span 
                  className="text-gray-800 dark:text-gray-200"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Alusiola
                </motion.span>
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-poppins font-medium text-gray-600 dark:text-gray-300 mb-6"
              >
                Frontend Developer & UI/UX Designer
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8"
              >
                Crafting exceptional digital experiences through innovative frontend solutions. 
                Passionate about creating beautiful, functional, and user-centric web applications.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-8 mb-12"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/luckyBravine"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/10 hover:bg-primary-500 transition-all duration-300 text-2xl text-gray-600 hover:text-white shadow-medium hover:shadow-glow"
              >
                <BsGithub />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/bravine-alusiola-896ab3217/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/10 hover:bg-blue-600 transition-all duration-300 text-2xl text-gray-600 hover:text-white shadow-medium hover:shadow-glow"
              >
                <AiFillLinkedin />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:bravinlude@gmail.com"
                className="p-4 rounded-full bg-white/10 hover:bg-secondary-500 transition-all duration-300 text-2xl text-gray-600 hover:text-white shadow-medium hover:shadow-glow"
              >
                <GoMail />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-400"
              >
                <BsArrowDown className="text-2xl" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <AnimatedSection delay={0.2}>
          <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4"
                >
                  Technical Expertise
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 dark:text-white mb-6"
                >
                  Skills & Technologies
                </motion.h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: DiReact,
                    title: "React & Next.js",
                    description: "Building modern, scalable web applications with React ecosystem and Next.js for optimal performance.",
                    color: "from-blue-400 to-cyan-400"
                  },
                  {
                    icon: SiTypescript,
                    title: "TypeScript",
                    description: "Developing type-safe applications with enhanced developer experience and reduced runtime errors.",
                    color: "from-blue-500 to-indigo-500"
                  },
                  {
                    icon: SiTailwindcss,
                    title: "Tailwind CSS",
                    description: "Creating beautiful, responsive designs with utility-first CSS framework and modern design systems.",
                    color: "from-teal-400 to-cyan-400"
                  },
                  {
                    icon: FaNodeJs,
                    title: "Node.js",
                    description: "Building robust backend services and APIs with Node.js for full-stack development capabilities.",
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: BsDatabaseCheck,
                    title: "Database Management",
                    description: "Working with MySQL and MongoDB for efficient data storage and retrieval in web applications.",
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: BsGithub,
                    title: "Version Control",
                    description: "Expert in Git and GitHub for collaborative development and maintaining clean code repositories.",
                    color: "from-gray-600 to-gray-800"
                  }
                ].map((skill, index) => (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="skill-card p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-soft hover:shadow-hard border border-gray-100 dark:border-gray-700"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center mb-6`}>
                      <skill.icon className="text-3xl text-white" />
                    </div>
                    <h4 className="text-xl font-poppins font-semibold text-gray-800 dark:text-white mb-4">
                      {skill.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {skill.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection delay={0.4}>
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block px-4 py-2 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium mb-4"
                >
                  Featured Work
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 dark:text-white mb-6"
                >
                  Portfolio Projects
                </motion.h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    image: "/Screenshot8.png",
                    title: "The Christian Union Web-App",
                    description: "A comprehensive web application for Christian Union management with modern UI/UX design.",
                    tech: ["React.js", "Tailwind CSS", "Node.js"],
                    link: "https://luckybravine.github.io/christian-union-static-version/",
                    delay: 0
                  },
                  {
                    image: "/smartkitchen.png",
                    title: "Smart Kitchen App",
                    description: "An innovative kitchen management application with smart features and intuitive design.",
                    tech: ["React.js", "TypeScript", "GSAP"],
                    link: "https://kitchen-app-cyan.vercel.app/",
                    delay: 0.1
                  },
                  {
                    image: "/api.png",
                    title: "API Collection",
                    description: "A curated collection of APIs with modern integration and documentation features.",
                    tech: ["Next.js", "RapidAPI"],
                    link: "https://luckybravine.github.io/christian-union-static-version/",
                    delay: 0.2
                  },
                  {
                    image: "/houseslider.png",
                    title: "House Slider",
                    description: "An interactive house showcase with smooth animations and modern slider functionality.",
                    tech: ["React.js", "Tailwind CSS", "GSAP"],
                    link: "https://house-slider-3pddhi7ai-luckybravine.vercel.app/",
                    delay: 0.3
                  }
                ].map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: project.delay }}
                    whileHover={{ y: -8 }}
                    className="img-wrapper group cursor-pointer"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      width={400}
                      height={256}
                    />
                    <div className="content">
                      <div>
                        <h4 className="text-xl font-poppins font-semibold text-gray-800 dark:text-white mb-3">
                          {project.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        View Project
                        <MdKeyboardDoubleArrowRight className="text-lg" />
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection delay={0.6}>
          <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block px-4 py-2 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium mb-4"
                >
                  Let's Connect
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 dark:text-white mb-6"
                >
                  Get In Touch
                </motion.h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.form
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                    <ValidationError prefix="name" field="name" errors={state.errors} />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                    <ValidationError prefix="email" field="email" errors={state.errors} />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                    <ValidationError prefix="message" field="message" errors={state.errors} />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={state.submitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg"
                  >
                    {state.submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <BsFillSendFill className="text-lg" />
                      </>
                    )}
                  </motion.button>
                </motion.form>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div>
                    <h4 className="text-2xl font-playfair font-bold text-gray-800 dark:text-white mb-6">
                      Contact Information
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <AiOutlineMail className="text-xl text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white mb-1">Email</h5>
                        <p className="text-gray-600 dark:text-gray-300">bravinlude@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center">
                        <BsCodeSlash className="text-xl text-secondary-600 dark:text-secondary-400" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white mb-1">Location</h5>
                        <p className="text-gray-600 dark:text-gray-300">Nairobi, Kenya</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center">
                        <BsLightning className="text-xl text-accent-600 dark:text-accent-400" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white mb-1">Response Time</h5>
                        <p className="text-gray-600 dark:text-gray-300">Within 24 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h5 className="font-semibold text-gray-800 dark:text-white mb-4">Follow Me</h5>
                    <div className="flex gap-4">
                      {[
                        { icon: BsGithub, href: "https://github.com/luckyBravine", label: "GitHub" },
                        { icon: AiFillLinkedin, href: "https://www.linkedin.com/in/bravine-alusiola-896ab3217/", label: "LinkedIn" },
                        { icon: AiFillTwitterCircle, href: "https://twitter.com/LuckyBravine", label: "Twitter" },
                        { icon: AiOutlineWhatsApp, href: "https://wa.me/254799117106", label: "WhatsApp" }
                      ].map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-all duration-300"
                        >
                          <social.icon />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Footer */}
        <footer className="py-12 px-6 bg-gray-900 dark:bg-gray-950 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-2xl font-burtons mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Bravine.dev
              </h4>
              <p className="text-gray-400 mb-6">
                Crafting exceptional digital experiences with passion and precision.
              </p>
              <div className="flex justify-center gap-6 mb-8">
                {[
                  { icon: BsGithub, href: "https://github.com/luckyBravine" },
                  { icon: AiFillLinkedin, href: "https://www.linkedin.com/in/bravine-alusiola-896ab3217/" },
                  { icon: AiFillTwitterCircle, href: "https://twitter.com/LuckyBravine" },
                  { icon: AiOutlineWhatsApp, href: "https://wa.me/254799117106" }
                ].map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="text-2xl text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                © 2024 Bravine Alusiola. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
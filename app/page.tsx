'use client';

import React, { useRef, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { portfolioContent } from '@/lib/data/portfolio-content';
import { useNavigationController } from '@/lib/hooks/useNavigationController';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sections = [
    { id: 'hero', label: 'Home', ref: heroRef },
    { id: 'about', label: 'About', ref: aboutRef },
    { id: 'experience', label: 'Experience', ref: experienceRef },
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'skills', label: 'Skills', ref: skillsRef },
    { id: 'education', label: 'Education', ref: educationRef },
    { id: 'contact', label: 'Contact', ref: contactRef },
  ];

  const { activeSection, scrollToSection } = useNavigationController({
    sections,
    offset: 80,
  });

  return (
    <>
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 right-4 z-40 md:hidden bg-gray-800 p-3 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <main>
        <HeroSection ref={heroRef} content={portfolioContent.hero} />
        <AboutSection ref={aboutRef} content={portfolioContent.about} />
        <ExperienceSection ref={experienceRef} content={portfolioContent.experience} />
        <ProjectsSection ref={projectsRef} content={portfolioContent.projects} />
        <SkillsSection ref={skillsRef} content={portfolioContent.skills} />
        <EducationSection ref={educationRef} content={portfolioContent.education} />
        <ContactSection ref={contactRef} content={portfolioContent.contact} />
      </main>

      <Footer />
    </>
  );
}

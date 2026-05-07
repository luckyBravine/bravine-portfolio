/**
 * Content data models for portfolio sections
 * 
 * These interfaces define the structure for all content sections:
 * Hero, About, Experience, Projects, Skills, Education, Contact
 */

/**
 * Hero section content
 */
export interface HeroContent {
  name: string;
  title: string;
  tagline: string;
  ctaButtons: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
}

/**
 * About section content
 */
export interface AboutContent {
  summary: string;
  highlights: string[];
  image?: string;
}

/**
 * Experience section content
 */
export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ExperienceContent {
  entries: ExperienceEntry[];
}

/**
 * Projects section content
 */
export interface ProjectEntry {
  name: string;
  description: string;
  technologies: string[];
  links?: Array<{
    label: string;
    url: string;
  }>;
  image?: string;
}

export interface ProjectsContent {
  entries: ProjectEntry[];
}

/**
 * Skills section content
 */
export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsContent {
  categories: SkillCategory[];
}

/**
 * Education section content
 */
export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  period: string;
  achievements?: string[];
}

export interface EducationContent {
  entries: EducationEntry[];
}

/**
 * Contact section content
 */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactContent {
  email: string;
  phone?: string;
  location: string;
  social: SocialLink[];
}

/**
 * Complete portfolio content structure
 */
export interface PortfolioContent {
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  skills: SkillsContent;
  education: EducationContent;
  contact: ContactContent;
}

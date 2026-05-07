/**
 * Portfolio content data
 * 
 * This file contains the actual content for all portfolio sections.
 * Update this file to modify the displayed content.
 */

import type { PortfolioContent } from '../types/content';

export const portfolioContent: PortfolioContent = {
  hero: {
    name: 'MICHEAL ATANDI',
    title: 'Software Engineer',
    tagline: 'Backend Engineer with 3+ years of experience building scalable APIs, e-commerce platforms, and event-driven systems',
    ctaButtons: [
      {
        label: 'View Projects',
        href: '#projects',
        variant: 'primary',
      },
      {
        label: 'Contact Me',
        href: '#contact',
        variant: 'secondary',
      },
    ],
  },

  about: {
    summary: 'Backend Engineer with 3+ years of experience building scalable APIs, e-commerce platforms, and event-driven systems. Specialized in Node.js, Vendure.js, and Azure AD B2C for secure authentication and RBAC. Proven success optimizing performance with Elasticsearch (-40% latency) and streamlining enterprise integrations with BullMQ & Redis (-60% sync time). Skilled in deploying containerized apps with Docker and automating CI/CD using GitHub Actions.',
    highlights: [
      'Scalable API development with Node.js and TypeScript',
      'E-commerce platforms with Vendure.js and Azure AD B2C',
      'Event-driven systems with BullMQ and Redis',
      'Performance optimization with Elasticsearch (-40% latency)',
      'Enterprise CRM integrations with Power Automate and Dynamics 365',
      'API Gateway implementation with Kong',
      'Containerization and CI/CD with Docker and GitHub Actions',
    ],
  },

  experience: {
    entries: [
      {
        company: 'Digital Qatalyst',
        role: 'Backend Developer / API Engineer',
        period: 'Nov 2024 – Present',
        location: 'Hybrid',
        description: 'Building scalable e-commerce backends and enterprise integrations with focus on event-driven systems and CRM automation.',
        achievements: [
          'Built a scalable e-commerce backend using Vendure.js, integrating Azure AD B2C for RBAC and MFA.',
          'Developed an event-driven sync system with BullMQ (Redis), reducing sync delays to Dynamics 365 CRM by 60%.',
          'Developed custom Power Automate cloud flows to automate real-time newsletter subscriber synchronization from Dynamics 365 / Dataverse to external production endpoints.',
          'Implemented efficient pagination ($top/$skip), batch processing (500 records per iteration), 60-second throttling, and dynamic token refresh (Bearer authentication with expiration handling) to respect API rate limits and maintain data integrity.',
          'Integrated secure token acquisition (OAuth password grant), JSON payload transformation, and HTTP POST actions with error handling and retry logic.',
          'Debugged and optimized complex expressions, variable persistence, and conditional branching to achieve fully automated, single-run execution.',
          'Enhanced product search with Elasticsearch, cutting query latency by 40% for large catalogs.',
          'Containerized backend with Docker and automated CI/CD pipelines via GitHub Actions on Azure.',
          'Deployed Kong API Gateway with a multi-workspace setup for internal & client-facing APIs.',
          'Automated token generation and plugin configuration using Lua scripts, streamlining API communication and cutting provisioning time by 80%.',
          'Integrated Prometheus monitoring to track performance of APIs handling thousands of requests per minute.',
          'Delivered Dockerized Kong deployments, ensuring reproducibility and high availability.',
        ],
        technologies: [
          'Vendure.js',
          'Node.js',
          'TypeScript',
          'Azure AD B2C',
          'BullMQ',
          'Redis',
          'Power Automate',
          'Dynamics 365',
          'Dataverse',
          'OAuth',
          'Elasticsearch',
          'Docker',
          'GitHub Actions',
          'Kong API Gateway',
          'Lua',
          'Prometheus',
        ],
      },
      {
        company: 'Freelance',
        role: 'Full-Stack Developer',
        period: 'Aug 2022 – Aug 2023',
        location: 'Remote',
        description: 'Developed custom web applications and automation solutions for various clients.',
        achievements: [
          'Built responsive web applications with React and Next.js',
          'Implemented RESTful APIs with Node.js and Express',
          'Deployed applications to cloud platforms (AWS, Vercel)',
          'Collaborated with clients using Agile methodologies',
        ],
        technologies: [
          'React',
          'Next.js',
          'Node.js',
          'TypeScript',
          'PostgreSQL',
          'AWS',
          'Vercel',
        ],
      },
    ],
  },

  projects: {
    entries: [
      {
        name: 'Secure E-Commerce Platform with Vendure.js',
        description: 'CIAM-enabled backend with Azure AD B2C, BullMQ, Elasticsearch, deployed with Docker. Built a scalable e-commerce platform with secure authentication, event-driven synchronization, and optimized product search.',
        technologies: [
          'Vendure.js',
          'Azure AD B2C',
          'BullMQ',
          'Redis',
          'Elasticsearch',
          'Docker',
          'TypeScript',
          'GraphQL',
        ],
        links: [
          {
            label: 'View Project',
            url: '#',
          },
        ],
      },
      {
        name: 'Kong API Gateway Automation',
        description: 'Multi-workspace Kong setup with Lua scripting & Prometheus monitoring, Dockerized for reproducibility. Automated token generation and plugin configuration, cutting provisioning time by 80%.',
        technologies: [
          'Kong',
          'Lua',
          'Prometheus',
          'Docker',
          'Kubernetes',
          'OAuth 2.0',
          'PostgreSQL',
        ],
        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/luckyBravine',
          },
        ],
      },
    ],
  },

  skills: {
    categories: [
      {
        name: 'Languages & Frameworks',
        skills: ['Node.js', 'TypeScript', 'React.js', 'Next.js', 'Express.js', 'JavaScript'],
      },
      {
        name: 'Backend & APIs',
        skills: ['Vendure.js', 'Kong API Gateway', 'REST APIs', 'GraphQL', 'Event-driven systems'],
      },
      {
        name: 'DevOps & Tools',
        skills: ['Docker', 'GitHub Actions', 'Prometheus', 'Redis', 'BullMQ', 'Git'],
      },
      {
        name: 'Search & Data',
        skills: ['Elasticsearch', 'MongoDB', 'PostgreSQL', 'Microsoft Dynamics 365', 'Dataverse'],
      },
      {
        name: 'Auth & Security',
        skills: ['Azure AD B2C', 'External Entra ID', 'MFA', 'RBAC', 'OAuth 2.0'],
      },
    ],
  },

  education: {
    entries: [
      {
        institution: 'Murang\'a University of Technology',
        degree: 'B.Sc. in Information Technology',
        field: 'School of Computing & IT',
        period: '2018 - 2022',
      },
    ],
  },

  contact: {
    email: 'bravinemmbayia@gmail.com',
    phone: '+254799117106',
    location: 'Nairobi, Kenya',
    social: [
      {
        platform: 'GitHub',
        url: 'https://github.com/luckyBravine',
        icon: 'github',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/bravine-mmbayia',
        icon: 'linkedin',
      },
    ],
  },
};

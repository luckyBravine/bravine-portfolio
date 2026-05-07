'use client';

import React from 'react';
import { portfolioContent } from '@/lib/data/portfolio-content';

export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {portfolioContent.hero.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-400 mb-6">
            {portfolioContent.hero.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {portfolioContent.hero.tagline}
          </p>
          <div className="flex gap-4 justify-center">
            {portfolioContent.hero.ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className={`px-8 py-3 rounded-lg font-semibold ${
                  button.variant === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {button.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <p className="text-lg text-gray-300 mb-6">{portfolioContent.about.summary}</p>
          <ul className="space-y-2">
            {portfolioContent.about.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-400 mr-2">▹</span>
                <span className="text-gray-300">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Experience</h2>
          {portfolioContent.experience.entries.map((entry, index) => (
            <div key={index} className="mb-8 border-l-2 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold">{entry.role}</h3>
              <p className="text-blue-400">{entry.company}</p>
              <p className="text-gray-400 mb-4">{entry.period} • {entry.location}</p>
              <p className="text-gray-300 mb-4">{entry.description}</p>
              <ul className="space-y-2">
                {entry.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {portfolioContent.projects.entries.map((project, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-blue-600 px-3 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.links && project.links.length > 0 && (
                  <div className="flex gap-4">
                    {project.links.map((link, i) => (
                      <a key={i} href={link.url} className="text-blue-400 hover:underline">
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Skills</h2>
          {portfolioContent.skills.categories.map((category, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span key={i} className="bg-gray-700 px-4 py-2 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-20 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Education</h2>
          {portfolioContent.education.entries.map((entry, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-2xl font-bold">{entry.degree} in {entry.field}</h3>
              <p className="text-blue-400">{entry.institution}</p>
              <p className="text-gray-400">{entry.period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <div className="space-y-4">
            <p className="text-xl">
              <a href={`mailto:${portfolioContent.contact.email}`} className="text-blue-400 hover:underline">
                {portfolioContent.contact.email}
              </a>
            </p>
            <p className="text-xl">
              <a href={`tel:${portfolioContent.contact.phone}`} className="text-blue-400 hover:underline">
                {portfolioContent.contact.phone}
              </a>
            </p>
            <p className="text-gray-400">{portfolioContent.contact.location}</p>
            <div className="flex gap-6 justify-center mt-6">
              {portfolioContent.contact.social.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-950 text-center text-gray-400">
        <p>© 2026 Micheal Atandi. All rights reserved.</p>
      </footer>
    </div>
  );
}

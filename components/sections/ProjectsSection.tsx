'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { ProjectsContent } from '@/lib/types/content';

interface ProjectsSectionProps {
  content: ProjectsContent;
}

export const ProjectsSection = forwardRef<HTMLElement, ProjectsSectionProps>(
  ({ content }, ref) => {
    return (
      <section
        ref={ref}
        id="projects"
        className="min-h-screen bg-gray-800 text-white px-4 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {content.entries.map((project, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-4">
                  {project.name}
                </h3>

                <p className="text-gray-300 mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-800 text-blue-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.links && project.links.length > 0 && (
                  <div className="flex gap-4">
                    {project.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

ProjectsSection.displayName = 'ProjectsSection';

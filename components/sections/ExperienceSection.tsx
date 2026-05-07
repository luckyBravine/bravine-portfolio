'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { ExperienceContent } from '@/lib/types/content';

interface ExperienceSectionProps {
  content: ExperienceContent;
}

export const ExperienceSection = forwardRef<HTMLElement, ExperienceSectionProps>(
  ({ content }, ref) => {
    return (
      <section
        ref={ref}
        id="experience"
        className="min-h-screen bg-gray-900 text-white px-4 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience
          </motion.h2>

          <div className="space-y-12">
            {content.entries.map((entry, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-1">
                      {entry.role}
                    </h3>
                    <p className="text-xl text-gray-300 mb-2">{entry.company}</p>
                  </div>
                  <div className="text-gray-400 md:text-right">
                    <p>{entry.period}</p>
                    <p>{entry.location}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{entry.description}</p>

                <div className="space-y-3 mb-6">
                  {entry.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm md:text-base">{achievement}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {entry.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-700 text-blue-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

ExperienceSection.displayName = 'ExperienceSection';

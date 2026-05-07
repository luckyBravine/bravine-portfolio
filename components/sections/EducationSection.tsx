'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { EducationContent } from '@/lib/types/content';

interface EducationSectionProps {
  content: EducationContent;
}

export const EducationSection = forwardRef<HTMLElement, EducationSectionProps>(
  ({ content }, ref) => {
    return (
      <section
        ref={ref}
        id="education"
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
            Education
          </motion.h2>

          <div className="space-y-8">
            {content.entries.map((entry, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 rounded-lg p-6 md:p-8 border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-1">
                      {entry.degree}
                    </h3>
                    <p className="text-xl text-gray-300 mb-2">{entry.institution}</p>
                    <p className="text-gray-400">{entry.field}</p>
                  </div>
                  <div className="text-gray-400 md:text-right mt-2 md:mt-0">
                    <p>{entry.period}</p>
                  </div>
                </div>

                {entry.achievements && entry.achievements.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {entry.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-300">{achievement}</p>
                      </div>
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

EducationSection.displayName = 'EducationSection';

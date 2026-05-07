'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { AboutContent } from '@/lib/types/content';

interface AboutSectionProps {
  content: AboutContent;
}

export const AboutSection = forwardRef<HTMLElement, AboutSectionProps>(
  ({ content }, ref) => {
    return (
      <section
        ref={ref}
        id="about"
        className="min-h-screen flex items-center bg-gray-800 text-white px-4 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {content.summary}
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {content.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gray-700/50 p-4 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">{highlight}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
);

AboutSection.displayName = 'AboutSection';

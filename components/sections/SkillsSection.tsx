'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { SkillsContent } from '@/lib/types/content';
import type { TechnologyGraph } from '@/lib/types/technology-graph';
import { VisualizationRouter } from '../visualizations/VisualizationRouter';

interface SkillsSectionProps {
  content: SkillsContent;
  technologyGraph: TechnologyGraph;
}

export const SkillsSection = forwardRef<HTMLElement, SkillsSectionProps>(
  ({ content, technologyGraph }, ref) => {
    return (
      <section
        ref={ref}
        id="skills"
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
            Skills & Technologies
          </motion.h2>

          {/* 3D/2D Visualization */}
          <motion.div
            className="mb-16 bg-gray-800 rounded-lg p-4 border border-gray-700"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-[600px]">
              <VisualizationRouter
                graph={technologyGraph}
                width={800}
                height={600}
              />
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">
              Interactive technology network - hover or click nodes to explore
            </p>
          </motion.div>

          {/* Skill categories */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {content.categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
);

SkillsSection.displayName = 'SkillsSection';

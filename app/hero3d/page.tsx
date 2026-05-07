'use client';

import { VanillaDeskScene } from '@/components/3d/VanillaDeskScene';

export default function Hero3DPage() {
  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <VanillaDeskScene />
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg">
            MICHEAL ATANDI
          </h1>
          <p className="text-2xl md:text-3xl text-blue-400 mb-6 drop-shadow-lg">
            Software Engineer • Backend Specialist
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4 drop-shadow-lg">
            Building scalable APIs, e-commerce platforms, and event-driven systems
          </p>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center mt-8 pointer-events-auto">
            <a
              href="#projects"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce pointer-events-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg">
        <p>🖱️ Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}

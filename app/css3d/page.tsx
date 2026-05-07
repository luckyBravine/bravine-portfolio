'use client';

import { useEffect, useRef } from 'react';

export default function CSS3DPage() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
      
      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 3D Scene Container */}
      <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
        <div
          ref={sceneRef}
          className="relative w-[800px] h-[600px] transition-transform duration-100 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Desk */}
          <div
            className="absolute w-[400px] h-[200px] bg-gradient-to-br from-amber-800 to-amber-900"
            style={{
              transform: 'translateZ(-50px) translateY(100px)',
              transformStyle: 'preserve-3d',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          />

          {/* Monitor */}
          <div
            className="absolute w-[150px] h-[120px] bg-gray-900 border-4 border-gray-800 rounded-lg"
            style={{
              transform: 'translateX(-100px) translateY(20px) translateZ(0px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Monitor Screen */}
            <div className="w-full h-full bg-gradient-to-br from-green-900 to-green-950 flex items-center justify-center text-green-400 text-xs font-mono p-2">
              <div className="text-left">
                <div>const dev = {'{'}</div>
                <div className="ml-2">name: "Micheal",</div>
                <div className="ml-2">role: "Backend"</div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>

          {/* Laptop */}
          <div
            className="absolute w-[120px] h-[80px] bg-gray-800 rounded-lg"
            style={{
              transform: 'translateX(80px) translateY(60px) translateZ(10px) rotateX(-10deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Laptop Screen */}
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg flex items-center justify-center text-blue-400 text-[10px] font-mono p-2">
              <div>
                <div>{'// API Gateway'}</div>
                <div>app.use('/api')</div>
              </div>
            </div>
          </div>

          {/* Desk Lamp */}
          <div
            className="absolute w-[30px] h-[80px]"
            style={{
              transform: 'translateX(-180px) translateY(30px) translateZ(20px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Lamp base */}
            <div className="absolute bottom-0 w-[30px] h-[10px] bg-gray-700 rounded-full" />
            
            {/* Lamp arm */}
            <div className="absolute bottom-[10px] left-[12px] w-[6px] h-[50px] bg-gray-600 rounded" />
            
            {/* Lamp head */}
            <div className="absolute top-0 left-[5px] w-[20px] h-[20px] bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-t-full">
              {/* Light glow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[40px] bg-yellow-500 opacity-30 blur-xl rounded-full animate-pulse" />
            </div>
          </div>

          {/* Plant 1 */}
          <div
            className="absolute w-[40px] h-[60px]"
            style={{
              transform: 'translateX(-160px) translateY(50px) translateZ(30px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Pot */}
            <div className="absolute bottom-0 w-[40px] h-[25px] bg-gradient-to-b from-amber-700 to-amber-800 rounded-b-lg" />
            
            {/* Leaves */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute w-[15px] h-[15px] bg-green-700 rounded-full"
                  style={{
                    transform: `rotate(${i * 72}deg) translateY(-${10 + i * 5}px)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Plant 2 */}
          <div
            className="absolute w-[35px] h-[50px]"
            style={{
              transform: 'translateX(160px) translateY(60px) translateZ(25px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Pot */}
            <div className="absolute bottom-0 w-[35px] h-[20px] bg-gradient-to-b from-stone-600 to-stone-700 rounded-b-lg" />
            
            {/* Succulent */}
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[25px] h-[25px] bg-green-600 rounded-full" />
          </div>

          {/* Coffee Mug */}
          <div
            className="absolute w-[30px] h-[35px] bg-white rounded-b-lg"
            style={{
              transform: 'translateX(40px) translateY(80px) translateZ(40px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Coffee */}
            <div className="absolute top-[5px] left-[3px] w-[24px] h-[10px] bg-amber-900 rounded-full" />
            
            {/* Handle */}
            <div className="absolute right-[-8px] top-[10px] w-[12px] h-[15px] border-2 border-white rounded-r-full" />
          </div>

          {/* Keyboard */}
          <div
            className="absolute w-[100px] h-[30px] bg-gray-800 rounded"
            style={{
              transform: 'translateX(0px) translateY(90px) translateZ(35px) rotateX(-5deg)',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Mouse */}
          <div
            className="absolute w-[20px] h-[30px] bg-gray-900 rounded-t-xl"
            style={{
              transform: 'translateX(110px) translateY(95px) translateZ(38px)',
              transformStyle: 'preserve-3d',
            }}
          />
        </div>
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-2xl">
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
              href="/simple#projects"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              View Projects
            </a>
            <a
              href="/simple#contact"
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg">
        <p>🖱️ Move mouse to rotate scene</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}

'use client';

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-blue-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Debug Page</h1>
      <p className="text-xl">If you can see this, the basic Next.js setup is working.</p>
      
      <div className="mt-8 space-y-4">
        <div className="bg-green-600 p-4 rounded">
          <h2 className="text-2xl font-bold">✓ Next.js is running</h2>
        </div>
        <div className="bg-green-600 p-4 rounded">
          <h2 className="text-2xl font-bold">✓ Tailwind CSS is working</h2>
        </div>
        <div className="bg-green-600 p-4 rounded">
          <h2 className="text-2xl font-bold">✓ Client-side rendering is working</h2>
        </div>
      </div>

      <div className="mt-8">
        <a href="/" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-200">
          Go to Home Page
        </a>
      </div>
    </div>
  );
}

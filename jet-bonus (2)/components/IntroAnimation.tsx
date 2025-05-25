import React from 'react';

export const IntroAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center z-50">
      <div className="animate-intro">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-center drop-shadow-lg">
          <span className="text-blue-600">Jet</span> <span className="bg-blue-600 text-white px-3.5 py-1 rounded-xl">Bonus</span>
        </h1>
      </div>
    </div>
  );
};
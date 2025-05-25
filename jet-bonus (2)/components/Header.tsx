import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center space-y-2 mb-8">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4 drop-shadow-sm">
        <span className="text-blue-600">Jet</span> <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-md">Bonus</span>
      </h1>
      <p className="text-slate-600 text-lg">
        Bônus exclusivos
      </p>
    </header>
  );
};

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-12 py-4">
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Jet. Todos os direitos reservados.
      </p>
      <p className="text-xs text-slate-400 mt-1"> 
        Sistema de bônus fornecido com <span className="text-red-500">&#x2764;</span>
      </p>
    </footer>
  );
};
import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-dark-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-bold text-sm tracking-wider text-slate-200">
              VEDANT BHANUSHALI
            </span>
            <span className="font-mono text-[11px] text-sky-400">© 2026</span>
          </div>
          <p className="text-xs text-slate-500 font-sans">
            Computer Engineering Student & Creative Developer · Mumbai, India
          </p>
        </div>

        {/* Center: Quote */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>"Turning ideas into something real."</span>
        </div>

        {/* Right: Back to top */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            Built with React 19 & Tailwind
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 border border-white/10 text-xs font-mono text-slate-300 hover:text-sky-300 transition-colors"
            title="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

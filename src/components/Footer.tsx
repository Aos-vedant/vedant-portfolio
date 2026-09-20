import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[var(--theme-card-border)] bg-[var(--theme-badge-bg)]/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-headline font-bold text-sm tracking-wider text-[var(--theme-text)]">
              VEDANT BHANUSHALI
            </span>
            <span className="font-mono text-[11px] text-[var(--theme-accent)] font-semibold">© 2026</span>
          </div>
          <p className="text-xs text-[var(--theme-text-muted)] font-sans">
            Computer Engineering Student · Technology Explorer · Builder · Mumbai, India
          </p>
        </div>

        {/* Center: Quote */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-serif italic text-[var(--theme-text-muted)]">
          <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          <span>"I like turning ideas into something real."</span>
        </div>

        {/* Right: Back to top */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-xs font-mono text-[var(--theme-text-muted)] opacity-70">
            Made With Love and Madness of Vedant
          </span>
          <button
            onClick={scrollToTop}
            className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono"
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

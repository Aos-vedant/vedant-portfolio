import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { BookOpen, Compass, Hammer } from 'lucide-react';

export const Currently: React.FC = () => {
  const { currently } = PORTFOLIO_DATA;

  return (
    <section id="currently" className="py-10 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-white/[0.07] bg-dark-900/70 shadow-lg">
          {/* Top Bar: Minimal status header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs tracking-wider uppercase text-emerald-400 font-medium">
                CURRENT FOCUS · LIVE STATUS
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              {currently.statusNote}
            </div>
          </div>

          {/* 3 Inline Compact Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Learning */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-dark-850/60 border border-white/[0.04]">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 flex-shrink-0 mt-0.5">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-300 block mb-0.5">
                  LEARNING
                </span>
                <span className="text-xs text-slate-200 font-sans leading-snug">
                  {currently.learning}
                </span>
              </div>
            </div>

            {/* Exploring */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-dark-850/60 border border-white/[0.04]">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 flex-shrink-0 mt-0.5">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-sky-300 block mb-0.5">
                  EXPLORING
                </span>
                <span className="text-xs text-slate-200 font-sans leading-snug">
                  {currently.exploring}
                </span>
              </div>
            </div>

            {/* Building */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-dark-850/60 border border-white/[0.04]">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0 mt-0.5">
                <Hammer className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300 block mb-0.5">
                  BUILDING
                </span>
                <span className="text-xs text-slate-200 font-sans leading-snug">
                  {currently.building}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

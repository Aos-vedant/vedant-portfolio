import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Compass, Sparkles, Terminal, Code2 } from 'lucide-react';

export const About: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 tracking-wider uppercase">01 / ABOUT ME</span>
            <div className="h-[1px] w-12 bg-sky-400/30" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-100 tracking-tight">
            A Bit About Who I Am
          </h2>
          <p className="font-mono text-sm text-slate-400 mt-2">
            My background, what drives my curiosity, and how I approach learning.
          </p>
        </div>

        {/* Editorial Layout: Two-column asymmetrical */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            <p className="font-display text-xl sm:text-2xl text-slate-100 font-medium leading-snug">
              {personal.aboutIntro}
            </p>

            <p className="text-slate-400 leading-relaxed">
              {personal.aboutPhilosophy}
            </p>

            <p className="text-slate-400 leading-relaxed">
              {personal.aboutClosing}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-xs font-mono text-slate-300">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                Hands-on Curiosity
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-xs font-mono text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                Practical Builder
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-xs font-mono text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Always Learning
              </span>
            </div>
          </div>

          {/* Persona Callout Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
              <div className="font-mono text-xs text-sky-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Core Mindset</span>
                <Code2 className="w-4 h-4 text-sky-400" />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-100 mb-2">
                "Learning by making."
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Reading documentation is helpful, but nothing compares to writing code, running into an unexpected error, and debugging it until it clicks.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
              <div className="font-mono text-xs text-indigo-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>The Engineering Journey</span>
                <Compass className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-100 mb-2">
                Still Growing, Always Building
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                I don't claim to know everything, but I have the persistence to experiment, take ideas apart, and turn abstract concepts into something tangible.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-900/80 border border-white/5 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Student at SAKEC · Mumbai, India</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

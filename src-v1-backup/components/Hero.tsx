import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, Terminal, Compass, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CardTilt } from './CardTilt';

export const Hero: React.FC = () => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Hero Narrative */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-800/90 border border-sky-400/20 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="font-mono text-xs font-medium tracking-wider text-sky-300 uppercase">
              {PORTFOLIO_DATA.personal.role}
            </span>
          </div>

          {/* Name */}
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-slate-100 mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
              VEDANT
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400">
              BHANUSHALI
            </span>
          </h1>

          {/* Main Statement */}
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-100 mb-4 tracking-tight leading-snug">
            {PORTFOLIO_DATA.personal.heroHeadline}
          </p>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mb-8 leading-relaxed font-sans">
            {PORTFOLIO_DATA.personal.heroSubhead}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white font-display font-medium text-sm shadow-glow-sm hover:shadow-glow-md transition-all active:scale-95 group"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-dark-800/80 hover:bg-dark-750 border border-white/10 hover:border-sky-400/40 text-slate-200 hover:text-white font-display font-medium text-sm transition-all active:scale-95 group"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-sky-400" />
            </a>
          </div>

          {/* Quick Pill Indicators */}
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              Technology Explorer
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              Hands-on Builder
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Still Growing
            </span>
          </div>
        </div>

        {/* Right Column: Grounded & Aesthetic Persona Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <CardTilt className="w-full max-w-md" maxTilt={7} scale={1.02}>
            <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden group">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-slate-400 ml-2">vedant.space</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>STUDENT & BUILDER</span>
                </div>
              </div>

              {/* Status Content */}
              <div className="space-y-4">
                {/* Location & Time */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900/60 border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="text-xs font-medium text-slate-200">Mumbai, India</div>
                      <div className="font-mono text-[11px] text-slate-400">SAKEC · B.Tech</div>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-sky-300 font-semibold px-2 py-1 rounded bg-dark-800 border border-white/5">
                    {localTime || '04:45 AM'}
                  </div>
                </div>

                {/* Personal Tagline */}
                <div className="p-3.5 rounded-xl bg-dark-900/60 border border-white/5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      CURRENT MINDSET
                    </span>
                  </div>
                  <p className="text-xs font-sans text-slate-300 leading-relaxed">
                    Learning by building small projects, testing ideas with modern tools, and seeing what works.
                  </p>
                </div>

                {/* Topics of Interest */}
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase mb-2">
                    WHAT I TINKER WITH
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Web Interfaces', 'React', 'TypeScript', 'AI Tools', 'Linux', 'Tactile UI'].map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-lg bg-dark-800 border border-white/5 text-[11px] font-mono text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Friendly Banner */}
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-between">
                  <span className="text-xs font-medium text-sky-300">
                    Always excited to chat & build
                  </span>
                  <a
                    href="#contact"
                    className="text-[11px] font-mono text-sky-400 hover:text-sky-200 underline decoration-sky-400/40"
                  >
                    Say Hello →
                  </a>
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/20 transition-all duration-500" />
            </div>
          </CardTilt>
        </div>
      </div>
    </section>
  );
};

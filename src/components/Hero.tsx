import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, Terminal, Compass, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CardTilt } from './CardTilt';

import type { CurrentlyStatus } from '../utils/portfolioStorage';

interface HeroProps {
  onOpenCommandPalette?: () => void;
  currently?: CurrentlyStatus;
}

interface HeroProps {
  onOpenCommandPalette?: () => void;
  currently?: CurrentlyStatus;
}

export const Hero: React.FC<HeroProps> = ({ currently: propCurrently }) => {
  const [localTime, setLocalTime] = useState('');
  const currently = propCurrently ?? PORTFOLIO_DATA.currently;

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
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Hero Declaration */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Role Capsule with Liquid Glass Styling */}
          <div className="flex items-center mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-card shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse"></span>
              <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                {PORTFOLIO_DATA.personal.role}
              </span>
            </div>
          </div>

          {/* Title & Narrative Area */}
          <div className="mb-8">
            {/* Name in Architectural Display Typography */}
            <h1 className="font-syne font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-[var(--theme-text)] mb-6">
              <span className="block hover:translate-x-1 transition-transform">
                VEDANT
              </span>
              <span className="block text-[var(--theme-accent)] hover:translate-x-1 transition-transform">
                BHANUSHALI
              </span>
            </h1>

            {/* Literary Serif Quote */}
            <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[var(--theme-text)] mb-4 tracking-tight leading-snug">
              "{PORTFOLIO_DATA.personal.heroHeadline}"
            </p>

            {/* Supporting Narrative */}
            <p className="text-base sm:text-lg text-[var(--theme-text-muted)] max-w-xl leading-relaxed font-sans font-normal">
              {PORTFOLIO_DATA.personal.heroSubhead}
            </p>
          </div>

          {/* Animated Action Buttons with Hover Sweeps */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a
              href="#about"
              className="btn-accent w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-headline font-semibold text-sm shadow-md group"
            >
              <span>Explore My Journey</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </a>

            <a
              href="#contact"
              className="btn-secondary btn-sheen w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-headline font-semibold text-sm group"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[var(--theme-accent)]" />
            </a>
          </div>

          {/* Micro Metadata Pipeline */}
          <div className="mt-12 pt-6 border-t border-[var(--theme-card-border)] flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--theme-text-muted)]">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              Technology Explorer
            </span>
            <span className="opacity-40">·</span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              Hands-on Builder
            </span>
            <span className="opacity-40">·</span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              SAKEC Student
            </span>
          </div>
        </div>

        {/* Right Column: Asymmetrical Studio Architect Card with Live Status */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <CardTilt className="w-full max-w-md" maxTilt={6} scale={1.015}>
            <div className="theme-card liquid-glass-card asym-card-tr p-6 sm:p-7 relative overflow-hidden group shadow-xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--theme-card-border)]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs text-[var(--theme-text-muted)] ml-2">studio.vedant</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full stamp-pill text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold">LIVE SIGNAL</span>
                </div>
              </div>

              {/* Integrated Live Status */}
              <div className="space-y-4">
                {/* Location & Time */}
                <div className="flex items-center justify-between p-3.5 rounded-xl stamp-pill">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[var(--theme-accent)]" />
                    <div>
                      <div className="text-xs font-semibold text-[var(--theme-text)]">Mumbai, India</div>
                      <div className="font-mono text-[11px] text-[var(--theme-text-muted)]">Shah and Anchor (SAKEC), Chembur</div>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[var(--theme-accent)] font-semibold px-2.5 py-1 rounded-lg border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] shadow-2xs">
                    {localTime || 'LIVE IST'}
                  </div>
                </div>

                {/* Currently Doing Block (Fused from Currently) */}
                <div className="p-3.5 rounded-xl stamp-pill border-l-4 border-l-[var(--theme-accent)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--theme-accent)] font-semibold">
                      CURRENTLY EXPLORING
                    </span>
                  </div>
                  <p className="text-xs font-sans text-[var(--theme-text)] leading-relaxed font-medium">
                    {currently.learning}
                  </p>
                </div>

                {/* Builder Compass & Engineering Focus */}
                <div className="p-3.5 rounded-xl stamp-pill border border-[var(--theme-card-border)] space-y-2.5">
                  <div className="text-[11px] font-mono text-[var(--theme-text-muted)] uppercase tracking-wider font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[var(--theme-accent)]">
                      <Compass className="w-3.5 h-3.5" />
                      <span>BUILDER COMPASS</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-50">SAKEC '26</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)]">
                      <span className="text-[var(--theme-text)] font-sans font-medium text-[11px]">Curiosity-Led Engineering</span>
                      <span className="font-mono text-[10px] text-[var(--theme-accent)] font-semibold">01 · ROOT</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)]">
                      <span className="text-[var(--theme-text)] font-sans font-medium text-[11px]">Building to Learn & Understand</span>
                      <span className="font-mono text-[10px] text-[var(--theme-accent)] font-semibold">02 · ITERATE</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)]">
                      <span className="text-[var(--theme-text)] font-sans font-medium text-[11px]">Detail, Aesthetics & Clean Code</span>
                      <span className="font-mono text-[10px] text-[var(--theme-accent)] font-semibold">03 · CRAFT</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="p-3 rounded-xl bg-[var(--theme-accent-dim)] border border-[var(--theme-card-border)] flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--theme-text)]">
                    Interested in brainstorming?
                  </span>
                  <a
                    href="#contact"
                    className="text-[11px] font-mono text-[var(--theme-accent)] font-semibold hover:underline flex items-center gap-1 group/link"
                  >
                    <span>Drop a message</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </CardTilt>
        </div>
      </div>
    </section>
  );
};

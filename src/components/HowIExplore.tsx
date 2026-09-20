import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CardTilt } from './CardTilt';
import { Compass, FlaskConical, Hammer, BookOpen, ArrowRight, Activity, Zap } from 'lucide-react';

const iconMap = {
  Compass: Compass,
  FlaskConical: FlaskConical,
  Hammer: Hammer,
  BookOpen: BookOpen,
};

const shapeClasses = [
  'asym-card-tl',
  'asym-card-tr',
  'asym-card-bl',
  'asym-card-br',
];

export const HowIExplore: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="how-i-explore" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[var(--theme-card-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--theme-accent)] font-semibold tracking-wider uppercase">02 / CONTINUOUS CYCLE</span>
              <div className="h-[1px] w-12 bg-[var(--theme-accent)] opacity-40" />
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-5xl text-[var(--theme-text)] tracking-tight">
              How I Explore
            </h2>
            <p className="font-mono text-sm text-[var(--theme-text-muted)] mt-2">
              A hands-on, practical rhythm for approaching new technologies and turning curiosities into builds.
            </p>
          </div>
          {/* Visual Circuit Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/80 backdrop-blur-md text-xs font-mono text-[var(--theme-text-muted)] shadow-xs">
            <Activity className="w-3.5 h-3.5 text-[var(--theme-accent)] animate-pulse" />
            <span>CIRCUIT FLOW</span>
          </div>
        </div>

        {/* Connected Circuit Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PORTFOLIO_DATA.howIExplore.map((stepItem, idx) => {
            const IconComponent = iconMap[stepItem.icon as keyof typeof iconMap] || Compass;
            const isHovered = activeStep === idx;
            const shapeClass = shapeClasses[idx] || 'rounded-2xl';

            return (
              <CardTilt key={stepItem.step} maxTilt={5} scale={1.02} className="h-full">
                <div
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  className={`theme-card ${shapeClass} p-7 h-full flex flex-col justify-between group transition-all duration-300 relative shadow-lg ${
                    isHovered ? 'border-[var(--theme-accent)]' : ''
                  }`}
                >
                  <div>
                    {/* Top Row: Phase Identifier & Stage Pill */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="font-syne text-4xl font-extrabold text-[var(--theme-accent)]">
                          {stepItem.step}
                        </span>
                        <span className="text-[10px] font-mono opacity-50 block">/ 04</span>
                      </div>
                      <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md stamp-pill">
                        {stepItem.tag}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-[var(--theme-accent-dim)] text-[var(--theme-accent)] group-hover:scale-110 group-hover:bg-[var(--theme-accent)] group-hover:text-white transition-all">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-headline font-bold text-xl text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors">
                        {stepItem.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed font-sans">
                      {stepItem.description}
                    </p>
                  </div>

                  {/* Flow Connection Footer */}
                  <div className="mt-8 pt-4 border-t border-[var(--theme-card-border)] flex items-center justify-between text-xs font-mono text-[var(--theme-text-muted)]">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Zap className="w-3 h-3 text-[var(--theme-accent)]" />
                      STAGE {stepItem.step}
                    </span>
                    {idx < 3 ? (
                      <div className="flex items-center gap-1 text-[var(--theme-accent)] group-hover:translate-x-1.5 transition-transform">
                        <span className="text-[10px] hidden sm:inline font-semibold">NEXT</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    ) : (
                      <span className="text-[10px] text-emerald-600 font-mono font-semibold">CYCLE REPEATS ↺</span>
                    )}
                  </div>
                </div>
              </CardTilt>
            );
          })}
        </div>

        {/* Dedicated Builder Compass Philosophy Ribbon */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl theme-card border border-[var(--theme-card-border)] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[var(--theme-accent-dim)] text-[var(--theme-accent)] flex-shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-xs text-[var(--theme-accent)] font-semibold uppercase tracking-wider block">
                BUILDER COMPASS
              </span>
              <span className="text-xs text-[var(--theme-text-muted)] font-sans">
                Core tenets grounding everyday technical experiments.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="px-3 py-1.5 rounded-lg bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)] text-xs font-mono text-[var(--theme-text)] flex items-center gap-2">
              <span className="text-[var(--theme-accent)] font-semibold">01</span>
              <span>Curiosity-Led Engineering</span>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)] text-xs font-mono text-[var(--theme-text)] flex items-center gap-2">
              <span className="text-[var(--theme-accent)] font-semibold">02</span>
              <span>Build to Learn</span>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)] text-xs font-mono text-[var(--theme-text)] flex items-center gap-2">
              <span className="text-[var(--theme-accent)] font-semibold">03</span>
              <span>Clean Code & Detail</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

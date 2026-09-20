import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CardTilt } from './CardTilt';
import { Compass, FlaskConical, Hammer, BookOpen, ArrowRight } from 'lucide-react';

const iconMap = {
  Compass: Compass,
  FlaskConical: FlaskConical,
  Hammer: Hammer,
  BookOpen: BookOpen,
};

export const HowIExplore: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="how-i-explore" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 tracking-wider uppercase">02 — PROCESS</span>
            <div className="h-[1px] w-12 bg-sky-400/30" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-100 tracking-tight">
            How I Explore
          </h2>
          <p className="font-mono text-sm text-slate-400 mt-2">
            A natural, hands-on rhythm for approaching new technologies and ideas.
          </p>
        </div>

        {/* Connected Step Cards: Horizontal on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PORTFOLIO_DATA.howIExplore.map((stepItem, idx) => {
            const IconComponent = iconMap[stepItem.icon as keyof typeof iconMap] || Compass;
            const isHovered = activeStep === idx;

            return (
              <CardTilt key={stepItem.step} maxTilt={6} scale={1.02} className="h-full">
                <div
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  className={`glass-card rounded-2xl p-7 border transition-all duration-300 h-full flex flex-col justify-between group ${
                    isHovered
                      ? 'border-sky-400/40 bg-dark-800/90 shadow-glow-sm'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Top Row: Number & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-2xl font-bold text-sky-400/80 group-hover:text-sky-300 transition-colors">
                        {stepItem.step}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400 px-2.5 py-1 rounded bg-dark-900 border border-white/5">
                        {stepItem.tag}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-dark-800 border border-white/5 text-sky-400 group-hover:scale-110 group-hover:text-sky-300 transition-all">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-semibold text-xl text-slate-100 group-hover:text-sky-300 transition-colors">
                        {stepItem.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {stepItem.description}
                    </p>
                  </div>

                  {/* Flow Arrow (indicating connection to next step) */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>PHASE {stepItem.step} OF 04</span>
                    {idx < 3 ? (
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-mono">REPEAT CYCLE</span>
                    )}
                  </div>
                </div>
              </CardTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CardTilt } from './CardTilt';
import { Gamepad2, Trophy, Compass, Sparkles, MapPin } from 'lucide-react';

const iconMap = {
  "Interactive": Gamepad2,
  "Sports": Trophy,
  "Mindset": Sparkles,
  "Life": MapPin,
};

export const BeyondTech: React.FC = () => {
  const { beyondTheScreen } = PORTFOLIO_DATA;
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <section id="beyond" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 tracking-wider uppercase">07 / BEYOND THE SCREEN</span>
            <div className="h-[1px] w-12 bg-sky-400/30" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-100 tracking-tight">
            Outside of Tech
          </h2>
          <p className="font-mono text-sm text-slate-400 mt-2">
            {beyondTheScreen.intro}
          </p>
        </div>

        {/* 4 Refined Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {beyondTheScreen.interests.map((item, idx) => {
            const IconComponent = iconMap[item.category as keyof typeof iconMap] || Compass;
            const isHovered = activeItem === idx;

            return (
              <CardTilt key={idx} maxTilt={6} scale={1.02} className="h-full">
                <div
                  onMouseEnter={() => setActiveItem(idx)}
                  onMouseLeave={() => setActiveItem(null)}
                  className={`glass-card rounded-2xl p-6 border transition-all duration-300 h-full flex flex-col justify-between group ${
                    isHovered
                      ? 'border-sky-400/40 shadow-glow-sm bg-dark-800/90'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="p-2.5 rounded-xl bg-dark-800 border border-white/5 text-sky-400 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-dark-900 border border-white/5 text-slate-400">
                        {item.badge}
                      </span>
                    </div>

                    {/* Category Label */}
                    <div className="font-mono text-[11px] text-slate-500 uppercase tracking-wider mb-1">
                      {item.category}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-semibold text-lg text-slate-100 group-hover:text-sky-300 transition-colors mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>PERSPECTIVE 0{idx + 1}</span>
                    <span className="text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ✦
                    </span>
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

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

const shapeList = [
  'asym-card-tl',
  'asym-card-tr',
  'asym-card-bl',
  'asym-card-br',
];

export const BeyondTech: React.FC = () => {
  const { beyondTheScreen } = PORTFOLIO_DATA;
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <section id="beyond" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[var(--theme-card-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--theme-accent)] font-semibold tracking-wider uppercase">05 / LIFE & LEISURE</span>
              <div className="h-[1px] w-12 bg-[var(--theme-accent)] opacity-40" />
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-5xl text-[var(--theme-text)] tracking-tight">
              Outside of Tech
            </h2>
            <p className="font-mono text-sm text-[var(--theme-text-muted)] mt-2">
              {beyondTheScreen.intro}
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/80 backdrop-blur-md text-xs font-mono text-[var(--theme-text-muted)] shadow-xs">
            PERSPECTIVES
          </div>
        </div>

        {/* 4 Distinct Shaped Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {beyondTheScreen.interests.map((item, idx) => {
            const IconComponent = iconMap[item.category as keyof typeof iconMap] || Compass;
            const isHovered = activeItem === idx;
            const shape = shapeList[idx % shapeList.length];

            return (
              <CardTilt key={idx} maxTilt={6} scale={1.02} className="h-full">
                <div
                  onMouseEnter={() => setActiveItem(idx)}
                  onMouseLeave={() => setActiveItem(null)}
                  className={`theme-card ${shape} p-6 transition-all duration-300 h-full flex flex-col justify-between group shadow-lg ${
                    isHovered ? 'border-[var(--theme-accent)]' : ''
                  }`}
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="p-2.5 rounded-xl bg-[var(--theme-accent-dim)] text-[var(--theme-accent)] group-hover:scale-110 group-hover:bg-[var(--theme-accent)] group-hover:text-white transition-all">
                        <IconComponent className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full stamp-pill">
                        {item.badge}
                      </span>
                    </div>

                    {/* Category Label */}
                    <div className="font-mono text-[11px] text-[var(--theme-text-muted)] opacity-60 uppercase tracking-wider mb-1 font-semibold">
                      {item.category}
                    </div>

                    {/* Title */}
                    <h3 className="font-headline font-bold text-lg text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[var(--theme-card-border)] flex items-center justify-between text-[11px] font-mono text-[var(--theme-text-muted)]">
                    <span>PERSPECTIVE 0{idx + 1}</span>
                    <span className="text-[var(--theme-accent)] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
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

import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Compass, Sparkles, Terminal, Code2, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { personal, education } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[var(--theme-card-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Asymmetric Coordinates */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--theme-accent)] font-semibold tracking-wider uppercase">01 / ABOUT</span>
              <div className="h-[1px] w-12 bg-[var(--theme-accent)] opacity-40" />
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-5xl text-[var(--theme-text)] tracking-tight">
              A Bit About Who I Am
            </h2>
            <p className="font-mono text-sm text-[var(--theme-text-muted)] mt-2">
              My background, engineering philosophy, and current academic path.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/80 backdrop-blur-md text-xs font-mono text-[var(--theme-text-muted)] shadow-xs">
            STUDIO BENTO
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Cell 1: Main Editorial Narrative (8 cols) */}
          <div className="lg:col-span-8 theme-card asym-card-tl p-7 sm:p-9 flex flex-col justify-between group shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--theme-accent)] font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)]" />
                  PERSPECTIVE & ORIGIN
                </span>
                <span className="font-mono text-[11px] opacity-50">REF. 01.A</span>
              </div>

              <p className="font-serif italic text-2xl sm:text-3xl text-[var(--theme-text)] font-normal leading-snug">
                "{personal.aboutIntro}"
              </p>

              <p className="text-base sm:text-lg text-[var(--theme-text-muted)] leading-relaxed font-sans">
                {personal.aboutPhilosophy}
              </p>

              <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed font-sans">
                {personal.aboutClosing}
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-[var(--theme-card-border)] flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full stamp-pill text-xs font-mono">
                <Compass className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                Hands-on Curiosity
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full stamp-pill text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                Practical Builder
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full stamp-pill text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Always Learning
              </span>
            </div>
          </div>

          {/* Bento Cell 2: Academic Milestones & University Pathway (4 cols) */}
          <div className="lg:col-span-4 theme-card asym-card-tr p-6 sm:p-7 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--theme-card-border)]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[var(--theme-accent-dim)] text-[var(--theme-accent)]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--theme-accent)] font-semibold">
                    ACADEMICS
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl stamp-pill text-left space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--theme-accent)] font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                      <span className="opacity-60">{edu.location}</span>
                    </div>
                    <div className="font-headline font-bold text-sm text-[var(--theme-text)]">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-[var(--theme-text-muted)] font-medium">
                      {edu.institution}
                    </div>
                    <p className="text-[11px] text-[var(--theme-text-muted)] opacity-80 leading-relaxed pt-1">
                      {edu.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--theme-card-border)] flex items-center justify-between text-xs font-mono text-[var(--theme-text-muted)]">
              <span>Mumbai, India</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>

          {/* Bento Cell 3: Hands-On Mindset (6 cols) */}
          <div className="lg:col-span-6 theme-card asym-card-bl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <div className="font-mono text-xs text-[var(--theme-accent)] font-semibold uppercase tracking-wider mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[var(--theme-accent)]" />
                  THE PRACTICAL APPROACH
                </span>
                <span className="font-mono text-[11px] opacity-50">REF. 01.B</span>
              </div>
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-[var(--theme-text)] mb-3">
                "Learning by making."
              </h3>
              <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed font-sans">
                Reading documentation is helpful, but nothing compares to writing code, running into an unexpected error, and debugging it until it clicks. That iterative cycle is where real intuition develops.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--theme-card-border)] flex items-center gap-3 text-xs font-mono text-[var(--theme-text-muted)]">
              <span className="px-2 py-0.5 rounded stamp-pill text-[10px]">PRACTICE</span>
              <span className="opacity-40">→</span>
              <span className="px-2 py-0.5 rounded stamp-pill text-[10px]">DEBUG</span>
              <span className="opacity-40">→</span>
              <span className="px-2 py-0.5 rounded stamp-pill text-[10px]">UNDERSTAND</span>
            </div>
          </div>

          {/* Bento Cell 4: Student Journey & Persistence (6 cols) */}
          <div className="lg:col-span-6 theme-card asym-card-br p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <div className="font-mono text-xs text-[var(--theme-accent)] font-semibold uppercase tracking-wider mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[var(--theme-accent)]" />
                  PERSISTENCE
                </span>
                <span className="font-mono text-[11px] opacity-50">REF. 01.C</span>
              </div>
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-[var(--theme-text)] mb-3">
                Still Growing, Always Building
              </h3>
              <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed font-sans">
                I don't claim to know everything, but I have the persistence to experiment, take ideas apart, and turn abstract concepts into something tangible. With AI and modern tools, learning has never been more exciting.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--theme-card-border)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                Based in Mumbai, India
              </span>
              <span className="text-[var(--theme-accent)] font-semibold">SAKEC B.Tech</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

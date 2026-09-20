import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 tracking-wider uppercase">08 / BACKGROUND</span>
            <div className="h-[1px] w-12 bg-sky-400/30" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-100 tracking-tight">
            Education
          </h2>
          <p className="font-mono text-sm text-slate-400 mt-2">
            Academic milestones and current university studies.
          </p>
        </div>

        {/* Clean Timeline */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8 max-w-3xl">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <div key={idx} className="relative group">
              {/* Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark-900 border-2 border-sky-400/60 flex items-center justify-center text-sky-400 group-hover:border-sky-300 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Education Card */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-sky-400/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                    <MapPin className="w-3 h-3" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-slate-100 group-hover:text-sky-300 transition-colors">
                  {edu.degree}
                </h3>
                <div className="text-sm font-medium text-slate-300 mt-1 mb-3">
                  {edu.institution}
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {edu.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

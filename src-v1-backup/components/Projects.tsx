import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { CardTilt } from './CardTilt';
import { ExternalLink, ArrowUpRight, X, HelpCircle, Lightbulb, Compass, Hammer, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const projects = PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 tracking-wider uppercase">04 / CREATIONS</span>
            <div className="h-[1px] w-12 bg-sky-400/30" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-100 tracking-tight">
                Things I've Made
              </h2>
              <p className="font-mono text-sm text-slate-400 mt-2">
                A dedicated space for projects, web tools, and software experiments.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500">
              {projects.length > 0 ? `${projects.length} Projects Shipped` : 'Workshop Active'}
            </div>
          </div>
        </div>

        {/* If Projects Exist -> Render Project Cards */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <CardTilt key={project.id} maxTilt={6} scale={1.015} className="h-full">
                <div className="glass-card rounded-2xl p-7 border border-white/[0.06] hover:border-sky-400/30 transition-all duration-300 h-full flex flex-col justify-between group">
                  <div>
                    {/* Top Meta: Category & Year */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-sky-400 px-2.5 py-1 rounded bg-sky-500/10 border border-sky-400/20">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        {project.status && (
                          <span className="text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">
                            {project.status}
                          </span>
                        )}
                        <span>{project.year}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-2xl text-slate-100 group-hover:text-sky-300 transition-colors mb-2">
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm font-medium text-slate-300 mb-5 leading-snug">
                      {project.tagline}
                    </p>

                    {/* Explanations */}
                    <div className="space-y-3 p-4 rounded-xl bg-dark-900/80 border border-white/[0.05] mb-6 text-xs text-slate-400 font-sans">
                      <div>
                        <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider block mb-0.5">
                          WHAT IT IS
                        </span>
                        <p className="text-slate-300">{project.whatItIs}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider block mb-0.5">
                          WHAT I EXPLORED
                        </span>
                        <p className="text-slate-300">{project.whatIExplored}</p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-dark-800 border border-white/[0.05] text-[11px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 font-medium group/btn"
                    >
                      <span>View Project Story</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-dark-800 hover:bg-dark-750 border border-white/[0.06] text-slate-400 hover:text-slate-100 transition-colors"
                        title="View on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-dark-800 hover:bg-dark-750 border border-white/[0.06] text-slate-400 hover:text-sky-300 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardTilt>
            ))}
          </div>
        ) : (
          /* Honest, Aesthetic Empty State / In-the-Workshop Container */
          <CardTilt maxTilt={4} scale={1.01}>
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/[0.07] text-center max-w-3xl mx-auto relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/15 transition-all duration-700" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-dark-800 border border-white/[0.08] flex items-center justify-center text-sky-400 shadow-glow-sm mb-6 group-hover:scale-105 transition-transform">
                  <Hammer className="w-6 h-6" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-[11px] font-mono text-sky-300 mb-4">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>IN THE WORKSHOP</span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-100 mb-3 tracking-tight">
                  Currently Building First Projects
                </h3>

                <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto font-sans leading-relaxed mb-8">
                  As an engineering student, I am currently exploring web architectures, writing small scripts, and putting together my initial set of builds. When they are ready, they will appear right here.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg mb-8 text-left">
                  <div className="p-3.5 rounded-xl bg-dark-900/70 border border-white/[0.05]">
                    <span className="font-mono text-[10px] text-slate-500 uppercase block mb-1">01 / CONCEPT</span>
                    <span className="text-xs text-slate-300 font-medium">Idea & Wireframing</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-dark-900/70 border border-white/[0.05]">
                    <span className="font-mono text-[10px] text-sky-400 uppercase block mb-1">02 / ACTIVE</span>
                    <span className="text-xs text-slate-200 font-medium">Code & Prototyping</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-dark-900/70 border border-white/[0.05]">
                    <span className="font-mono text-[10px] text-slate-500 uppercase block mb-1">03 / FUTURE</span>
                    <span className="text-xs text-slate-300 font-medium">Testing & Deployment</span>
                  </div>
                </div>

                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-800 hover:bg-dark-750 border border-white/[0.08] hover:border-sky-400/40 text-xs font-mono text-slate-200 hover:text-white transition-all shadow-sm"
                >
                  <GithubIcon className="w-4 h-4 text-sky-400" />
                  <span>Check Progress on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>
          </CardTilt>
        )}
      </div>

      {/* Project Story Modal (Ready for when projects are added) */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModalProject(null)}
          />

          <div className="relative w-full max-w-2xl bg-dark-850 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] z-10 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-400/20">
                  {activeModalProject.category}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-100 mt-2">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-xl bg-dark-800 text-slate-400 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Three Honest Pillars */}
            <div className="space-y-4 text-sm leading-relaxed">
              <div className="p-4 rounded-xl bg-dark-900 border border-white/5">
                <div className="font-mono text-xs text-sky-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  What It Is
                </div>
                <p className="text-slate-300 font-sans">
                  {activeModalProject.whatItIs}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-white/5">
                <div className="font-mono text-xs text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Why I Made It
                </div>
                <p className="text-slate-300 font-sans">
                  {activeModalProject.whyIMadeIt}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-white/5">
                <div className="font-mono text-xs text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  What I Explored & Learned
                </div>
                <p className="text-slate-300 font-sans">
                  {activeModalProject.whatIExplored}
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                Tools & Technologies Used
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-dark-900 border border-white/5 text-xs font-mono text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-3">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 border border-white/10 text-xs font-mono text-slate-200"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 text-xs font-mono"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { CardTilt } from './CardTilt';
import { ExternalLink, ArrowUpRight, X, HelpCircle, Lightbulb, Compass, Hammer, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectsProps {
  projects?: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects: propProjects }) => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const projects = propProjects ?? PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[var(--theme-card-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--theme-accent)] font-semibold tracking-wider uppercase">04 / CREATIONS & BUILDS</span>
            <div className="h-[1px] w-12 bg-[var(--theme-accent)] opacity-40" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h2 className="font-syne font-bold text-3xl sm:text-5xl text-[var(--theme-text)] tracking-tight">
                Things I've Made
              </h2>
              <p className="font-mono text-sm text-[var(--theme-text-muted)] mt-2">
                A dedicated workshop space for future applications, developer tools, and software experiments.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--theme-accent)] px-3 py-1 rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/80 backdrop-blur-md shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              <span>{projects.length > 0 ? `${projects.length} PROJECTS SHIPPED` : 'ACTIVE WORKSHOP'}</span>
            </div>
          </div>
        </div>

        {/* If Projects Exist -> Render Project Cards */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <CardTilt key={project.id} maxTilt={6} scale={1.015} className="h-full">
                <div className="theme-card asym-card-tl p-7 transition-all duration-300 h-full flex flex-col justify-between group shadow-lg hover:border-[var(--theme-accent)]">
                  <div>
                    {/* Top Meta: Category & Year */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md stamp-pill">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-text-muted)]">
                        {project.status && (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] font-semibold">
                            {project.status}
                          </span>
                        )}
                        <span>{project.year}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-headline font-bold text-2xl text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm font-medium text-[var(--theme-text-muted)] mb-5 leading-snug">
                      {project.tagline}
                    </p>

                    {/* Explanations */}
                    <div className="space-y-3 p-4 rounded-xl stamp-pill mb-6 text-xs font-sans">
                      <div>
                        <span className="font-mono text-[11px] opacity-60 uppercase tracking-wider block mb-0.5 font-semibold">
                          WHAT IT IS
                        </span>
                        <p className="font-medium text-[var(--theme-text)]">{project.whatItIs}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[11px] opacity-60 uppercase tracking-wider block mb-0.5 font-semibold">
                          WHAT I EXPLORED
                        </span>
                        <p className="font-medium text-[var(--theme-text)]">{project.whatIExplored}</p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg stamp-pill text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-[var(--theme-card-border)] flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--theme-accent)] hover:opacity-80 group/btn"
                    >
                      <span>View Project Story</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg stamp-pill hover:text-[var(--theme-accent)] transition-colors"
                        title="View on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg stamp-pill hover:text-[var(--theme-accent)] transition-colors"
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
          /* Architectural Blueprint Workshop Container */
          <CardTilt maxTilt={4} scale={1.01}>
            <div className="theme-card asym-card-tr p-8 sm:p-14 text-center max-w-3xl mx-auto relative overflow-hidden group transition-all shadow-2xl">
              {/* Subtle background glow & blueprint grid */}
              <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
              <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--theme-accent-dim)] rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-all duration-700" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-[var(--theme-accent-dim)] border border-[var(--theme-card-border)] flex items-center justify-center text-[var(--theme-accent)] mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Hammer className="w-7 h-7" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/80 backdrop-blur-md text-[11px] font-mono font-semibold mb-4 text-[var(--theme-text-muted)] shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>BLUEPRINT WORKSHOP</span>
                </div>

                <h3 className="font-syne font-bold text-2xl sm:text-4xl text-[var(--theme-text)] mb-3 tracking-tight">
                  Currently Building First Projects
                </h3>

                <p className="text-sm sm:text-base text-[var(--theme-text-muted)] max-w-lg mx-auto font-sans leading-relaxed mb-8">
                  As a computer engineering student, I am currently exploring web architectures, writing scripts, and assembling my initial builds. When ready, they will be documented right here with full source and stories.
                </p>

                {/* 3 Milestone Capsules */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mb-8 text-left">
                  <div className="p-4 rounded-xl stamp-pill asym-card-tl">
                    <span className="font-mono text-[10px] opacity-60 uppercase block mb-1 font-semibold">01 / CONCEPT</span>
                    <span className="text-xs text-[var(--theme-text)] font-semibold block">Idea & Wireframing</span>
                    <span className="text-[10px] font-mono text-[var(--theme-accent)] mt-1 block">Completed</span>
                  </div>
                  <div className="p-4 rounded-xl stamp-pill border-[var(--theme-accent)] bg-[var(--theme-accent-dim)]">
                    <span className="font-mono text-[10px] text-[var(--theme-accent)] uppercase block mb-1 font-semibold">02 / ACTIVE</span>
                    <span className="text-xs text-[var(--theme-text)] font-bold block">Code & Prototyping</span>
                    <span className="text-[10px] font-mono text-[var(--theme-accent)] mt-1 block">In Progress</span>
                  </div>
                  <div className="p-4 rounded-xl stamp-pill asym-card-br">
                    <span className="font-mono text-[10px] opacity-60 uppercase block mb-1 font-semibold">03 / FUTURE</span>
                    <span className="text-xs text-[var(--theme-text)] font-semibold block">Testing & Deployment</span>
                    <span className="text-[10px] font-mono opacity-50 mt-1 block">Upcoming</span>
                  </div>
                </div>

                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-mono font-semibold shadow-md group"
                >
                  <GithubIcon className="w-4 h-4 text-[var(--theme-accent)]" />
                  <span>Check Progress on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 opacity-70" />
                </a>
              </div>
            </div>
          </CardTilt>
        )}
      </div>

      {/* Project Story Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModalProject(null)}
          />

          <div className="relative w-full max-w-2xl theme-card rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] z-10 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs px-2 py-0.5 rounded stamp-pill font-semibold">
                  {activeModalProject.category}
                </span>
                <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[var(--theme-text)] mt-2">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-xl stamp-pill hover:text-[var(--theme-accent)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Three Honest Pillars */}
            <div className="space-y-4 text-sm leading-relaxed">
              <div className="p-4 rounded-xl stamp-pill">
                <div className="font-mono text-xs text-[var(--theme-accent)] uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                  <HelpCircle className="w-3.5 h-3.5" />
                  What It Is
                </div>
                <p className="text-[var(--theme-text)] font-sans">
                  {activeModalProject.whatItIs}
                </p>
              </div>

              <div className="p-4 rounded-xl stamp-pill">
                <div className="font-mono text-xs text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Why I Made It
                </div>
                <p className="text-[var(--theme-text)] font-sans">
                  {activeModalProject.whyIMadeIt}
                </p>
              </div>

              <div className="p-4 rounded-xl stamp-pill">
                <div className="font-mono text-xs text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  What I Explored & Learned
                </div>
                <p className="text-[var(--theme-text)] font-sans">
                  {activeModalProject.whatIExplored}
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <div className="font-mono text-xs text-[var(--theme-text-muted)] uppercase tracking-wider mb-2 font-semibold">
                Tools & Technologies Used
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg stamp-pill text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[var(--theme-card-border)] flex items-center justify-end gap-3">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
              <button
                onClick={() => setActiveModalProject(null)}
                className="btn-accent px-5 py-2 rounded-xl text-xs font-mono font-semibold"
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

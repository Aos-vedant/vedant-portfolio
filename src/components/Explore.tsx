import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CardTilt } from './CardTilt';
import { Play, Sparkles } from 'lucide-react';

export const Explore: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('code-web');

  // Interactive Playground Terminal
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'vedant.focus()', output: '→ Exploring modern web frameworks, UI micro-interactions, and AI workflows.' },
    { cmd: 'vedant.interests()', output: '→ Web development, software experiments, creative tooling, and sports.' }
  ]);
  const [inputVal, setInputVal] = useState('');

  const activeCategory =
    PORTFOLIO_DATA.thingsILikeExploring.find((c) => c.id === activeCategoryId) ||
    PORTFOLIO_DATA.thingsILikeExploring[0];

  const handleCommand = (command: string) => {
    const trimmed = command.trim().toLowerCase();
    let res = '';

    if (trimmed === 'help') {
      res = 'Available commands: focus, interests, stack, quote, contact, clear';
    } else if (trimmed === 'focus' || trimmed === 'vedant.focus()') {
      res = '→ Exploring modern web frameworks, UI micro-interactions, and AI workflows.';
    } else if (trimmed === 'interests' || trimmed === 'vedant.interests()') {
      res = '→ Web development, software experiments, creative tooling, and sports.';
    } else if (trimmed === 'quote' || trimmed === 'vedant.quote()') {
      res = '→ "I like turning ideas into something real."';
    } else if (trimmed === 'stack') {
      res = '→ TypeScript, React, Tailwind CSS, Python, HTML/CSS, Linux, Git.';
    } else if (trimmed === 'contact') {
      res = '→ Email: Vedantbhanushaliofficial@gmail.com | GitHub: @vedantbhanushali';
    } else if (trimmed === 'clear') {
      setTerminalHistory([]);
      return;
    } else {
      res = `Command '${command}' not recognized. Try typing 'help' or click the quick pills below.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: command, output: res }]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  return (
    <section id="explore" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[var(--theme-card-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--theme-accent)] font-semibold tracking-wider uppercase">03 / DOMAINS & TOOLING</span>
              <div className="h-[1px] w-12 bg-[var(--theme-accent)] opacity-40" />
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-5xl text-[var(--theme-text)] tracking-tight">
              Things I Like Exploring
            </h2>
            <p className="font-mono text-sm text-[var(--theme-text-muted)] mt-2">
              No fake skill bars or arbitrary percentages — genuine areas of tech that spark my curiosity.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/80 backdrop-blur-md text-xs font-mono text-[var(--theme-text-muted)] shadow-xs">
            WORKBENCH
          </div>
        </div>

        {/* Category Tabs with Animated Pill Transitions */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-[var(--theme-card-border)]">
          {PORTFOLIO_DATA.thingsILikeExploring.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'btn-accent font-semibold shadow-md'
                    : 'stamp-pill hover:border-[var(--theme-accent)] hover:translate-y-[-1px]'
                }`}
              >
                <span>{cat.tag.split(' / ')[0]}</span>
                <span className="opacity-40">·</span>
                <span className="font-sans font-medium">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Two Column Layout: Topics Grid + Interactive Developer Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Explored Topics (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="theme-card asym-card-tl p-6 mb-6 flex items-center justify-between shadow-lg">
              <div>
                <h3 className="font-headline font-bold text-lg text-[var(--theme-text)] mb-1">
                  {activeCategory.title}
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-sans">
                  {activeCategory.description}
                </p>
              </div>
              <span className="font-mono text-xs text-[var(--theme-accent)] font-semibold hidden sm:inline px-3 py-1 rounded-full stamp-pill">
                {activeCategory.tag}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeCategory.topics.map((topic, idx) => (
                <CardTilt key={idx} maxTilt={5} scale={1.01} glow={false}>
                  <div className="theme-card rounded-2xl p-5 h-full flex flex-col justify-between shadow-md hover:border-[var(--theme-accent)] transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-headline font-semibold text-sm text-[var(--theme-text)]">
                          {topic.name}
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                      </div>
                      <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed font-sans mt-2">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </CardTilt>
              ))}
            </div>
          </div>

          {/* Right Column: Sleek Asymmetric Developer Console (Always Visible & Crisp) */}
          <div className="lg:col-span-5">
            <div className="terminal-shell asym-card-tr overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs text-zinc-300 ml-2 font-medium">vedant-shell.sh</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>INTERACTIVE</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 font-mono text-xs min-h-[270px] max-h-[350px] overflow-y-auto space-y-3 bg-[#0d0f17]">
                <div className="text-zinc-400 text-[11px]">
                  Interactive console. Click quick pills or type a command:
                </div>

                {terminalHistory.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[var(--theme-accent)] font-semibold">
                      <span>$</span>
                      <span>{item.cmd}</span>
                    </div>
                    <div className="text-zinc-200 pl-3 leading-relaxed text-[11px] whitespace-pre-wrap">
                      {item.output}
                    </div>
                  </div>
                ))}

                {/* Input Prompt Form */}
                <form onSubmit={handleFormSubmit} className="flex items-center gap-1.5 pt-2">
                  <span className="text-[var(--theme-accent)] font-bold">$</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="type 'help', 'focus', 'stack', or 'clear'..."
                    className="flex-1 bg-transparent border-none text-white placeholder:text-zinc-500 focus:outline-none text-xs font-mono"
                  />
                  <button
                    type="submit"
                    className="p-1.5 rounded-lg bg-white/15 hover:bg-[var(--theme-accent)] text-zinc-200 hover:text-white transition-all btn-sheen"
                    title="Run command"
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </form>
              </div>

              {/* Quick Command Pills with Hover Animations */}
              <div className="px-4 py-2.5 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-[10px] font-mono bg-black/60">
                <span className="text-zinc-400">Quick:</span>
                {['vedant.focus()', 'stack', 'interests', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-[var(--theme-accent)] text-zinc-200 hover:text-white border border-white/15 transition-all hover:scale-105 btn-sheen"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

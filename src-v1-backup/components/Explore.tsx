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
      res = '→ Email: vedantbhanushali.dev@gmail.com | GitHub: @vedantbhanushali';
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
    <section id="explore" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 tracking-wider uppercase">03 / DOMAINS</span>
            <div className="h-[1px] w-12 bg-sky-400/30" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-100 tracking-tight">
            Things I Like Exploring
          </h2>
          <p className="font-mono text-sm text-slate-400 mt-2">
            No fake skill bars or mastery scores — just areas of technology and creation that spark my curiosity.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-white/5">
          {PORTFOLIO_DATA.thingsILikeExploring.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-sky-400/20 text-sky-300 border border-sky-400/40 shadow-sm font-semibold'
                    : 'bg-dark-800/80 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10'
                }`}
              >
                <span>{cat.tag.split(' / ')[0]}</span>
                <span className="text-slate-600">·</span>
                <span className="font-sans font-medium">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Two Column Layout: Topics Grid + Interactive Playground Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Explored Topics (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-dark-850/60 border border-white/5 mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-lg text-slate-100 mb-1">
                  {activeCategory.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  {activeCategory.description}
                </p>
              </div>
              <span className="font-mono text-xs text-sky-400/70 hidden sm:inline">
                {activeCategory.tag}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeCategory.topics.map((topic, idx) => (
                <CardTilt key={idx} maxTilt={5} scale={1.01} glow={false}>
                  <div className="glass-card rounded-xl p-5 border border-white/5 hover:border-sky-400/30 transition-colors h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-medium text-sm text-slate-100">
                          {topic.name}
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-sky-400/70" />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </CardTilt>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Playground Terminal (5 cols) */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="bg-dark-900 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-slate-400 ml-2">vedant-shell.sh</span>
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  interactive
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 bg-dark-950/90 font-mono text-xs text-slate-300 min-h-[260px] max-h-[340px] overflow-y-auto space-y-3">
                <div className="text-slate-500 text-[11px]">
                  Interactive console. Click quick pills or type a command:
                </div>

                {terminalHistory.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                      <span>$</span>
                      <span>{item.cmd}</span>
                    </div>
                    <div className="text-slate-300 pl-3 leading-relaxed text-[11px] whitespace-pre-wrap">
                      {item.output}
                    </div>
                  </div>
                ))}

                {/* Input Prompt Form */}
                <form onSubmit={handleFormSubmit} className="flex items-center gap-1.5 pt-2">
                  <span className="text-sky-400 font-bold">$</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="type 'help', 'focus', 'stack', or 'clear'..."
                    className="flex-1 bg-transparent border-none text-slate-200 placeholder:text-slate-600 focus:outline-none text-xs font-mono"
                  />
                  <button
                    type="submit"
                    className="p-1 text-slate-400 hover:text-sky-300 transition-colors"
                    title="Run command"
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </form>
              </div>

              {/* Quick Command Pills */}
              <div className="bg-dark-900/90 px-4 py-2.5 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                <span className="text-slate-500">Quick run:</span>
                {['vedant.focus()', 'stack', 'interests', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2 py-0.5 rounded bg-dark-800 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-white/5 transition-colors"
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

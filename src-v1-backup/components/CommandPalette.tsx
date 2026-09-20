import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, BookOpen, Layers, Terminal, Sparkles, Mail, ArrowRight, X, Gamepad2, GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onCopyEmail: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onCopyEmail,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = [
    { id: 'hero', label: 'Home / Top', icon: Terminal, category: 'Navigation' },
    { id: 'about', label: 'About Vedant', icon: BookOpen, category: 'Navigation' },
    { id: 'how-i-explore', label: 'How I Explore (Process)', icon: Compass, category: 'Navigation' },
    { id: 'explore', label: 'Things I Like Exploring (Domains)', icon: Layers, category: 'Navigation' },
    { id: 'projects', label: "Things I've Made (Creations)", icon: Layers, category: 'Navigation' },
    { id: 'currently', label: 'Currently (Live Status)', icon: Sparkles, category: 'Navigation' },
    { id: 'beyond', label: 'Outside of Tech (Beyond Screen)', icon: Gamepad2, category: 'Navigation' },
    { id: 'education', label: 'Education (SAKEC & HSC)', icon: GraduationCap, category: 'Navigation' },
    { id: 'contact', label: "Get in Touch (Let's Connect)", icon: Mail, category: 'Navigation' },
    {
      id: 'copy-email',
      label: `Copy Email (${PORTFOLIO_DATA.personal.email})`,
      icon: Mail,
      category: 'Actions',
      onSelect: () => {
        onCopyEmail();
        onClose();
      },
    },
    {
      id: 'github',
      label: 'Open GitHub Profile',
      icon: GithubIcon,
      category: 'External',
      onSelect: () => {
        window.open(PORTFOLIO_DATA.contact.github, '_blank');
        onClose();
      },
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      icon: LinkedinIcon,
      category: 'External',
      onSelect: () => {
        window.open(PORTFOLIO_DATA.contact.linkedin, '_blank');
        onClose();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filtered[selectedIndex];
        if (selected) {
          if (selected.onSelect) {
            selected.onSelect();
          } else {
            onNavigate(selected.id);
            onClose();
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onNavigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-dark-850 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-dark-900/60">
          <Search className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search sections or actions..."
            className="w-full bg-transparent border-none text-slate-100 placeholder:text-slate-500 text-sm font-sans focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-dark-800 text-[10px] font-mono text-slate-400 border border-white/10">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              No matching destinations found for "{query}"
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.onSelect) {
                      item.onSelect();
                    } else {
                      onNavigate(item.id);
                      onClose();
                    }
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-colors font-medium text-left ${
                    isSelected
                      ? 'bg-sky-500/15 text-sky-200 border border-sky-400/20'
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-sky-400/20 text-sky-300' : 'bg-dark-800 text-slate-400'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-sky-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-dark-900 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Vedant Bhanushali</span>
        </div>
      </div>
    </div>
  );
};

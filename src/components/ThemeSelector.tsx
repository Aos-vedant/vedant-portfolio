import React, { useState } from 'react';
import { useTheme, type ThemeMode } from '../context/ThemeContext';
import { Palette, Sparkles, Check } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: Array<{
    id: ThemeMode;
    label: string;
    sub: string;
    color: string;
    border: string;
  }> = [
    {
      id: 'atelier',
      label: 'Atelier Paper',
      sub: 'Architectural cream, ink & vermilion',
      color: '#ff4d2e',
      border: '#e6e2d8',
    },
    {
      id: 'obsidian',
      label: 'Obsidian Studio',
      sub: 'Deep dark cyber & electric cyan',
      color: '#38bdf8',
      border: '#23283c',
    },
    {
      id: 'nordic',
      label: 'Nordic Mist',
      sub: 'Crisp cool slate & nordic sky',
      color: '#0284c7',
      border: '#cbd5e1',
    },
  ];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] hover:border-[var(--theme-accent)] text-xs font-mono text-[var(--theme-text)] shadow-xs transition-all active:scale-95"
        title="Switch aesthetic design flavor"
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <span className="font-semibold uppercase tracking-wider text-[11px] hidden sm:inline">
          {theme}
        </span>
        <Palette className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-2 border-b border-[var(--theme-card-border)] mb-1 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)] font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
                Select Design Taste
              </span>
              <span className="font-mono text-[10px] text-[var(--theme-accent)] font-semibold">
                LIVE
              </span>
            </div>

            <div className="space-y-1">
              {themes.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-[var(--theme-accent-dim)] text-[var(--theme-accent)] font-semibold'
                        : 'text-[var(--theme-text)] hover:bg-black/5 hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0"
                        style={{ backgroundColor: t.color }}
                      />
                      <div>
                        <div className="font-headline font-semibold text-xs leading-tight">
                          {t.label}
                        </div>
                        <div className="text-[10px] opacity-70 font-sans mt-0.5">
                          {t.sub}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0 text-[var(--theme-accent)]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

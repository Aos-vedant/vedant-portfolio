import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#how-i-explore' },
    { label: 'Explore', href: '#explore' },
    { label: 'Projects', href: '#projects' },
    { label: 'Beyond', href: '#beyond' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-nav py-3 shadow-lg shadow-black/40'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400/20 to-indigo-500/10 border border-sky-400/30 flex items-center justify-center font-display font-bold text-sky-300 transition-transform group-hover:scale-105 group-hover:border-sky-400/60">
              VB
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-slate-100 group-hover:text-sky-300 transition-colors">
                VEDANT
              </span>
              <span className="font-mono text-[10px] text-slate-400 tracking-tight hidden sm:block">
                student · builder
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-dark-850/80 p-1.5 rounded-full border border-white/[0.06] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-300 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800/80 hover:bg-dark-750 border border-white/[0.08] hover:border-sky-400/30 text-xs text-slate-300 transition-all group"
              title="Open Command Palette (Cmd + K)"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
              <span className="font-mono text-[11px] text-slate-400">Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-dark-900 border border-white/10 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Status Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to Connect</span>
            </div>

            {/* Contact CTA */}
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-medium rounded-xl group bg-gradient-to-br from-sky-400 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white shadow-glow-sm hover:shadow-glow-md transition-all active:scale-95"
            >
              <span className="relative px-3.5 py-1.5 transition-all ease-in duration-75 bg-dark-950 rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-1.5 font-display font-medium">
                Let's Talk
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-dark-800/80 border border-white/[0.08] text-slate-300 hover:text-white hover:bg-dark-750 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-20 left-4 right-4 bg-dark-850 border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-300 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-6 opacity-0 scale-95'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs text-emerald-400">
                {PORTFOLIO_DATA.personal.status}
              </span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 border border-white/10 text-xs text-slate-300 font-mono"
            >
              <Terminal className="w-3 h-3 text-sky-400" />
              <span>⌘K</span>
            </button>
          </div>

          <nav className="flex flex-col gap-1 py-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-display font-medium text-slate-200 hover:text-sky-300 hover:bg-white/5 transition-colors"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-slate-500">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/5 flex gap-2">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-center font-display font-medium text-sm shadow-glow-sm"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

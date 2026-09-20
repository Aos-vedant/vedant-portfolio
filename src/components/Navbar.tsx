import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThemeSelector } from './ThemeSelector';
import { getStoredCustomLogo } from '../utils/portfolioStorage';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(getStoredCustomLogo());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleLogoUpdate = () => {
      setCustomLogo(getStoredCustomLogo());
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('vedant_logo_updated', handleLogoUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('vedant_logo_updated', handleLogoUpdate);
    };
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#how-i-explore' },
    { label: 'Domains', href: '#explore' },
    { label: 'Creations', href: '#projects' },
    { label: 'Beyond', href: '#beyond' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 liquid-glass-bar ${
          scrolled
            ? 'py-2.5 shadow-md'
            : 'py-3.5 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo (Custom image or Iconic VB Monogram in 1:1 frame) */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 focus:outline-none rounded-xl p-1"
            aria-label="Vedant Bhanushali Home"
          >
            <div className="w-9 h-9 rounded-xl border-2 border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] flex items-center justify-center overflow-hidden font-syne font-black text-sm text-[var(--theme-text)] shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--theme-accent)] group-hover:text-[var(--theme-accent)] group-hover:shadow-[0_0_15px_var(--theme-accent-dim)]">
              {customLogo ? (
                <img
                  src={customLogo}
                  alt="Brand Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <span className="tracking-tighter">VB</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] ml-0.5 animate-pulse" />
                </>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-sm tracking-wider text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors flex items-center">
                VEDANT<span className="text-[var(--theme-accent)] font-black">.</span>
              </span>
              <span className="font-mono text-[10px] text-[var(--theme-text-muted)] tracking-tight hidden sm:block">
                student · builder
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Individual Hover Interactions */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[var(--theme-card-bg)] p-1.5 rounded-full border border-[var(--theme-card-border)] shadow-xs backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--theme-accent-dim)] text-[var(--theme-accent)] font-semibold shadow-xs border border-[var(--theme-accent)]/30'
                      : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent-dim)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Live Theme Switcher */}
            <ThemeSelector />

            {/* Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="btn-secondary btn-sheen hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] text-xs text-[var(--theme-text)] shadow-xs transition-all active:scale-95 group"
              title="Open Command Palette (Cmd + K)"
            >
              <Terminal className="w-3.5 h-3.5 text-[var(--theme-accent)] group-hover:rotate-12 transition-transform" />
              <span className="font-mono text-[11px]">Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-black/5 border border-[var(--theme-card-border)] text-current">
                ⌘K
              </kbd>
            </button>

            {/* Contact CTA */}
            <a
              href="#contact"
              className="btn-accent inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-headline font-semibold rounded-xl shadow-xs active:scale-95 group"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] transition-colors focus:outline-none"
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
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-20 left-4 right-4 bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)] rounded-2xl p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-6 opacity-0 scale-95'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-card-border)]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="font-mono text-xs text-[var(--theme-accent)] font-medium">
                {PORTFOLIO_DATA.personal.status}
              </span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--theme-card-border)] text-xs text-[var(--theme-text)] font-mono"
            >
              <Terminal className="w-3 h-3 text-[var(--theme-accent)]" />
              <span>⌘K</span>
            </button>
          </div>

          <nav className="flex flex-col gap-1 py-4 max-h-[50vh] overflow-y-auto">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-headline font-semibold text-[var(--theme-text)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent-dim)] transition-colors"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[var(--theme-text-muted)]">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-[var(--theme-card-border)] flex gap-2">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="btn-accent w-full py-2.5 rounded-xl text-center font-headline font-semibold text-sm shadow-xs"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

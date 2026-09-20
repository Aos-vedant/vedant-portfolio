import { useState, useEffect } from 'react';
import { CanvasBackground } from './components/CanvasBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Currently } from './components/Currently';
import { About } from './components/About';
import { HowIExplore } from './components/HowIExplore';
import { Explore } from './components/Explore';
import { Projects } from './components/Projects';
import { BeyondTech } from './components/BeyondTech';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { Check } from 'lucide-react';

export function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      'hero',
      'currently',
      'about',
      'how-i-explore',
      'explore',
      'projects',
      'beyond',
      'education',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    showToast(`Email copied: ${PORTFOLIO_DATA.personal.email}`);
  };

  return (
    <div className="relative min-h-screen bg-[#08090c] text-[#f4f4f6] selection:bg-sky-500/20 selection:text-sky-300 overflow-x-hidden">
      {/* Ambient background particles & glow */}
      <CanvasBackground />

      {/* Floating Navigation */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections Flow */}
      <main className="relative z-10">
        <Hero />
        <Currently />
        <About />
        <HowIExplore />
        <Explore />
        <Projects />
        <BeyondTech />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onCopyEmail={handleCopyEmail}
      />

      {/* Global Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-dark-800/95 border border-sky-400/40 text-xs font-mono text-slate-100 shadow-2xl backdrop-blur-md">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;

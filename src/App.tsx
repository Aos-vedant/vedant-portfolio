import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProgress } from './components/ScrollProgress';
import { CanvasBackground } from './components/CanvasBackground';
import { LiquidCursorTrail } from './components/LiquidCursorTrail';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { HowIExplore } from './components/HowIExplore';
import { Explore } from './components/Explore';
import { Projects } from './components/Projects';
import { BeyondTech } from './components/BeyondTech';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { AdminPage } from './components/AdminPage';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { getStoredProjects, getStoredCurrently } from './utils/portfolioStorage';
import { Check } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>(
    typeof window !== 'undefined' && window.location.hash === '#admin' ? 'admin' : 'portfolio'
  );
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic state for live projects & currently exploration status
  const [projects, setProjects] = useState(getStoredProjects());
  const [currently, setCurrently] = useState(getStoredCurrently());

  // Listen to hash changes for #admin navigation
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('portfolio');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Listen to custom updates from admin storage
  useEffect(() => {
    const handleDataUpdate = () => {
      setProjects(getStoredProjects());
      setCurrently(getStoredCurrently());
    };
    window.addEventListener('vedant_data_updated', handleDataUpdate);
    return () => window.removeEventListener('vedant_data_updated', handleDataUpdate);
  }, []);

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
    if (currentView === 'admin') return;

    const sectionIds = [
      'hero',
      'about',
      'how-i-explore',
      'explore',
      'projects',
      'beyond',
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
  }, [currentView]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin') {
      window.location.hash = 'admin';
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    showToast(`Email copied: ${PORTFOLIO_DATA.personal.email}`);
  };

  const handleBackToPortfolio = () => {
    window.location.hash = '';
    setCurrentView('portfolio');
  };

  if (currentView === 'admin') {
    return (
      <ThemeProvider>
        <AdminPage onBackToPortfolio={handleBackToPortfolio} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] overflow-x-hidden transition-colors duration-300">
        {/* Top Scroll Reading Progress */}
        <ScrollProgress />

        {/* Ambient background particles & subtle glow */}
        <CanvasBackground />

        {/* Global Liquid Water Drops Layer (Active Across All Pages) */}
        <LiquidCursorTrail />

        {/* Floating Navigation with Full Line Liquid Glass Effect */}
        <Navbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          activeSection={activeSection}
        />

        {/* Main Content Sections Flow (v3 Unified Studio Architecture) */}
        <main className="relative z-10">
          <Hero
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            currently={currently}
          />
          <About />
          <HowIExplore />
          <Explore />
          <Projects projects={projects} />
          <BeyondTech />
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
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl theme-card text-xs font-mono text-[var(--theme-text)] shadow-2xl">
            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

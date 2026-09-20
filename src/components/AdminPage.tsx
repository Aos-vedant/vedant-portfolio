import React, { useState, useEffect } from 'react';
import type { Project } from '../data/portfolioData';
import {
  getStoredProjects,
  addProject,
  updateProject,
  deleteProject,
  getStoredCurrently,
  saveStoredCurrently,
  getStoredNotes,
  deleteNote,
  markNoteAsRead,
  isAdminAuthenticated,
  authenticateAdmin,
  verifyAdminCredentials,
  logoutAdmin,
  getAdminCreds,
  setAdminCreds,
  getStoredSocials,
  addSocialHandle,
  updateSocialHandle,
  deleteSocialHandle,
  getStoredCustomLogo,
  saveStoredCustomLogo,
} from '../utils/portfolioStorage';
import type { CurrentlyStatus, ContactNote, SocialHandle } from '../utils/portfolioStorage';
import { generateFullBackupZip, triggerDownload } from '../utils/backupExporter';
import {
  Lock,
  Unlock,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Check,
  Mail,
  Layers,
  Shield,
  ExternalLink,
  RotateCcw,
  Globe,
  Download,
  FileArchive,
  ShieldAlert,
  KeyRound,
  Loader2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface AdminPageProps {
  onBackToPortfolio: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToPortfolio }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active tab
  const [activeTab, setActiveTab] = useState<'projects' | 'currently' | 'socials' | 'brand' | 'inbox' | 'updates' | 'security'>('projects');

  // Data states
  const [projects, setProjects] = useState<Project[]>(getStoredProjects());
  const [currently, setCurrently] = useState<CurrentlyStatus>(getStoredCurrently());
  const [notes, setNotes] = useState<ContactNote[]>(getStoredNotes());
  const [socials, setSocials] = useState<SocialHandle[]>(getStoredSocials());
  const [customLogo, setCustomLogo] = useState<string | null>(getStoredCustomLogo());
  const [logoInput, setLogoInput] = useState<string>(getStoredCustomLogo() || '');
  const [toast, setToast] = useState<string | null>(null);

  // Project Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Web Exploration',
    tagline: '',
    whatItIs: '',
    whyIMadeIt: '',
    whatIExplored: '',
    technologies: 'React, TypeScript, Tailwind',
    githubUrl: 'https://github.com',
    liveUrl: '',
    year: '2026',
    status: 'In Progress'
  });

  // Social Modal state
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [socialForm, setSocialForm] = useState({
    platform: 'GitHub',
    label: 'GitHub',
    handle: '@vedantbhanushali',
    url: 'https://github.com/vedantbhanushali',
    description: 'Source code & repositories',
  });

  // Password change state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Full Backup modal & download state
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [backupIdInput, setBackupIdInput] = useState('');
  const [backupPasswordInput, setBackupPasswordInput] = useState('');
  const [backupAuthError, setBackupAuthError] = useState('');
  const [isPackagingBackup, setIsPackagingBackup] = useState(false);

  const handleOpenBackupModal = () => {
    setBackupIdInput('');
    setBackupPasswordInput('');
    setBackupAuthError('');
    setIsBackupModalOpen(true);
  };

  const handleConfirmBackupDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!backupIdInput.trim() || !backupPasswordInput) {
      setBackupAuthError('Please enter both your Admin ID and Password.');
      return;
    }

    // Strictly verify credentials before allowing download
    if (!verifyAdminCredentials(backupIdInput.trim(), backupPasswordInput)) {
      setBackupAuthError('Authorization Failed: Invalid Admin ID or Password.');
      return;
    }

    setBackupAuthError('');
    setIsPackagingBackup(true);

    try {
      const blob = await generateFullBackupZip();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      triggerDownload(blob, `vedant-portfolio-full-backup-${timestamp}.zip`);
      setIsBackupModalOpen(false);
      setBackupIdInput('');
      setBackupPasswordInput('');
      showToast('🎉 Full backup (.zip) successfully downloaded to your local PC!');
    } catch (err) {
      console.error('Backup packaging failed', err);
      setBackupAuthError('Failed to generate zip backup archive. Please try again.');
    } finally {
      setIsPackagingBackup(false);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const handleDataUpdate = () => {
      setProjects(getStoredProjects());
      setCurrently(getStoredCurrently());
    };
    const handleNotesUpdate = () => {
      setNotes(getStoredNotes());
    };
    const handleSocialsUpdate = () => {
      setSocials(getStoredSocials());
    };
    const handleLogoUpdate = () => {
      const l = getStoredCustomLogo();
      setCustomLogo(l);
      setLogoInput(l || '');
    };

    window.addEventListener('vedant_data_updated', handleDataUpdate);
    window.addEventListener('vedant_notes_updated', handleNotesUpdate);
    window.addEventListener('vedant_socials_updated', handleSocialsUpdate);
    window.addEventListener('vedant_logo_updated', handleLogoUpdate);
    return () => {
      window.removeEventListener('vedant_data_updated', handleDataUpdate);
      window.removeEventListener('vedant_notes_updated', handleNotesUpdate);
      window.removeEventListener('vedant_socials_updated', handleSocialsUpdate);
      window.removeEventListener('vedant_logo_updated', handleLogoUpdate);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticateAdmin(usernameInput, passwordInput)) {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Welcome to Admin Studio!');
    } else {
      setAuthError('Invalid credentials. Check username or password.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    showToast('Logged out successfully');
  };

  // Open modal for new project
  const handleOpenNewProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: 'Web Exploration',
      tagline: '',
      whatItIs: '',
      whyIMadeIt: '',
      whatIExplored: '',
      technologies: 'React, TypeScript, Tailwind',
      githubUrl: 'https://github.com',
      liveUrl: '',
      year: '2026',
      status: 'In Progress'
    });
    setIsModalOpen(true);
  };

  // Open modal for editing existing project
  const handleOpenEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      tagline: proj.tagline,
      whatItIs: proj.whatItIs,
      whyIMadeIt: proj.whyIMadeIt,
      whatIExplored: proj.whatIExplored,
      technologies: proj.technologies.join(', '),
      githubUrl: proj.githubUrl,
      liveUrl: proj.liveUrl || '',
      year: proj.year,
      status: proj.status || 'In Progress'
    });
    setIsModalOpen(true);
  };

  // Save project (Create or Update)
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    const techArray = projectForm.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProjectId) {
      updateProject({
        id: editingProjectId,
        title: projectForm.title.trim(),
        category: projectForm.category,
        tagline: projectForm.tagline.trim(),
        whatItIs: projectForm.whatItIs.trim(),
        whyIMadeIt: projectForm.whyIMadeIt.trim(),
        whatIExplored: projectForm.whatIExplored.trim(),
        technologies: techArray.length ? techArray : ['Web'],
        githubUrl: projectForm.githubUrl.trim(),
        liveUrl: projectForm.liveUrl.trim() || undefined,
        year: projectForm.year.trim() || '2026',
        status: projectForm.status
      });
      showToast(`Updated project "${projectForm.title}"`);
    } else {
      addProject({
        title: projectForm.title.trim(),
        category: projectForm.category,
        tagline: projectForm.tagline.trim(),
        whatItIs: projectForm.whatItIs.trim(),
        whyIMadeIt: projectForm.whyIMadeIt.trim(),
        whatIExplored: projectForm.whatIExplored.trim(),
        technologies: techArray.length ? techArray : ['Web'],
        githubUrl: projectForm.githubUrl.trim(),
        liveUrl: projectForm.liveUrl.trim() || undefined,
        year: projectForm.year.trim() || '2026',
        status: projectForm.status
      });
      showToast(`Published new project "${projectForm.title}"`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
      showToast(`Deleted "${title}"`);
    }
  };

  // Save Currently Status
  const handleSaveCurrently = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredCurrently(currently);
    showToast('Updated "Currently Exploring" status on live portfolio!');
  };

  // Social Media handlers
  const handleOpenNewSocial = () => {
    setEditingSocialId(null);
    setSocialForm({
      platform: 'GitHub',
      label: 'GitHub',
      handle: '@vedantbhanushali',
      url: 'https://github.com/vedantbhanushali',
      description: 'Source code & repositories',
    });
    setIsSocialModalOpen(true);
  };

  const handleOpenEditSocial = (soc: SocialHandle) => {
    setEditingSocialId(soc.id);
    setSocialForm({
      platform: soc.platform,
      label: soc.label || soc.platform,
      handle: soc.handle,
      url: soc.url,
      description: soc.description || '',
    });
    setIsSocialModalOpen(true);
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialForm.label.trim() || !socialForm.url.trim()) return;

    if (editingSocialId) {
      updateSocialHandle({
        id: editingSocialId,
        platform: socialForm.platform.trim(),
        label: socialForm.label.trim(),
        handle: socialForm.handle.trim(),
        url: socialForm.url.trim(),
        description: socialForm.description.trim() || undefined,
      });
      showToast(`Updated "${socialForm.label}" handle`);
    } else {
      addSocialHandle({
        platform: socialForm.platform.trim(),
        label: socialForm.label.trim(),
        handle: socialForm.handle.trim(),
        url: socialForm.url.trim(),
        description: socialForm.description.trim() || undefined,
      });
      showToast(`Added new "${socialForm.label}" handle`);
    }
    setIsSocialModalOpen(false);
  };

  const handleDeleteSocial = (id: string, label: string) => {
    if (window.confirm(`Are you sure you want to delete "${label}"?`)) {
      deleteSocialHandle(id);
      showToast(`Deleted "${label}"`);
    }
  };

  // Brand Logo Handlers
  const handleSaveLogo = (e: React.FormEvent) => {
    e.preventDefault();
    const url = logoInput.trim() || null;
    saveStoredCustomLogo(url);
    setCustomLogo(url);
    showToast(url ? 'Custom brand logo saved! Live across all pages.' : 'Reset logo to default VB Monogram');
  };

  const handleResetLogo = () => {
    saveStoredCustomLogo(null);
    setCustomLogo(null);
    setLogoInput('');
    showToast('Reverted to default iconic VB Monogram');
  };

  // Update Credentials
  const handleSaveCreds = (e: React.FormEvent) => {
    e.preventDefault();
    const creds = getAdminCreds();
    const u = newUsername.trim() || creds.username;
    const p = newPassword || creds.password;
    setAdminCreds(u, p);
    setNewUsername('');
    setNewPassword('');
    showToast('Admin credentials updated successfully!');
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--theme-accent-dim)] rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md theme-card asym-card-tr p-8 sm:p-10 shadow-2xl relative z-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--theme-card-border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] flex items-center justify-center font-syne font-bold text-[var(--theme-accent)]">
                VB
              </div>
              <div>
                <h1 className="font-syne font-bold text-lg text-[var(--theme-text)]">Admin Studio</h1>
                <p className="font-mono text-[10px] text-[var(--theme-text-muted)]">Protected Management Portal</p>
              </div>
            </div>
            <button
              onClick={onBackToPortfolio}
              className="btn-secondary btn-sheen p-2 rounded-xl text-xs font-mono flex items-center gap-1.5"
              title="Return to Portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] transition-all font-sans"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-mono">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="btn-accent w-full py-3.5 rounded-xl font-headline font-semibold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Admin Studio</span>
            </button>
          </form>

          {/* Helper hint for convenient demo access */}
          <div className="mt-6 pt-5 border-t border-[var(--theme-card-border)] text-center">
            <p className="text-xs text-[var(--theme-text-muted)] font-mono">
              Default Credentials: <code className="text-[var(--theme-accent)] font-bold">admin</code> / <code className="text-[var(--theme-accent)] font-bold">vedant2026</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] pb-24 relative overflow-x-hidden">
      {/* Admin Top Bar */}
      <header className="theme-nav sticky top-0 z-40 py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs border-b border-[var(--theme-card-border)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl border-2 border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] flex items-center justify-center overflow-hidden font-syne font-black text-sm text-[var(--theme-accent)]">
              {customLogo ? (
                <img src={customLogo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
              ) : (
                'VB'
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-syne font-bold text-base text-[var(--theme-text)]">Admin Studio</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="font-mono text-[10px] text-[var(--theme-text-muted)]">Live Portfolio Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleOpenBackupModal}
              className="btn-accent px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 shadow-xs"
              title="Download full project code & database backup to local PC"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Full Backup (.zip)</span>
            </button>

            <button
              onClick={onBackToPortfolio}
              className="btn-secondary btn-sheen px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl stamp-pill hover:border-rose-500/50 hover:text-rose-500 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Quick Stats & Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="theme-card asym-card-tl p-4 flex flex-col justify-between shadow-xs">
            <span className="font-mono text-[11px] text-[var(--theme-text-muted)] uppercase font-semibold">PROJECTS</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-syne font-extrabold text-2xl text-[var(--theme-text)]">{projects.length}</span>
              <span className="text-[10px] font-mono text-[var(--theme-accent)]">Live On Site</span>
            </div>
          </div>

          <div className="theme-card asym-card-tr p-4 flex flex-col justify-between shadow-xs">
            <span className="font-mono text-[11px] text-[var(--theme-text-muted)] uppercase font-semibold">SOCIAL LINKS</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-syne font-extrabold text-2xl text-[var(--theme-text)]">{socials.length}</span>
              <span className="text-[10px] font-mono text-[var(--theme-accent)]">Configured</span>
            </div>
          </div>

          <div className="theme-card asym-card-bl p-4 flex flex-col justify-between shadow-xs">
            <span className="font-mono text-[11px] text-[var(--theme-text-muted)] uppercase font-semibold">VERSION</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-syne font-bold text-sm text-emerald-600 truncate">v4.0.0 Active</span>
              <span className="text-[10px] font-mono text-[var(--theme-text-muted)]">Confidential</span>
            </div>
          </div>

          <div className="theme-card asym-card-br p-4 flex flex-col justify-between shadow-xs">
            <span className="font-mono text-[11px] text-[var(--theme-text-muted)] uppercase font-semibold">ACTION</span>
            <button
              onClick={handleOpenNewProject}
              className="btn-accent mt-2 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Project</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-[var(--theme-card-border)]">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'stamp-pill hover:border-[var(--theme-accent)]'
            }`}
          >
            📁 Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('currently')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'currently'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'stamp-pill hover:border-[var(--theme-accent)]'
            }`}
          >
            ⚡ Currently Status
          </button>

          <button
            onClick={() => setActiveTab('socials')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'socials'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'stamp-pill hover:border-[var(--theme-accent)]'
            }`}
          >
            🌐 Social Handles ({socials.length})
          </button>

          <button
            onClick={() => setActiveTab('brand')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'brand'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'stamp-pill hover:border-[var(--theme-accent)]'
            }`}
          >
            🎨 Brand Logo & Frame
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'inbox'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'stamp-pill hover:border-[var(--theme-accent)]'
            }`}
          >
            📬 Received Notes ({notes.length})
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'updates'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'stamp-pill hover:border-[var(--theme-accent)]'
            }`}
          >
            🚀 Updates & Versions (v4)
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'stamp-pill hover:border-[var(--theme-accent)]'
            }`}
          >
            🔒 Security & Password
          </button>
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-syne font-bold text-xl text-[var(--theme-text)]">Published Projects</h2>
                <p className="text-xs text-[var(--theme-text-muted)] font-mono mt-0.5">
                  Manage the project cards that appear on the live "Things I've Made" workshop.
                </p>
              </div>
              <button
                onClick={handleOpenNewProject}
                className="btn-accent px-4 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="theme-card asym-card-tr p-10 text-center space-y-3">
                <Layers className="w-10 h-10 text-[var(--theme-text-muted)] mx-auto opacity-50" />
                <h3 className="font-headline font-bold text-base text-[var(--theme-text)]">No Projects Added Yet</h3>
                <p className="text-xs text-[var(--theme-text-muted)] max-w-sm mx-auto font-sans">
                  The live site is currently showing the Architectural Blueprint Workshop. Click "Add Project" whenever you have a build ready to publish!
                </p>
                <button
                  onClick={handleOpenNewProject}
                  className="btn-secondary btn-sheen px-4 py-2 rounded-xl text-xs font-mono font-semibold mt-2 inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Project</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="theme-card asym-card-tl p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--theme-accent)] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-md stamp-pill text-[10px] font-mono font-semibold">
                          {proj.category}
                        </span>
                        <div className="flex items-center gap-2">
                          {proj.status && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                              {proj.status}
                            </span>
                          )}
                          <span className="text-xs font-mono text-[var(--theme-text-muted)]">{proj.year}</span>
                        </div>
                      </div>

                      <h3 className="font-headline font-bold text-lg text-[var(--theme-text)]">{proj.title}</h3>
                      <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-sans line-clamp-2">{proj.tagline || proj.whatItIs}</p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {proj.technologies.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded stamp-pill text-[10px] font-mono opacity-80">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--theme-card-border)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditProject(proj)}
                          className="p-1.5 rounded-lg stamp-pill hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)] text-xs transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="p-1.5 rounded-lg stamp-pill hover:text-rose-500 hover:border-rose-500 text-xs transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg stamp-pill hover:text-[var(--theme-accent)] text-xs"
                          title="GitHub URL"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg stamp-pill hover:text-[var(--theme-accent)] text-xs"
                            title="Live URL"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CURRENTLY EXPLORING STATUS */}
        {activeTab === 'currently' && (
          <div className="max-w-2xl theme-card asym-card-tr p-6 sm:p-8 shadow-md">
            <h2 className="font-syne font-bold text-xl text-[var(--theme-text)] mb-1">
              "Currently Exploring" Status Editor
            </h2>
            <p className="text-xs text-[var(--theme-text-muted)] font-mono mb-6">
              Update the real-time learning signal displayed inside the Studio Architect Card on the Hero page.
            </p>

            <form onSubmit={handleSaveCurrently} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                  What I Am Currently Learning & Tinkering With
                </label>
                <textarea
                  rows={3}
                  required
                  value={currently.learning}
                  onChange={(e) => setCurrently({ ...currently, learning: e.target.value })}
                  placeholder="e.g. Computer Engineering @ SAKEC · Web Fundamentals & React"
                  className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                  Focus Areas & Tooling
                </label>
                <input
                  type="text"
                  value={currently.exploring}
                  onChange={(e) => setCurrently({ ...currently, exploring: e.target.value })}
                  placeholder="e.g. Modern Tools · AI & Workflow Automation"
                  className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                  Status Note / Philosophy
                </label>
                <input
                  type="text"
                  value={currently.statusNote}
                  onChange={(e) => setCurrently({ ...currently, statusNote: e.target.value })}
                  placeholder="e.g. Learning by trying things and building step-by-step."
                  className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                />
              </div>

              <button
                type="submit"
                className="btn-accent px-6 py-3 rounded-xl font-headline font-semibold text-xs shadow-md flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Live Status</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: SOCIAL MEDIA HANDLES */}
        {activeTab === 'socials' && (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-syne font-bold text-xl text-[var(--theme-text)]">
            Social Media & Connection Handles
          </h2>
          <p className="text-xs text-[var(--theme-text-muted)] font-mono mt-0.5">
            Manage the social cards and contact channels shown on your live portfolio.
          </p>
        </div>
        <button
          onClick={handleOpenNewSocial}
          className="btn-accent px-4 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Handle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {socials.map((soc) => {
          const platformKey = soc.platform.toLowerCase();
          const renderIcon = () => {
            if (platformKey.includes('github')) return <GithubIcon className="w-4 h-4 text-[var(--theme-accent)]" />;
            if (platformKey.includes('linkedin')) return <LinkedinIcon className="w-4 h-4 text-[var(--theme-accent)]" />;
            if (platformKey.includes('mail') || platformKey.includes('email')) return <Mail className="w-4 h-4 text-[var(--theme-accent)]" />;
            return <Globe className="w-4 h-4 text-[var(--theme-accent)]" />;
          };

          return (
            <div
              key={soc.id}
              className="theme-card asym-card-tl p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--theme-accent)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-md stamp-pill text-[10px] font-mono font-semibold flex items-center gap-1.5">
                    {renderIcon()}
                    <span>{soc.platform}</span>
                  </span>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded hover:text-[var(--theme-accent)]"
                    title="Open link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h3 className="font-headline font-bold text-base text-[var(--theme-text)]">{soc.label || soc.platform}</h3>
                <p className="text-xs font-mono text-[var(--theme-accent)] mt-0.5 truncate">{soc.handle}</p>
                {soc.description && (
                  <p className="text-xs text-[var(--theme-text-muted)] mt-2 font-sans line-clamp-2">
                    {soc.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[var(--theme-card-border)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--theme-text-muted)] truncate max-w-[160px]">
                  {soc.url}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditSocial(soc)}
                    className="p-1.5 rounded-lg stamp-pill hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)] text-xs transition-colors"
                    title="Edit Handle"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSocial(soc.id, soc.label || soc.platform)}
                    className="p-1.5 rounded-lg stamp-pill hover:text-rose-500 hover:border-rose-500 text-xs transition-colors"
                    title="Delete Handle"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}

  {/* TAB 4: BRAND LOGO & FRAME */}
  {activeTab === 'brand' && (
    <div className="max-w-2xl theme-card asym-card-tr p-6 sm:p-8 shadow-md space-y-6">
      <div>
        <h2 className="font-syne font-bold text-xl text-[var(--theme-text)] mb-1">
          Brand Logo & 1:1 Monogram Frame
        </h2>
        <p className="text-xs text-[var(--theme-text-muted)] font-mono">
          Upload or link a custom logo image. The website maintains a strict 1:1 aspect ratio matching the top navbar brand frame.
        </p>
      </div>

      <form onSubmit={handleSaveLogo} className="space-y-5">
        <div>
          <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
            Custom Logo Image URL
          </label>
          <input
            type="url"
            value={logoInput}
            onChange={(e) => setLogoInput(e.target.value)}
            placeholder="https://example.com/my-custom-logo.png"
            className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
          />
          <span className="block text-[11px] font-mono text-[var(--theme-text-muted)] mt-1.5">
            Tip: Provide any square PNG, SVG, or JPEG URL. Leave blank and save to revert to default VB monogram.
          </span>
        </div>

        {/* Live 1:1 Aspect Ratio Preview Comparison */}
        <div className="p-5 rounded-2xl stamp-pill border border-[var(--theme-card-border)] bg-[var(--theme-badge-bg)] space-y-4">
          <div className="text-xs font-mono text-[var(--theme-text)] uppercase font-semibold flex items-center justify-between">
            <span>Frame Ratio: 1:1 (Square)</span>
            <span className="text-[10px] text-[var(--theme-accent)]">Live Preview</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/* Navbar Scale 1:1 (w-9 h-9) */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl border-2 border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] flex items-center justify-center overflow-hidden font-syne font-black text-sm text-[var(--theme-text)] shadow-xs">
                {logoInput.trim() ? (
                  <img
                    src={logoInput.trim()}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <>
                    <span className="tracking-tighter">VB</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] ml-0.5 animate-pulse" />
                  </>
                )}
              </div>
              <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">Navbar (w-9 h-9)</span>
            </div>

            {/* High-res Detail View 1:1 (w-20 h-20) */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-20 h-20 rounded-2xl border-2 border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] flex items-center justify-center overflow-hidden font-syne font-black text-2xl text-[var(--theme-accent)] shadow-md">
                {logoInput.trim() ? (
                  <img
                    src={logoInput.trim()}
                    alt="Preview large"
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex items-center">
                    <span className="tracking-tighter">VB</span>
                    <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] ml-1 animate-pulse" />
                  </div>
                )}
              </div>
              <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">Expanded (1:1 Frame)</span>
            </div>

            <div className="text-xs text-[var(--theme-text-muted)] max-w-xs font-sans">
              {logoInput.trim()
                ? 'Custom logo will replace the "VB" monogram across all header bars in real-time.'
                : 'Currently utilizing the iconic VB Monogram with dynamic status indicator.'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="btn-accent px-6 py-3 rounded-xl font-headline font-semibold text-xs shadow-md flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Brand Logo</span>
          </button>

          {customLogo && (
            <button
              type="button"
              onClick={handleResetLogo}
              className="px-4 py-3 rounded-xl stamp-pill hover:border-rose-500 hover:text-rose-500 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to VB Monogram</span>
            </button>
          )}
        </div>
      </form>
    </div>
  )}

  {/* TAB 5: CONTACT MESSAGES INBOX */}
        {activeTab === 'inbox' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-syne font-bold text-xl text-[var(--theme-text)]">Received Notes</h2>
                <p className="text-xs text-[var(--theme-text-muted)] font-mono mt-0.5">
                  Messages submitted by visitors through the Contact form on your portfolio.
                </p>
              </div>
              <span className="font-mono text-xs px-3 py-1 rounded-full stamp-pill">
                Total: {notes.length}
              </span>
            </div>

            {notes.length === 0 ? (
              <div className="theme-card asym-card-tl p-8 text-center space-y-2">
                <Mail className="w-8 h-8 text-[var(--theme-text-muted)] mx-auto opacity-50" />
                <h3 className="font-headline font-bold text-sm text-[var(--theme-text)]">No Messages Yet</h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-sans">
                  When someone submits a message on the contact form, it will show up here instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`theme-card asym-card-tl p-5 shadow-xs transition-all ${
                      note.read ? 'opacity-85' : 'border-l-4 border-l-[var(--theme-accent)]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-[var(--theme-card-border)]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline font-bold text-sm text-[var(--theme-text)]">{note.name}</span>
                          <span className="text-xs font-mono text-[var(--theme-accent)]">({note.email})</span>
                        </div>
                        <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">
                          {new Date(note.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${note.email}?subject=Re: Your message to Vedant Bhanushali`}
                          className="btn-accent px-3 py-1 rounded-lg text-[11px] font-mono font-semibold flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Reply</span>
                        </a>

                        {!note.read && (
                          <button
                            onClick={() => markNoteAsRead(note.id)}
                            className="p-1.5 rounded-lg stamp-pill text-xs hover:border-[var(--theme-accent)]"
                            title="Mark as Read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-1.5 rounded-lg stamp-pill hover:text-rose-500 hover:border-rose-500 text-xs"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-sans text-[var(--theme-text)] whitespace-pre-wrap leading-relaxed">
                      {note.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: UPDATES & VERSION ARCHIVE */}
        {activeTab === 'updates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-syne font-bold text-xl text-[var(--theme-text)]">System Updates & Version Archive</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono text-[10px] font-semibold">
                    Admin Confidential
                  </span>
                </div>
                <p className="text-xs text-[var(--theme-text-muted)] font-mono mt-0.5">
                  Private release log and local codebase backups. Kept confidential and hidden from the public portfolio.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl stamp-pill text-xs font-mono text-[var(--theme-accent)] self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CURRENT ACTIVE: VERSION 4.0</span>
              </div>
            </div>

            {/* Full System & Database Backup Card */}
            <div className="theme-card asym-card-br p-6 sm:p-7 shadow-lg border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[var(--theme-accent-dim)] text-[var(--theme-accent)] flex items-center justify-center flex-shrink-0">
                    <FileArchive className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base sm:text-lg text-[var(--theme-text)]">
                      Download Full Project & Database Backup (.zip)
                    </h3>
                    <p className="text-xs text-[var(--theme-text-muted)] font-sans mt-0.5 max-w-xl leading-relaxed">
                      Download an all-inclusive zip archive to your local PC containing the entire codebase repository (<code className="text-[var(--theme-accent)]">src/</code>, build configs, templates) and live database snapshots (<code className="text-[var(--theme-accent)]">projects.json</code>, custom socials, inbox messages, status).
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleOpenBackupModal}
                  className="btn-accent px-4 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 shadow-md self-start sm:self-auto flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Backup</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[var(--theme-text-muted)] pt-3 border-t border-[var(--theme-card-border)]">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Complete Source Code
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Live Stored Data Export
                </span>
                <span className="flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  Protected by Admin ID & Password Verification
                </span>
              </div>
            </div>

            {/* Current Active Release: Version 4.0 */}
            <div className="theme-card asym-card-tl p-6 sm:p-7 shadow-lg border-2 border-[var(--theme-accent)] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 pb-3 border-b border-[var(--theme-card-border)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-[var(--theme-accent)] text-white text-xs font-mono font-bold">
                      v4.0.0
                    </span>
                    <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Active Deployment
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-lg text-[var(--theme-text)]">
                    Liquid Glass Top Bar, Full-Page Hover Trail & Modular Admin Hub
                  </h3>
                  <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">Released: September 2026</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl stamp-pill text-[11px] font-mono text-right flex-shrink-0">
                  <span className="text-[var(--theme-text-muted)] block text-[10px]">BACKUP FOLDER</span>
                  <code className="text-[var(--theme-accent)] font-semibold">versions/v4/</code>
                </div>
              </div>

              <div className="space-y-3 text-xs font-sans text-[var(--theme-text)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl stamp-pill space-y-1.5">
                    <span className="font-mono text-[10px] text-[var(--theme-accent)] uppercase tracking-wider font-semibold block">
                      Aesthetics & Liquid Physics
                    </span>
                    <ul className="space-y-1 list-disc list-inside text-[var(--theme-text-muted)]">
                      <li>Full-line liquid glass top bar with 20% opacity and 20px frosted backdrop blur.</li>
                      <li>Site-wide background water droplet hover effect (solid until 1.8s, full fade-out at 3.0s).</li>
                      <li>Strict background layering (`z-0`) ensuring droplets never overlap cards or text.</li>
                      <li>Translucent section badges across all pages without trailing markers.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl stamp-pill space-y-1.5">
                    <span className="font-mono text-[10px] text-[var(--theme-accent)] uppercase tracking-wider font-semibold block">
                      Admin & Identity Customizations
                    </span>
                    <ul className="space-y-1 list-disc list-inside text-[var(--theme-text-muted)]">
                      <li>Dedicated Social Media Handles manager with live synchronization.</li>
                      <li>Custom 1:1 Brand Logo manager with real-time sync and fallback to VB monogram.</li>
                      <li>College updated to Shah and Anchor (SAKEC), Chembur & Email to official address.</li>
                      <li>Footer rebranded to "Made With Love and Madness of Vedant" without public admin link.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Version Archive Grid */}
            <div className="space-y-3">
              <h3 className="font-syne font-bold text-base text-[var(--theme-text)]">
                Archived Version Snapshots
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Version 3 */}
                <div className="theme-card asym-card-tr p-5 flex flex-col justify-between space-y-3 shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded stamp-pill text-[11px] font-mono font-bold">
                        v3.0.0
                      </span>
                      <span className="text-[10px] font-mono text-[var(--theme-text-muted)]">Archived</span>
                    </div>
                    <h4 className="font-headline font-bold text-sm text-[var(--theme-text)]">
                      Architectural Bento & Admin Studio
                    </h4>
                    <p className="text-xs text-[var(--theme-text-muted)] mt-1.5 font-sans leading-relaxed">
                      Asymmetrical shapes, custom theme engine (Atelier, Obsidian, Nordic), interactive terminal console, and protected Admin Studio creation.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--theme-card-border)] text-[10px] font-mono text-[var(--theme-text-muted)]">
                    <span>Snapshot: </span>
                    <code className="text-[var(--theme-accent)]">versions/v2/</code>
                  </div>
                </div>

                {/* Version 2 */}
                <div className="theme-card asym-card-bl p-5 flex flex-col justify-between space-y-3 shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded stamp-pill text-[11px] font-mono font-bold">
                        v2.0.0
                      </span>
                      <span className="text-[10px] font-mono text-[var(--theme-text-muted)]">Archived</span>
                    </div>
                    <h4 className="font-headline font-bold text-sm text-[var(--theme-text)]">
                      Light Aesthetic & Dynamic Motion
                    </h4>
                    <p className="text-xs text-[var(--theme-text-muted)] mt-1.5 font-sans leading-relaxed">
                      Interactive CardTilt 3D motion, ambient particle canvas background, typography contrast overhaul, and visual refinements.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--theme-card-border)] text-[10px] font-mono text-[var(--theme-text-muted)]">
                    <span>Snapshot: </span>
                    <code className="text-[var(--theme-accent)]">versions/v2/</code>
                  </div>
                </div>

                {/* Version 1 */}
                <div className="theme-card asym-card-br p-5 flex flex-col justify-between space-y-3 shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded stamp-pill text-[11px] font-mono font-bold">
                        v1.0.0
                      </span>
                      <span className="text-[10px] font-mono text-[var(--theme-text-muted)]">Archived</span>
                    </div>
                    <h4 className="font-headline font-bold text-sm text-[var(--theme-text)]">
                      Initial Portfolio Baseline
                    </h4>
                    <p className="text-xs text-[var(--theme-text-muted)] mt-1.5 font-sans leading-relaxed">
                      Foundational single-page portfolio structure, baseline projects schema, and simple contact form.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--theme-card-border)] text-[10px] font-mono text-[var(--theme-text-muted)]">
                    <span>Snapshot: </span>
                    <code className="text-[var(--theme-accent)]">versions/v1/</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Confidentiality Callout */}
            <div className="p-4 rounded-xl stamp-pill border border-[var(--theme-card-border)] bg-[var(--theme-badge-bg)] text-xs font-mono text-[var(--theme-text-muted)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>🔒 Zero Public Version Leakage: Version numbers & code backups are strictly restricted to this Admin Panel.</span>
              <span className="text-[var(--theme-accent)] font-semibold flex-shrink-0">Local Backups Ready</span>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & CREDENTIALS */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="theme-card asym-card-br p-6 sm:p-8 shadow-md">
              <h2 className="font-syne font-bold text-xl text-[var(--theme-text)] mb-1">
                Admin Credentials
              </h2>
              <p className="text-xs text-[var(--theme-text-muted)] font-mono mb-6">
                Update the username or password used to access this Admin Studio.
              </p>

              <form onSubmit={handleSaveCreds} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                    New Admin Username
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password..."
                    className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-accent px-6 py-3 rounded-xl font-headline font-semibold text-xs shadow-md flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Update Credentials</span>
                </button>
              </form>
            </div>

            <div className="theme-card asym-card-tl p-6 sm:p-8 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-[var(--theme-text)]">
                      Local Backup Security
                    </h3>
                    <p className="text-xs text-[var(--theme-text-muted)] font-mono">
                      Protected with ID & Password Verification
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[var(--theme-text-muted)] font-sans leading-relaxed">
                  Full repository code and database exports require re-authenticating with your Admin ID and Password before the .zip file is generated and transferred to your PC.
                </p>
                <div className="p-3.5 rounded-xl stamp-pill border border-[var(--theme-card-border)] bg-[var(--theme-badge-bg)] text-xs font-mono space-y-1.5 text-[var(--theme-text-muted)]">
                  <div className="text-[var(--theme-accent)] font-semibold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Rate Limit & Anti-Spam</span>
                  </div>
                  <div className="text-[11px]">Contact form is protected by 1 submission per 2.5 seconds rate limiting.</div>
                </div>
              </div>
              <button
                onClick={handleOpenBackupModal}
                className="btn-secondary btn-sheen w-full py-3 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Full Backup (.zip)</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ADD / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="theme-card asym-card-tl p-6 sm:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-card-border)]">
              <h3 className="font-syne font-bold text-lg text-[var(--theme-text)]">
                {editingProjectId ? 'Update Project' : 'Post New Project to Workshop'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg stamp-pill hover:text-[var(--theme-accent)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. AI Workflow CLI"
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    placeholder="Web Exploration"
                    className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                    Status
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans bg-[var(--theme-card-bg)] text-[var(--theme-text)]"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Completed">Completed</option>
                    <option value="Active Build">Active Build</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                  Short Tagline
                </label>
                <input
                  type="text"
                  value={projectForm.tagline}
                  onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                  placeholder="1-sentence explanation of what it does"
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                  What It Is
                </label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.whatItIs}
                  onChange={(e) => setProjectForm({ ...projectForm, whatItIs: e.target.value })}
                  placeholder="Honest description of what the project does..."
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                  What I Explored / Learned
                </label>
                <textarea
                  rows={2}
                  value={projectForm.whatIExplored}
                  onChange={(e) => setProjectForm({ ...projectForm, whatIExplored: e.target.value })}
                  placeholder="Concepts tested, skills learned..."
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  placeholder="React, TypeScript, Tailwind, Node.js"
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    required
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="https://myproject.vercel.app"
                    className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--theme-card-border)] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl stamp-pill text-xs font-mono"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-accent px-6 py-2.5 rounded-xl text-xs font-mono font-semibold shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingProjectId ? 'Save Changes' : 'Post to Projects'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT SOCIAL HANDLE MODAL */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="theme-card asym-card-tl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-card-border)]">
              <h3 className="font-syne font-bold text-lg text-[var(--theme-text)]">
                {editingSocialId ? 'Update Social Handle' : 'Add Social Media Handle'}
              </h3>
              <button
                onClick={() => setIsSocialModalOpen(false)}
                className="p-1.5 rounded-lg stamp-pill hover:text-[var(--theme-accent)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSocial} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                    Platform *
                  </label>
                  <input
                    type="text"
                    required
                    value={socialForm.platform}
                    onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                    placeholder="GitHub / LinkedIn / X / Instagram"
                    className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                    Display Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={socialForm.label}
                    onChange={(e) => setSocialForm({ ...socialForm, label: e.target.value })}
                    placeholder="GitHub / LinkedIn"
                    className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                  Handle / Username *
                </label>
                <input
                  type="text"
                  required
                  value={socialForm.handle}
                  onChange={(e) => setSocialForm({ ...socialForm, handle: e.target.value })}
                  placeholder="@username or name"
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                  Target Link / URL *
                </label>
                <input
                  type="url"
                  required
                  value={socialForm.url}
                  onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1 font-semibold">
                  Short Description (optional)
                </label>
                <input
                  type="text"
                  value={socialForm.description}
                  onChange={(e) => setSocialForm({ ...socialForm, description: e.target.value })}
                  placeholder="e.g. Open source projects & contributions"
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                />
              </div>

              <div className="pt-3 border-t border-[var(--theme-card-border)] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsSocialModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl stamp-pill text-xs font-mono"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-accent px-6 py-2.5 rounded-xl text-xs font-mono font-semibold shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingSocialId ? 'Update Handle' : 'Add Handle'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AUTHENTICATE BACKUP DOWNLOAD MODAL */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="theme-card asym-card-tl p-6 sm:p-8 w-full max-w-md shadow-2xl space-y-5 border border-[var(--theme-card-border)] animate-fade-in">
            <div className="flex items-start justify-between pb-3 border-b border-[var(--theme-card-border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent-dim)] text-[var(--theme-accent)] flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-base sm:text-lg text-[var(--theme-text)]">
                    Verify Admin ID & Password
                  </h3>
                  <p className="text-[11px] font-mono text-[var(--theme-accent)]">
                    Download Full Local Backup (.zip)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBackupModalOpen(false)}
                className="p-1 rounded-lg stamp-pill hover:text-[var(--theme-accent)]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[var(--theme-text-muted)] font-sans leading-relaxed">
              To download the full repository code snapshot and live database archive (.zip) directly to your local PC, please verify your credentials.
            </p>

            {backupAuthError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-mono">
                {backupAuthError}
              </div>
            )}

            <form onSubmit={handleConfirmBackupDownload} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                  Admin ID / Username
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={backupIdInput}
                  onChange={(e) => setBackupIdInput(e.target.value)}
                  placeholder="Enter admin ID..."
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-xs font-mono focus:outline-none focus:border-[var(--theme-accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={backupPasswordInput}
                  onChange={(e) => setBackupPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full px-3.5 py-2.5 rounded-xl stamp-pill text-xs font-mono focus:outline-none focus:border-[var(--theme-accent)]"
                />
              </div>

              <div className="pt-2 border-t border-[var(--theme-card-border)] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  disabled={isPackagingBackup}
                  onClick={() => setIsBackupModalOpen(false)}
                  className="px-4 py-2 rounded-xl stamp-pill text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPackagingBackup}
                  className="btn-accent px-5 py-2 rounded-xl text-xs font-mono font-semibold shadow-md flex items-center gap-2"
                >
                  {isPackagingBackup ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Packaging Archive...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Authorize & Download</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl theme-card text-xs font-mono text-[var(--theme-text)] shadow-2xl border border-[var(--theme-accent)]">
          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

import type { Project } from '../data/portfolioData';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export interface ContactNote {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface CurrentlyStatus {
  learning: string;
  exploring: string;
  building: string;
  statusNote: string;
}

export interface SocialHandle {
  id: string;
  platform: string;
  url: string;
  handle: string;
  label?: string;
  description?: string;
}

const DEFAULT_SOCIALS: SocialHandle[] = [
  { id: 'github', platform: 'GitHub', label: 'GitHub', url: 'https://github.com', handle: '@vedantbhanushali', description: 'Source code & experiments' },
  { id: 'linkedin', platform: 'LinkedIn', label: 'LinkedIn', url: 'https://linkedin.com', handle: 'vedant-bhanushali', description: 'Professional background & networking' },
];

const STORAGE_KEYS = {
  PROJECTS: 'vedant_portfolio_projects',
  CURRENTLY: 'vedant_portfolio_currently',
  NOTES: 'vedant_contact_notes',
  AUTH: 'vedant_admin_auth',
  CREDS: 'vedant_admin_creds',
  SOCIALS: 'vedant_social_handles',
  LOGO: 'vedant_custom_logo',
};

const DEFAULT_CREDS = {
  username: 'admin',
  password: 'vedant2026',
};

// --- PROJECTS MANAGEMENT ---

export function getStoredProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) return PORTFOLIO_DATA.projects;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored projects', e);
    return PORTFOLIO_DATA.projects;
  }
}

export function saveStoredProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent('vedant_data_updated', { detail: { type: 'projects', projects } }));
  } catch (e) {
    console.error('Failed to save projects', e);
  }
}

export function addProject(project: Omit<Project, 'id'>): Project {
  const newProject: Project = {
    ...project,
    id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
  };
  const list = getStoredProjects();
  const updated = [newProject, ...list];
  saveStoredProjects(updated);
  return newProject;
}

export function updateProject(project: Project): void {
  const list = getStoredProjects();
  const updated = list.map((p) => (p.id === project.id ? project : p));
  saveStoredProjects(updated);
}

export function deleteProject(id: string): void {
  const list = getStoredProjects();
  const updated = list.filter((p) => p.id !== id);
  saveStoredProjects(updated);
}

// --- CURRENTLY STATUS MANAGEMENT ---

export function getStoredCurrently(): CurrentlyStatus {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENTLY);
    if (!raw) return PORTFOLIO_DATA.currently;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored currently', e);
    return PORTFOLIO_DATA.currently;
  }
}

export function saveStoredCurrently(data: CurrentlyStatus): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENTLY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('vedant_data_updated', { detail: { type: 'currently', currently: data } }));
  } catch (e) {
    console.error('Failed to save currently status', e);
  }
}

// --- CONTACT NOTES (INBOX) MANAGEMENT ---

export function getStoredNotes(): ContactNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse contact notes', e);
    return [];
  }
}

export function saveContactNote(note: { name: string; email: string; message: string }): ContactNote {
  const newNote: ContactNote = {
    id: `note-${Date.now()}`,
    ...note,
    createdAt: new Date().toISOString(),
    read: false,
  };
  const current = getStoredNotes();
  const updated = [newNote, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('vedant_notes_updated', { detail: { notes: updated } }));
  } catch (e) {
    console.error('Failed to save contact note', e);
  }
  return newNote;
}

export function markNoteAsRead(id: string): void {
  const current = getStoredNotes();
  const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n));
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('vedant_notes_updated', { detail: { notes: updated } }));
}

export function deleteNote(id: string): void {
  const current = getStoredNotes();
  const updated = current.filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('vedant_notes_updated', { detail: { notes: updated } }));
}

// --- AUTHENTICATION ---

export function getAdminCreds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CREDS);
    if (!raw) return DEFAULT_CREDS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CREDS;
  }
}

export function setAdminCreds(username: string, password: string): void {
  localStorage.setItem(STORAGE_KEYS.CREDS, JSON.stringify({ username, password }));
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  const creds = getAdminCreds();
  return user.trim() === creds.username && pass === creds.password;
}

export function authenticateAdmin(user: string, pass: string): boolean {
  if (verifyAdminCredentials(user, pass)) {
    sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH);
}

// --- SOCIAL HANDLES MANAGEMENT ---

export function getStoredSocials(): SocialHandle[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SOCIALS);
    if (!raw) return DEFAULT_SOCIALS;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored socials', e);
    return DEFAULT_SOCIALS;
  }
}

export function saveStoredSocials(socials: SocialHandle[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SOCIALS, JSON.stringify(socials));
    window.dispatchEvent(new CustomEvent('vedant_socials_updated', { detail: { socials } }));
  } catch (e) {
    console.error('Failed to save socials', e);
  }
}

export function addSocialHandle(handle: Omit<SocialHandle, 'id'>): SocialHandle {
  const newHandle: SocialHandle = {
    ...handle,
    id: `soc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  };
  const list = getStoredSocials();
  const updated = [...list, newHandle];
  saveStoredSocials(updated);
  return newHandle;
}

export function updateSocialHandle(handle: SocialHandle): void {
  const list = getStoredSocials();
  const updated = list.map((s) => (s.id === handle.id ? handle : s));
  saveStoredSocials(updated);
}

export function deleteSocialHandle(id: string): void {
  const list = getStoredSocials();
  const updated = list.filter((s) => s.id !== id);
  saveStoredSocials(updated);
}

// --- CUSTOM LOGO MANAGEMENT ---

export function getStoredCustomLogo(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.LOGO);
  } catch {
    return null;
  }
}

export function saveStoredCustomLogo(url: string | null): void {
  try {
    if (url && url.trim()) {
      localStorage.setItem(STORAGE_KEYS.LOGO, url.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.LOGO);
    }
    window.dispatchEvent(new CustomEvent('vedant_logo_updated', { detail: { logoUrl: url } }));
  } catch (e) {
    console.error('Failed to save custom logo', e);
  }
}


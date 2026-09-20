import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Copy, Check, Send, ArrowUpRight, Sparkles, Clock, Globe, ShieldCheck, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { saveContactNote, getStoredSocials } from '../utils/portfolioStorage';
import type { SocialHandle } from '../utils/portfolioStorage';

const RATE_LIMIT_MS = 2500; // 1 submit per 2.5 seconds
const RATE_LIMIT_STORAGE_KEY = 'vedant_contact_last_submit';

export const Contact: React.FC = () => {
  const { contact } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [socials, setSocials] = useState<SocialHandle[]>(getStoredSocials());
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);

  // Calculate initial cooldown from persistent session storage
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(() => {
    try {
      const last = parseInt(sessionStorage.getItem(RATE_LIMIT_STORAGE_KEY) || '0', 10);
      const elapsed = Date.now() - last;
      return elapsed < RATE_LIMIT_MS ? Number(((RATE_LIMIT_MS - elapsed) / 1000).toFixed(1)) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const interval = setInterval(() => {
      try {
        const last = parseInt(sessionStorage.getItem(RATE_LIMIT_STORAGE_KEY) || '0', 10);
        const elapsed = Date.now() - last;
        const remaining = RATE_LIMIT_MS - elapsed;
        if (remaining <= 0) {
          setCooldownRemaining(0);
          setRateLimitError(null);
        } else {
          setCooldownRemaining(Number((remaining / 1000).toFixed(1)));
        }
      } catch {
        setCooldownRemaining(0);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  useEffect(() => {
    const handleSocialsUpdate = () => {
      setSocials(getStoredSocials());
    };
    window.addEventListener('vedant_socials_updated', handleSocialsUpdate);
    return () => window.removeEventListener('vedant_socials_updated', handleSocialsUpdate);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Rate limiting check (1 submission per 2.5 seconds)
    const lastSubmit = parseInt(sessionStorage.getItem(RATE_LIMIT_STORAGE_KEY) || '0', 10);
    const elapsed = Date.now() - lastSubmit;

    if (elapsed < RATE_LIMIT_MS) {
      const remainingSec = ((RATE_LIMIT_MS - elapsed) / 1000).toFixed(1);
      setRateLimitError(`Rate limit active: Please wait ${remainingSec}s before submitting again (1 submission per 2.5s).`);
      setCooldownRemaining(Number(remainingSec));
      return;
    }

    // Record submission timestamp
    sessionStorage.setItem(RATE_LIMIT_STORAGE_KEY, Date.now().toString());
    setCooldownRemaining(2.5);
    setRateLimitError(null);

    saveContactNote({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[var(--theme-card-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--theme-accent)] font-semibold tracking-wider uppercase">06 / LET'S TALK</span>
            <div className="h-[1px] w-12 bg-[var(--theme-accent)] opacity-40" />
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[var(--theme-text)] tracking-tight leading-tight mb-4">
            {contact.heading}
          </h2>
          <p className="font-serif italic text-lg sm:text-2xl text-[var(--theme-text-muted)] font-normal leading-relaxed">
            "{contact.supportingCopy}"
          </p>
        </div>

        {/* Two Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Inbox Card with Asymmetrical Shape */}
            <div className="theme-card asym-card-tl p-6 sm:p-7 space-y-5 shadow-xl">
              <div className="font-mono text-xs text-[var(--theme-text-muted)] uppercase tracking-wider flex items-center justify-between font-semibold">
                <span>DIRECT INBOX</span>
                <span className="flex items-center gap-1.5 text-[var(--theme-accent)] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active & Reachable
                </span>
              </div>

              {/* Email Copy Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl stamp-pill border-[var(--theme-card-border)] bg-[var(--theme-badge-bg)]">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[var(--theme-accent)] flex-shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-[var(--theme-text)] font-semibold truncate">
                    {contact.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="btn-accent flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold flex-shrink-0 group"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white animate-bounce" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-[var(--theme-text-muted)] font-sans leading-relaxed">
                Whether you want to discuss engineering ideas, explore a collaboration, or just share a book or tech recommendation, I'm always happy to connect.
              </p>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--theme-text-muted)] opacity-75 pt-2 border-t border-[var(--theme-card-border)]">
                <Clock className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span>Usually replies within 24 hours · Mumbai IST</span>
              </div>
            </div>

            {/* Profile Cards with Dynamic Socials from Admin Panel */}
            <div className="grid grid-cols-2 gap-3">
              {socials.map((soc, idx) => {
                const isEven = idx % 2 === 0;
                const asymClass = isEven ? 'asym-card-bl' : 'asym-card-br';
                const platformKey = soc.platform.toLowerCase();

                const renderIcon = () => {
                  if (platformKey.includes('github')) {
                    return <GithubIcon className="w-4 h-4 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition-colors" />;
                  }
                  if (platformKey.includes('linkedin')) {
                    return <LinkedinIcon className="w-4 h-4 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition-colors" />;
                  }
                  if (platformKey.includes('mail') || platformKey.includes('email')) {
                    return <Mail className="w-4 h-4 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition-colors" />;
                  }
                  return <Globe className="w-4 h-4 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition-colors" />;
                };

                return (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`theme-card ${asymClass} p-4 flex flex-col justify-between group shadow-md hover:border-[var(--theme-accent)] transition-all`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      {renderIcon()}
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <div>
                      <div className="font-headline font-bold text-sm text-[var(--theme-text)]">
                        {soc.label || soc.platform}
                      </div>
                      <div className="font-mono text-[11px] text-[var(--theme-text-muted)] truncate">
                        {soc.handle}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Message Composer (7 cols) */}
          <div className="lg:col-span-7">
            <div className="theme-card asym-card-tr p-6 sm:p-9 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-headline font-bold text-xl sm:text-2xl text-[var(--theme-text)]">
                    Send a Note
                  </h3>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-sans">
                    Drop a message directly to my inbox. No spam, just authentic conversation.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />
              </div>

              {formSent ? (
                <div className="p-8 rounded-2xl stamp-pill text-center space-y-3 border-emerald-500/40">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-headline font-bold text-lg text-emerald-700">
                    Note Sent!
                  </h4>
                  <p className="text-xs text-[var(--theme-text-muted)] max-w-sm mx-auto">
                    Thanks for getting in touch! I will read your note and get back to you soon.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-2 px-4 py-1.5 rounded-lg btn-secondary text-xs font-mono font-semibold"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex"
                        className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent-dim)] transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent-dim)] transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--theme-text-muted)] uppercase mb-1.5 font-semibold">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Vedant, came across your portfolio and wanted to connect about..."
                      className="w-full px-4 py-3 rounded-xl stamp-pill text-sm focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent-dim)] transition-all font-sans resize-none"
                    />
                  </div>

                  {/* Rate Limit Alert Banner if triggered */}
                  {rateLimitError && (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-mono animate-fade-in">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-500" />
                      <span>{rateLimitError}</span>
                    </div>
                  )}

                  {/* Animated Submit Button with 2.5s Rate Limit Protection */}
                  <button
                    type="submit"
                    disabled={cooldownRemaining > 0}
                    className={`w-full py-4 rounded-xl font-headline font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group ${
                      cooldownRemaining > 0
                        ? 'opacity-60 cursor-not-allowed bg-[var(--theme-card-border)] text-[var(--theme-text-muted)]'
                        : 'btn-accent active:scale-[0.99]'
                    }`}
                  >
                    {cooldownRemaining > 0 ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin text-[var(--theme-accent)]" />
                        <span>Please wait ({cooldownRemaining.toFixed(1)}s cooldown)...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--theme-text-muted)] opacity-70 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Protected with anti-spam</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

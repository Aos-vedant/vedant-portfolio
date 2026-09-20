import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Copy, Check, Send, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const { contact } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Refined Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 tracking-wider uppercase">09 / GET IN TOUCH</span>
            <div className="h-[1px] w-12 bg-sky-400/30" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-100 tracking-tight leading-tight mb-4">
            {contact.heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            {contact.supportingCopy}
          </p>
        </div>

        {/* Two Column Layout: Direct Links & Interactive Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Email & Social Profiles (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Copy Email Box */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
              <div className="font-mono text-xs text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>DIRECT EMAIL</span>
                <span className="flex items-center gap-1.5 text-sky-400 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Inbox Open
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-dark-900 border border-white/5">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-slate-200 truncate">
                    {contact.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-xs font-mono text-sky-300 transition-all active:scale-95 flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Whether you want to discuss a project, share feedback, or talk about interesting technologies, feel free to send a message.
              </p>
            </div>

            {/* Profile Cards */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-dark-850 border border-white/5 hover:border-sky-400/30 hover:bg-dark-800 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <div className="font-display font-medium text-sm text-slate-200">
                    GitHub
                  </div>
                  <div className="font-mono text-[11px] text-slate-500 truncate">
                    @vedantbhanushali
                  </div>
                </div>
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-dark-850 border border-white/5 hover:border-sky-400/30 hover:bg-dark-800 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <LinkedinIcon className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <div className="font-display font-medium text-sm text-slate-200">
                    LinkedIn
                  </div>
                  <div className="font-mono text-[11px] text-slate-500 truncate">
                    vedant-bhanushali
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Message Composer (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-100">
                    Send a Note
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Drop a message directly to my inbox.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-sky-400" />
              </div>

              {formSent ? (
                <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-emerald-300">
                    Note Sent!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thanks for getting in touch! I'll read your note and get back to you soon.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-2 px-4 py-1.5 rounded-lg bg-dark-800 text-xs font-mono text-slate-300 hover:text-white border border-white/10"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-400/60 focus:ring-1 focus:ring-sky-400/40 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-400/60 focus:ring-1 focus:ring-sky-400/40 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Vedant, came across your portfolio and wanted to connect about..."
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-400/60 focus:ring-1 focus:ring-sky-400/40 transition-colors font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white font-display font-medium text-sm shadow-glow-sm hover:shadow-glow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 group"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

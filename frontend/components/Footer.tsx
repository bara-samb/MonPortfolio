"use client";

import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '@/components/Icons';
import { PERSONAL_INFO } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#030712] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
        {/* Left: Branding & Copyright */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-slate-300 font-display">
            {PERSONAL_INFO.name}
          </p>
          <p className="mt-1">
            &copy; {currentYear} — {t('footer_rights')}
          </p>
        </div>

        {/* Middle: Quick Links */}
        <div className="flex gap-6">
          <a href="#accueil" className="hover:text-slate-300 transition-colors">{t('nav_home')}</a>
          <a href="#competences" className="hover:text-slate-300 transition-colors">{t('nav_skills')}</a>
          <a href="#projets" className="hover:text-slate-300 transition-colors">{t('nav_projects')}</a>
          <a href="#parcours" className="hover:text-slate-300 transition-colors">{t('nav_timeline')}</a>
          <a href="#contact" className="hover:text-slate-300 transition-colors">{t('nav_contact')}</a>
        </div>

        {/* Right: Social icons */}
        <div className="flex gap-4">
          <a 
            href={PERSONAL_INFO.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a 
            href={PERSONAL_INFO.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/10 hover:border-white/10 transition-all"
            aria-label="WhatsApp"
          >
            <WhatsappIcon className="w-4 h-4" />
          </a>
          <a 
            href={`mailto:${PERSONAL_INFO.email}`} 
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

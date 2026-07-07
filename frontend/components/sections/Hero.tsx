"use client";

import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, Network, Terminal, Shield, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '@/components/Icons';
import { PERSONAL_INFO } from '@/lib/constants';
import { getSetting } from '@/lib/api';

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= 6) {
          clearInterval(interval);
          return 6;
        }
        return prev + 1;
      });
    }, 120); // Fast typing sequence
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const img = await getSetting('profile_image');
        if (img) setProfileImage(img);
      } catch (err) {
        console.error('Failed to load profile image', err);
      }
    };
    loadProfileImage();
    window.addEventListener('storage', loadProfileImage);
    return () => window.removeEventListener('storage', loadProfileImage);
  }, []);

  return (
    <section id="accueil" className="relative min-h-[90vh] flex items-center pt-24 pb-32 sm:pb-36 px-6 overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full radial-glow z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full radial-glow-indigo z-0 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Column: Info & Action */}
        <div className="md:col-span-7 flex flex-col items-start text-left space-y-6">

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2.5 items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{PERSONAL_INFO.status}</span>
            </div>

          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
              <span className="bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-300 font-display">
              {PERSONAL_INFO.title}
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>

          {/* Specialization Tags with Green Glow Hover Shine */}
          <div className="flex flex-wrap gap-3 py-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-medium transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-default">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Systèmes Répartis (DAR)
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-medium transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-default">
              <Network className="w-3.5 h-3.5 text-emerald-400" />
              Cisco CCNA Certifié
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-medium transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-default">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Réseaux & Sécurité
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
            <a
              href="#projets"
              className="flex-1 sm:flex-initial text-center px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="flex-1 sm:flex-initial text-center px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Me contacter
            </a>
            <a
              href={PERSONAL_INFO.cvUrl}
              download
              className="flex-1 sm:flex-initial text-center px-6 py-3.5 text-sky-400 border border-sky-400/30 rounded-xl hover:bg-sky-400 hover:text-slate-950 transition-all duration-300 flex items-center justify-center gap-2 font-bold"
            >
              <Download className="w-5 h-5" />
              Télécharger mon CV
            </a>
          </div>

          {/* Quick Social Links */}
          <div className="flex items-center gap-4 pt-6 text-slate-500">
            <span className="text-xs uppercase tracking-wider font-semibold">Suivez-moi</span>
            <div className="w-12 h-[1px] bg-slate-800"></div>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsappIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Photo & Terminal Stack */}
        <div className="md:col-span-5 flex flex-col items-center gap-6 w-full mt-8 md:mt-0">

          {/* Photo Card */}
          <div className="w-full max-w-[340px] rounded-3xl glass-panel border border-white/5 p-5 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 group bg-slate-950">
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] opacity-70 animate-scan z-20"></div>

              <img
                src={profileImage || "/monProfile.jpeg"}
                alt="Mame Bara Samb"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400 z-10"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400 z-10"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400 z-10"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400 z-10"></div>

              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#030712]/80 backdrop-blur-md border border-white/5 text-[8px] sm:text-[9px] text-slate-400 font-mono flex items-center gap-1 sm:gap-1.5 shadow-md z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                PRESIDENT @ CLUB MET
              </div>
              <div className="absolute top-3 sm:top-4 right-3 sm:top-4 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#030712]/80 backdrop-blur-md border border-white/5 text-[8px] sm:text-[9px] text-slate-400 font-mono flex items-center gap-1 sm:gap-1.5 shadow-md z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                L3 DAR (UCAK)
              </div>
            </div>
          </div>

          {/* Terminal Card (French, Clean & High Precision) */}
          <div className="w-full max-w-[340px] rounded-3xl glass-panel border border-white/5 p-5 relative overflow-hidden shadow-2xl">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 font-mono text-[10px] space-y-1.5 text-slate-400 min-h-[145px]">
              <div className="flex items-center justify-between text-[11px] font-bold text-white border-b border-white/5 pb-1 mb-2">

                {visibleLines < 6 && <span className="animate-pulse text-emerald-400">_</span>}
              </div>

              {visibleLines >= 1 && (
                <div className="flex justify-between">
                  <span>IDENTITÉ :</span>
                  <span className="text-white">MAME BARA SAMB</span>
                </div>
              )}

              {visibleLines >= 2 && (
                <div className="flex justify-between">
                  <span>SPÉCIALITÉ :</span>
                  <span className="text-emerald-400 text-right">L3 INFORMATIQUE DAR (UCAK)</span>
                </div>
              )}

              {visibleLines >= 3 && (
                <div className="flex justify-between">
                  <span>CERTIFICATION :</span>
                  <span className="text-cyan-300 font-semibold">CISCO CCNA (OPÉRATIONNELLE)</span>
                </div>
              )}

              {visibleLines >= 4 && (
                <div className="flex justify-between">
                  <span>CODE D'ACCÈS :</span>
                  <span className="text-slate-600">••••••••••••••</span>
                </div>
              )}

              {visibleLines >= 5 && (
                <div className="border-t border-white/5 pt-2 mt-2 space-y-1">
                  <div className="text-white font-bold text-[9px] uppercase tracking-wider">LANGUES SYSTÈME :</div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[9px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">WOLOF :</span>
                      <span className="text-[#a855f7] font-semibold">MATERNEL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">FRANÇAIS :</span>
                      <span className="text-[#a855f7] font-semibold">COURANT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ANGLAIS :</span>
                      <span className="text-[#a855f7] font-semibold">TECHNIQUE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ARABE :</span>
                      <span className="text-[#a855f7] font-semibold">AISÉ</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 z-10">
        <span className="text-[10px] uppercase tracking-widest font-semibold">Défiler</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

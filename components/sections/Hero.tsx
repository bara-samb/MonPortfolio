import React from 'react';
import { ArrowDown, Mail, Network, Terminal, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { PERSONAL_INFO } from '@/lib/constants';

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full radial-glow z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full radial-glow-indigo z-0 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Info & Action */}
        <div className="md:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{PERSONAL_INFO.status}</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
              Salut, je suis <br />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
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

          {/* Specialization Tags */}
          <div className="flex flex-wrap gap-3 py-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-medium">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              Systèmes Répartis (DAR)
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-medium">
              <Network className="w-3.5 h-3.5 text-indigo-400" />
              Cisco CCNA Certifié
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-medium">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              Réseaux & Sécurité
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
            <a 
              href="#projets" 
              className="flex-1 sm:flex-initial text-center px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20"
            >
              Voir mes projets
            </a>
            <a 
              href="#contact" 
              className="flex-1 sm:flex-initial text-center px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Me contacter
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
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Animated SVG Architecture */}
        <div className="md:col-span-5 hidden md:block relative animate-float">
          <div className="w-full aspect-square max-w-[420px] mx-auto rounded-3xl glass-panel border border-white/5 flex items-center justify-center p-8 relative overflow-hidden shadow-2xl">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-radial-gradient from-sky-500/5 via-transparent to-transparent"></div>
            
            {/* Core network visualization SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full text-sky-500/20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="skyGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="indigoGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Connecting wires/lines */}
              <line x1="100" y1="40" x2="50" y2="90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
              <line x1="100" y1="40" x2="150" y2="90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
              <line x1="50" y1="90" x2="100" y2="150" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
              <line x1="150" y1="90" x2="100" y2="150" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
              <line x1="50" y1="90" x2="150" y2="90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="100" y1="40" x2="100" y2="150" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />

              {/* Glowing backdrops for nodes */}
              <circle cx="100" cy="40" r="22" fill="url(#skyGlow)" className="animate-pulse" />
              <circle cx="50" cy="90" r="22" fill="url(#indigoGlow)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
              <circle cx="150" cy="90" r="22" fill="url(#indigoGlow)" className="animate-pulse" style={{ animationDelay: '3s' }} />
              <circle cx="100" cy="150" r="22" fill="url(#skyGlow)" className="animate-pulse" style={{ animationDelay: '0.7s' }} />

              {/* Communication rings (animated) */}
              <circle cx="100" cy="40" r="8" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.8">
                <animate attributeName="r" values="8;18;8" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="150" r="8" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.8">
                <animate attributeName="r" values="8;18;8" dur="4s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" begin="1s" />
              </circle>

              {/* Node bodies */}
              <circle cx="100" cy="40" r="6" fill="#0ea5e9" stroke="#030712" strokeWidth="2" />
              <circle cx="50" cy="90" r="6" fill="#6366f1" stroke="#030712" strokeWidth="2" />
              <circle cx="150" cy="90" r="6" fill="#6366f1" stroke="#030712" strokeWidth="2" />
              <circle cx="100" cy="150" r="6" fill="#0ea5e9" stroke="#030712" strokeWidth="2" />

              {/* Data packet flows */}
              <circle cx="100" cy="40" r="2.5" fill="#f8fafc">
                <animateMotion path="M 0 0 L -50 50 L 50 110 L 0 0" dur="6s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="40" r="2.5" fill="#38bdf8">
                <animateMotion path="M 0 0 L 50 50 L -50 110 L 0 0" dur="5s" repeatCount="indefinite" begin="2.5s" />
              </circle>
            </svg>

            {/* Float tags */}
            <div className="absolute top-6 left-6 px-3 py-1.5 rounded-lg bg-[#030712]/80 border border-white/5 text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              API Gateway
            </div>
            <div className="absolute bottom-6 right-6 px-3 py-1.5 rounded-lg bg-[#030712]/80 border border-white/5 text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              CCNA Subnetting
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 z-10">
        <span className="text-[10px] uppercase tracking-widest font-semibold">Défiler</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

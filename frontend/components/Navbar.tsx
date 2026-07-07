"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2, Sun, Moon, Download, Home, Cpu, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

const navLinks = [
  { name: 'Accueil', href: '#accueil', icon: Home },
  { name: 'Compétences', href: '#competences', icon: Cpu },
  { name: 'Projets', href: '#projets', icon: Briefcase },
  { name: 'Parcours', href: '#parcours', icon: GraduationCap },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    if (initialTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <>
      {/* Main Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${
        scrolled 
          ? 'py-4 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2 group min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center group-hover:border-sky-400 group-hover:bg-sky-500/20 transition-all shrink-0">
              <Code2 className="w-5 h-5 text-sky-400 shrink-0" />
            </div>
            <span className="font-display font-bold text-sm sm:text-base md:text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors truncate max-w-[130px] sm:max-w-none">
              {PERSONAL_INFO.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-8 text-sm font-medium text-slate-400">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="hover:text-white transition-colors py-2 relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-500" />}
            </button>

            <a 
              href={PERSONAL_INFO.cvUrl} 
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sky-400 border border-sky-400/30 rounded-lg hover:bg-sky-400 hover:text-slate-950 transition-all duration-300"
            >
              Télécharger CV
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile controls (Theme Toggle and Hamburger menu) */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle Button next to hamburger */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-500" />}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay (Slides from RIGHT) */}
      <div className={`fixed top-0 bottom-0 right-0 w-[80%] sm:w-[320px] z-50 bg-slate-950 border-l border-white/10 md:hidden transition-all duration-300 flex flex-col p-6 shadow-2xl ${
        isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'
      }`}>
        {/* Drawer Header (Only Close control button, aligned right) */}
        <div className="flex items-center justify-end pb-4 border-b border-white/5">
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Fermer le menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <ul className="flex flex-col gap-5 text-lg font-medium text-slate-400 pt-6">
          {navLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <li 
                key={link.name}
                style={{ transitionDelay: isOpen ? `${idx * 60}ms` : '0ms' }}
                className={`transform transition-all duration-300 ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
              >
                <a 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3.5 py-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <Icon className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)] transition-transform duration-300 group-hover:scale-110 shrink-0" />
                  <span>{link.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
        
        {/* Drawer Footer CV Controls */}
        <div className="space-y-3 pb-6 border-t border-white/5 pt-6 text-center mt-6">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-mono">Mon CV</p>
          <a 
            href={PERSONAL_INFO.cvUrl} 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 text-center text-sm font-semibold !text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md shadow-emerald-900/20 active:scale-98"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Télécharger CV</span>
          </a>
        </div>
      </div>

      {/* Dimmer backdrop overlay */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

const navLinks = [
  { name: 'Accueil', href: '#accueil' },
  { name: 'Compétences', href: '#competences' },
  { name: 'Projets', href: '#projets' },
  { name: 'Parcours', href: '#parcours' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center group-hover:border-sky-400 group-hover:bg-sky-500/20 transition-all">
            <Code2 className="w-5 h-5 text-sky-400" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
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
          
          <a 
            href={PERSONAL_INFO.cvUrl} 
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sky-400 border border-sky-400/30 rounded-lg hover:bg-sky-400 hover:text-slate-950 transition-all duration-300"
          >
            Télécharger CV
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 top-[73px] z-40 bg-[#030712]/95 backdrop-blur-lg border-t border-white/5 md:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col p-6 h-full justify-between">
          <ul className="space-y-6 text-lg font-medium text-slate-400">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 hover:text-white transition-colors border-b border-white/5"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="pb-12">
            <a 
              href={PERSONAL_INFO.cvUrl} 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-center text-sm font-semibold text-slate-950 bg-sky-400 rounded-xl hover:bg-sky-300 transition-colors"
            >
              Télécharger CV
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

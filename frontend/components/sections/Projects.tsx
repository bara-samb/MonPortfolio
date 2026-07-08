"use client";

import React, { useState, useEffect } from 'react';
import { FolderGit2 } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { getProjects } from '@/lib/api';
import { useLanguage } from '@/lib/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    
    loadProjects();
    window.addEventListener('storage', loadProjects);
    return () => window.removeEventListener('storage', loadProjects);
  }, []);

  return (
    <section id="projets" className="py-24 px-6 relative bg-grid-pattern">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full radial-glow-purple z-0 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t('projects_title').split(' ').map((word, i) => i === 1 ? <span key={i} className="text-sky-400"> {word} </span> : word)}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-400">
            {t('projects_subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.title}
              className="group flex flex-col justify-between p-5 sm:p-8 rounded-2xl glass-panel glass-panel-hover relative overflow-hidden"
            >
              {/* Glow Accent */}
              <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-sky-500/5 group-hover:bg-sky-500/10 blur-xl transition-all duration-500"></div>
              
              <div>
                {/* Header: Icon & Links */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform duration-300">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  
                  <div className="flex gap-3 text-slate-400 hover:text-white">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-all"
                      aria-label="Voir le code source GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Role Badge */}
                <div className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-300 mb-3">
                  {project.role}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Footer Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {project.tech.map((tech: string) => (
                  <span 
                    key={tech} 
                    className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 text-xs text-slate-400 tech-badge"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

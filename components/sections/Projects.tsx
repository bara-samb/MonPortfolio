import React from 'react';
import { FolderGit2, ExternalLink, Code } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { PROJECTS } from '@/lib/constants';

export default function Projects() {
  return (
    <section id="projets" className="py-24 px-6 relative bg-grid-pattern">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full radial-glow-purple z-0 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Mes <span className="text-sky-400">Projets</span> Récents
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-400">
            Une sélection de travaux récents illustrant mon expertise en développement backend, routage réseau et conception logicielle distribuée.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.title}
              className="group flex flex-col justify-between p-8 rounded-2xl glass-panel glass-panel-hover relative overflow-hidden"
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
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Detailed Spec */}
                <p className="text-slate-500 text-xs mb-6 leading-relaxed italic border-l border-slate-700 pl-3">
                  {project.details}
                </p>
              </div>

              {/* Footer Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {project.tech.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2.5 py-1 rounded bg-[#030712] border border-white/5 text-xs text-slate-400"
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

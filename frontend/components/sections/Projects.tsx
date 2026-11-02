"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { FolderGit2, ExternalLink, Users, User, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { getProjects } from '@/lib/api';
import { useLanguage } from '@/lib/LanguageContext';

type FilterType = 'all' | 'collective' | 'individual' | 'ai' | 'backend' | 'web';

export default function Projects() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    
    loadProjects();
    window.addEventListener('storage', loadProjects);
    return () => window.removeEventListener('storage', loadProjects);
  }, []);

  const counts = useMemo(() => {
    return {
      all: projects.length,
      collective: projects.filter((p) => p.type?.toLowerCase().includes('collectif')).length,
      individual: projects.filter((p) => p.type?.toLowerCase().includes('individuel')).length,
      ai: projects.filter((p) => p.category === 'ai' || p.tech?.some((t: string) => /ai|ml|learning|xgboost|forest/i.test(t))).length,
      backend: projects.filter((p) => p.category === 'backend' || p.tech?.some((t: string) => /quarkus|microservices|django|jpa|node|iot/i.test(t))).length,
      web: projects.filter((p) => p.category === 'web' || p.category === 'mobile' || p.tech?.some((t: string) => /react|pwa|flutter|next|php/i.test(t))).length,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'collective') return project.type?.toLowerCase().includes('collectif');
      if (activeFilter === 'individual') return project.type?.toLowerCase().includes('individuel');
      if (activeFilter === 'ai') {
        return project.category === 'ai' || project.tech?.some((t: string) => /ai|ml|learning|xgboost|forest/i.test(t));
      }
      if (activeFilter === 'backend') {
        return project.category === 'backend' || project.tech?.some((t: string) => /quarkus|microservices|django|jpa|node|iot/i.test(t));
      }
      if (activeFilter === 'web') {
        return project.category === 'web' || project.category === 'mobile' || project.tech?.some((t: string) => /react|pwa|flutter|next|php/i.test(t));
      }
      return true;
    });
  }, [projects, activeFilter]);

  const filterTabs: { id: FilterType; labelKey: string; count: number }[] = [
    { id: 'all', labelKey: 'projects_filter_all', count: counts.all },
    { id: 'collective', labelKey: 'projects_filter_collective', count: counts.collective },
    { id: 'individual', labelKey: 'projects_filter_individual', count: counts.individual },
    { id: 'ai', labelKey: 'projects_filter_ai', count: counts.ai },
    { id: 'backend', labelKey: 'projects_filter_backend', count: counts.backend },
    { id: 'web', labelKey: 'projects_filter_web', count: counts.web },
  ];

  return (
    <section id="projets" className="py-24 px-6 relative bg-grid-pattern">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full radial-glow-purple z-0 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t('projects_title').split(' ').map((word, i) => i === 1 ? <span key={i} className="text-sky-400"> {word} </span> : word)}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-400">
            {t('projects_subtitle')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-sky-500/15 border-sky-500/40 text-sky-400 shadow-lg shadow-sky-500/10'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{t(tab.labelKey as any) || tab.id}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-sky-500/30 text-sky-200' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const isCollective = project.type?.toLowerCase().includes('collectif');
            return (
              <div 
                key={project.id || project.title || index}
                className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-panel glass-panel-hover relative overflow-hidden transition-all duration-300"
              >
                {/* Glow Accent */}
                <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-sky-500/5 group-hover:bg-sky-500/10 blur-xl transition-all duration-500"></div>
                
                <div>
                  {/* Header: Icon & Links */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform duration-300">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-400">
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
                          aria-label={t('projects_view_demo')}
                          title={t('projects_view_demo')}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{t('projects_view_demo')}</span>
                        </a>
                      )}
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-all"
                        aria-label={t('projects_view_github')}
                        title={t('projects_view_github')}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-300">
                      {project.role}
                    </span>

                    {project.type && (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider border ${
                          isCollective
                            ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        }`}
                      >
                        {isCollective ? <Users className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {project.type}
                      </span>
                    )}

                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-300">
                        <Sparkles className="w-3 h-3" />
                        {t('projects_featured')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tech?.map((tech: string) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 text-xs text-slate-400 tech-badge"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

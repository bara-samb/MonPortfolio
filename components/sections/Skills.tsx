"use client";

import React, { useState } from 'react';
import { Server, Network, Layout, Settings2, Cpu } from 'lucide-react';
import { SKILLS, SKILL_CATEGORIES } from '@/lib/constants';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'backend':
        return <Server className="w-5 h-5 text-sky-400" />;
      case 'networking':
        return <Network className="w-5 h-5 text-indigo-400" />;
      case 'frontend':
        return <Layout className="w-5 h-5 text-purple-400" />;
      case 'tools':
        return <Settings2 className="w-5 h-5 text-pink-400" />;
      default:
        return <Cpu className="w-5 h-5 text-slate-400" />;
    }
  };

  const filteredSkills = activeCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  return (
    <section id="competences" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Compétences <span className="text-sky-400">Techniques</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-400">
            Mon expertise technique est structurée autour de l'architecture backend, de l'ingénierie des réseaux de télécommunication et des technologies cloud/infrastructure.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/10'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Toutes
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/10'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {getIcon(cat.id)}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category Grid or Filtered List */}
        {activeCategory === 'all' ? (
          /* Grid view by categories */
          <div className="grid md:grid-cols-2 gap-8">
            {SKILL_CATEGORIES.map((cat) => {
              const catSkills = SKILLS.filter(s => s.category === cat.id);
              return (
                <div 
                  key={cat.id} 
                  className="p-8 rounded-2xl glass-panel border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-300"
                >
                  {/* Visual Top Glow */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent"></div>
                  
                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      {getIcon(cat.id)}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{cat.name}</h3>
                  </div>

                  {/* Skills Progress Bars */}
                  <div className="space-y-6">
                    {catSkills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-slate-300">{skill.name}</span>
                          <span className="text-sky-400 font-mono">{skill.level}%</span>
                        </div>
                        {/* Bar */}
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Filtered List view */
          <div className="max-w-3xl mx-auto p-8 rounded-2xl glass-panel border border-white/5">
            <div className="space-y-6">
              {filteredSkills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-300">{skill.name}</span>
                    <span className="text-sky-400 font-mono">{skill.level}%</span>
                  </div>
                  {/* Bar */}
                  <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

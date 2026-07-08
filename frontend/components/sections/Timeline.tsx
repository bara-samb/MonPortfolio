"use client";

import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, Calendar, Bookmark, Users } from 'lucide-react';
import { getTimeline } from '@/lib/api';
import { useLanguage } from '@/lib/LanguageContext';

export default function Timeline() {
  const { t } = useLanguage();
  const [timeline, setTimeline] = useState<any[]>([]);

  useEffect(() => {
    const loadTimeline = async () => {
      const data = await getTimeline();
      setTimeline(data);
    };

    loadTimeline();
    window.addEventListener('storage', loadTimeline);
    return () => window.removeEventListener('storage', loadTimeline);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-5 h-5 text-sky-400" />;
      case 'certification':
        return <Award className="w-5 h-5 text-indigo-400" />;
      case 'leadership':
        return <Users className="w-5 h-5 text-emerald-400" />;
      default:
        return <Bookmark className="w-5 h-5 text-purple-400" />;
    }
  };

  const getColorStyles = (type: string) => {
    switch (type) {
      case 'education':
        return {
          border: 'group-hover:border-sky-500',
          bg: 'group-hover:bg-sky-500/10',
          text: 'text-sky-400',
          textHover: 'group-hover:text-sky-400',
          ping: 'bg-sky-500/10',
        };
      case 'certification':
        return {
          border: 'group-hover:border-indigo-500',
          bg: 'group-hover:bg-indigo-500/10',
          text: 'text-indigo-400',
          textHover: 'group-hover:text-indigo-400',
          ping: 'bg-indigo-500/10',
        };
      case 'leadership':
        return {
          border: 'group-hover:border-emerald-500',
          bg: 'group-hover:bg-emerald-500/10',
          text: 'text-emerald-400',
          textHover: 'group-hover:text-emerald-400',
          ping: 'bg-emerald-500/10',
        };
      default:
        return {
          border: 'group-hover:border-purple-500',
          bg: 'group-hover:bg-purple-500/10',
          text: 'text-purple-400',
          textHover: 'group-hover:text-purple-400',
          ping: 'bg-purple-500/10',
        };
    }
  };

  return (
    <section id="parcours" className="py-24 px-6 relative bg-[#030712]">
      {/* Background ambient glow */}
      <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 w-[300px] h-[300px] rounded-full radial-glow z-0 opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t('timeline_title').split(' ').map((word, i) => i === 1 ? <span key={i} className="text-sky-400"> {word}</span> : word)}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-400">
            {t('timeline_subtitle')}
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 pb-6">
          
          {timeline.map((item, index) => {
            const styles = getColorStyles(item.type);
            return (
              <div key={index} className="relative group">
                
                {/* Timeline Bullet (Node) */}
                <div className={`absolute -left-[53px] md:-left-[69px] top-1.5 w-10 h-10 rounded-xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center ${styles.border} ${styles.bg} transition-all duration-300 z-10 shadow-lg`}>
                  {getIcon(item.type)}
                </div>

                {/* Glowing Pulse behind active nodes */}
                {index === 0 && (
                  <div className={`absolute -left-[57px] md:-left-[73px] top-0.5 w-12 h-12 rounded-xl ${styles.ping} animate-ping opacity-75 pointer-events-none`}></div>
                )}

                {/* Timeline Card */}
                <div className="p-5 sm:p-8 rounded-2xl glass-panel group-hover:border-white/10 transition-all duration-300 relative">
                  
                  {/* Year Indicator */}
                  <div className={`flex items-center gap-2 text-xs font-semibold ${styles.text} font-mono mb-3`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold text-white mb-1 ${styles.textHover} transition-colors`}>
                    {item.title}
                  </h3>

                  {/* Subtitle / Institution */}
                  <p className="text-sm font-semibold text-slate-300 font-display mb-4">
                    {item.institution}
                  </p>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                </div>
              </div>
            );
          })}
          
        </div>

      </div>
    </section>
  );
}

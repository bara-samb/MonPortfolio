import React from 'react';
import { GraduationCap, Award, Calendar, Bookmark } from 'lucide-react';
import { TIMELINE } from '@/lib/constants';

export default function Timeline() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-5 h-5 text-sky-400" />;
      case 'certification':
        return <Award className="w-5 h-5 text-indigo-400" />;
      default:
        return <Bookmark className="w-5 h-5 text-purple-400" />;
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
            Mon <span className="text-sky-400">Parcours</span> Académique
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-400">
            Détails de ma formation universitaire en informatique distribuée et de mes certifications professionnelles en réseaux.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 pb-6">
          
          {TIMELINE.map((item, index) => (
            <div key={index} className="relative group">
              
              {/* Timeline Bullet (Node) */}
              <div className="absolute -left-[53px] md:-left-[69px] top-1.5 w-10 h-10 rounded-xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center group-hover:border-sky-500 group-hover:bg-sky-500/10 transition-all duration-300 z-10 shadow-lg">
                {getIcon(item.type)}
              </div>

              {/* Glowing Pulse behind active nodes */}
              {index === 0 && (
                <div className="absolute -left-[57px] md:-left-[73px] top-0.5 w-12 h-12 rounded-xl bg-sky-500/10 animate-ping opacity-75 pointer-events-none"></div>
              )}

              {/* Timeline Card */}
              <div className="p-8 rounded-2xl glass-panel group-hover:border-white/10 transition-all duration-300 relative">
                
                {/* Year Indicator */}
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 font-mono mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">
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
          ))}
          
        </div>

      </div>
    </section>
  );
}

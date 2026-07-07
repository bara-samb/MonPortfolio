"use client";

import React, { useState, useEffect } from 'react';
import {
  Lock, ShieldAlert, ShieldCheck, Cpu, Database, Network, BookOpen, ArrowLeft, Plus, Trash2, Edit, X, Calendar, Award, GraduationCap, Briefcase, Camera
} from 'lucide-react';
import {
  getProjects, addProject, updateProject, deleteProject,
  getSkills, addSkill, updateSkill, deleteSkill,
  getTimeline, addTimelineItem, deleteTimelineItem,
  verifyPasscode, getSetting, saveSetting
} from '@/lib/api';

interface Project {
  title: string;
  description: string;
  role: string;
  tech: string[];
}

interface Skill {
  name: string;
  category: string;
  level: number;
}

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  type: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Core portfolio lists states
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [activePasscode, setActivePasscode] = useState('');

  // Profile settings states
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [photoMessage, setPhotoMessage] = useState('');

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert("La photo est trop volumineuse. Veuillez choisir une image de moins de 1.5 Mo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setProfileImage(base64);
      setPhotoMessage("Envoi en cours...");
      try {
        await saveSetting('profile_image', base64, activePasscode);
        setPhotoMessage("Photo de profil mise à jour avec succès !");
        localStorage.setItem('portfolio_image_updated', Date.now().toString());
        setTimeout(() => setPhotoMessage(''), 3000);
      } catch (err) {
        console.error(err);
        setPhotoMessage("Erreur lors de la mise à jour.");
      }
    };
    reader.readAsDataURL(file);
  };

  // Real-time server stats
  const [cpu, setCpu] = useState(28);
  const [ram, setRam] = useState(54);

  // Project Form States
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newTech, setNewTech] = useState('');
  const [editingProjectTitle, setEditingProjectTitle] = useState<string | null>(null);

  // Skill Form States
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('backend');
  const [newSkillLevel, setNewSkillLevel] = useState(85);
  const [editingSkillName, setEditingSkillName] = useState<string | null>(null);

  // New Timeline Form States
  const [newTimeYear, setNewTimeYear] = useState('');
  const [newTimeTitle, setNewTimeTitle] = useState('');
  const [newTimeInstitution, setNewTimeInstitution] = useState('');
  const [newTimeDesc, setNewTimeDesc] = useState('');
  const [newTimeType, setNewTimeType] = useState('education');

  // Load initial portfolio data from the API
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projData, skillData, timeData, imgData] = await Promise.all([
          getProjects(),
          getSkills(),
          getTimeline(),
          getSetting('profile_image')
        ]);
        setProjects(projData);
        setSkills(skillData);
        setTimeline(timeData);
        if (imgData) setProfileImage(imgData);
      } catch (err) {
        console.error('Error loading portfolio data:', err);
      }
    };
    loadData();
  }, []);

  // System stats oscillation
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      setCpu(prev => Math.min(95, Math.max(15, prev + Math.floor(Math.random() * 11) - 5)));
      setRam(prev => Math.min(90, Math.max(40, prev + Math.floor(Math.random() * 3) - 1)));
    }, 3000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await verifyPasscode(passcode);
    if (success) {
      setIsAuthenticated(true);
      setAuthError(false);
      setActivePasscode(passcode);
    } else {
      setAuthError(true);
      setPasscode('');
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  // --- PROJECT ACTIONS ---
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newRole) return;

    const newProj = {
      title: newTitle,
      description: newDesc,
      role: newRole,
      tech: newTech.split(',').map(t => t.trim()).filter(Boolean),
      featured: false
    };

    if (editingProjectTitle !== null) {
      // Edit mode
      const updatedProj = await updateProject(editingProjectTitle, newProj, activePasscode);
      setProjects(prev => prev.map(p => p.title === editingProjectTitle ? updatedProj : p));
      setEditingProjectTitle(null);
    } else {
      // Add mode
      const addedProj = await addProject(newProj, activePasscode);
      setProjects(prev => [addedProj, ...prev]);
    }

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewRole('');
    setNewTech('');
  };

  const handleStartEditProject = (proj: Project) => {
    setNewTitle(proj.title);
    setNewDesc(proj.description);
    setNewRole(proj.role);
    setNewTech(proj.tech.join(', '));
    setEditingProjectTitle(proj.title);
  };

  const handleCancelEditProject = () => {
    setNewTitle('');
    setNewDesc('');
    setNewRole('');
    setNewTech('');
    setEditingProjectTitle(null);
  };

  const handleDeleteProject = async (title: string) => {
    await deleteProject(title, activePasscode);
    setProjects(prev => prev.filter(p => p.title !== title));
    if (editingProjectTitle === title) {
      handleCancelEditProject();
    }
  };

  // --- SKILL ACTIONS ---
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName) return;

    const newSkill = {
      name: newSkillName,
      category: newSkillCategory,
      level: newSkillLevel
    };

    if (editingSkillName !== null) {
      // Edit mode
      const updatedSkill = await updateSkill(editingSkillName, newSkill, activePasscode);
      setSkills(prev => prev.map(s => s.name === editingSkillName ? updatedSkill : s));
      setEditingSkillName(null);
    } else {
      // Add mode
      const addedSkill = await addSkill(newSkill, activePasscode);
      setSkills(prev => [addedSkill, ...prev]);
    }

    // Reset Form
    setNewSkillName('');
    setNewSkillLevel(85);
  };

  const handleStartEditSkill = (skill: Skill) => {
    setNewSkillName(skill.name);
    setNewSkillCategory(skill.category);
    setNewSkillLevel(skill.level);
    setEditingSkillName(skill.name);
  };

  const handleCancelEditSkill = () => {
    setNewSkillName('');
    setNewSkillLevel(85);
    setEditingSkillName(null);
  };

  const handleDeleteSkill = async (name: string) => {
    await deleteSkill(name, activePasscode);
    setSkills(prev => prev.filter(s => s.name !== name));
    if (editingSkillName === name) {
      handleCancelEditSkill();
    }
  };

  // --- TIMELINE ACTIONS ---
  const handleAddTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTimeYear || !newTimeTitle || !newTimeInstitution) return;

    const newTime = {
      year: newTimeYear,
      title: newTimeTitle,
      institution: newTimeInstitution,
      description: newTimeDesc,
      type: newTimeType
    };

    const addedItem = await addTimelineItem(newTime, activePasscode);
    setTimeline(prev => [addedItem, ...prev]);
    setNewTimeYear('');
    setNewTimeTitle('');
    setNewTimeInstitution('');
    setNewTimeDesc('');
  };

  const handleDeleteTimeline = async (title: string, institution: string) => {
    await deleteTimelineItem(title, institution, activePasscode);
    setTimeline(prev => prev.filter(t => !(t.title === title && t.institution === institution)));
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-4 h-4 text-sky-400" />;
      case 'certification':
        return <Award className="w-4 h-4 text-indigo-400" />;
      case 'leadership':
        return <Calendar className="w-4 h-4 text-emerald-400" />;
      default:
        return <Briefcase className="w-4 h-4 text-purple-400" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full radial-glow-indigo opacity-20 pointer-events-none"></div>

        <div className="max-w-md w-full p-8 rounded-2xl glass-panel border border-white/5 shadow-2xl relative z-10 space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${authError
                ? 'bg-red-500/10 border-red-500/30 text-red-500'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
              {authError ? <ShieldAlert className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-white font-display">Authentification Portefeuille</h1>
              <p className="text-xs text-slate-400">Terminal d'administration dynamique du Portfolio</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="passcode" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Code d'accès administrateur
              </label>
              <input
                type="password"
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Entrez le code secret..."
                className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-center font-mono text-lg tracking-widest text-white focus:outline-none transition-colors ${authError
                    ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-white/5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                  }`}
                required
              />

            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Valider les identifiants</span>
            </button>
          </form>

          <div className="flex justify-center pt-2">
            <a
              href="/"
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour au site principal
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 p-6 md:p-12 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full radial-glow-indigo opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">Admin Panel Active</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white font-display">Console d'Évolution du Portfolio</h1>
            <p className="text-sm text-slate-400">Ajoutez, modifiez ou supprimez dynamiquement des éléments de vos sections.</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-lg border border-white/5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour au site
            </a>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Stats and Profile Settings Panel */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* Server Performance monitor */}
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Statut CPU</p>
                <h3 className="text-lg font-bold font-mono text-white mt-0.5">{cpu}%</h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Statut RAM</p>
                <h3 className="text-lg font-bold font-mono text-white mt-0.5">{ram}%</h3>
              </div>
            </div>
          </div>

          {/* Profile settings card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider text-slate-400">
              <Camera className="w-4 h-4 text-emerald-400" />
              Configuration du Profil
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-slate-950">
                <img 
                  src={profileImage || "/monProfile.jpeg"} 
                  alt="Aperçu" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Mettre à jour la photo</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload}
                  className="block w-full text-xs text-slate-400 file:mr-2.5 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400 file:cursor-pointer file:transition-colors"
                />
              </div>
            </div>
            {photoMessage && (
              <p className="text-[10px] text-emerald-400 font-semibold transition-all animate-pulse">{photoMessage}</p>
            )}
          </div>
        </div>

        {/* Main Sections Managers Grid */}
        <div className="space-y-12">

          {/* SECTION 1: PROJECTS MANAGER */}
          <div className="grid lg:grid-cols-12 gap-8 items-start border-t border-white/5 pt-8">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                <Network className="w-5 h-5 text-emerald-400" />
                Gestionnaire de Projets ({projects.length})
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-white/5 flex items-start justify-between gap-3 hover:border-white/10 transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{proj.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{proj.description}</p>
                      <span className="inline-block text-[9px] font-mono text-slate-500 uppercase">{proj.role}</span>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleStartEditProject(proj)}
                        className="p-2 text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all cursor-pointer"
                        title="Modifier"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.title)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl glass-panel border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold text-white">
                  {editingProjectTitle !== null ? "Modifier Projet" : "Nouveau Projet"}
                </h3>
                {editingProjectTitle !== null && (
                  <button
                    onClick={handleCancelEditProject}
                    className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-0.5"
                  >
                    <X className="w-3 h-3" /> Annuler
                  </button>
                )}
              </div>
              <form onSubmit={handleAddProject} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Titre</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none"
                    placeholder="API Gateway"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Rôle</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none"
                    placeholder="Développeur Backend"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Description</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    required
                    rows={2}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none resize-none"
                    placeholder="Projet de fin de semestre..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Techs (virgules)</label>
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none"
                    placeholder="Python, Django, Git"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  {editingProjectTitle !== null ? "Enregistrer" : "Ajouter Projet"}
                </button>
              </form>
            </div>
          </div>

          {/* SECTION 2: SKILLS MANAGER */}
          <div className="grid lg:grid-cols-12 gap-8 items-start border-t border-white/5 pt-8">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                Gestionnaire de Compétences ({skills.length})
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{skill.name}</p>
                      <span className="text-[9px] text-slate-500 uppercase">{skill.category} ({skill.level}%)</span>
                    </div>

                    <div className="flex gap-0.5 shrink-0">
                      <button
                        onClick={() => handleStartEditSkill(skill)}
                        className="p-1.5 text-slate-500 hover:text-sky-400 rounded-lg hover:bg-sky-500/10 transition-all cursor-pointer"
                        title="Modifier"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.name)}
                        className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl glass-panel border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold text-white">
                  {editingSkillName !== null ? "Modifier Compétence" : "Nouvelle Compétence"}
                </h3>
                {editingSkillName !== null && (
                  <button
                    onClick={handleCancelEditSkill}
                    className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-0.5"
                  >
                    <X className="w-3 h-3" /> Annuler
                  </button>
                )}
              </div>
              <form onSubmit={handleAddSkill} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Nom</label>
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none"
                    placeholder="Ex: Spring Boot"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Catégorie</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white focus:outline-none"
                  >
                    <option value="backend">Développement & Architectures</option>
                    <option value="networking">Réseaux & Télécoms</option>
                    <option value="security">Sécurité & Administration</option>
                    <option value="tools">Outils & Méthodologies</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold uppercase text-slate-400">
                    <span>Niveau</span>
                    <span>{newSkillLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-900 rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  {editingSkillName !== null ? "Enregistrer" : "Ajouter Compétence"}
                </button>
              </form>
            </div>
          </div>

          {/* SECTION 3: TIMELINE MANAGER */}
          <div className="grid lg:grid-cols-12 gap-8 items-start border-t border-white/5 pt-8 mb-12">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                <Calendar className="w-5 h-5 text-purple-400" />
                Gestionnaire de Parcours ({timeline.length})
              </h2>

              <div className="space-y-3">
                {timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-white/5 flex items-start justify-between gap-3 hover:border-white/10 transition-colors w-full min-w-0"
                  >
                    <div className="flex gap-3 items-start min-w-0 w-full">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                        {getTimelineIcon(item.type)}
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white break-words">{item.title}</h4>
                        <p className="text-[10px] text-slate-300 font-semibold break-words">{item.institution} — <span className="font-mono text-slate-500 text-[9px]">{item.year}</span></p>
                        <p className="text-[10px] text-slate-400 break-words line-clamp-2">{item.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTimeline(item.title, item.institution)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0 cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl glass-panel border border-white/5">
              <h3 className="text-md font-bold text-white mb-4">Nouvel Événement</h3>
              <form onSubmit={handleAddTimeline} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Année / Période</label>
                    <input
                      type="text"
                      value={newTimeYear}
                      onChange={(e) => setNewTimeYear(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none"
                      placeholder="Ex: 2025"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Type</label>
                    <select
                      value={newTimeType}
                      onChange={(e) => setNewTimeType(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white focus:outline-none"
                    >
                      <option value="education">Formation</option>
                      <option value="certification">Certification</option>
                      <option value="experience">Expérience Pro</option>
                      <option value="leadership">Leadership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Intitulé / Titre</label>
                  <input
                    type="text"
                    value={newTimeTitle}
                    onChange={(e) => setNewTimeTitle(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none"
                    placeholder="Ex: Licence 3 DAR"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Établissement / Entreprise</label>
                  <input
                    type="text"
                    value={newTimeInstitution}
                    onChange={(e) => setNewTimeInstitution(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none"
                    placeholder="Ex: UCAK, Touba"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Description</label>
                  <textarea
                    value={newTimeDesc}
                    onChange={(e) => setNewTimeDesc(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none resize-none"
                    placeholder="Description succincte..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Ajouter au Parcours
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

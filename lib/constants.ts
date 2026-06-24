export const PERSONAL_INFO = {
  name: "Mame Bara Samb",
  title: "Développeur Backend & Ingénieur Systèmes/Réseaux",
  subtitle: "Étudiant en L3 Informatique & Télécommunications (DAR)",
  location: "Dakar, Sénégal",
  email: "mamebara.samb@ucak.edu.sn",
  github: "https://github.com/mamebara-samb",
  linkedin: "https://linkedin.com/in/mame-bara-samb",
  cvUrl: "#", // Placeholder for actual CV
  bio: "Passionné par la conception de systèmes distribués, le développement backend robuste et l'administration réseau. Fortement investi dans les technologies d'automatisation, de conteneurisation et l'ingénierie des infrastructures modernes.",
  tagline: "Bâtir des architectures backend performantes et connecter les systèmes de demain.",
  status: "Disponible pour un stage ou une alternance"
};

export const SKILL_CATEGORIES = [
  { id: "backend", name: "Backend & Systèmes" },
  { id: "networking", name: "Réseaux & Infrastructure" },
  { id: "frontend", name: "Frontend & UI" },
  { id: "tools", name: "Outils & DevOps" }
];

export const SKILLS = [
  // Backend
  { name: "Python (Django / FastAPI)", category: "backend", level: 90 },
  { name: "Java (Spring Boot / JEE)", category: "backend", level: 75 },
  { name: "C / C++ (Système)", category: "backend", level: 70 },
  { name: "PostgreSQL / MySQL", category: "backend", level: 85 },
  { name: "Microservices & REST APIs", category: "backend", level: 80 },

  // Networking
  { name: "Routage & Commutation (CCNA)", category: "networking", level: 95 },
  { name: "Protocoles (OSPF, BGP, VLANs, TCP/IP)", category: "networking", level: 90 },
  { name: "Sécurité Réseau & VPN", category: "networking", level: 80 },
  { name: "Wireshark & Analyse de paquets", category: "networking", level: 85 },

  // Frontend
  { name: "React / Next.js", category: "frontend", level: 75 },
  { name: "TypeScript / JavaScript", category: "frontend", level: 80 },
  { name: "Tailwind CSS", category: "frontend", level: 85 },
  { name: "HTML5 / CSS3", category: "frontend", level: 90 },

  // Tools & DevOps
  { name: "Docker & Containerisation", category: "tools", level: 85 },
  { name: "Git & GitHub (CI/CD)", category: "tools", level: 88 },
  { name: "Linux Administration (Debian/Ubuntu)", category: "tools", level: 80 },
  { name: "Ansible / Automatisation", category: "tools", level: 65 }
];

export const PROJECTS = [
  {
    title: "Teranga Market",
    description: "Une plateforme e-commerce multi-vendeurs moderne conçue avec une architecture backend Django robuste et une API REST performante.",
    details: "Développement d'un backend scalable avec Django REST Framework, incluant la gestion complète du panier, un système d'authentification JWT sécurisé, la recherche élastique d'articles, et l'intégration de passerelles de paiement locales. Conteneurisé intégralement avec Docker.",
    tech: ["Python", "Django", "PostgreSQL", "Docker", "JWT", "Redis"],
    role: "Architecte Backend & DevOps",
    github: "https://github.com/mamebara-samb/teranga-market",
    featured: true
  },
  {
    title: "Plateforme SI UCAK",
    description: "Système d'Information centralisé pour la gestion académique des étudiants, des inscriptions et de la facturation.",
    details: "Participation à la conception de la base de données relationnelle et au développement des modules de gestion des notes et de génération automatique de relevés de notes au format PDF. Interface réactive développée sous React.",
    tech: ["Java", "Spring Boot", "React", "MySQL", "Tailwind CSS"],
    role: "Développeur Fullstack",
    github: "https://github.com/mamebara-samb/si-ucak",
    featured: true
  },
  {
    title: "Simulateur de Routage Dynamique",
    description: "Projet de modélisation réseau implémentant un protocole de routage à vecteur de distance simplifié en Python.",
    details: "Création d'une application de simulation visuelle démontrant la convergence de tables de routage, la détection de pannes de liens, et l'évitement de boucles de routage (Split Horizon & Poison Reverse).",
    tech: ["Python", "Socket Programming", "Cisco Packet Tracer", "CCNA principles"],
    role: "Développeur Unique & Ingénieur Réseau",
    github: "https://github.com/mamebara-samb/routing-simulator",
    featured: false
  },
  {
    title: "Infrastructure Réseau Campus Sécurisée",
    description: "Conception et simulation complète d'un réseau d'entreprise multi-bâtiments sous Cisco Packet Tracer.",
    details: "Mise en œuvre d'une architecture hiérarchique à 3 couches (Accès, Distribution, Cœur). Configuration du routage inter-VLAN (ROAS), des protocoles de redondance HSRP, de la sécurité des ports (Port Security), et de listes de contrôle d'accès (ACL) restrictives.",
    tech: ["Routing & Switching", "HSRP", "ACLs", "VLANs", "CCNA"],
    role: "Ingénieur Réseau",
    github: "https://github.com/mamebara-samb/secure-campus-network",
    featured: false
  }
];

export const TIMELINE = [
  {
    year: "2025 - 2026",
    title: "L3 Informatique & Télécommunications",
    institution: "Université Catholique de l'Afrique de l'Ouest (UCAO-UCAK)",
    description: "Spécialisation DAR (Développement d'Applications Réparties). Étude approfondie des systèmes distribués, du middleware, du développement web d'entreprise, des bases de données avancées et de la sécurité des réseaux.",
    type: "education"
  },
  {
    year: "2025",
    title: "Certification Cisco CCNA v7 (Routing & Switching)",
    institution: "Cisco Networking Academy",
    description: "Validation des compétences clés en réseau : configuration avancée de routeurs et commutateurs, protocoles de routage dynamique (OSPF), sécurité réseau de base, adressage IPv4/IPv6, et notions de programmabilité réseau.",
    type: "certification"
  },
  {
    year: "2023 - 2025",
    title: "Licence 1 & 2 Informatique",
    institution: "Université Catholique de l'Afrique de l'Ouest (UCAO-UCAK)",
    description: "Bases algorithmiques, programmation structurée (C, Java), administration Linux, architecture des ordinateurs et modélisation relationnelle (UML, SQL).",
    type: "education"
  }
];

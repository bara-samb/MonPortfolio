export const PERSONAL_INFO = {
  name: "Mame Bara Samb",
  title: "Développeur d'Applications Réparties",
  subtitle: "Étudiant en L3 Informatique & Télécommunications (DAR)",
  location: "Touba, Sénégal",
  email: "maambaara56@gmail.com",
  github: "https://github.com/bara-samb",
  linkedin: "https://www.linkedin.com/in/mame-bara-samb-76a415291/",
  whatsapp: "https://wa.me/221780171688",
  cvUrl: "/CV_Mame-Bara-Samb.pdf",
  bio: "Étudiant en Licence 3 Informatique et Télécommunications à l'UCAK, passionné par les systèmes distribués, les architectures middleware, la cybersécurité et le développement d'applications. Expérience acquise à travers des projets d'envergure, des hackathons nationaux et des certifications.",
  tagline: "Concevoir des architectures applicatives performantes et sécuriser les échanges distribués.",
  status: "Disponible pour un stage de fin d'études / Alternance"
};

export const SKILL_CATEGORIES = [
  { id: "backend", name: "Développement & Architectures" },
  { id: "networking", name: "Réseaux & Télécoms" },
  { id: "security", name: "Sécurité & Administration" },
  {
    id: "tools", name: "Outils & Méthodologies"
  }
];

export const SKILLS = [
  // Développement
  { name: "Python (Django)", category: "backend", level: 90 },
  { name: "Java EE / Spring Boot", category: "backend", level: 80 },
  { name: "JavaScript / React", category: "backend", level: 82 },
  { name: "PHP / MySQL", category: "backend", level: 75 },

  // Réseaux
  { name: "CCNA / Routage OSPF", category: "networking", level: 90 },
  { name: "Gestion VLAN & Subnetting", category: "networking", level: 85 },
  { name: "Cisco Packet Tracer", category: "networking", level: 90 },
  { name: "Wireshark (Analyse de trafic)", category: "networking", level: 80 },

  // Sécurité
  { name: "Cryptographie & PKI", category: "security", level: 82 },
  { name: "GnuPG / Kleopatra", category: "security", level: 75 },
  { name: "Administration Linux", category: "security", level: 80 },

  // Outils
  { name: "Git / GitHub", category: "tools", level: 88 },
  { name: "Docker", category: "tools", level: 80 },
  { name: "UML / Merise", category: "tools", level: 85 },
  { name: "Méthodes Agiles", category: "tools", level: 78 }
];

export const PROJECTS = [
  {
    title: "Teranga Market (GovaThon)",
    description: "Développement du backend avec Django (Python) et modélisation complète des structures de données. Projet demi-finaliste du GovaThon 2025.",
    tech: ["Python", "Django", "PostgreSQL", "Git"],
    role: "Développeur Full-Stack",
    github: "https://github.com/mamebara-samb/teranga-market",
    featured: true
  },
  {
    title: "Site Officiel Club MET",
    description: "Conception, développement et déploiement du site officiel du Club MET en React. Gestion des projets techniques et coordination d'équipe.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Git"],
    role: "Développeur Web & Gestionnaire",
    github: "https://github.com/mamebara-samb/club-met-website",
    featured: true
  },
  {
    title: "Plateforme SI UCAK",
    description: "Développement de la plateforme de gestion du Système d'Information global de l'Université (UCAK) lors du Bootcamp MURID PRO.",
    tech: ["React", "Tailwind CSS", "Node.js", "MySQL"],
    role: "Développeur (Participant)",
    github: "https://github.com/mamebara-samb/si-ucak",
    featured: true
  },
  {
    title: "Health AIProduct (DOCSEN)",
    description: "Conception et développement d'un projet d'intelligence artificielle médicale lors du Hackathon DOCSEN 2025.",
    tech: ["Python", "Machine Learning", "AI API"],
    role: "Développeur IA",
    github: "https://github.com/mamebara-samb/health-ai",
    featured: false
  },
  {
    title: "Leunkeule Touba (Sonatel)",
    description: "Projet d'Agritech innovant conçu et développé pour moderniser l'agriculture locale lors du Hackathon Sonatel 2025.",
    tech: ["Python", "IoT", "Django"],
    role: "Développeur",
    github: "https://github.com/mamebara-samb/leunkeule-touba",
    featured: false
  }
];

export const TIMELINE = [
  {
    year: "2026",
    title: "Président du Club MET",
    institution: "Club MET (UCAK)",
    description: "Management général, pilotage de projets technologiques, animation de la communauté et gestion du budget.",
    type: "leadership"
  },
  {
    year: "2025 - 2026",
    title: "Licence 3 Informatique et Télécommunications (DAR)",
    institution: "Université Cheikhe Ahmadoul Khadim (UCAK), Touba",
    description: "Spécialisation en Développement d'Applications Réparties. Systèmes distribués, middleware, sécurité et réseaux.",
    type: "education"
  },
  {
    year: "2025",
    title: "Certification Cisco CCNA",
    institution: "Cisco Networking Academy",
    description: "Validation des compétences clés en routage, commutation et configuration d'infrastructures réseaux.",
    type: "certification"
  },
  {
    year: "2025",
    title: "Stagiaire Informatique et Télécoms",
    institution: "École Polytechnique de Thiès (EPT)",
    description: "Implication technique et administration système au sein du Centre de Ressources Informatiques (CRI).",
    type: "experience"
  },
  {
    year: "2025",
    title: "Secrétaire Général du Club MET",
    institution: "Club MET (UCAK)",
    description: "Coordination et gestion administrative de la vie associative et des activités technologiques.",
    type: "leadership"
  },
  {
    year: "2024 - 2025",
    title: "Licence 2 Informatique et Télécommunications",
    institution: "Université Cheikhe Ahmadoul Khadim (UCAK), Touba",
    description: "Bases réseaux, développement orienté objet, bases de données relationnelles et administration système Linux.",
    type: "education"
  },
  {
    year: "2023 - 2024",
    title: "Licence 1 Mathématiques et Informatique",
    institution: "Université Iba Der Thiam (UIDT), Thiès",
    description: "Algorithmique, structures de données fondamentales, bases de programmation (C) et mathématiques générales.",
    type: "education"
  },
  {
    year: "2022",
    title: "Baccalauréat Scientifique",
    institution: "Lycée de Mbacké, Mbacké",
    description: "Diplôme de fin d'études secondaires, spécialisation scientifique.",
    type: "education"
  }
];

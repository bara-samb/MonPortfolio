export const PERSONAL_INFO = {
  name: "Mame Bara Samb",
  title: "Développeur d'Applications Réparties & Systèmes Distribués",
  subtitle: "Étudiant en L3 Informatique & Télécommunications (DAR)",
  location: "Touba, Sénégal",
  email: "maambaara56@gmail.com",
  github: "https://github.com/bara-samb",
  linkedin: "https://www.linkedin.com/in/mame-bara-samb-76a415291/",
  whatsapp: "https://wa.me/221780171688",
  cvUrl: "/CV_Mame-Bara-Samb.pdf",
  bio: "Étudiant en Licence 3 Informatique et Télécommunications (spécialité DAR) à l'Université Cheikh Ahmadoul Khadim (UCAK), passionné par les systèmes distribués, les architectures microservices, l'intelligence artificielle et la cybersécurité. Expérience confirmée à travers des projets individuels et d'équipe, des hackathons nationaux récompensés et des certifications.",
  tagline: "Concevoir des architectures distribuées performantes, sécuriser les échanges et créer des solutions logicielles à fort impact.",
  status: "Disponible pour un stage de fin d'études / Alternance"
};

export const SKILL_CATEGORIES = [
  { id: "backend", name: "Développement & Architectures" },
  { id: "ai", name: "IA & Machine Learning" },
  { id: "networking", name: "Réseaux & Télécoms" },
  { id: "security", name: "Sécurité & Administration" },
  { id: "tools", name: "DevOps & Méthodologies" }
];

export const SKILLS = [
  // Développement & Architectures
  { name: "Python (FastAPI / Django)", category: "backend", level: 90 },
  { name: "Java (Quarkus / Spring / JPA)", category: "backend", level: 85 },
  { name: "Node.js / Express (Microservices)", category: "backend", level: 88 },
  { name: "TypeScript / React / Next.js", category: "backend", level: 85 },
  { name: "Flutter / Dart (Mobile)", category: "backend", level: 80 },
  { name: "PHP / MySQL", category: "backend", level: 78 },

  // IA & Machine Learning
  { name: "XGBoost & Random Forest", category: "ai", level: 85 },
  { name: "Scikit-Learn & Pandas", category: "ai", level: 88 },
  { name: "APIs IA & LLM Integration", category: "ai", level: 82 },

  // Réseaux
  { name: "CCNA / Routage OSPF", category: "networking", level: 90 },
  { name: "Gestion VLAN & Subnetting", category: "networking", level: 85 },
  { name: "Cisco Packet Tracer", category: "networking", level: 90 },
  { name: "Wireshark (Analyse de trafic)", category: "networking", level: 80 },

  // Sécurité
  { name: "Cryptographie & PKI", category: "security", level: 82 },
  { name: "GnuPG / Kleopatra", category: "security", level: 75 },
  { name: "Administration Linux", category: "security", level: 82 },

  // Outils & DevOps
  { name: "Git / GitHub", category: "tools", level: 90 },
  { name: "Docker & Conteneurs", category: "tools", level: 82 },
  { name: "Prometheus & Grafana", category: "tools", level: 80 },
  { name: "UML / Merise", category: "tools", level: 85 },
  { name: "Méthodes Agiles (Scrum)", category: "tools", level: 80 }
];

export interface ProjectItem {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  role: string;
  type: "Individuel" | "Collectif";
  category: "all" | "ai" | "backend" | "web" | "mobile";
  github: string;
  demo?: string;
  featured: boolean;
}

export const PROJECTS: ProjectItem[] = [
  // --- PROJETS PHARES & COLLECTIFS ---
  {
    id: "mealprep",
    title: "MealPrep Teranga - Assistant Nutritionnel Connecté",
    description: "Application mobile et web d'assistance nutritionnelle intelligente adaptée aux recettes sénégalaises. Planification de repas équilibrés, génération automatique de courses et monitoring en temps réel avec Prometheus et Grafana.",
    tech: ["Flutter", "Dart", "Node.js", "Prometheus", "Grafana", "Docker"],
    role: "Développeur Mobile & DevOps",
    type: "Individuel",
    category: "mobile",
    github: "https://github.com/bara-samb/mealPrep",
    featured: true
  },
  {
    id: "tp-microservices",
    title: "Plateforme Distribuée de Gestion des Évaluations",
    description: "Architecture distribuée en microservices pour la gestion complète d'évaluations universitaires : banque de questions, examens en ligne, correction automatisée et manuelle, et publication sécurisée des résultats.",
    tech: ["Node.js", "Express", "Microservices", "Docker", "JWT", "MongoDB"],
    role: "Architecte Microservices & Backend",
    type: "Collectif",
    category: "backend",
    github: "https://github.com/bara-samb/tp-microservices-evaluations",
    featured: true
  },
  {
    id: "boutique-quarkus",
    title: "Boutique E-Commerce Haute Performance (Quarkus)",
    description: "Plateforme e-commerce cloud-native ultra-rapide développée en Java avec Quarkus (Supersonic Subatomic Java) et Hibernate ORM / Panache connectée à MySQL, avec APIs REST modulaires et sécurisées.",
    tech: ["Java", "Quarkus", "Hibernate", "MySQL", "REST API", "Docker"],
    role: "Développeur Java Backend",
    type: "Collectif",
    category: "backend",
    github: "https://github.com/bara-samb/boutique-quarkus-ucak",
    featured: true
  },
  {
    id: "club-cmet",
    title: "Club-MET - Plateforme de Gestion & Rayonnement",
    description: "Conception, développement et déploiement de la plateforme officielle de gestion et rayonnement du Club des Métiers & Technologies de l'UFR MET (UCAK). Gestion des adhésions et vitrine technologique.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Git"],
    role: "Lead Développeur & Président Club MET",
    type: "Collectif",
    category: "web",
    github: "https://github.com/bara-samb/club-cmet",
    featured: true
  },
  {
    id: "teranga-market",
    title: "Teranga Market (Demi-Finaliste GovaThon 2025)",
    description: "Développement du backend avec Django (Python) et modélisation complète des structures de données pour une marketplace solidaire. Projet distingué en demi-finale du hackathon national GovaThon 2025.",
    tech: ["Python", "Django", "PostgreSQL", "REST API", "Git"],
    role: "Développeur Full-Stack",
    type: "Collectif",
    category: "web",
    github: "https://github.com/bara-samb/teranga-market",
    featured: true
  },

  // --- PROJETS PHARES INDIVIDUELS & IA ---
  {
    id: "al-baraka",
    title: "Al Baraka - Le Saint Coran (PWA & Android)",
    description: "Application PWA et mobile pour la lecture et l'écoute du Saint Coran (riwaya Warsh) récité par Serigne Aboul Baraka Mbacké. Lecteur audio intégré, fonctionnement hors-ligne, responsive et performant.",
    tech: ["TypeScript", "React", "PWA", "Tailwind CSS", "Vite"],
    role: "Développeur Full-Stack & Mobile",
    type: "Individuel",
    category: "mobile",
    github: "https://github.com/bara-samb/al-baraka",
    demo: "https://al-baraka-app.pages.dev",
    featured: true
  },
  {
    id: "credit-risk-ai",
    title: "Credit Risk AI - Évaluation du Risque de Crédit",
    description: "Plateforme d'intelligence artificielle pour l'évaluation et la prédiction du risque de crédit basée sur XGBoost et FastAPI. Dashboard de métriques, scoring individuel et analyse historique de dossiers.",
    tech: ["Python", "FastAPI", "XGBoost", "Scikit-Learn", "Jupyter"],
    role: "Développeur IA & Data Scientist",
    type: "Individuel",
    category: "ai",
    github: "https://github.com/bara-samb/credit-Risk-AI",
    featured: true
  },
  {
    id: "fraude-bancaire",
    title: "Détecteur de Fraude Bancaire en Temps Réel",
    description: "Application interactive de scoring et de détection de transactions bancaires frauduleuses en temps réel avec Random Forest. Analyse de comportements anormaux et alertes instantanées.",
    tech: ["Python", "Random Forest", "Scikit-Learn", "Streamlit", "Pandas"],
    role: "Développeur Machine Learning",
    type: "Individuel",
    category: "ai",
    github: "https://github.com/bara-samb/fraude-bancaire",
    featured: true
  },

  // --- AUTRES PROJETS COLLECTIFS / HACKATHONS ---
  {
    id: "billetterie-intelligente",
    title: "Billetterie Intelligente (Microservices & QR Code)",
    description: "Application de billetterie événementielle organisée en microservices avec génération et vérification de QR Codes sécurisés, contrôle d'accès en temps réel et gestion d'abonnements.",
    tech: ["JavaScript", "Node.js", "Microservices", "QR Code API", "Express"],
    role: "Développeur Backend",
    type: "Collectif",
    category: "backend",
    github: "https://github.com/bara-samb/billetterie-intelligente",
    featured: false
  },
  {
    id: "health-ai",
    title: "Health AIProduct (Hackathon DOCSEN 2025)",
    description: "Conception et développement d'une solution d'intelligence artificielle médicale lors du Hackathon DOCSEN 2025 pour l'orientation et l'aide à l'analyse diagnostique.",
    tech: ["Python", "Machine Learning", "FastAPI", "AI API"],
    role: "Développeur IA",
    type: "Collectif",
    category: "ai",
    github: "https://github.com/bara-samb/health-ai",
    featured: false
  },
  {
    id: "leunkeule-touba",
    title: "Leunkeule Touba (Hackathon Sonatel 2025)",
    description: "Projet d'Agritech innovant combinant capteurs IoT et automatisation pour moderniser l'agriculture et l'irrigation locale lors du Hackathon Sonatel 2025.",
    tech: ["Python", "IoT", "Django", "Capteurs Sol"],
    role: "Développeur IoT & Backend",
    type: "Collectif",
    category: "backend",
    github: "https://github.com/bara-samb/leunkeule-touba",
    featured: false
  },
  {
    id: "si-ucak",
    title: "Plateforme SI UCAK (Bootcamp MURID PRO)",
    description: "Développement en équipe de la plateforme de gestion du Système d'Information global de l'Université Cheikh Ahmadoul Khadim lors du Bootcamp MURID PRO.",
    tech: ["React", "Tailwind CSS", "Node.js", "MySQL"],
    role: "Développeur Full-Stack",
    type: "Collectif",
    category: "web",
    github: "https://github.com/bara-samb/si-ucak",
    featured: false
  },

  // --- AUTRES PROJETS INDIVIDUELS & SPÉCIALISÉS ---
  {
    id: "cv-maker-ia",
    title: "CV Maker IA - Créateur Intelligent de CV",
    description: "Application d'assistance par Intelligence Artificielle pour la génération, l'optimisation et la mise en forme de CV attractifs pour les profils technologiques.",
    tech: ["TypeScript", "Next.js", "React", "AI API", "Tailwind CSS"],
    role: "Développeur Full-Stack & IA",
    type: "Individuel",
    category: "ai",
    github: "https://github.com/bara-samb/cv-maker-ia",
    featured: false
  },
  {
    id: "terangaimmo",
    title: "TerangaImmo - Plateforme Immobilière",
    description: "Mise en place d'une application web pour agence immobilière au Sénégal : catalogue d'annonces, gestion administrative des biens et modélisation relationnelle complète.",
    tech: ["PHP", "MySQL", "Apache", "HTML5/CSS3", "JavaScript"],
    role: "Développeur Full-Stack",
    type: "Individuel",
    category: "web",
    github: "https://github.com/bara-samb/TerangaImmo",
    featured: false
  },
  {
    id: "kawsara-business",
    title: "Kawsara Global Business - Site Entreprise",
    description: "Plateforme web commerciale moderne présentant les activités d'import-export, de transport et de services d'une entreprise internationale.",
    tech: ["TypeScript", "React", "Tailwind CSS", "Vite"],
    role: "Développeur Frontend",
    type: "Individuel",
    category: "web",
    github: "https://github.com/bara-samb/kawsara-global-business-",
    featured: false
  },
  {
    id: "iot-backend",
    title: "IoT Backend - Collecte & Télémétrie de Capteurs",
    description: "Architecture backend pour la gestion et l'ingestion de flux télémétriques provenant de capteurs IoT avec persistance des données et contrôleurs REST.",
    tech: ["Node.js", "Express", "IoT Protocols", "MongoDB", "REST API"],
    role: "Développeur Backend",
    type: "Individuel",
    category: "backend",
    github: "https://github.com/bara-samb/iot-backend",
    featured: false
  },
  {
    id: "minibank-jpa",
    title: "MiniBank & Jakarta EE JPA Transactions",
    description: "Application de transactions et de services bancaires implémentant Jakarta EE, JPA / Hibernate, gestion des transactions ACID et persistance relationnelle sécurisée.",
    tech: ["Java", "Jakarta EE", "JPA", "Hibernate", "MySQL"],
    role: "Développeur Java EE",
    type: "Individuel",
    category: "backend",
    github: "https://github.com/bara-samb/minibank",
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
    institution: "Université Cheikh Ahmadoul Khadim (UCAK), Touba",
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
    institution: "Université Cheikh Ahmadoul Khadim (UCAK), Touba",
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

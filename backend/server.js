const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || '1337';
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// Fallback JSON database file paths
const DATA_DIR = path.join(__dirname, 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const SKILLS_FILE = path.join(DATA_DIR, 'skills.json');
const TIMELINE_FILE = path.join(DATA_DIR, 'timeline.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default seed data
const defaultProjects = [
  {
    id: "1",
    title: "Teranga Market (GovaThon)",
    description: "Développement du backend avec Django (Python) et modélisation complète des structures de données. Projet demi-finaliste du GovaThon 2025.",
    tech: ["Python", "Django", "PostgreSQL", "Git"],
    role: "Développeur Full-Stack",
    github: "https://github.com/mamebara-samb/teranga-market",
    featured: true
  },
  {
    id: "2",
    title: "Site Officiel Club MET",
    description: "Conception, développement et déploiement du site officiel du Club MET en React. Gestion des projets techniques et coordination d'équipe.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Git"],
    role: "Développeur Web & Gestionnaire",
    github: "https://github.com/mamebara-samb/club-met-website",
    featured: true
  },
  {
    id: "3",
    title: "Plateforme SI UCAK",
    description: "Développement de la plateforme de gestion du Système d'Information global de l'Université (UCAK) lors du Bootcamp MURID PRO.",
    tech: ["React", "Tailwind CSS", "Node.js", "MySQL"],
    role: "Développeur (Participant)",
    github: "https://github.com/mamebara-samb/si-ucak",
    featured: true
  },
  {
    id: "4",
    title: "Health AIProduct (DOCSEN)",
    description: "Conception et développement d'un projet d'intelligence artificielle médicale lors du Hackathon DOCSEN 2025.",
    tech: ["Python", "Machine Learning", "AI API"],
    role: "Développeur IA",
    github: "https://github.com/mamebara-samb/health-ai",
    featured: false
  },
  {
    id: "5",
    title: "Leunkeule Touba (Sonatel)",
    description: "Projet d'Agritech innovant conçu et développé pour moderniser l'agriculture locale lors du Hackathon Sonatel 2025.",
    tech: ["Python", "IoT", "Django"],
    role: "Développeur",
    github: "https://github.com/mamebara-samb/leunkeule-touba",
    featured: false
  }
];

const defaultSkills = [
  { id: "1", name: "Python (Django)", category: "backend", level: 90 },
  { id: "2", name: "Java EE / Spring Boot", category: "backend", level: 80 },
  { id: "3", name: "JavaScript / React", category: "backend", level: 82 },
  { id: "4", name: "PHP / MySQL", category: "backend", level: 75 },
  { id: "5", name: "CCNA / Routage OSPF", category: "networking", level: 90 },
  { id: "6", name: "Gestion VLAN & Subnetting", category: "networking", level: 85 },
  { id: "7", name: "Cisco Packet Tracer", category: "networking", level: 90 },
  { id: "8", name: "Wireshark (Analyse de trafic)", category: "networking", level: 80 },
  { id: "9", name: "Cryptographie & PKI", category: "security", level: 82 },
  { id: "10", name: "GnuPG / Kleopatra", category: "security", level: 75 },
  { id: "11", name: "Administration Linux", category: "security", level: 80 },
  { id: "12", name: "Git / GitHub", category: "tools", level: 88 },
  { id: "13", name: "Docker", category: "tools", level: 80 },
  { id: "14", name: "UML / Merise", category: "tools", level: 85 },
  { id: "15", name: "Méthodes Agiles", category: "tools", level: 78 }
];

const defaultTimeline = [
  {
    id: "1",
    year: "2026",
    title: "Président du Club MET",
    institution: "Club MET (UCAK)",
    description: "Management général, pilotage de projets technologiques, animation de la communauté et gestion du budget.",
    type: "leadership"
  },
  {
    id: "2",
    year: "2025 - 2026",
    title: "Licence 3 Informatique et Télécommunications (DAR)",
    institution: "Université Cheikhe Ahmadoul Khadim (UCAK), Touba",
    description: "Spécialisation en Développement d'Applications Réparties. Systèmes distribués, middleware, sécurité et réseaux.",
    type: "education"
  },
  {
    id: "3",
    year: "2025",
    title: "Certification Cisco CCNA",
    institution: "Cisco Networking Academy",
    description: "Validation des compétences clés en routage, commutation et configuration d'infrastructures réseaux.",
    type: "certification"
  },
  {
    id: "4",
    year: "2025",
    title: "Stagiaire Informatique et Télécoms",
    institution: "École Polytechnique de Thiès (EPT)",
    description: "Implication technique et administration système au sein du Centre de Ressources Informatiques (CRI).",
    type: "experience"
  },
  {
    id: "5",
    year: "2025",
    title: "Secrétaire Général du Club MET",
    institution: "Club MET (UCAK)",
    description: "Coordination et gestion administrative de la vie associative et des activités technologiques.",
    type: "leadership"
  },
  {
    id: "6",
    year: "2024 - 2025",
    title: "Licence 2 Informatique et Télécommunications",
    institution: "Université Cheikhe Ahmadoul Khadim (UCAK), Touba",
    description: "Bases réseaux, développement orienté objet, bases de données relationnelles et administration système Linux.",
    type: "education"
  },
  {
    id: "7",
    year: "2023 - 2024",
    title: "Licence 1 Mathématiques et Informatique",
    institution: "Université Iba Der Thiam (UIDT), Thiès",
    description: "Algorithmique, structures de données fondamentales, bases de programmation (C) et mathématiques générales.",
    type: "education"
  },
  {
    id: "8",
    year: "2022",
    title: "Baccalauréat Scientifique",
    institution: "Lycée de Mbacké, Mbacké",
    description: "Diplôme de fin d'études secondaires, spécialisation scientifique.",
    type: "education"
  }
];

// Helper functions for file-based DB
function readJSON(file, defaults) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.error(`Error reading ${file}, reverting to defaults`, err);
    return defaults;
  }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// MongoDB Schemas & Models
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tech: [String],
  role: String,
  github: String,
  featured: Boolean
});
const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const SkillSchema = new mongoose.Schema({
  name: String,
  category: String,
  level: Number
});
const SkillModel = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

const TimelineSchema = new mongoose.Schema({
  year: String,
  title: String,
  institution: String,
  description: String,
  type: String
});
const TimelineModel = mongoose.models.Timeline || mongoose.model('Timeline', TimelineSchema);

let dbConnected = false;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Successfully connected to MongoDB.');
      dbConnected = true;
      seedMongo();
    })
    .catch(err => {
      console.error('MongoDB connection error, falling back to Local JSON Files:', err);
    });
} else {
  console.log('No MONGODB_URI provided. Running on Local JSON Files storage.');
}

async function seedMongo() {
  try {
    const pCount = await ProjectModel.countDocuments();
    if (pCount === 0) {
      await ProjectModel.insertMany(defaultProjects.map(({id, ...rest}) => rest));
      console.log('Seeded projects in MongoDB.');
    }
    const sCount = await SkillModel.countDocuments();
    if (sCount === 0) {
      await SkillModel.insertMany(defaultSkills.map(({id, ...rest}) => rest));
      console.log('Seeded skills in MongoDB.');
    }
    const tCount = await TimelineModel.countDocuments();
    if (tCount === 0) {
      await TimelineModel.insertMany(defaultTimeline.map(({id, ...rest}) => rest));
      console.log('Seeded timeline in MongoDB.');
    }
  } catch (err) {
    console.error('Error seeding MongoDB:', err);
  }
}

// Authentication Middleware
const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== ADMIN_PASSCODE) {
    return res.status(401).json({ error: 'Accès non autorisé. Code d\'accès incorrect.' });
  }
  next();
};

// Check authentication route
app.post('/api/auth/verify', (req, res) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_PASSCODE) {
    return res.json({ success: true, message: 'Authentifié avec succès.' });
  }
  return res.status(401).json({ success: false, error: 'Code d\'accès incorrect.' });
});

// --- PROJECTS ROUTES ---

app.get('/api/projects', async (req, res) => {
  if (dbConnected) {
    try {
      const items = await ProjectModel.find();
      return res.json(items.map(item => ({ id: item._id.toString(), title: item.title, description: item.description, tech: item.tech, role: item.role, github: item.github, featured: item.featured })));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json(readJSON(PROJECTS_FILE, defaultProjects));
  }
});

app.post('/api/projects', authorize, async (req, res) => {
  const newItem = req.body;
  if (dbConnected) {
    try {
      const item = new ProjectModel(newItem);
      const saved = await item.save();
      return res.status(201).json({ id: saved._id.toString(), ...newItem });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(PROJECTS_FILE, defaultProjects);
    const added = { id: Date.now().toString(), ...newItem };
    list.push(added);
    writeJSON(PROJECTS_FILE, list);
    return res.status(201).json(added);
  }
});

app.put('/api/projects/:id', authorize, async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  if (dbConnected) {
    try {
      const updated = await ProjectModel.findByIdAndUpdate(id, updatedItem, { new: true });
      if (!updated) return res.status(404).json({ error: 'Projet non trouvé.' });
      return res.json({ id: updated._id.toString(), ...updatedItem });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(PROJECTS_FILE, defaultProjects);
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Projet non trouvé.' });
    list[idx] = { id, ...updatedItem };
    writeJSON(PROJECTS_FILE, list);
    return res.json(list[idx]);
  }
});

app.delete('/api/projects/:id', authorize, async (req, res) => {
  const { id } = req.params;
  if (dbConnected) {
    try {
      const deleted = await ProjectModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Projet non trouvé.' });
      return res.json({ message: 'Projet supprimé avec succès.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    let list = readJSON(PROJECTS_FILE, defaultProjects);
    const initialLen = list.length;
    list = list.filter(item => item.id !== id);
    if (list.length === initialLen) return res.status(404).json({ error: 'Projet non trouvé.' });
    writeJSON(PROJECTS_FILE, list);
    return res.json({ message: 'Projet supprimé avec succès.' });
  }
});

// --- SKILLS ROUTES ---

app.get('/api/skills', async (req, res) => {
  if (dbConnected) {
    try {
      const items = await SkillModel.find();
      return res.json(items.map(item => ({ id: item._id.toString(), name: item.name, category: item.category, level: item.level })));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json(readJSON(SKILLS_FILE, defaultSkills));
  }
});

app.post('/api/skills', authorize, async (req, res) => {
  const newItem = req.body;
  if (dbConnected) {
    try {
      const item = new SkillModel(newItem);
      const saved = await item.save();
      return res.status(201).json({ id: saved._id.toString(), ...newItem });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(SKILLS_FILE, defaultSkills);
    const added = { id: Date.now().toString(), ...newItem };
    list.push(added);
    writeJSON(SKILLS_FILE, list);
    return res.status(201).json(added);
  }
});

app.put('/api/skills/:id', authorize, async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  if (dbConnected) {
    try {
      const updated = await SkillModel.findByIdAndUpdate(id, updatedItem, { new: true });
      if (!updated) return res.status(404).json({ error: 'Compétence non trouvée.' });
      return res.json({ id: updated._id.toString(), ...updatedItem });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(SKILLS_FILE, defaultSkills);
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Compétence non trouvée.' });
    list[idx] = { id, ...updatedItem };
    writeJSON(SKILLS_FILE, list);
    return res.json(list[idx]);
  }
});

app.delete('/api/skills/:id', authorize, async (req, res) => {
  const { id } = req.params;
  if (dbConnected) {
    try {
      const deleted = await SkillModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Compétence non trouvée.' });
      return res.json({ message: 'Compétence supprimée avec succès.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    let list = readJSON(SKILLS_FILE, defaultSkills);
    const initialLen = list.length;
    list = list.filter(item => item.id !== id);
    if (list.length === initialLen) return res.status(404).json({ error: 'Compétence non trouvée.' });
    writeJSON(SKILLS_FILE, list);
    return res.json({ message: 'Compétence supprimée avec succès.' });
  }
});

// --- TIMELINE ROUTES ---

app.get('/api/timeline', async (req, res) => {
  if (dbConnected) {
    try {
      const items = await TimelineModel.find();
      return res.json(items.map(item => ({ id: item._id.toString(), year: item.year, title: item.title, institution: item.institution, description: item.description, type: item.type })));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json(readJSON(TIMELINE_FILE, defaultTimeline));
  }
});

app.post('/api/timeline', authorize, async (req, res) => {
  const newItem = req.body;
  if (dbConnected) {
    try {
      const item = new TimelineModel(newItem);
      const saved = await item.save();
      return res.status(201).json({ id: saved._id.toString(), ...newItem });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(TIMELINE_FILE, defaultTimeline);
    const added = { id: Date.now().toString(), ...newItem };
    list.push(added);
    writeJSON(TIMELINE_FILE, list);
    return res.status(201).json(added);
  }
});

app.put('/api/timeline/:id', authorize, async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  if (dbConnected) {
    try {
      const updated = await TimelineModel.findByIdAndUpdate(id, updatedItem, { new: true });
      if (!updated) return res.status(404).json({ error: 'Élément du parcours non trouvé.' });
      return res.json({ id: updated._id.toString(), ...updatedItem });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(TIMELINE_FILE, defaultTimeline);
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Élément du parcours non trouvé.' });
    list[idx] = { id, ...updatedItem };
    writeJSON(TIMELINE_FILE, list);
    return res.json(list[idx]);
  }
});

app.delete('/api/timeline/:id', authorize, async (req, res) => {
  const { id } = req.params;
  if (dbConnected) {
    try {
      const deleted = await TimelineModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Élément du parcours non trouvé.' });
      return res.json({ message: 'Élément du parcours supprimé avec succès.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    let list = readJSON(TIMELINE_FILE, defaultTimeline);
    const initialLen = list.length;
    list = list.filter(item => item.id !== id);
    if (list.length === initialLen) return res.status(404).json({ error: 'Élément du parcours non trouvé.' });
    writeJSON(TIMELINE_FILE, list);
    return res.json({ message: 'Élément du parcours supprimé avec succès.' });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('Mame Bara Samb Portfolio API is running...');
});

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

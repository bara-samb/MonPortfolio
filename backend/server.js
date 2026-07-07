const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSCODE = (process.env.ADMIN_PASSCODE || '1373').trim().replace(/['"]/g, '');

// Detect database configuration
const DATABASE_URL = process.env.DATABASE_URL || process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// Fallback JSON database file paths
const DATA_DIR = path.join(__dirname, 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const SKILLS_FILE = path.join(DATA_DIR, 'skills.json');
const TIMELINE_FILE = path.join(DATA_DIR, 'timeline.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default seed data
const defaultProjects = [
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

const defaultSkills = [
  { name: "Python (Django)", category: "backend", level: 90 },
  { name: "Java EE / Spring Boot", category: "backend", level: 80 },
  { name: "JavaScript / React", category: "backend", level: 82 },
  { name: "PHP / MySQL", category: "backend", level: 75 },
  { name: "CCNA / Routage OSPF", category: "networking", level: 90 },
  { name: "Gestion VLAN & Subnetting", category: "networking", level: 85 },
  { name: "Cisco Packet Tracer", category: "networking", level: 90 },
  { name: "Wireshark (Analyse de trafic)", category: "networking", level: 80 },
  { name: "Cryptographie & PKI", category: "security", level: 82 },
  { name: "GnuPG / Kleopatra", category: "security", level: 75 },
  { name: "Administration Linux", category: "security", level: 80 },
  { name: "Git / GitHub", category: "tools", level: 88 },
  { name: "Docker", category: "tools", level: 80 },
  { name: "UML / Merise", category: "tools", level: 85 },
  { name: "Méthodes Agiles", category: "tools", level: 78 }
];

const defaultTimeline = [
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

// Helper functions for file-based DB
function readJSON(file, defaults) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaults.map((d, i) => ({ id: (i + 1).toString(), ...d })), null, 2));
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

// Database Connection Orchestration
let dbType = 'none'; // 'postgres' | 'mongodb' | 'none'
let pgPool = null;

// Initialize Mongoose model templates anyway so they compile cleanly
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

const SettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String
});
const SettingsModel = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

if (DATABASE_URL) {
  if (DATABASE_URL.startsWith('postgres://') || DATABASE_URL.startsWith('postgresql://')) {
    dbType = 'postgres';
    console.log('PostgreSQL database URL detected. Connecting...');
    pgPool = new Pool({
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false // Required for Render SSL
      }
    });

    initPostgres()
      .then(() => console.log('Successfully connected and initialized PostgreSQL.'))
      .catch(err => {
        console.error('PostgreSQL connection error, falling back to Local JSON Files:', err);
        dbType = 'none';
      });

  } else if (DATABASE_URL.startsWith('mongodb://') || DATABASE_URL.startsWith('mongodb+srv://')) {
    dbType = 'mongodb';
    console.log('MongoDB connection URL detected. Connecting...');
    mongoose.connect(DATABASE_URL)
      .then(() => {
        console.log('Successfully connected to MongoDB.');
        seedMongo();
      })
      .catch(err => {
        console.error('MongoDB connection error, falling back to Local JSON Files:', err);
        dbType = 'none';
      });
  } else {
    console.log('Unrecognized database protocol. Running on Local JSON Files storage.');
  }
} else {
  console.log('No DATABASE_URL or MONGODB_URI provided. Running on Local JSON Files storage.');
}

// --- POSTGRES DB INITIALIZATION & SEED ---
async function initPostgres() {
  const client = await pgPool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT,
        description TEXT,
        tech TEXT,
        role TEXT,
        github TEXT,
        featured BOOLEAN
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name TEXT,
        category TEXT,
        level INTEGER
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS timeline (
        id SERIAL PRIMARY KEY,
        year TEXT,
        title TEXT,
        institution TEXT,
        description TEXT,
        type TEXT
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `);
    
    // Seed Projects
    const pCountRes = await client.query('SELECT COUNT(*) FROM projects');
    if (parseInt(pCountRes.rows[0].count, 10) === 0) {
      for (const p of defaultProjects) {
        await client.query(
          'INSERT INTO projects (title, description, tech, role, github, featured) VALUES ($1, $2, $3, $4, $5, $6)',
          [p.title, p.description, JSON.stringify(p.tech), p.role, p.github, p.featured]
        );
      }
      console.log('Seeded projects in PostgreSQL.');
    }

    // Seed Skills
    const sCountRes = await client.query('SELECT COUNT(*) FROM skills');
    if (parseInt(sCountRes.rows[0].count, 10) === 0) {
      for (const s of defaultSkills) {
        await client.query(
          'INSERT INTO skills (name, category, level) VALUES ($1, $2, $3)',
          [s.name, s.category, s.level]
        );
      }
      console.log('Seeded skills in PostgreSQL.');
    }

    // Seed Timeline
    const tCountRes = await client.query('SELECT COUNT(*) FROM timeline');
    if (parseInt(tCountRes.rows[0].count, 10) === 0) {
      for (const t of defaultTimeline) {
        await client.query(
          'INSERT INTO timeline (year, title, institution, description, type) VALUES ($1, $2, $3, $4, $5)',
          [t.year, t.title, t.institution, t.description, t.type]
        );
      }
      console.log('Seeded timeline in PostgreSQL.');
    }
  } finally {
    client.release();
  }
}

// --- MONGODB SEED ---
async function seedMongo() {
  try {
    const pCount = await ProjectModel.countDocuments();
    if (pCount === 0) {
      await ProjectModel.insertMany(defaultProjects);
      console.log('Seeded projects in MongoDB.');
    }
    const sCount = await SkillModel.countDocuments();
    if (sCount === 0) {
      await SkillModel.insertMany(defaultSkills);
      console.log('Seeded skills in MongoDB.');
    }
    const tCount = await TimelineModel.countDocuments();
    if (tCount === 0) {
      await TimelineModel.insertMany(defaultTimeline);
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
  if (dbType === 'postgres') {
    try {
      const resDb = await pgPool.query('SELECT * FROM projects ORDER BY id DESC');
      return res.json(resDb.rows.map(row => ({
        id: row.id.toString(),
        title: row.title,
        description: row.description,
        tech: JSON.parse(row.tech || '[]'),
        role: row.role,
        github: row.github,
        featured: row.featured
      })));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const items = await ProjectModel.find().sort({ _id: -1 });
      return res.json(items.map(item => ({
        id: item._id.toString(),
        title: item.title,
        description: item.description,
        tech: item.tech,
        role: item.role,
        github: item.github,
        featured: item.featured
      })));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json(readJSON(PROJECTS_FILE, defaultProjects));
  }
});

app.post('/api/projects', authorize, async (req, res) => {
  const { title, description, tech, role, github, featured } = req.body;
  if (dbType === 'postgres') {
    try {
      const insertRes = await pgPool.query(
        'INSERT INTO projects (title, description, tech, role, github, featured) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [title, description, JSON.stringify(tech || []), role, github, featured || false]
      );
      return res.status(201).json({ id: insertRes.rows[0].id.toString(), title, description, tech, role, github, featured });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const item = new ProjectModel({ title, description, tech, role, github, featured });
      const saved = await item.save();
      return res.status(201).json({ id: saved._id.toString(), title, description, tech, role, github, featured });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(PROJECTS_FILE, defaultProjects);
    const added = { id: Date.now().toString(), title, description, tech, role, github, featured };
    list.unshift(added);
    writeJSON(PROJECTS_FILE, list);
    return res.status(201).json(added);
  }
});

app.put('/api/projects/:id', authorize, async (req, res) => {
  const { id } = req.params;
  const { title, description, tech, role, github, featured } = req.body;
  if (dbType === 'postgres') {
    try {
      const updateRes = await pgPool.query(
        'UPDATE projects SET title = $1, description = $2, tech = $3, role = $4, github = $5, featured = $6 WHERE id = $7 RETURNING *',
        [title, description, JSON.stringify(tech || []), role, github, featured || false, id]
      );
      if (updateRes.rowCount === 0) return res.status(404).json({ error: 'Projet non trouvé.' });
      return res.json({ id, title, description, tech, role, github, featured });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const updated = await ProjectModel.findByIdAndUpdate(id, { title, description, tech, role, github, featured }, { new: true });
      if (!updated) return res.status(404).json({ error: 'Projet non trouvé.' });
      return res.json({ id: updated._id.toString(), title, description, tech, role, github, featured });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(PROJECTS_FILE, defaultProjects);
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Projet non trouvé.' });
    list[idx] = { id, title, description, tech, role, github, featured };
    writeJSON(PROJECTS_FILE, list);
    return res.json(list[idx]);
  }
});

app.delete('/api/projects/:id', authorize, async (req, res) => {
  const { id } = req.params;
  if (dbType === 'postgres') {
    try {
      const deleteRes = await pgPool.query('DELETE FROM projects WHERE id = $1', [id]);
      if (deleteRes.rowCount === 0) return res.status(404).json({ error: 'Projet non trouvé.' });
      return res.json({ message: 'Projet supprimé avec succès.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
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
  if (dbType === 'postgres') {
    try {
      const resDb = await pgPool.query('SELECT * FROM skills ORDER BY id ASC');
      return res.json(resDb.rows.map(row => ({
        id: row.id.toString(),
        name: row.name,
        category: row.category,
        level: row.level
      })));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const items = await SkillModel.find();
      return res.json(items.map(item => ({
        id: item._id.toString(),
        name: item.name,
        category: item.category,
        level: item.level
      })));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json(readJSON(SKILLS_FILE, defaultSkills));
  }
});

app.post('/api/skills', authorize, async (req, res) => {
  const { name, category, level } = req.body;
  if (dbType === 'postgres') {
    try {
      const insertRes = await pgPool.query(
        'INSERT INTO skills (name, category, level) VALUES ($1, $2, $3) RETURNING id',
        [name, category, level]
      );
      return res.status(201).json({ id: insertRes.rows[0].id.toString(), name, category, level });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const item = new SkillModel({ name, category, level });
      const saved = await item.save();
      return res.status(201).json({ id: saved._id.toString(), name, category, level });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(SKILLS_FILE, defaultSkills);
    const added = { id: Date.now().toString(), name, category, level };
    list.unshift(added);
    writeJSON(SKILLS_FILE, list);
    return res.status(201).json(added);
  }
});

app.put('/api/skills/:id', authorize, async (req, res) => {
  const { id } = req.params;
  const { name, category, level } = req.body;
  if (dbType === 'postgres') {
    try {
      const updateRes = await pgPool.query(
        'UPDATE skills SET name = $1, category = $2, level = $3 WHERE id = $4 RETURNING *',
        [name, category, level, id]
      );
      if (updateRes.rowCount === 0) return res.status(404).json({ error: 'Compétence non trouvée.' });
      return res.json({ id, name, category, level });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const updated = await SkillModel.findByIdAndUpdate(id, { name, category, level }, { new: true });
      if (!updated) return res.status(404).json({ error: 'Compétence non trouvée.' });
      return res.json({ id: updated._id.toString(), name, category, level });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(SKILLS_FILE, defaultSkills);
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Compétence non trouvée.' });
    list[idx] = { id, name, category, level };
    writeJSON(SKILLS_FILE, list);
    return res.json(list[idx]);
  }
});

app.delete('/api/skills/:id', authorize, async (req, res) => {
  const { id } = req.params;
  if (dbType === 'postgres') {
    try {
      const deleteRes = await pgPool.query('DELETE FROM skills WHERE id = $1', [id]);
      if (deleteRes.rowCount === 0) return res.status(404).json({ error: 'Compétence non trouvée.' });
      return res.json({ message: 'Compétence supprimée avec succès.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
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
  if (dbType === 'postgres') {
    try {
      const resDb = await pgPool.query('SELECT * FROM timeline ORDER BY id DESC');
      return res.json(resDb.rows.map(row => ({
        id: row.id.toString(),
        year: row.year,
        title: row.title,
        institution: row.institution,
        description: row.description,
        type: row.type
      })));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const items = await TimelineModel.find().sort({ _id: -1 });
      return res.json(items.map(item => ({
        id: item._id.toString(),
        year: item.year,
        title: item.title,
        institution: item.institution,
        description: item.description,
        type: item.type
      })));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json(readJSON(TIMELINE_FILE, defaultTimeline));
  }
});

app.post('/api/timeline', authorize, async (req, res) => {
  const { year, title, institution, description, type } = req.body;
  if (dbType === 'postgres') {
    try {
      const insertRes = await pgPool.query(
        'INSERT INTO timeline (year, title, institution, description, type) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [year, title, institution, description, type]
      );
      return res.status(201).json({ id: insertRes.rows[0].id.toString(), year, title, institution, description, type });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const item = new TimelineModel({ year, title, institution, description, type });
      const saved = await item.save();
      return res.status(201).json({ id: saved._id.toString(), year, title, institution, description, type });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(TIMELINE_FILE, defaultTimeline);
    const added = { id: Date.now().toString(), year, title, institution, description, type };
    list.unshift(added);
    writeJSON(TIMELINE_FILE, list);
    return res.status(201).json(added);
  }
});

app.put('/api/timeline/:id', authorize, async (req, res) => {
  const { id } = req.params;
  const { year, title, institution, description, type } = req.body;
  if (dbType === 'postgres') {
    try {
      const updateRes = await pgPool.query(
        'UPDATE timeline SET year = $1, title = $2, institution = $3, description = $4, type = $5 WHERE id = $6 RETURNING *',
        [year, title, institution, description, type, id]
      );
      if (updateRes.rowCount === 0) return res.status(404).json({ error: 'Élément du parcours non trouvé.' });
      return res.json({ id, year, title, institution, description, type });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const updated = await TimelineModel.findByIdAndUpdate(id, { year, title, institution, description, type }, { new: true });
      if (!updated) return res.status(404).json({ error: 'Élément du parcours non trouvé.' });
      return res.json({ id: updated._id.toString(), year, title, institution, description, type });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(TIMELINE_FILE, defaultTimeline);
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Élément du parcours non trouvé.' });
    list[idx] = { id, year, title, institution, description, type };
    writeJSON(TIMELINE_FILE, list);
    return res.json(list[idx]);
  }
});

app.delete('/api/timeline/:id', authorize, async (req, res) => {
  const { id } = req.params;
  if (dbType === 'postgres') {
    try {
      const deleteRes = await pgPool.query('DELETE FROM timeline WHERE id = $1', [id]);
      if (deleteRes.rowCount === 0) return res.status(404).json({ error: 'Élément du parcours non trouvé.' });
      return res.json({ message: 'Élément du parcours supprimé avec succès.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
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

// --- SETTINGS ROUTES ---

app.get('/api/settings/:key', async (req, res) => {
  const { key } = req.params;
  if (dbType === 'postgres') {
    try {
      const resDb = await pgPool.query('SELECT value FROM settings WHERE key = $1', [key]);
      if (resDb.rowCount === 0) return res.json({ key, value: null });
      return res.json({ key, value: resDb.rows[0].value });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      const item = await SettingsModel.findOne({ key });
      return res.json({ key, value: item ? item.value : null });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(SETTINGS_FILE, []);
    const item = list.find(s => s.key === key);
    return res.json({ key, value: item ? item.value : null });
  }
});

app.post('/api/settings', authorize, async (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: 'La clé de configuration est requise.' });
  
  if (dbType === 'postgres') {
    try {
      await pgPool.query(
        'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
        [key, value]
      );
      return res.json({ key, value });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else if (dbType === 'mongodb') {
    try {
      await SettingsModel.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
      return res.json({ key, value });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    const list = readJSON(SETTINGS_FILE, []);
    const idx = list.findIndex(s => s.key === key);
    if (idx !== -1) {
      list[idx].value = value;
    } else {
      list.push({ key, value });
    }
    writeJSON(SETTINGS_FILE, list);
    return res.json({ key, value });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('Mame Bara Samb Portfolio API is running...');
});

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

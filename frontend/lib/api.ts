import { PROJECTS as DEFAULT_PROJECTS, SKILLS as DEFAULT_SKILLS, TIMELINE as DEFAULT_TIMELINE } from './constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Log the active API URL for debugging in production
if (typeof window !== 'undefined') {
  console.log('Portfolio API Client initialized calling:', API_URL);
}

// SSR-safe localStorage helpers
function getStored(key: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

function setStored(key: string, value: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

async function fetchJSON(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP Error ${res.status}`);
  }
  return res.json();
}

// --- PROJECTS ---
export async function getProjects(): Promise<any[]> {
  try {
    return await fetchJSON('/api/projects');
  } catch (err) {
    console.warn('API error fetching projects, loading from localStorage/constants:', err);
    const stored = getStored('portfolio_projects');
    return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
  }
}

export async function addProject(project: any, passcode: string): Promise<any> {
  try {
    return await fetchJSON('/api/projects', {
      method: 'POST',
      headers: { 'Authorization': passcode },
      body: JSON.stringify(project)
    });
  } catch (err) {
    console.warn('API error adding project, using localStorage fallback:', err);
    const stored = getStored('portfolio_projects');
    const list = stored ? JSON.parse(stored) : [...DEFAULT_PROJECTS];
    const newProj = { id: Date.now().toString(), ...project };
    list.unshift(newProj);
    setStored('portfolio_projects', JSON.stringify(list));
    return newProj;
  }
}

export async function updateProject(oldTitle: string, project: any, passcode: string): Promise<any> {
  try {
    const list = await fetchJSON('/api/projects');
    const item = list.find((p: any) => p.title === oldTitle);
    if (!item) throw new Error('Project not found on server.');
    return await fetchJSON(`/api/projects/${item.id}`, {
      method: 'PUT',
      headers: { 'Authorization': passcode },
      body: JSON.stringify(project)
    });
  } catch (err) {
    console.warn('API error updating project, using localStorage fallback:', err);
    const stored = getStored('portfolio_projects');
    let list = stored ? JSON.parse(stored) : [...DEFAULT_PROJECTS];
    list = list.map((p: any) => p.title === oldTitle ? { ...p, ...project } : p);
    setStored('portfolio_projects', JSON.stringify(list));
    return project;
  }
}

export async function deleteProject(title: string, passcode: string): Promise<void> {
  try {
    const list = await fetchJSON('/api/projects');
    const item = list.find((p: any) => p.title === title);
    if (!item) throw new Error('Project not found on server.');
    await fetchJSON(`/api/projects/${item.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': passcode }
    });
  } catch (err) {
    console.warn('API error deleting project, using localStorage fallback:', err);
    const stored = getStored('portfolio_projects');
    let list = stored ? JSON.parse(stored) : [...DEFAULT_PROJECTS];
    list = list.filter((p: any) => p.title !== title);
    setStored('portfolio_projects', JSON.stringify(list));
  }
}

// --- SKILLS ---
export async function getSkills(): Promise<any[]> {
  try {
    return await fetchJSON('/api/skills');
  } catch (err) {
    console.warn('API error fetching skills, loading from localStorage/constants:', err);
    const stored = getStored('portfolio_skills');
    return stored ? JSON.parse(stored) : DEFAULT_SKILLS;
  }
}

export async function addSkill(skill: any, passcode: string): Promise<any> {
  try {
    return await fetchJSON('/api/skills', {
      method: 'POST',
      headers: { 'Authorization': passcode },
      body: JSON.stringify(skill)
    });
  } catch (err) {
    console.warn('API error adding skill, using localStorage fallback:', err);
    const stored = getStored('portfolio_skills');
    const list = stored ? JSON.parse(stored) : [...DEFAULT_SKILLS];
    const newSkill = { id: Date.now().toString(), ...skill };
    list.unshift(newSkill);
    setStored('portfolio_skills', JSON.stringify(list));
    return newSkill;
  }
}

export async function updateSkill(oldName: string, skill: any, passcode: string): Promise<any> {
  try {
    const list = await fetchJSON('/api/skills');
    const item = list.find((s: any) => s.name === oldName);
    if (!item) throw new Error('Skill not found on server.');
    return await fetchJSON(`/api/skills/${item.id}`, {
      method: 'PUT',
      headers: { 'Authorization': passcode },
      body: JSON.stringify(skill)
    });
  } catch (err) {
    console.warn('API error updating skill, using localStorage fallback:', err);
    const stored = getStored('portfolio_skills');
    let list = stored ? JSON.parse(stored) : [...DEFAULT_SKILLS];
    list = list.map((s: any) => s.name === oldName ? { ...s, ...skill } : s);
    setStored('portfolio_skills', JSON.stringify(list));
    return skill;
  }
}

export async function deleteSkill(name: string, passcode: string): Promise<void> {
  try {
    const list = await fetchJSON('/api/skills');
    const item = list.find((s: any) => s.name === name);
    if (!item) throw new Error('Skill not found on server.');
    await fetchJSON(`/api/skills/${item.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': passcode }
    });
  } catch (err) {
    console.warn('API error deleting skill, using localStorage fallback:', err);
    const stored = getStored('portfolio_skills');
    let list = stored ? JSON.parse(stored) : [...DEFAULT_SKILLS];
    list = list.filter((s: any) => s.name !== name);
    setStored('portfolio_skills', JSON.stringify(list));
  }
}

// --- TIMELINE ---
export async function getTimeline(): Promise<any[]> {
  try {
    return await fetchJSON('/api/timeline');
  } catch (err) {
    console.warn('API error fetching timeline, loading from localStorage/constants:', err);
    const stored = getStored('portfolio_timeline');
    return stored ? JSON.parse(stored) : DEFAULT_TIMELINE;
  }
}

export async function addTimelineItem(item: any, passcode: string): Promise<any> {
  try {
    return await fetchJSON('/api/timeline', {
      method: 'POST',
      headers: { 'Authorization': passcode },
      body: JSON.stringify(item)
    });
  } catch (err) {
    console.warn('API error adding timeline item, using localStorage fallback:', err);
    const stored = getStored('portfolio_timeline');
    const list = stored ? JSON.parse(stored) : [...DEFAULT_TIMELINE];
    const newItem = { id: Date.now().toString(), ...item };
    list.unshift(newItem);
    setStored('portfolio_timeline', JSON.stringify(list));
    return newItem;
  }
}

export async function deleteTimelineItem(title: string, institution: string, passcode: string): Promise<void> {
  try {
    const list = await fetchJSON('/api/timeline');
    const item = list.find((t: any) => t.title === title && t.institution === institution);
    if (!item) throw new Error('Timeline item not found on server.');
    await fetchJSON(`/api/timeline/${item.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': passcode }
    });
  } catch (err) {
    console.warn('API error deleting timeline item, using localStorage fallback:', err);
    const stored = getStored('portfolio_timeline');
    let list = stored ? JSON.parse(stored) : [...DEFAULT_TIMELINE];
    list = list.filter((t: any) => !(t.title === title && t.institution === institution));
    setStored('portfolio_timeline', JSON.stringify(list));
  }
}

// --- AUTHENTICATION ---
export async function verifyPasscode(passcode: string): Promise<boolean> {
  try {
    const res = await fetchJSON('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ passcode })
    });
    return res.success === true;
  } catch (err) {
    console.warn('API auth error, checking locally:', err);
    return passcode === '1373' || passcode === 'admin';
  }
}

// --- SETTINGS ---
export async function getSetting(key: string): Promise<string | null> {
  try {
    const res = await fetchJSON(`/api/settings/${key}`);
    return res.value;
  } catch (err) {
    console.warn(`API error fetching setting ${key}:`, err);
    return getStored(`setting_${key}`);
  }
}

export async function saveSetting(key: string, value: string, passcode: string): Promise<void> {
  try {
    await fetchJSON('/api/settings', {
      method: 'POST',
      headers: { 'Authorization': passcode },
      body: JSON.stringify({ key, value })
    });
  } catch (err) {
    console.warn(`API error saving setting ${key}, saving locally:`, err);
    setStored(`setting_${key}`, value);
  }
}

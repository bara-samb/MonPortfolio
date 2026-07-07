"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Network, Cpu, Lock, Unlock, Play, RefreshCw, Power, Terminal, ShieldAlert, ShieldCheck, ArrowRight
} from 'lucide-react';

// Types for Load Balancer Lab
type NodeStatus = 'healthy' | 'offline';
interface MicroserviceNode {
  id: number;
  name: string;
  load: number; // current connection count
  status: NodeStatus;
}

// Types for System Logs
interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'error';
  message: string;
}

export default function EngineeringLabs() {
  const [activeTab, setActiveTab] = useState<'lb' | 'crypto'>('lb');

  // --- LAB 1: LOAD BALANCER STATE ---
  const [nodes, setNodes] = useState<MicroserviceNode[]>([
    { id: 1, name: 'Auth-Service-Node-1', load: 3, status: 'healthy' },
    { id: 2, name: 'Auth-Service-Node-2', load: 1, status: 'healthy' },
    { id: 3, name: 'Auth-Service-Node-3', load: 0, status: 'healthy' },
  ]);
  const [algorithm, setAlgorithm] = useState<'round-robin' | 'least-connections' | 'random'>('round-robin');
  const [rrIndex, setRrIndex] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '16:45:00', type: 'info', message: 'Système initialisé. Passerelle API prête.' }
  ]);
  const [activeRequestNode, setActiveRequestNode] = useState<number | null>(null);
  const [packetPosition, setPacketPosition] = useState<number | null>(null);

  const addLog = (message: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ timestamp: time, type, message }, ...prev.slice(0, 19)]);
  };

  const toggleNode = (id: number) => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        const newStatus = n.status === 'healthy' ? 'offline' : 'healthy';
        addLog(`Le nœud ${n.name} est maintenant ${newStatus === 'healthy' ? 'ACTIF' : 'HORS LIGNE'}`, newStatus === 'healthy' ? 'success' : 'warn');
        return { ...n, status: newStatus, load: newStatus === 'healthy' ? 0 : 0 };
      }
      return n;
    }));
  };

  const dispatchRequest = () => {
    // Check if at least one node is healthy
    const healthyNodes = nodes.filter(n => n.status === 'healthy');
    if (healthyNodes.length === 0) {
      addLog(`[Gateway] Échec de routage. Circuit Breaker activé : aucun nœud disponible (503 Service Unavailable)`, 'error');
      return;
    }

    let targetNode: MicroserviceNode = healthyNodes[0];

    if (algorithm === 'round-robin') {
      // Find next healthy node starting from rrIndex
      let nextIndex = rrIndex;
      let found = false;
      for (let i = 0; i < nodes.length; i++) {
        const checkIdx = (nextIndex + i) % nodes.length;
        if (nodes[checkIdx].status === 'healthy') {
          targetNode = nodes[checkIdx];
          setRrIndex((checkIdx + 1) % nodes.length);
          found = true;
          break;
        }
      }
      if (!found) return; // Fallback
    } else if (algorithm === 'least-connections') {
      // Pick healthy node with lowest load
      targetNode = healthyNodes.reduce((min, node) => node.load < min.load ? node : min, healthyNodes[0]);
    } else {
      // Random healthy node
      const randIdx = Math.floor(Math.random() * healthyNodes.length);
      targetNode = healthyNodes[randIdx];
    }

    // Trigger visual animation
    setPacketPosition(targetNode.id);
    setActiveRequestNode(targetNode.id);
    addLog(`[Gateway] Requête HTTP acheminée vers ${targetNode.name} (${algorithm})`, 'info');

    // Simulate connection increment
    setNodes(prev => prev.map(n => {
      if (n.id === targetNode.id) return { ...n, load: n.load + 1 };
      return n;
    }));

    setTimeout(() => {
      addLog(`[${targetNode.name}] Traitement terminé. HTTP 200 OK en 14ms`, 'success');
      // Decrement load
      setNodes(prev => prev.map(n => {
        if (n.id === targetNode.id) return { ...n, load: Math.max(0, n.load - 1) };
        return n;
      }));
      setPacketPosition(null);
      setActiveRequestNode(null);
    }, 900);
  };

  // --- LAB 2: DIFFIE-HELLMAN CRYPTO PLAYGROUND ---
  const [dhPrime, setDhPrime] = useState<number>(23); // public base prime p
  const [dhGenerator, setDhGenerator] = useState<number>(5); // public base generator g
  const [aliceSecret, setAliceSecret] = useState<number>(6); // Alice's secret key a
  const [bobSecret, setBobSecret] = useState<number>(15); // Bob's secret key b

  // Calculate public keys
  // A = (g^a) mod p
  const calculateModPow = (base: number, exp: number, mod: number) => {
    let res = 1;
    let b = base % mod;
    let e = exp;
    while (e > 0) {
      if (e % 2 === 1) res = (res * b) % mod;
      b = (b * b) % mod;
      e = Math.floor(e / 2);
    }
    return res;
  };

  const alicePublic = calculateModPow(dhGenerator, aliceSecret, dhPrime);
  const bobPublic = calculateModPow(dhGenerator, bobSecret, dhPrime);

  // Shared secret
  const aliceShared = calculateModPow(bobPublic, aliceSecret, dhPrime);
  const bobShared = calculateModPow(alicePublic, bobSecret, dhPrime);

  return (
    <section id="labs" className="py-24 px-6 relative bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 -translate-x-1/2 w-[350px] h-[350px] rounded-full radial-glow z-0 pointer-events-none opacity-20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Laboratoires <span className="text-emerald-400">Interactifs</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-sky-500 mx-auto mb-6"></div>
          <p className="text-slate-400">
            Démonstrations visuelles et interactives de mes spécialités : la gestion des architectures distribuées et les concepts de cryptographie réseau.
          </p>
        </div>

        {/* Lab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="p-1 rounded-xl bg-white/5 border border-white/5 flex gap-2">
            <button
              onClick={() => setActiveTab('lb')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'lb'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Network className="w-4 h-4" />
              Répartiteur de Charge (Load Balancer)
            </button>
            <button
              onClick={() => setActiveTab('crypto')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'crypto'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" />
              Échange de clés Diffie-Hellman
            </button>
          </div>
        </div>

        {/* Tab 1: Load Balancer Lab */}
        {activeTab === 'lb' && (
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual Simulator Canvas */}
            <div className="lg:col-span-8 p-8 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between relative min-h-[500px]">
              
              {/* Lab Header Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
                <div>
                  <h3 className="text-lg font-bold text-white">Topologie Réseau Microservices</h3>
                  <p className="text-xs text-slate-400 mt-1">Simulez la tolérance aux pannes (Failover) et la répartition de trafic.</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as any)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="round-robin">Algorithme: Round Robin</option>
                    <option value="least-connections">Algorithme: Least Connections</option>
                    <option value="random">Algorithme: Random (Aléatoire)</option>
                  </select>

                  <button
                    onClick={dispatchRequest}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs shadow-md transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Envoyer Requête
                  </button>
                </div>
              </div>

              {/* Topology Diagram (SVG + HTML overlay) */}
              <div className="flex-1 flex items-center justify-center py-10 relative">
                {/* SVG Connecting Wires */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '300px' }}>
                  {/* Lines from Gateway to Service Nodes */}
                  <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2">
                    <line x1="15%" y1="50%" x2="50%" y2="20%" id="wire-1" />
                    <line x1="15%" y1="50%" x2="50%" y2="50%" id="wire-2" />
                    <line x1="15%" y1="50%" x2="50%" y2="80%" id="wire-3" />
                  </g>

                  {/* Active flow highlights */}
                  {packetPosition === 1 && (
                    <circle cx="0" cy="0" r="5" fill="#10b981" className="shadow-lg">
                      <animateMotion path="M 120 170 L 400 68" dur="0.9s" repeatCount="1" fill="freeze" />
                    </circle>
                  )}
                  {packetPosition === 2 && (
                    <circle cx="0" cy="0" r="5" fill="#10b981" className="shadow-lg">
                      <animateMotion path="M 120 170 L 400 170" dur="0.9s" repeatCount="1" fill="freeze" />
                    </circle>
                  )}
                  {packetPosition === 3 && (
                    <circle cx="0" cy="0" r="5" fill="#10b981" className="shadow-lg">
                      <animateMotion path="M 120 170 L 400 272" dur="0.9s" repeatCount="1" fill="freeze" />
                    </circle>
                  )}
                </svg>

                {/* Node layout */}
                <div className="w-full flex items-center justify-between px-6 md:px-12 z-10">
                  
                  {/* Client & Gateway Node */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-emerald-500/30 flex flex-col items-center justify-center shadow-lg relative group">
                      <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl animate-pulse"></div>
                      <Network className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-white">API Gateway</p>
                      <span className="text-[10px] text-slate-500 font-mono">localhost:8080</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <ArrowRight className="w-6 h-6 text-slate-700 animate-pulse" />
                  </div>

                  {/* Microservices Nodes */}
                  <div className="flex flex-col space-y-6 w-[220px] md:w-[260px]">
                    {nodes.map((node) => {
                      const isOffline = node.status === 'offline';
                      const isActive = activeRequestNode === node.id;
                      return (
                        <div
                          key={node.id}
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            isOffline 
                              ? 'bg-slate-950/40 border-red-500/20 opacity-60' 
                              : isActive
                                ? 'bg-emerald-950/20 border-emerald-500 shadow-md shadow-emerald-500/10'
                                : 'bg-slate-900/80 border-white/5 hover:border-white/10 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Server className={`w-4 h-4 ${isOffline ? 'text-red-500' : isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                              <span className="text-xs font-bold text-white">{node.name}</span>
                            </div>
                            
                            <button
                              onClick={() => toggleNode(node.id)}
                              className={`p-1 rounded-md transition-colors ${
                                isOffline 
                                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                              }`}
                              title={isOffline ? "Mettre en ligne" : "Simuler panne"}
                            >
                              <Power className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-500">Connexions : {node.load}</span>
                            <span className={`px-2 py-0.5 rounded-full ${
                              isOffline ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                            }`}>
                              {node.status === 'healthy' ? 'HEALTHY' : 'CRASHED'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Lab Footer Explanation */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Tolérance aux pannes configurée (Auto-Failover)
                </span>
                <span className="font-mono text-[10px]">
                  Algorithme actif : <strong className="text-white">{algorithm.toUpperCase()}</strong>
                </span>
              </div>
            </div>

            {/* Gateway Console Output */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-950 border border-white/5 flex flex-col h-[500px]">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-white/5">
                <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Console Système & Logs</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2 items-start py-0.5">
                    <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                    <span className={
                      log.type === 'success' 
                        ? 'text-emerald-400' 
                        : log.type === 'warn' 
                          ? 'text-amber-400' 
                          : log.type === 'error' 
                            ? 'text-red-400' 
                            : 'text-slate-300'
                    }>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setLogs([{ timestamp: new Date().toLocaleTimeString(), type: 'info', message: 'Logs réinitialisés.' }])}
                className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Effacer Console
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Crypto Key Exchange Lab */}
        {activeTab === 'crypto' && (
          <div className="p-8 rounded-2xl glass-panel border border-white/5">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Crypto Header */}
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="text-lg font-bold text-white">Échange de Clés Diffie-Hellman</h3>
                <p className="text-xs text-slate-400">
                  Visualisez comment Alice et Bob s'accordent sur une clé de chiffrement secrète commune sur un canal non sécurisé, sans jamais la transmettre directement.
                </p>
              </div>

              {/* Public Parameters */}
              <div className="grid md:grid-cols-2 gap-6 p-6 rounded-xl bg-white/5 border border-white/5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Nombre Premier Public (p)
                  </label>
                  <input
                    type="range"
                    min="11"
                    max="97"
                    step="2" // rough selection
                    value={dhPrime}
                    onChange={(e) => setDhPrime(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Val: {dhPrime}</span>
                    <span>Modulus Premier (p)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Générateur Public (g)
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={dhGenerator}
                    onChange={(e) => setDhGenerator(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Val: {dhGenerator}</span>
                    <span>Base Génératrice (g)</span>
                  </div>
                </div>
              </div>

              {/* The Exchange Process */}
              <div className="grid md:grid-cols-3 gap-6 items-stretch relative">
                
                {/* Alice Node */}
                <div className="p-6 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col justify-between space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">A</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Alice (Client)</h4>
                      <span className="text-[10px] text-slate-500 font-mono">Clé Secrète</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Clé Privée Choisie (a) :</span>
                      <input
                        type="number"
                        min="2"
                        max="20"
                        value={aliceSecret}
                        onChange={(e) => setAliceSecret(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs font-mono text-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1 text-xs">
                      <p className="text-slate-500">Calcul Clé Publique (A) :</p>
                      <p className="font-mono text-slate-300">g^a mod p</p>
                      <p className="font-mono text-emerald-400 text-sm font-semibold mt-1">
                        {dhGenerator}^{aliceSecret} mod {dhPrime} = {alicePublic}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Network / Transit Node */}
                <div className="p-6 rounded-xl border border-dashed border-slate-800 flex flex-col justify-center items-center text-center space-y-4 relative">
                  <div className="absolute inset-0 bg-[#030712]/30 rounded-xl pointer-events-none"></div>
                  
                  <ShieldAlert className="w-8 h-8 text-amber-500/70 animate-pulse" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Canal Public non Sécurisé</h4>
                  <p className="text-[10px] text-slate-500 max-w-[180px]">
                    N'importe quel écouteur réseau (ex: pirate Wi-Fi) peut intercepter les clés publiques en transit :
                  </p>

                  <div className="w-full p-2.5 rounded bg-slate-950 border border-white/5 text-[10px] font-mono text-left space-y-1">
                    <p className="text-slate-600">// Paquets interceptés :</p>
                    <p className="text-amber-500">Clé Publique A = <strong className="text-slate-200">{alicePublic}</strong></p>
                    <p className="text-amber-500">Clé Publique B = <strong className="text-slate-200">{bobPublic}</strong></p>
                  </div>
                </div>

                {/* Bob Node */}
                <div className="p-6 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col justify-between space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">B</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Bob (Serveur)</h4>
                      <span className="text-[10px] text-slate-500 font-mono">Clé Secrète</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Clé Privée Choisie (b) :</span>
                      <input
                        type="number"
                        min="2"
                        max="20"
                        value={bobSecret}
                        onChange={(e) => setBobSecret(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs font-mono text-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1 text-xs">
                      <p className="text-slate-500">Calcul Clé Publique (B) :</p>
                      <p className="font-mono text-slate-300">g^b mod p</p>
                      <p className="font-mono text-emerald-400 text-sm font-semibold mt-1">
                        {dhGenerator}^{bobSecret} mod {dhPrime} = {bobPublic}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Shared Secret Outcome */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-950/20 via-slate-900/90 to-emerald-950/20 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Unlock className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Secret Commun Généré !</span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl">
                    Alice utilise la clé publique de Bob et sa clé privée pour calculer le secret. Bob fait de même avec la clé publique d'Alice. Les deux obtiennent le même secret mathématique sans l'avoir révélé sur le réseau.
                  </p>
                </div>

                <div className="flex items-stretch gap-6">
                  {/* Alice shared key */}
                  <div className="text-center px-4 py-3 rounded bg-slate-950 border border-white/5">
                    <p className="text-[10px] text-slate-500">Clé d'Alice</p>
                    <span className="font-mono text-sm text-slate-400">B^a mod p</span>
                    <h5 className="font-mono text-xl font-bold text-emerald-400 mt-1">{aliceShared}</h5>
                  </div>

                  {/* Bob shared key */}
                  <div className="text-center px-4 py-3 rounded bg-slate-950 border border-white/5">
                    <p className="text-[10px] text-slate-500">Clé de Bob</p>
                    <span className="font-mono text-sm text-slate-400">A^b mod p</span>
                    <h5 className="font-mono text-xl font-bold text-emerald-400 mt-1">{bobShared}</h5>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

import BottomNav from '../components/BottomNav';
import MissionCard from '../components/MissionCard';
import ConquestModal from '../components/ConquestModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState } from 'react';
import rawData from '../data/appData.json';

export default function Missoes() {
  const [missions, setMissions]          = useLocalStorage('cp_missions', rawData.missions);
  const [points, setPoints]              = useLocalStorage('cp_points', 1240);
  const [conqueredMission, setConquered] = useState(null);

  // Estatísticas calculadas com desestruturação
  const stats = missions.reduce((acc, { status, points: p }) => ({
    ...acc,
    total: acc.total + 1,
    done:     status === 'done'     ? acc.done + 1     : acc.done,
    pending:  status === 'pending'  ? acc.pending + 1  : acc.pending,
    progress: status === 'progress' ? acc.progress + 1 : acc.progress,
  }), { total: 0, done: 0, pending: 0, progress: 0 });

  const pct = Math.round((stats.done / stats.total) * 100);

  const handleComplete = (mission) => {
    setMissions(prev => prev.map(m => m.id === mission.id ? { ...m, status: 'done', progress: 100 } : m));
    setPoints(prev => prev + mission.points);
    setConquered(mission);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 96 }}>

      {/* Header */}
      <div style={s.header}>
        <h2 style={{ color: '#fff', fontSize: 22, marginBottom: 16 }}>✅ Minhas Missões</h2>
        <div style={s.statsRow}>
          {[
            { v: stats.total,    l: 'Total' },
            { v: stats.done,     l: '✓ Feitas' },
            { v: stats.pending,  l: 'Pendentes' },
            { v: stats.progress, l: 'Em andamento' },
          ].map(({ v, l }) => (
            <div key={l} style={s.statChip}>
              <div style={s.statV}>{v}</div>
              <div style={s.statL}>{l}</div>
            </div>
          ))}
        </div>

        {/* Overall progress */}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.8)' }}>Progresso hoje</span>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>{pct}%</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'var(--secondary)', borderRadius: 999, transition: 'width .6s ease' }} />
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-secondary)', marginBottom: 12 }}>
          Todas as missões
        </div>
        {missions.map(m => (
          <MissionCard key={m.id} mission={m} onComplete={handleComplete} />
        ))}
      </div>

      <BottomNav />
      {conqueredMission && <ConquestModal mission={conqueredMission} onClose={() => setConquered(null)} />}
    </div>
  );
}

const s = {
  header: { background: 'linear-gradient(135deg, var(--primary), #0e7a5c)', padding: '48px 20px 20px' },
  statsRow: { display: 'flex', gap: 8 },
  statChip: {
    background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 'var(--radius-md)', padding: '8px 12px', textAlign: 'center', flex: 1,
  },
  statV: { fontSize: 20, fontWeight: 900, color: '#fff' },
  statL: { fontSize: 10, color: 'rgba(255,255,255,.7)', marginTop: 2 },
};
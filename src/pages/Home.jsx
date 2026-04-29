import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import MissionCard from '../components/MissionCard';
import ConquestModal from '../components/ConquestModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import rawData from '../data/appData.json';

const FILTERS = ['Todas', 'Pendentes', 'Em progresso', 'Concluídas'];
const STREAK_DAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

export default function Home() {
  const [missions, setMissions]           = useLocalStorage('cp_missions', rawData.missions);
  const [points, setPoints]               = useLocalStorage('cp_points', 1240);
  const [conqueredMission, setConquered]  = useState(null);
  const [filter, setFilter]               = useState('Todas');

  // Desestruturação e operações matemáticas sobre as missões
  const { done: doneCount, total } = missions.reduce(
    (acc, m) => ({ done: m.status === 'done' ? acc.done + 1 : acc.done, total: acc.total + 1 }),
    { done: 0, total: 0 }
  );

  const filteredMissions = missions.filter(m => {
    if (filter === 'Todas')        return true;
    if (filter === 'Pendentes')    return m.status === 'pending';
    if (filter === 'Em progresso') return m.status === 'progress';
    if (filter === 'Concluídas')   return m.status === 'done';
    return true;
  });

  const handleComplete = (mission) => {
    setMissions(prev =>
      prev.map(m => m.id === mission.id
        ? { ...m, status: 'done', progress: 100 }
        : m
      )
    );
    setPoints(prev => prev + mission.points);
    setConquered(mission);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 96 }}>

      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerRow}>
          <div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.8)' }}>Olá, 👋</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Ana</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={s.pointsPill}>⚡ {points.toLocaleString('pt-BR')} pts</div>
            <Link to="/perfil">
              <div style={s.avatar}>😊</div>
            </Link>
          </div>
        </div>

        {/* Stats card */}
        <div style={s.statsCard} className="animate-fade-up">
          {[
            { val: 7,            label: '🔥 Streak' },
            { val: `${doneCount}/${total}`, label: '✅ Hoje' },
            { val: 'Nível 4',    label: '🎖 Rank' },
          ].map(({ val, label }, i) => (
            <div key={label} style={{ ...s.statItem, ...(i < 2 ? s.statBorder : {}) }}>
              <div style={s.statVal}>{val}</div>
              <div style={s.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Streak ── */}
      <div style={s.streakSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>🔥 Sequência da semana</span>
          <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700 }}>7 dias seguidos!</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {STREAK_DAYS.map((d, i) => (
            <div key={i} style={{
              ...s.streakDot,
              background: i === 6 ? 'var(--secondary)' : 'var(--primary)',
              border: `2px solid ${i === 6 ? 'var(--secondary)' : 'var(--primary)'}`,
              color: '#fff',
            }}>
              {d}
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div style={s.tabs}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            ...s.tab,
            ...(filter === f ? s.tabActive : {}),
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* ── Feed ── */}
      <div style={s.feed}>
        {filter === 'Todas' && (
          <div style={s.highlight}>
            <div style={{ fontSize: 12, opacity: .8, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.05em' }}>⭐ Missão do Dia</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Caminhada de 30 min</div>
            <div style={{ fontSize: 14, opacity: .9 }}>+150 pontos · Expira hoje às 23:59</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 17 }}>Missões de hoje</h3>
          <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Ver todas</span>
        </div>

        {filteredMissions.map(m => (
          <MissionCard key={m.id} mission={m} onComplete={handleComplete} />
        ))}
      </div>

      <BottomNav />

      {/* Conquest modal */}
      {conqueredMission && (
        <ConquestModal mission={conqueredMission} onClose={() => setConquered(null)} />
      )}
    </div>
  );
}

const s = {
  header: {
    background: 'linear-gradient(135deg, var(--primary), #0e7a5c)',
    padding: '48px 20px 20px',
  },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  pointsPill: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'rgba(255,255,255,0.2)', color: '#fff',
    borderRadius: 999, padding: '6px 14px', fontSize: 14, fontWeight: 700,
  },
  avatar: {
    width: 44, height: 44, background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer',
  },
  statsCard: {
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 'var(--radius-lg)', padding: 16,
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
  },
  statItem: { textAlign: 'center', padding: '0 8px' },
  statBorder: { borderRight: '1px solid rgba(255,255,255,0.2)' },
  statVal:   { fontSize: 22, fontWeight: 900, color: '#fff' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  streakSection: {
    background: 'var(--white)', padding: '14px 20px',
    borderBottom: '1px solid var(--border)',
  },
  streakDot: {
    width: 28, height: 28, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 700,
  },
  tabs: {
    display: 'flex', gap: 8, padding: '12px 20px',
    overflowX: 'auto', background: 'var(--white)',
    borderBottom: '1px solid var(--border)',
    scrollbarWidth: 'none',
  },
  tab: {
    whiteSpace: 'nowrap', padding: '8px 16px',
    borderRadius: 999, fontSize: 13, fontWeight: 600,
    cursor: 'pointer', border: '1.5px solid var(--border)',
    color: 'var(--text-secondary)', background: 'var(--white)',
    transition: 'all var(--transition)',
  },
  tabActive: {
    background: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)',
  },
  feed: { padding: '14px 20px 0' },
  highlight: {
    background: 'linear-gradient(135deg, var(--primary), #0e7a5c)',
    borderRadius: 'var(--radius-lg)', padding: 20, color: '#fff', marginBottom: 16,
  },
};
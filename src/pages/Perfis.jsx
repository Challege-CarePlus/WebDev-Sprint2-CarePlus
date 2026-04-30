import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useLocalStorage } from '../hooks/useLocalStorage';
import rawData from '../data/appData.json';

const SETTINGS = [
  { icon: '⚙️', label: 'Preferências de notificação' },
  { icon: '🔗', label: 'Plataforma de saúde conectada' },
  { icon: '🛡️', label: 'Privacidade e dados (LGPD)' },
  { icon: '❓', label: 'Ajuda e suporte' },
];

export default function Perfil() {
  const navigate = useNavigate();
  const [points]   = useLocalStorage('cp_points', 1240);
  const [missions] = useLocalStorage('cp_missions', rawData.missions);

  // Derived stats via array destructuring + reduce
  const [doneCount, totalMissions] = missions.reduce(
    ([d, t], { status }) => [status === 'done' ? d + 1 : d, t + 1],
    [0, 0]
  );

  const xp = points;
  const nextLevel = 2000;
  const pct = Math.min(Math.round((xp / nextLevel) * 100), 100);

  const stats = [
    { val: 7,            label: '🔥 Streak atual' },
    { val: doneCount,    label: '✅ Missões feitas' },
    { val: points.toLocaleString('pt-BR'), label: '⚡ Pontos acumulados' },
    { val: 21,           label: '📅 Dias ativos' },
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 96 }}>

      {/* Header */}
      <div style={s.header}>
        <div style={s.avatarCircle}>😊</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Ana</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.8)' }}>CarePlus · Plano Empresarial</div>
        <div style={s.levelPill}>🎖 Nível 4 · Guardião da Saúde</div>
      </div>

      {/* Level progress */}
      <div style={s.levelSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Progresso para Nível 5</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{xp.toLocaleString('pt-BR')} / {nextLevel.toLocaleString('pt-BR')} XP</span>
        </div>
        <div style={{ height: 8, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--primary), var(--accent2))', borderRadius: 999, transition: 'width .6s ease' }} />
        </div>
      </div>

      {/* Stats */}
      <div style={s.statsGrid}>
        {stats.map(({ val, label }, i) => (
          <div key={label} style={s.statCard} className={`animate-fade-up delay-${i + 1}`}>
            <div style={s.statVal}>{val}</div>
            <div style={s.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 17 }}>Conquistas</h3>
          <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Ver todas</span>
        </div>
        <div style={s.badgeGrid}>
          {rawData.badges.map(({ id, name, icon, color, earned }, i) => (
            <div key={id} style={s.badgeItem} className={`animate-fade-up delay-${(i % 4) + 1}`}>
              <div style={{
                ...s.badgeCircle,
                background: color,
                opacity: earned ? 1 : 0.5,
                border: earned ? '2.5px solid var(--primary)' : '2px solid var(--border)',
              }}>
                {icon}
                {earned && <div style={s.pulseRing} />}
              </div>
              <span style={s.badgeName}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={s.sectionLabel}>Configurações</div>
        {SETTINGS.map(({ icon, label }) => (
          <div key={label} style={s.settingItem}>
            <div style={s.settingIcon}>{icon}</div>
            <span style={s.settingLabel}>{label}</span>
            <span style={{ color: 'var(--text-secondary)' }}>›</span>
          </div>
        ))}
        <div style={{ ...s.settingItem, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={s.settingIcon}>🚪</div>
          <span style={{ ...s.settingLabel, color: 'var(--error)' }}>Sair da conta</span>
          <span style={{ color: 'var(--error)' }}>›</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

const s = {
  header: {
    background: 'linear-gradient(135deg, var(--primary), #0e7a5c)',
    padding: '48px 20px 28px', textAlign: 'center',
  },
  avatarCircle: {
    width: 80, height: 80, background: 'rgba(255,255,255,.2)',
    borderRadius: '50%', border: '3px solid rgba(255,255,255,.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 36, margin: '0 auto 14px',
  },
  levelPill: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)',
    borderRadius: 999, padding: '6px 16px', marginTop: 10,
    fontSize: 13, fontWeight: 700, color: '#fff',
  },
  levelSection: { background: 'var(--white)', padding: '16px 20px', borderBottom: '1px solid var(--border)' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '16px 20px' },
  statCard: { background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: 14, border: '1px solid var(--border)', textAlign: 'center' },
  statVal:   { fontSize: 24, fontWeight: 900, color: 'var(--primary)' },
  statLabel: { fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 },
  badgeGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 },
  badgeItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
  badgeCircle: {
    width: 56, height: 56, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, position: 'relative', transition: 'all .3s',
  },
  pulseRing: {
    position: 'absolute', inset: -3, borderRadius: '50%',
    border: '2px solid var(--secondary)',
    animation: 'pulseRing 2s ease-out infinite',
  },
  badgeName: { fontSize: 10, textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 500 },
  sectionLabel: { fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-secondary)', marginBottom: 12 },
  settingItem: { display: 'flex', alignItems: 'center', gap: 14, padding: '15px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'opacity var(--transition)' },
  settingIcon: { width: 40, height: 40, background: 'var(--bg)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 },
  settingLabel: { flex: 1, fontSize: 15, fontWeight: 500 },
};
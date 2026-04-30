const COLOR_MAP = {
  green:  { bg: 'var(--primary-light)' },
  yellow: { bg: '#FFF3E0' },
  blue:   { bg: '#E3F2FD' },
  purple: { bg: '#F3E5F5' },
  gray:   { bg: '#F5F5F5' },
};

const BADGE = {
  done:     { bg: '#E8F5E9', color: 'var(--success)',  label: '✓ Concluída' },
  progress: { bg: '#E3F2FD', color: '#1565C0',          label: '70%' },
  pending:  { bg: '#FFF3E0', color: 'var(--warning)',   label: 'Pendente' },
  locked:   { bg: '#F5F5F5', color: '#9E9E9E',          label: '🔒 Bloqueada' },
};

export default function MissionCard({ mission, onComplete }) {
  const { title, description, icon, color, points, status, progress } = mission;
  const iconStyle = COLOR_MAP[color] || COLOR_MAP.gray;
  const badge = BADGE[status] || BADGE.pending;
  const isLocked = status === 'locked';
  const isDone   = status === 'done';

  return (
    <div
      style={{
        ...styles.card,
        opacity: isLocked ? 0.6 : 1,
        cursor: isLocked ? 'not-allowed' : 'default',
      }}
      className="animate-fade-up"
    >
      {/* Icon */}
      <div style={{ ...styles.icon, background: iconStyle.bg }}>{icon}</div>

      {/* Info */}
      <div style={styles.info}>
        <div style={styles.title}>{title}</div>
        <div style={styles.desc}>{description}</div>

        {/* Progress bar */}
        <div style={styles.progressBg}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>

        {/* Badges row */}
        <div style={styles.badgeRow}>
          <span style={{ ...styles.badge, background: badge.bg, color: badge.color }}>
            {badge.label}
          </span>
          <span style={{ ...styles.badge, background: 'var(--primary-light)', color: 'var(--primary)' }}>
            +{points} pts
          </span>
        </div>
      </div>

      {/* Action button */}
      {!isLocked && !isDone && (
        <button style={styles.btn} onClick={() => onComplete(mission)}>
          Concluir
        </button>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    padding: 16,
    border: '1px solid var(--border)',
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
    transition: 'all var(--transition)',
    marginBottom: 10,
  },
  icon: {
    width: 48, height: 48, minWidth: 48,
    borderRadius: 'var(--radius-md)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 22,
  },
  info:  { flex: 1 },
  title: { fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 },
  desc:  { fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 },
  progressBg: {
    height: 8, background: 'var(--border)', borderRadius: 999, overflow: 'hidden', marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--primary), var(--accent2))',
    borderRadius: 999,
    transition: 'width .6s ease',
  },
  badgeRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  badge: {
    display: 'inline-flex', alignItems: 'center',
    padding: '3px 10px', borderRadius: 999,
    fontSize: 12, fontWeight: 600,
  },
  btn: {
    background: 'var(--primary)', color: '#fff',
    border: 'none', borderRadius: 999,
    padding: '7px 14px', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'all var(--transition)',
    alignSelf: 'center',
  },
};

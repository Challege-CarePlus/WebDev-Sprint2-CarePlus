import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div style={s.shell}>
      <div style={s.decor1} />
      <div style={s.decor2} />

      {/* Top */}
      <div style={{ textAlign: 'center' }} className="animate-fade-up">
        <div style={s.logo}>
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
            <path d="M8 22 L16 22 L20 14 L26 34 L30 22 L36 22 L40 18"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M26 40C26 40 10 30 10 18c0-5 4-9 9-9 3 0 6 2 7 5 1-3 4-5 7-5 5 0 9 4 9 9C42 30 26 40 26 40z"
              stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        <h1 style={{ color: '#fff', fontSize: 40, letterSpacing: -1 }}>CarePlus Go</h1>
        <p style={{ color: 'rgba(255,255,255,.75)', marginTop: 8 }}>Sua jornada de saúde gamificada</p>
      </div>

      {/* Cards preview */}
      <div style={s.preview} className="animate-fade-up delay-2">
        {[['🏃', 'Missões Diárias'], ['🏆', 'Conquistas'], ['🎁', 'Recompensas']].map(([icon, label]) => (
          <div key={label} style={s.previewCard}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.8)', fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ width: '100%' }} className="animate-fade-up delay-3">
        <button style={s.btn} onClick={() => navigate('/onboarding')}>
          Começar
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 14 }}>
          Ao continuar você concorda com os{' '}
          <span style={{ color: 'rgba(255,255,255,.8)', textDecoration: 'underline', cursor: 'pointer' }}>
            Termos de Uso
          </span>
        </p>
      </div>
    </div>
  );
}

const s = {
  shell: {
    background: 'linear-gradient(160deg, #1c9770 0%, #0d6b4f 100%)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '64px 32px 48px',
    position: 'relative',
    overflow: 'hidden',
  },
  decor1: {
    position: 'absolute', top: -80, right: -80,
    width: 260, height: 260, borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)',
  },
  decor2: {
    position: 'absolute', bottom: 180, left: -60,
    width: 200, height: 200, borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
  },
  logo: {
    width: 100, height: 100,
    background: 'rgba(255,255,255,0.15)',
    borderRadius: 28,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 24px',
    border: '1.5px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(8px)',
  },
  preview: {
    display: 'flex', gap: 12,
  },
  previewCard: {
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: '14px 10px',
    width: 96,
    backdropFilter: 'blur(6px)',
    textAlign: 'center',
  },
  btn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: '100%', height: 56,
    background: '#fff', color: 'var(--primary)',
    border: 'none', borderRadius: 'var(--radius-lg)',
    fontSize: 17, fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    transition: 'all var(--transition)',
  },
};

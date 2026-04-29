import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const platforms = [
  { id: 'apple',  emoji: '🍎', name: 'Apple Health', desc: 'iOS 14+' },
  { id: 'google', emoji: '🤖', name: 'Google Fit',   desc: 'Android 8+' },
];

const loadingSteps = [
  { title: 'Conectando...', desc: 'Buscando permissões de saúde' },
  { title: 'Verificando dados...', desc: 'Lendo histórico de atividades' },
  { title: 'Quase lá!', desc: 'Configurando seu perfil' },
];

export default function HealthConnect() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [stepIdx, setStepIdx]   = useState(0);
  const navigate = useNavigate();

  const startConnect = () => {
    setLoading(true);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setStepIdx(i);
      if (i >= loadingSteps.length) {
        clearInterval(iv);
        navigate('/home');
      }
    }, 900);
  };

  if (loading) {
    const step = loadingSteps[Math.min(stepIdx, loadingSteps.length - 1)];
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40, background: 'var(--white)' }}>
        <div style={{ width: 56, height: 56, border: '4px solid var(--primary-light)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin .9s linear infinite' }} />
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: 6 }}>{step.title}</h3>
          <p style={{ fontSize: 14 }}>{step.desc}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.shell}>
      <div style={s.header} className="animate-fade-up">
        <h2 style={{ marginBottom: 8 }}>Conecte sua plataforma</h2>
        <p style={{ fontSize: 14 }}>Sincronize seus dados automaticamente para completar missões</p>
      </div>

      <div style={s.grid}>
        {platforms.map(({ id, emoji, name, desc }, i) => {
          const active = selected === id;
          return (
            <div
              key={id}
              style={{ ...s.card, ...(active ? s.cardActive : {}), animationDelay: `${i * 0.1}s` }}
              className="animate-fade-up"
              onClick={() => setSelected(id)}
            >
              <span style={{ fontSize: 40, marginBottom: 10, display: 'block' }}>{emoji}</span>
              <div style={s.cardName}>{name}</div>
              <div style={s.cardDesc}>{desc}</div>
              {active && <div style={s.check}>✓</div>}
            </div>
          );
        })}
      </div>

      <button style={{ ...s.btnSkip }} onClick={() => navigate('/home')}>
        Configurar depois
      </button>

      <div style={s.footer}>
        <button
          style={{ ...s.btn, opacity: selected ? 1 : 0.4, cursor: selected ? 'pointer' : 'not-allowed' }}
          disabled={!selected}
          onClick={startConnect}
        >
          Conectar Plataforma
        </button>
      </div>
    </div>
  );
}

const s = {
  shell: { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--white)', padding: '56px 24px 0' },
  header: { textAlign: 'center', marginBottom: 28 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 },
  card: {
    border: '2px solid var(--border)', borderRadius: 'var(--radius-lg)',
    padding: '24px 16px', textAlign: 'center', cursor: 'pointer',
    transition: 'all var(--transition)', background: 'var(--white)',
  },
  cardActive: { borderColor: 'var(--primary)', background: 'var(--primary-light)' },
  cardName: { fontSize: 15, fontWeight: 700, marginBottom: 4 },
  cardDesc: { fontSize: 12, color: 'var(--text-secondary)' },
  check: {
    width: 22, height: 22, background: 'var(--primary)', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontSize: 12, fontWeight: 700, margin: '10px auto 0',
  },
  btnSkip: {
    background: 'none', border: 'none', color: 'var(--primary)',
    fontSize: 14, fontWeight: 500, cursor: 'pointer', textAlign: 'center',
    display: 'block', width: '100%', padding: '8px 0',
  },
  footer: { marginTop: 'auto', padding: '20px 0 48px' },
  btn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '100%', height: 52, background: 'var(--primary)', color: '#fff',
    border: 'none', borderRadius: 'var(--radius-lg)',
    fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all var(--transition)',
  },
};

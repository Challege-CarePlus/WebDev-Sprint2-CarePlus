import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    emoji: '🏃‍♂️',
    bg: 'linear-gradient(135deg, #d0f0e5, #b2f0dc)',
    title: 'Complete Missões Diárias',
    desc: 'Atividades simples como caminhar, beber água e dormir bem viram pontos e recompensas.',
  },
  {
    emoji: '🏆',
    bg: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
    title: 'Ganhe Badges & Conquistas',
    desc: 'Mantenha streaks, suba de nível e colecione medalhas que mostram sua evolução.',
  },
  {
    emoji: '🎁',
    bg: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
    title: 'Troque por Recompensas Reais',
    desc: 'Seus pontos valem desconto no plano, consultas gratuitas e vouchers em parceiros.',
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (current < slides.length - 1) setCurrent(c => c + 1);
    else navigate('/lgpd');
  };

  const { emoji, bg, title, desc } = slides[current];

  return (
    <div style={s.shell}>
      <button style={s.skip} onClick={() => navigate('/lgpd')}>Pular</button>

      {/* Illustration */}
      <div style={{ ...s.illustration, background: bg }} className="animate-bounce-in">
        <span style={{ fontSize: 90 }}>{emoji}</span>
      </div>

      {/* Text */}
      <div style={s.text} className="animate-fade-up">
        <h2 style={{ marginBottom: 12, textAlign: 'center' }}>{title}</h2>
        <p style={{ textAlign: 'center', fontSize: 16 }}>{desc}</p>
      </div>

      {/* Dots */}
      <div style={s.dots}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              ...s.dot,
              width: i === current ? 24 : 8,
              background: i === current ? 'var(--primary)' : 'var(--border)',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* Button */}
      <button style={s.btn} onClick={next}>
        {current === slides.length - 1 ? 'Começar' : 'Continuar'}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}

const s = {
  shell: {
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'space-between',
    padding: '72px 32px 48px', background: 'var(--white)',
    position: 'relative',
  },
  skip: {
    position: 'absolute', top: 20, right: 20,
    background: 'rgba(0,0,0,0.07)', border: 'none',
    borderRadius: 999, padding: '8px 16px',
    fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer',
  },
  illustration: {
    width: 240, height: 240, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background .4s',
  },
  text: { textAlign: 'center', maxWidth: 300 },
  dots: { display: 'flex', gap: 8, alignItems: 'center' },
  dot: { height: 8, borderRadius: 999, transition: 'all .3s' },
  btn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    width: '100%', height: 52, background: 'var(--primary)', color: '#fff',
    border: 'none', borderRadius: 'var(--radius-lg)',
    fontSize: 16, fontWeight: 600, cursor: 'pointer',
    transition: 'all var(--transition)',
  },
};

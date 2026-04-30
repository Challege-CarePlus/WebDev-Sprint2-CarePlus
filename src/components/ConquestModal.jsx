import { useEffect, useRef } from 'react';

export default function ConquestModal({ mission, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!mission || !containerRef.current) return;
    const container = containerRef.current;
    const colors = ['#1c9770','#93CB52','#7AD1C3','#FFB300','#FF5252'];

    for (let i = 0; i < 32; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position:absolute;
        left:${Math.random()*100}%;
        top:-10px;
        width:${6+Math.random()*8}px;
        height:${6+Math.random()*8}px;
        border-radius:${Math.random()>.5?'50%':'3px'};
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation:confettiFall ${.8+Math.random()*.8}s ${Math.random()*.5}s ease-in forwards;
        pointer-events:none;
      `;
      container.appendChild(el);
    }
    return () => { container.innerHTML = ''; };
  }, [mission]);

  if (!mission) return null;

  return (
    <>
      {/* Confetti layer */}
      <div ref={containerRef} style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:400, overflow:'hidden' }} />

      {/* Overlay */}
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.card} onClick={e => e.stopPropagation()} className="animate-bounce-in">
          <span style={{ fontSize: 64, display:'block', marginBottom:12 }}>🏆</span>
          <h3 style={{ marginBottom: 8 }}>Missão Concluída!</h3>
          <div style={styles.pts}>+{mission.points} pts</div>
          <p style={{ margin:'8px 0 20px', fontSize:14 }}>Continue assim e mantenha seu streak!</p>
          <button style={styles.btn} onClick={onClose}>Continuar</button>
        </div>
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 300,
    background: 'rgba(0,0,0,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 24,
  },
  card: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    padding: '32px 24px',
    textAlign: 'center',
    maxWidth: 340, width: '100%',
  },
  pts: {
    display:'inline-flex', alignItems:'center', gap:6,
    background:'var(--primary-light)', color:'var(--primary)',
    borderRadius:999, padding:'6px 16px',
    fontSize:15, fontWeight:700,
  },
  btn: {
    width:'100%', height:52,
    background:'var(--primary)', color:'#fff',
    border:'none', borderRadius:'var(--radius-lg)',
    fontSize:16, fontWeight:600, cursor:'pointer',
  },
};

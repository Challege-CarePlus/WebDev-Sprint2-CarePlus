import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { useLocalStorage } from '../hooks/useLocalStorage';
import rawData from '../data/appData.json';

const COLOR_IMG = {
  green:  'var(--primary-light)',
  yellow: '#FFF3E0',
  blue:   '#E3F2FD',
  purple: '#F3E5F5',
  teal:   '#E0F7FA',
  gray:   '#F5F5F5',
};

export default function Carteira() {
  const [points]           = useLocalStorage('cp_points', 1240);
  const [modalItem, setModalItem] = useState(null);
  const [redeemed, setRedeemed]   = useState([]);

  const handleRedeem = () => {
    setRedeemed(prev => [...prev, modalItem.id]);
    setModalItem(null);
    alert(`Resgate de "${modalItem.title}" solicitado! Você receberá um e-mail em breve.`);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 96 }}>

      {/* Header */}
      <div style={s.header}>
        <h2 style={{ color: '#fff', fontSize: 22, marginBottom: 16 }}>💳 Carteira de Pontos</h2>
        <div style={s.balanceCard} className="animate-bounce-in">
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', marginBottom: 4 }}>Seu saldo</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: '#fff' }}>
            {points.toLocaleString('pt-BR')}
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.75)' }}>pontos disponíveis</div>
        </div>
      </div>

      {/* Catalog */}
      <div style={{ padding: '16px 20px' }}>
        <div style={s.sectionHeader}>
          <h3 style={{ fontSize: 17 }}>Catálogo de Recompensas</h3>
        </div>
        <div style={s.grid}>
          {rawData.rewards.map((r, i) => {
            const canRedeem = !r.locked && points >= r.points && !redeemed.includes(r.id);
            return (
              <div
                key={r.id}
                style={{ ...s.rewardCard, ...(r.locked ? s.locked : {}), animationDelay: `${i * 0.05}s` }}
                className="animate-fade-up"
                onClick={() => !r.locked && canRedeem && setModalItem(r)}
              >
                <div style={{ ...s.rewardImg, background: COLOR_IMG[r.color] }}>{r.icon}</div>
                <div style={s.rewardBody}>
                  <div style={s.rewardTitle}>{r.title}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: r.locked ? '#9E9E9E' : 'var(--primary)' }}>
                    {r.points.toLocaleString('pt-BR')} pts
                  </div>
                  {redeemed.includes(r.id) && (
                    <div style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600 }}>✓ Resgatado</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Transactions */}
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 17, marginBottom: 12 }}>Extrato</h3>
          {rawData.transactions.map(({ id, title, date, amount, type }) => (
            <div key={id} style={s.txItem}>
              <div style={{ ...s.txIcon, background: type === 'earn' ? 'var(--primary-light)' : '#FFEBEE' }}>
                {type === 'earn' ? '⚡' : '🎁'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{date}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: type === 'earn' ? 'var(--primary)' : 'var(--error)' }}>
                {amount > 0 ? '+' : ''}{amount} pts
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />

      {/* Redeem Modal */}
      {modalItem && (
        <div style={s.overlay} onClick={() => setModalItem(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalHandle} />
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 48 }}>{modalItem.icon}</span>
              <h3 style={{ marginTop: 12 }}>{modalItem.title}</h3>
              <div style={s.ptsBadge}>{modalItem.points.toLocaleString('pt-BR')} pts</div>
              <p style={{ fontSize: 14, marginTop: 8 }}>Você tem pontos suficientes para este resgate!</p>
            </div>
            <button style={s.confirmBtn} onClick={handleRedeem}>Confirmar Resgate</button>
            <button style={s.cancelBtn} onClick={() => setModalItem(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  header: { background: 'linear-gradient(135deg, var(--primary), #0e7a5c)', padding: '48px 20px 24px' },
  balanceCard: {
    background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 'var(--radius-lg)', padding: 20, textAlign: 'center',
  },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  rewardCard: {
    background: 'var(--white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
    border: '1px solid var(--border)', cursor: 'pointer', transition: 'all var(--transition)',
  },
  locked: { opacity: .6, cursor: 'not-allowed' },
  rewardImg: { height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 },
  rewardBody: { padding: '10px 12px 14px' },
  rewardTitle: { fontSize: 13, fontWeight: 700, marginBottom: 4 },
  txItem: { display: 'flex', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' },
  txIcon: { width: 40, height: 40, minWidth: 40, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' },
  modal: {
    width: '100%', maxWidth: 430, background: 'var(--white)',
    borderRadius: '24px 24px 0 0', padding: '28px 20px 36px',
  },
  modalHandle: { width: 40, height: 4, background: 'var(--border)', borderRadius: 999, margin: '0 auto 24px' },
  ptsBadge: { display: 'inline-block', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 999, padding: '6px 16px', fontSize: 15, fontWeight: 700, marginTop: 8 },
  confirmBtn: { width: '100%', height: 52, background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-lg)', fontSize: 16, fontWeight: 600, cursor: 'pointer', marginBottom: 12 },
  cancelBtn: { width: '100%', height: 52, background: 'transparent', color: 'var(--primary)', border: '2px solid var(--primary)', borderRadius: 'var(--radius-lg)', fontSize: 16, fontWeight: 600, cursor: 'pointer' },
};

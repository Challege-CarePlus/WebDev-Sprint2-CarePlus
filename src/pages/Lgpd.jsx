import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const permissions = [
  { icon: '🏃', color: '#d0f0e5', title: 'Atividade física', desc: 'Passos, distância e calorias via Apple Health ou Google Fit' },
  { icon: '💤', color: '#E3F2FD', title: 'Qualidade do sono', desc: 'Horas dormidas para missões de bem-estar noturno' },
  { icon: '📋', color: '#FFF3E0', title: 'Histórico de missões', desc: 'Progresso local para calcular pontos e streaks' },
];

export default function Lgpd() {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const navigate = useNavigate();
  const canProceed = check1 && check2;

  return (
    <div style={s.shell}>
      {/* Header */}
      <div style={s.header} className="animate-fade-up">
        <div style={s.icon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="38" height="38">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h2 style={{ marginBottom: 8 }}>Sua privacidade importa</h2>
        <p style={{ fontSize: 14, textAlign: 'center' }}>
          O CarePlus Go coleta apenas o necessário para personalizar sua jornada.
        </p>
      </div>

      {/* Permissions */}
      <div style={s.body}>
        <div style={s.sectionLabel}>Dados que serão coletados</div>

        {permissions.map(({ icon, color, title, desc }, i) => (
          <div key={title} style={s.permItem} className={`animate-fade-up delay-${i + 1}`}>
            <div style={{ ...s.permIcon, background: color }}>{icon}</div>
            <div>
              <div style={s.permTitle}>{title}</div>
              <div style={s.permDesc}>{desc}</div>
            </div>
          </div>
        ))}

        {/* Consent block */}
        <div style={s.consentBlock} className="animate-fade-up delay-4">
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
            Seus dados são tratados conforme a <b>LGPD (Lei 13.709/2018)</b>.
            Você pode revogar o consentimento nas configurações a qualquer momento.
          </p>

          <CheckItem checked={check1} onChange={setCheck1} id="c1">
            Li e aceito os <b>Termos de Uso</b> e a <b>Política de Privacidade</b>
          </CheckItem>
          <CheckItem checked={check2} onChange={setCheck2} id="c2">
            Autorizo o acesso aos meus dados de saúde para fins de gamificação
          </CheckItem>
        </div>
      </div>

      {/* Footer */}
      <div style={s.footer}>
        <button
          style={{ ...s.btn, opacity: canProceed ? 1 : 0.4, cursor: canProceed ? 'pointer' : 'not-allowed' }}
          disabled={!canProceed}
          onClick={() => navigate('/health-connect')}
        >
          Aceito e Continuar
        </button>
        <button style={s.btnText} onClick={() => navigate('/')}>Não aceito agora</button>
      </div>
    </div>
  );
}

function CheckItem({ checked, onChange, id, children }) {
  return (
    <label htmlFor={id} style={s.checkLabel}>
      <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ display: 'none' }} />
      <div style={{
        ...s.checkBox,
        background: checked ? 'var(--primary)' : 'var(--white)',
        borderColor: checked ? 'var(--primary)' : 'var(--border)',
      }}>
        {checked && <span style={{ color:'#fff', fontSize:12, fontWeight:700 }}>✓</span>}
      </div>
      <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{children}</span>
    </label>
  );
}

const s = {
  shell: {
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    background: 'var(--white)',
  },
  header: {
    background: 'linear-gradient(160deg, var(--primary-light), var(--white))',
    padding: '56px 24px 24px', textAlign: 'center', display: 'flex',
    flexDirection: 'column', alignItems: 'center',
  },
  icon: {
    width: 72, height: 72, background: 'var(--primary)', borderRadius: 22,
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  body: { padding: '24px 24px 0', flex: 1 },
  sectionLabel: { fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-secondary)', marginBottom: 12 },
  permItem: {
    display: 'flex', gap: 14, padding: 16,
    background: 'var(--bg)', borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)', marginBottom: 10,
  },
  permIcon: { width: 44, height: 44, minWidth: 44, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 },
  permTitle: { fontSize: 14, fontWeight: 700, marginBottom: 2 },
  permDesc:  { fontSize: 13, color: 'var(--text-secondary)' },
  consentBlock: {
    marginTop: 16, padding: 16,
    background: 'var(--primary-light)', borderRadius: 'var(--radius-md)',
    border: '1px solid rgba(28,151,112,0.2)',
  },
  checkLabel: { display: 'flex', gap: 12, cursor: 'pointer', marginBottom: 12, alignItems: 'flex-start' },
  checkBox: {
    width: 22, height: 22, minWidth: 22, border: '2px solid',
    borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all var(--transition)', marginTop: 1,
  },
  footer: { padding: '20px 24px 48px' },
  btn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '100%', height: 52, background: 'var(--primary)', color: '#fff',
    border: 'none', borderRadius: 'var(--radius-lg)',
    fontSize: 16, fontWeight: 600, marginBottom: 12, transition: 'all var(--transition)',
  },
  btnText: {
    display: 'block', width: '100%', background: 'none', border: 'none',
    color: 'var(--primary)', fontSize: 16, fontWeight: 500, cursor: 'pointer', textAlign: 'center',
  },
};

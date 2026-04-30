import { useLocation, Link } from 'react-router-dom';

const navItems = [
  {
    to: '/home',
    label: 'Home',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--primary)' : '#9E9E9E'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    to: '/missoes',
    label: 'Missões',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--primary)' : '#9E9E9E'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    to: '/carteira',
    label: 'Carteira',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--primary)' : '#9E9E9E'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    to: '/perfil',
    label: 'Perfil',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--primary)' : '#9E9E9E'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav style={styles.nav}>
      {navItems.map(({ to, label, icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to} style={{ ...styles.item, ...(active ? styles.active : {}) }}>
            {icon(active)}
            <span style={{ ...styles.label, color: active ? 'var(--primary)' : '#9E9E9E', fontWeight: active ? 700 : 500 }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 'var(--app-max-width)',
    height: 72,
    background: 'var(--white)',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 8px',
    zIndex: 100,
    boxShadow: '0 -2px 12px rgba(0,0,0,0.07)',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '8px 12px',
    flex: 1,
    textDecoration: 'none',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition)',
  },
  active: {},
  label: {
    fontSize: 11,
  },
};

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

import Splash        from './pages/Splash';
import Onboarding    from './pages/Onboarding';
import Lgpd          from './pages/Lgpd';
import HealthConnect from './pages/HealthConnect';
import Home          from './pages/Home';
import Missoes       from './pages/Missoes';
import Carteira      from './pages/Carteira';
import Perfil        from './pages/Perfis';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<Splash />} />
        <Route path="/onboarding"     element={<Onboarding />} />
        <Route path="/lgpd"           element={<Lgpd />} />
        <Route path="/health-connect" element={<HealthConnect />} />
        <Route path="/home"           element={<Home />} />
        <Route path="/missoes"        element={<Missoes />} />
        <Route path="/carteira"       element={<Carteira />} />
        <Route path="/perfil"         element={<Perfil />} />
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

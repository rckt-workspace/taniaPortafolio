import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import Empresa from './pages/Empresa';
import Experiencia from './pages/Experiencia';
import Portafolio from './pages/Portafolio';

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        // Espera a que la nueva página termine de montarse antes de hacer scroll.
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/experiencia" element={<Experiencia />} />
        <Route path="/portafolio" element={<Portafolio />} />
      </Routes>
      <Footer />
    </>
  );
}

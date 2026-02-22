import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoCirculo from '../assets/images/joseantoniocuenca-letra.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cierra el menú móvil y sube al top al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Nuestras Firmas', href: '/nuestras-firmas' },
    { label: 'Productos', href: '/productos' },
    { label: 'FAQ', href: '/preguntas-frecuentes' },
    { label: 'Contacto', href: '/contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-dark shadow-glass' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative">
            <img
              src={logoCirculo}
              alt="Jose Antonio Cuenca - Representante Colchones y Sistemas de Descanso"
              className="h-14 md:h-16 w-auto transition-all duration-300 group-hover:scale-105 brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <li key={item.label} style={{ animationDelay: `${index * 50}ms` }}>
                <Link
                  to={item.href}
                  className={`font-body text-sm font-medium transition-all duration-300 relative group py-2 ${
                    location.pathname === item.href
                      ? 'text-white'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-accent transition-colors relative group"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 animate-fade-in glass-dark rounded-2xl mt-4 p-6">
            <ul className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <li
                  key={item.label}
                  className="animate-slide-in-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    to={item.href}
                    className={`block font-body text-base font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                      location.pathname === item.href
                        ? 'text-white bg-white/10'
                        : 'text-white/90 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

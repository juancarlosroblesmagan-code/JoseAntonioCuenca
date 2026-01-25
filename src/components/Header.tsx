import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoBlanco from '../assets/images/JoseAntonioCuenca-logo--completo-blanco.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Sobre Nosotros', href: '#about' },
    { label: 'Marcas', href: '#brands' },
    { label: 'Productos', href: '#products' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-dark shadow-glass'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center group relative"
          >
            <img
              src={logoBlanco}
              alt="Jose Antonio Cuenca"
              className="h-14 md:h-20 w-auto transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item, index) => (
              <li key={item.label} style={{ animationDelay: `${index * 50}ms` }}>
                <a
                  href={item.href}
                  className="font-body text-sm font-medium text-white/90 hover:text-white transition-all duration-300 relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/20 blur-sm transition-all duration-300 group-hover:w-full" />
                </a>
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
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-body text-base font-medium text-white/90 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5"
                  >
                    {item.label}
                  </a>
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

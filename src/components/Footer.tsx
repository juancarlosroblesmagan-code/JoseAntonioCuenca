import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const brands = [
    { name: 'TORRESOL', url: 'https://torresolpiel.com/' },
    { name: 'KOALA', url: 'https://koalabeds.net/' },
    { name: 'KARIBIAN', url: 'https://karibiandescanso.com/' },
    { name: 'IVORIMATEX', url: 'https://ivorimatex.com/' },
    { name: 'B-SENSIBLE', url: 'https://bsensible.com/es/' },
  ];

  const quickLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Sobre Nosotros', href: '#about' },
    { label: 'Nuestras Marcas', href: '#brands' },
    { label: 'Productos', href: '#products' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Jose Antonio Cuenca
            </h3>
            <p className="font-body text-sm text-primary-foreground/80 mb-6 max-w-md">
              Desde 2002 vendiendo Calidad de Descanso. Distribuidor oficial de
              las mejores marcas de sistemas de descanso del mercado.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-primary-foreground/80">Hecho con</span>
              <Heart size={16} className="text-accent fill-accent" />
              <span className="text-primary-foreground/80">para tu descanso</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/80 hover:text-accent transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Nuestras Marcas
            </h4>
            <ul className="space-y-2">
              {brands.map((brand) => (
                <li key={brand.name}>
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-primary-foreground/80 hover:text-accent transition-colors inline-block"
                  >
                    {brand.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="font-body text-sm text-primary-foreground/60 text-center md:text-left">
              © {currentYear} Jose Antonio Cuenca. Todos los derechos reservados.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6">
              <a
                href="#"
                className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors"
              >
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

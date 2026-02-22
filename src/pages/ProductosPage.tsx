import { BookOpen, ArrowRight } from 'lucide-react';
import karibianLogo from '../assets/images/joseantoniocuenca-karibian-logo.png';
import koalaLogo from '../assets/images/joseantoniocuenca-koala-logo.png';
import torresolLogo from '../assets/images/joseantoniocuenca-torresol-logo.png';
import ivorimatexLogo from '../assets/images/joseantoniocuenca-ivorimatex-logo.png';
import bsensibleLogo from '../assets/images/joseantoniocuenca-B-Sensible-logo.png';

// NOTA: Actualizar URLs con las páginas exactas de catálogo de cada marca
const brands = [
  {
    name: 'KARIBIAN',
    h2: 'Colchones de Alta Gama Karibian',
    subtitle: 'Muelles ensacados y viscoelástica de alta densidad',
    catalogUrl: 'https://karibiandescanso.com/colchones/',
    logo: karibianLogo,
    gradient: 'from-purple-500/15 to-pink-500/5',
    logoScale: false,
  },
  {
    name: 'KOALA BEDS',
    h2: 'Canapés Abatibles Premium Koala Beds',
    subtitle: 'Bases tapizadas con pistones de gas y estructura reforzada',
    catalogUrl: 'https://koalabeds.net/canapes/',
    logo: koalaLogo,
    gradient: 'from-blue-500/15 to-cyan-500/5',
    logoScale: false,
  },
  {
    name: 'TORRESOL',
    h2: 'Sofás de Piel Torresol',
    subtitle: 'Maestros del confort. Líderes en diseño de sofás de máxima calidad',
    catalogUrl: 'https://torresolpiel.com/sofas/',
    logo: torresolLogo,
    gradient: 'from-orange-500/15 to-amber-500/5',
    logoScale: true, // logo pequeño, ampliar
  },
  {
    name: 'IVORIMATEX',
    h2: 'Almohadas Cervicales Ivorimatex',
    subtitle: 'La mayor colección de almohadas ergonómicas del sector',
    catalogUrl: 'https://ivorimatex.com/almohadas/',
    logo: ivorimatexLogo,
    gradient: 'from-green-500/15 to-emerald-500/5',
    logoScale: false,
  },
  {
    name: 'B-SENSIBLE',
    h2: 'Ropa de Cama B-Sensible',
    subtitle: 'Protectores inteligentes que cuidan tu descanso y tu salud',
    catalogUrl: 'https://bsensible.com/es/collections/',
    logo: bsensibleLogo,
    gradient: 'from-indigo-500/15 to-violet-500/5',
    logoScale: false,
  },
];

const otherProducts = [
  { name: 'INDUSTRIAS RODRIGO', url: 'https://ivorimatex.com/' },
  { name: 'SOMIERES JOVER', url: 'https://ivorimatex.com/' },
];

const ProductosPage = () => {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-transparent to-black/50" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 blur-2xl" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full text-white/80 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Productos seleccionados de las mejores firmas
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Lo Mejor de <span className="text-gradient">Cada Firma</span>
          </h1>
          <h2 className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Catálogo completo de colchones, canapés abatibles, sofás de piel, almohadas cervicales y ropa de cama premium
          </h2>
        </div>
      </section>

      {/* BRANDS GRID */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <a
                key={brand.name}
                href={brand.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-card rounded-3xl overflow-hidden shadow-glass hover:shadow-elevated transition-all duration-500 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Logo area */}
                <div className="relative h-52 flex items-center justify-center bg-white/80 border-b border-border/30 overflow-hidden p-8">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20" />
                  <img
                    src={brand.logo}
                    alt={`${brand.name} catálogo`}
                    className={`relative z-10 object-contain transition-all duration-500 group-hover:scale-110 ${
                      brand.logoScale
                        ? 'h-16 w-auto max-w-[260px]'
                        : 'max-h-28 max-w-[240px] w-auto'
                    }`}
                    style={brand.logoScale ? { transform: 'scale(1.4)' } : {}}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-7">
                  <h2 className="font-display text-lg font-black text-primary mb-2 group-hover:text-accent transition-colors duration-300 leading-tight">
                    {brand.h2}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground mb-5 leading-relaxed">
                    {brand.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <BookOpen size={15} />
                    <span>Ver catálogo</span>
                    <ArrowRight size={14} className="ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* OTROS PRODUCTOS — sección discreta */}
      <section className="py-12 bg-muted/20 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-xs uppercase tracking-widest text-muted-foreground/60 text-center mb-4">
            Otros productos relacionados
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {otherProducts.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 px-4 py-2 border border-border/30 rounded-lg hover:border-border"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default ProductosPage;

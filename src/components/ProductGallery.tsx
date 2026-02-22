import { BookOpen } from 'lucide-react';
import karibianLogo from '../assets/images/joseantoniocuenca-karibian-logo.png';
import koalaLogo from '../assets/images/joseantoniocuenca-koala-logo.png';
import torresolLogo from '../assets/images/joseantoniocuenca-torresol-logo.png';
import ivorimatexLogo from '../assets/images/joseantoniocuenca-ivorimatex-logo.png';
import bsensibleLogo from '../assets/images/joseantoniocuenca-B-Sensible-logo.png';

// URLs de catálogos de cada marca (sección donde aparecen todas las series del catálogo)
// NOTA: Verificar y actualizar las URLs con las páginas de catálogo correctas de cada web
const brands = [
  {
    name: 'KARIBIAN',
    catalogUrl: 'https://karibiandescanso.com/colchones/',
    logo: karibianLogo,
    description: 'Ver catálogo',
    gradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    name: 'KOALA BEDS',
    catalogUrl: 'https://koalabeds.net/canapes/',
    logo: koalaLogo,
    description: 'Ver catálogo',
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    name: 'TORRESOL',
    catalogUrl: 'https://torresolpiel.com/sofas/',
    logo: torresolLogo,
    description: 'Maestros del confort. Líderes en diseño de sofás de máxima calidad',
    gradient: 'from-orange-500/10 to-amber-500/10',
  },
  {
    name: 'IVORIMATEX',
    catalogUrl: 'https://ivorimatex.com/almohadas/',
    logo: ivorimatexLogo,
    description: 'Almohadas de calidad. La mayor colección de productos disponible en el sector.',
    gradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    name: 'BSENSIBLE',
    catalogUrl: 'https://bsensible.com/es/collections/',
    logo: bsensibleLogo,
    description: 'Ropa de cama que protege tu descanso y tu salud',
    gradient: 'from-indigo-500/10 to-violet-500/10',
  },
];

// Otros productos relacionados (marcas secundarias - menos destacadas)
// NOTA: Actualizar las URLs con las páginas correctas de cada fabricante
const otherProducts = [
  {
    name: 'INDUSTRIAS RODRIGO',
    url: 'https://ivorimatex.com/',
  },
  {
    name: 'SOMIERES JOVER',
    url: 'https://ivorimatex.com/',
  },
];

const ProductGallery = () => {
  return (
    <section id="products" className="py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-6">
            Lo Mejor de <span className="text-gradient">Cada Marca</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
            Descubre nuestra selección de productos premium de las mejores marcas del sector
          </p>
        </div>

        {/* Brands Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <a
              key={brand.name}
              href={brand.catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-card rounded-3xl p-8 shadow-glass hover:shadow-elevated transition-all duration-500 hover-lift overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Logo Container */}
                <div className="w-full h-40 flex items-center justify-center mb-6 p-6 rounded-2xl bg-background/50 backdrop-blur-sm group-hover:bg-white transition-colors duration-300">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-w-full max-h-full object-contain filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Brand Name */}
                <h3 className="font-display text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                  {brand.name}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
                  {brand.description}
                </p>

                {/* Link Indicator */}
                <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  <BookOpen size={16} />
                  <span>Ver catálogo</span>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </a>
          ))}
        </div>

        {/* Otros Productos Relacionados */}
        <div className="mt-20 animate-fade-up" style={{ animationDelay: '600ms' }}>
          <h3 className="font-display text-xl font-semibold text-muted-foreground mb-6 text-center">
            Otros Productos Relacionados
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {otherProducts.map((product) => (
              <a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-muted-foreground/70 hover:text-accent transition-colors duration-300 px-4 py-2 border border-border/40 rounded-lg hover:border-accent/40"
              >
                {product.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;

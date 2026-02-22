import { BookOpen } from 'lucide-react';
import karibianLogo from '../assets/images/joseantoniocuenca-karibian-logo.png';
import koalaLogo from '../assets/images/joseantoniocuenca-koala-logo.png';
import torresolLogo from '../assets/images/joseantoniocuenca-torresol-logo.png';
import ivorimatexLogo from '../assets/images/joseantoniocuenca-ivorimatex-logo.png';
import bsensibleLogo from '../assets/images/joseantoniocuenca-B-Sensible-logo.png';

// URLs de catálogos - verificar y actualizar con las páginas exactas de cada marca
const brands = [
  {
    name: 'KARIBIAN',
    /* H2 keyword: colchones alta gama muelles ensacados catalogo */
    h2: 'Colchones de Alta Gama Karibian – Muelles Ensacados y Viscoelástica',
    catalogUrl: 'https://karibiandescanso.com/colchones/',
    logo: karibianLogo,
    description: 'Ver catálogo',
    gradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    name: 'KOALA BEDS',
    /* H2 keyword: canapes abatibles premium catalogo koala */
    h2: 'Canapés Abatibles Premium Koala Beds – Bases Tapizadas de Alta Calidad',
    catalogUrl: 'https://koalabeds.net/canapes/',
    logo: koalaLogo,
    description: 'Ver catálogo',
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    name: 'TORRESOL',
    /* H2 keyword: sofas piel diseño exclusivo torresol */
    h2: 'Sofás de Piel Torresol – Maestros del Confort y el Diseño Exclusivo',
    catalogUrl: 'https://torresolpiel.com/sofas/',
    logo: torresolLogo,
    description: 'Maestros del confort. Líderes en diseño de sofás de máxima calidad',
    gradient: 'from-orange-500/10 to-amber-500/10',
  },
  {
    name: 'IVORIMATEX',
    /* H2 keyword: almohadas cervicales catalogo ivorimatex */
    h2: 'Almohadas Cervicales Ivorimatex – La Mayor Colección del Sector',
    catalogUrl: 'https://ivorimatex.com/almohadas/',
    logo: ivorimatexLogo,
    description: 'Almohadas de calidad. La mayor colección de productos disponible en el sector.',
    gradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    name: 'BSENSIBLE',
    /* H2 keyword: ropa cama inteligente protectores bsensible */
    h2: 'Ropa de Cama B-Sensible – Protectores Inteligentes para tu Descanso y tu Salud',
    catalogUrl: 'https://bsensible.com/es/collections/',
    logo: bsensibleLogo,
    description: 'Ropa de cama que protege tu descanso y tu salud',
    gradient: 'from-indigo-500/10 to-violet-500/10',
  },
];

const otherProducts = [
  { name: 'INDUSTRIAS RODRIGO', url: 'https://ivorimatex.com/' },
  { name: 'SOMIERES JOVER', url: 'https://ivorimatex.com/' },
];

const ProductosPage = () => {
  return (
    <main>
      {/* Hero banner */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* H1 - Keyword principal: catalogo colchones canapes sofas almohadas */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Catálogo de Colchones, Canapés Abatibles, Sofás y Almohadas Premium
          </h1>
          {/* H2 - Keyword: productos sistemas descanso alta gama */}
          <h2 className="font-display text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto">
            Lo mejor de cada firma: productos de sistemas de descanso de alta gama seleccionados para maximizar la calidad de vida de tus clientes
          </h2>
        </div>
      </section>

      {/* Catálogos por marca */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                className="group relative bg-card rounded-3xl p-8 shadow-glass hover:shadow-elevated transition-all duration-500 hover-lift overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  {/* Logo */}
                  <div className="w-full h-40 flex items-center justify-center mb-6 p-6 rounded-2xl bg-background/50 backdrop-blur-sm group-hover:bg-white transition-colors duration-300">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} catálogo productos`}
                      className="max-w-full max-h-full object-contain filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* H2 por marca */}
                  <h2 className="font-display text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {brand.h2}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
                    {brand.description}
                  </p>
                  <a
                    href={brand.catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all duration-300"
                  >
                    <BookOpen size={16} />
                    <span>Ver catálogo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Otros Productos Relacionados */}
          <div className="mt-20">
            {/* H3 - otros productos relacionados */}
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
    </main>
  );
};

export default ProductosPage;

import { ExternalLink, Sparkles, Award } from 'lucide-react';
import torresolLogo from '../assets/images/joseantoniocuenca-torresol-logo.png';
import koalaLogo from '../assets/images/joseantoniocuenca-koala-logo.png';
import karibianLogo from '../assets/images/joseantoniocuenca-karibian-logo.png';
import ivorimatexLogo from '../assets/images/joseantoniocuenca-ivorimatex-logo.png';
import bsensibleLogo from '../assets/images/joseantoniocuenca-B-Sensible-logo.png';

const brands = [
  {
    name: 'TORRESOL',
    url: 'https://torresolpiel.com/',
    logo: torresolLogo,
    description: 'Especialistas en pieles y tapicerías de alta calidad',
    gradient: 'from-orange-500/10 to-amber-500/10',
  },
  {
    name: 'KOALA',
    url: 'https://koalabeds.net/',
    logo: koalaLogo,
    description: 'Innovación en descanso y confort',
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    name: 'KARIBIAN',
    url: 'https://karibiandescanso.com/',
    logo: karibianLogo,
    description: 'Sistemas de descanso premium',
    gradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    name: 'IVORIMATEX',
    url: 'https://ivorimatex.com/',
    logo: ivorimatexLogo,
    description: 'Textiles de máxima calidad para el descanso',
    gradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    name: 'B-SENSIBLE',
    url: 'https://bsensible.com/es/',
    logo: bsensibleLogo,
    description: 'Soluciones inteligentes para tu descanso',
    gradient: 'from-indigo-500/10 to-violet-500/10',
  },
];

const Brands = () => {
  return (
    <section id="brands" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-accent text-sm font-medium mb-6">
            <Sparkles size={14} />
            <span>Marcas de confianza</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-6">
            Nuestras <span className="text-gradient">Marcas</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
            Trabajamos con las mejores marcas del sector para ofrecerte
            productos de máxima calidad y garantía
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <a
              key={brand.name}
              href={brand.url}
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
                  <span>Visitar sitio web</span>
                  <ExternalLink size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center animate-fade-up" style={{ animationDelay: '600ms' }}>
          <div className="inline-flex flex-col items-center gap-4 glass p-8 rounded-3xl max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Award size={32} className="text-accent" />
            </div>
            <p className="font-body text-base text-foreground/80 leading-relaxed">
              Como distribuidor oficial, garantizamos la autenticidad de todos
              nuestros productos y el mejor servicio postventa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

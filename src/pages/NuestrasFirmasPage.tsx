import { BookOpen, ExternalLink } from 'lucide-react';
import karibianLogo from '../assets/images/joseantoniocuenca-karibian-logo.png';
import koalaLogo from '../assets/images/joseantoniocuenca-koala-logo.png';
import torresolLogo from '../assets/images/joseantoniocuenca-torresol-logo.png';
import ivorimatexLogo from '../assets/images/joseantoniocuenca-ivorimatex-logo.png';
import bsensibleLogo from '../assets/images/joseantoniocuenca-B-Sensible-logo.png';

const brands = [
  {
    name: 'KARIBIAN',
    h2: 'Karibian Descanso – Colchones de Alta Gama con Muelles Ensacados y Viscoelástica',
    h3: 'Sistemas de Descanso Premium para el Máximo Confort',
    presentationUrl: 'https://karibiandescanso.com/',
    logo: karibianLogo,
    description: 'Karibian es una de las marcas líderes en colchones de alta gama. Sus colchones incorporan tecnología de muelles ensacados, viscoelástica de alta densidad y materiales naturales, todos con certificación sanitaria y garantías extendidas.',
    keywords: ['Muelles ensacados', 'Viscoelástica alta densidad', 'Certificación sanitaria', 'Materiales naturales'],
    accent: 'from-purple-500/20 to-pink-500/10',
    darkAccent: 'bg-purple-500/10',
  },
  {
    name: 'KOALA BEDS',
    h2: 'Koala Beds – Canapés Abatibles Premium y Bases de Cama de Máxima Calidad',
    h3: 'Optimiza el Espacio con los Mejores Canapés Abatibles del Mercado',
    presentationUrl: 'https://koalabeds.net/',
    logo: koalaLogo,
    description: 'Koala Beds es la marca especializada en canapés abatibles de alta calidad. Sus modelos incorporan apertura fácil mediante pistones de gas, estructura reforzada y tapizados premium. Perfectos para maximizar el espacio de almacenaje en cualquier dormitorio.',
    keywords: ['Canapés abatibles', 'Pistones de gas', 'Estructura reforzada', 'Tapizados premium'],
    accent: 'from-blue-500/20 to-cyan-500/10',
    darkAccent: 'bg-blue-500/10',
  },
  {
    name: 'TORRESOL',
    h2: 'Torresol – Maestros del Confort. Líderes en Sofás de Piel de Alta Gama',
    h3: 'Sofás con Diseños Exclusivos en Piel Natural de Primera Calidad',
    presentationUrl: 'https://torresolpiel.com/',
    logo: torresolLogo,
    description: 'Torresol es líder en el diseño y fabricación de sofás de alta gama. Fabrican prácticamente todos sus modelos con pieles de primera calidad, ofreciendo una amplia gama de colores y acabados exclusivos con una durabilidad y confort superiores.',
    keywords: ['Sofás de piel', 'Diseño exclusivo', 'Alta durabilidad', 'Amplia gama de colores'],
    accent: 'from-orange-500/20 to-amber-500/10',
    darkAccent: 'bg-orange-500/10',
  },
  {
    name: 'IVORIMATEX',
    h2: 'Ivorimatex – Almohadas Cervicales de Calidad. La Mayor Colección del Sector',
    h3: 'Almohadas Ergonómicas e Hipoalergénicas para un Descanso Saludable',
    presentationUrl: 'https://ivorimatex.com/',
    logo: ivorimatexLogo,
    description: 'Ivorimatex es especialista en almohadas ergonómicas de alta calidad. Sus productos están fabricados con viscoelástica y viscocell, diseñados para ofrecer un soporte cervical óptimo. Son hipoalergénicas y cuentan con fundas transpirables para un descanso fresco y saludable.',
    keywords: ['Almohadas cervicales', 'Viscoelástica y viscocell', 'Hipoalergénicas', 'Soporte cervical óptimo'],
    accent: 'from-green-500/20 to-emerald-500/10',
    darkAccent: 'bg-green-500/10',
  },
  {
    name: 'B-SENSIBLE',
    h2: 'B-Sensible – Ropa de Cama Inteligente que Protege tu Descanso y tu Salud',
    h3: 'Protectores de Colchón Impermeables, Transpirables y Antiácaros',
    presentationUrl: 'https://bsensible.com/es/',
    logo: bsensibleLogo,
    description: 'B-Sensible es líder en protectores y sábanas con tecnología inteligente. Sus productos son impermeables pero transpirables, protegen contra ácaros, bacterias y alérgenos, y son muy fáciles de lavar. Ideales para personas alérgicas, niños o para prolongar la vida útil del colchón.',
    keywords: ['Impermeables y transpirables', 'Antiácaros y antibacterianos', 'Fácil lavado', 'Protección alérgenos'],
    accent: 'from-indigo-500/20 to-violet-500/10',
    darkAccent: 'bg-indigo-500/10',
  },
];

const NuestrasFirmasPage = () => {
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
            Más de 40 países en los mercados internacionales
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Nuestras <span className="text-gradient">Firmas</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Trabajamos con las mejores marcas del sector para ofrecerte productos de máxima
            calidad y garantía, posicionadas en los mercados internacionales más exigentes
          </p>
        </div>
      </section>

      {/* BRANDS — alternating layout */}
      <section className="bg-background">
        {brands.map((brand, index) => (
          <div
            key={brand.name}
            className={`py-20 ${index % 2 !== 0 ? 'bg-muted/30' : 'bg-background'} relative overflow-hidden`}
          >
            {/* subtle bg decoration */}
            <div className={`absolute top-0 ${index % 2 !== 0 ? 'left-0' : 'right-0'} w-80 h-80 rounded-full ${brand.darkAccent} blur-3xl opacity-50`} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>

                {/* Logo card */}
                <div className={`${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                  <div className={`group relative bg-gradient-to-br ${brand.accent} rounded-3xl p-12 flex items-center justify-center shadow-glass hover:shadow-elevated transition-all duration-500 hover-lift overflow-hidden`}
                       style={{ minHeight: '280px' }}>
                    <div className="absolute inset-0 bg-white/50 rounded-3xl" />
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="relative z-10 max-h-28 w-auto object-contain transition-all duration-500 group-hover:scale-110"
                      style={{ maxWidth: '280px', minWidth: '180px' }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''} space-y-6`}>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-primary leading-tight">
                    {brand.h2}
                  </h2>
                  <h3 className="font-display text-base md:text-lg font-semibold text-accent">
                    {brand.h3}
                  </h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Keywords pills */}
                  <div className="flex flex-wrap gap-2">
                    {brand.keywords.map((kw) => (
                      <span key={kw} className="inline-flex items-center font-body text-xs font-medium text-foreground/70 bg-muted px-3 py-1.5 rounded-full border border-border/50">
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3 pt-2">
                    <a
                      href={brand.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-bold text-sm bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-105"
                    >
                      <BookOpen size={16} />
                      Ver catálogo
                    </a>
                    <a
                      href={brand.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-bold text-sm bg-card border border-border text-foreground rounded-2xl shadow-glass hover:shadow-elevated transition-all duration-300 hover:border-accent/40"
                    >
                      <ExternalLink size={16} />
                      Web oficial
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

    </main>
  );
};

export default NuestrasFirmasPage;

import { BookOpen } from 'lucide-react';
import karibianLogo from '../assets/images/joseantoniocuenca-karibian-logo.png';
import koalaLogo from '../assets/images/joseantoniocuenca-koala-logo.png';
import torresolLogo from '../assets/images/joseantoniocuenca-torresol-logo.png';
import ivorimatexLogo from '../assets/images/joseantoniocuenca-ivorimatex-logo.png';
import bsensibleLogo from '../assets/images/joseantoniocuenca-B-Sensible-logo.png';

const brands = [
  {
    name: 'KARIBIAN',
    /* H2 keyword: Karibian colchones alta gama muelles ensacados */
    h2: 'Karibian Descanso – Colchones de Alta Gama con Muelles Ensacados y Viscoelástica',
    /* H3 keyword: sistemas de descanso premium karibian */
    h3: 'Sistemas de Descanso Premium para el Máximo Confort',
    presentationUrl: 'https://karibiandescanso.com/',
    logo: karibianLogo,
    description: 'Karibian es una de las marcas líderes en colchones de alta gama. Sus colchones incorporan tecnología de muelles ensacados, viscoelástica de alta densidad y materiales naturales, todos con certificación sanitaria y garantías extendidas.',
    gradient: 'from-purple-500/10 to-pink-500/10',
    keywords: ['Colchones de muelles ensacados', 'Viscoelástica alta densidad', 'Certificación sanitaria', 'Materiales naturales'],
  },
  {
    name: 'KOALA BEDS',
    /* H2 keyword: Koala Beds canapés abatibles premium */
    h2: 'Koala Beds – Canapés Abatibles Premium y Bases de Cama de Máxima Calidad',
    /* H3 keyword: almacenaje canape abatible */
    h3: 'Optimiza el Espacio con los Mejores Canapés Abatibles del Mercado',
    presentationUrl: 'https://koalabeds.net/',
    logo: koalaLogo,
    description: 'Koala Beds es la marca especializada en canapés abatibles de alta calidad. Sus modelos incorporan apertura fácil mediante pistones de gas, estructura reforzada y tapizados premium. Perfectos para maximizar el espacio de almacenaje en cualquier dormitorio.',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    keywords: ['Canapés abatibles', 'Pistones de gas', 'Estructura reforzada', 'Tapizados premium'],
  },
  {
    name: 'TORRESOL',
    /* H2 keyword: Torresol sofas piel diseño */
    h2: 'Torresol – Maestros del Confort. Líderes en Sofás de Piel de Alta Gama',
    /* H3 keyword: sofas diseño exclusivo piel natural */
    h3: 'Sofás con Diseños Exclusivos en Piel Natural de Primera Calidad',
    presentationUrl: 'https://torresolpiel.com/',
    logo: torresolLogo,
    description: 'Torresol es líder en el diseño y fabricación de sofás de alta gama. Fabrican prácticamente todos sus modelos con pieles de primera calidad, ofreciendo una amplia gama de colores y acabados exclusivos con una durabilidad y confort superiores.',
    gradient: 'from-orange-500/10 to-amber-500/10',
    keywords: ['Sofás de piel', 'Diseño exclusivo', 'Alta durabilidad', 'Amplia gama de colores'],
  },
  {
    name: 'IVORIMATEX',
    /* H2 keyword: Ivorimatex almohadas cervicales viscoelastica */
    h2: 'Ivorimatex – Almohadas Cervicales de Calidad. La Mayor Colección del Sector',
    /* H3 keyword: almohadas ergonomicas hipoalergenicas descanso */
    h3: 'Almohadas Ergonómicas e Hipoalergénicas para un Descanso Saludable',
    presentationUrl: 'https://ivorimatex.com/',
    logo: ivorimatexLogo,
    description: 'Ivorimatex es especialista en almohadas ergonómicas de alta calidad. Sus productos están fabricados con viscoelástica y viscocell, diseñados para ofrecer un soporte cervical óptimo. Son hipoalergénicas y cuentan con fundas transpirables para un descanso fresco y saludable.',
    gradient: 'from-green-500/10 to-emerald-500/10',
    keywords: ['Almohadas cervicales', 'Viscoelástica y viscocell', 'Hipoalergénicas', 'Soporte cervical óptimo'],
  },
  {
    name: 'BSENSIBLE',
    /* H2 keyword: BSensible ropa cama protectores inteligentes */
    h2: 'B-Sensible – Ropa de Cama Inteligente que Protege tu Descanso y tu Salud',
    /* H3 keyword: protectores colchon impermeable transpirable */
    h3: 'Protectores de Colchón Impermeables, Transpirables y Antiácaros',
    presentationUrl: 'https://bsensible.com/es/',
    logo: bsensibleLogo,
    description: 'B-Sensible es líder en protectores y sábanas con tecnología inteligente. Sus productos son impermeables pero transpirables, protegen contra ácaros, bacterias y alérgenos, y son muy fáciles de lavar. Ideales para personas alérgicas, niños o para prolongar la vida útil del colchón.',
    gradient: 'from-indigo-500/10 to-violet-500/10',
    keywords: ['Impermeables y transpirables', 'Antiácaros y antibacterianos', 'Fácil lavado', 'Protección alérgenos'],
  },
];

const NuestrasFirmasPage = () => {
  return (
    <main>
      {/* Hero banner */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* H1 - Keyword principal: marcas colchones sofas sistemas descanso */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Nuestras Firmas | Marcas de Colchones, Sofás y Sistemas de Descanso Premium
          </h1>
          <p className="font-body text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Trabajamos con las mejores marcas del sector para ofrecerte productos de máxima
            calidad y garantía. Posicionadas en los mercados internacionales más exigentes,
            llegando a comercializar sus productos en más de 40 países.
          </p>
        </div>
      </section>

      {/* Marcas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}
              >
                {/* Logo y CTA */}
                <div className={`${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                  <div className={`bg-gradient-to-br ${brand.gradient} rounded-3xl p-12 flex items-center justify-center shadow-glass`}>
                    <img
                      src={brand.logo}
                      alt={`${brand.name} - representante oficial`}
                      className="max-h-32 max-w-xs object-contain"
                    />
                  </div>
                </div>

                {/* Contenido */}
                <div className={`${index % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  {/* H2 - por marca */}
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
                    {brand.h2}
                  </h2>
                  {/* H3 - subtítulo marca */}
                  <h3 className="font-display text-lg font-semibold text-accent mb-4">
                    {brand.h3}
                  </h3>
                  <p className="font-body text-base text-muted-foreground mb-6 leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Keywords como puntos clave */}
                  <ul className="grid grid-cols-2 gap-2 mb-8">
                    {brand.keywords.map((kw) => (
                      <li key={kw} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {kw}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={brand.presentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 font-body font-bold text-base bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-105"
                  >
                    <BookOpen size={18} />
                    Ver catálogo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default NuestrasFirmasPage;

import { ExternalLink } from 'lucide-react';

const brands = [
  {
    name: 'TORRESOL',
    url: 'https://torresolpiel.com/',
    logo: 'https://torresolpiel.com/wp-content/uploads/2021/05/logo-torresol-piel.png',
    description: 'Especialistas en pieles y tapicerías de alta calidad',
  },
  {
    name: 'KOALA',
    url: 'https://koalabeds.net/',
    logo: 'https://koalabeds.net/cdn/shop/files/Koala_logo.png',
    description: 'Innovación en descanso y confort',
  },
  {
    name: 'KARIBIAN',
    url: 'https://karibiandescanso.com/',
    logo: 'https://karibiandescanso.com/wp-content/uploads/2023/01/logo-karibian.png',
    description: 'Sistemas de descanso premium',
  },
  {
    name: 'IVORIMATEX',
    url: 'https://ivorimatex.com/',
    logo: 'https://ivorimatex.com/wp-content/uploads/2022/03/logo-ivorimatex.png',
    description: 'Textiles de máxima calidad para el descanso',
  },
  {
    name: 'B-SENSIBLE',
    url: 'https://bsensible.com/es/',
    logo: 'https://bsensible.com/wp-content/uploads/2021/01/logo-b-sensible.png',
    description: 'Soluciones inteligentes para tu descanso',
  },
];

const Brands = () => {
  return (
    <section id="brands" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Nuestras Marcas
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">
            Trabajamos con las mejores marcas del sector para ofrecerte
            productos de máxima calidad y garantía
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {brands.map((brand, index) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card rounded-sm shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8 flex flex-col items-center justify-center min-h-[280px]">
                {/* Logo Container */}
                <div className="w-full h-32 flex items-center justify-center mb-6 bg-background rounded-sm p-4">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<span class="font-display text-2xl font-bold text-primary">${brand.name}</span>`;
                    }}
                  />
                </div>

                {/* Brand Name */}
                <h3 className="font-display text-2xl font-bold text-primary mb-3 text-center">
                  {brand.name}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground text-center mb-4">
                  {brand.description}
                </p>

                {/* Link Indicator */}
                <div className="flex items-center gap-2 text-accent group-hover:text-accent/80 transition-colors">
                  <span className="font-body text-sm font-medium">Visitar sitio web</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
            Como distribuidor oficial, garantizamos la autenticidad de todos
            nuestros productos y el mejor servicio postventa
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brands;

import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    title: 'Colchones Premium',
    brand: 'KOALA',
    brandUrl: 'https://koalabeds.net/',
    image: '/productos/colchon-premium-koala.webp',
    description: 'Los mejores colchones con tecnología avanzada para un descanso reparador',
    features: ['Viscoelástica de alta densidad', 'Adaptación ergonómica', 'Certificado sanitario'],
  },
  {
    id: 2,
    title: 'Bases Tapizadas',
    brand: 'TORRESOL',
    brandUrl: 'https://torresolpiel.com/',
    image: '/productos/base-tapizada-torresol.webp',
    description: 'Bases de máxima calidad con tapizados exclusivos en piel y tela',
    features: ['Estructura reforzada', 'Tapizados premium', 'Diseño personalizable'],
  },
  {
    id: 3,
    title: 'Sistemas de Descanso',
    brand: 'KARIBIAN',
    brandUrl: 'https://karibiandescanso.com/',
    image: '/productos/dormitorio-lujo-karibian.webp',
    description: 'Conjuntos completos de descanso diseñados para el máximo confort',
    features: ['Colchón + somier', 'Tecnología avanzada', 'Garantía extendida'],
  },
  {
    id: 4,
    title: 'Textil de Hogar',
    brand: 'IVORIMATEX',
    brandUrl: 'https://ivorimatex.com/',
    image: '/productos/textil-ivorimatex.webp',
    description: 'Ropa de cama y textiles de la más alta calidad para tu hogar',
    features: ['Algodón egipcio', 'Hipoalergénico', 'Acabados de lujo'],
  },
  {
    id: 5,
    title: 'Protectores Inteligentes',
    brand: 'B-SENSIBLE',
    brandUrl: 'https://bsensible.com/es/',
    image: '/productos/dormitorio-moderno-elegante.webp',
    description: 'Fundas y protectores con tecnología impermeable y transpirable',
    features: ['Impermeable', 'Transpirable', 'Antiácaros'],
  },
  {
    id: 6,
    title: 'Cabeceros de Diseño',
    brand: 'TORRESOL',
    brandUrl: 'https://torresolpiel.com/',
    image: '/productos/dormitorio-contemporaneo.webp',
    description: 'Cabeceros exclusivos tapizados en piel y tela de alta gama',
    features: ['Diseño exclusivo', 'Materiales premium', 'A medida'],
  },
];

const ProductGallery = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="products" className="py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-accent text-sm font-medium mb-6">
            <Sparkles size={14} />
            <span>Productos seleccionados</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-6">
            Lo Mejor de <span className="text-gradient">Cada Marca</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
            Descubre nuestra selección de productos premium de las mejores marcas del sector
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <a
              key={product.id}
              href={product.brandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-card rounded-3xl overflow-hidden shadow-glass hover:shadow-elevated transition-all duration-500 hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.title} - ${product.brand}`}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === product.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Brand Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block font-body text-xs font-bold uppercase tracking-wider text-white bg-accent/90 px-4 py-2 rounded-full">
                    {product.brand}
                  </span>
                </div>

                {/* Title on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {product.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  <span>Ver en {product.brand}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 glass p-8 rounded-3xl">
            <p className="font-body text-base text-foreground/80">
              ¿Necesitas asesoramiento personalizado?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-body font-bold text-base bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-105"
            >
              Contacta con Nosotros
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;

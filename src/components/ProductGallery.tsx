import { useState } from 'react';

const products = [
  {
    id: 1,
    title: 'Colchones Premium',
    brand: 'Koala & Karibian',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop',
    description: 'Máximo confort para tu descanso',
  },
  {
    id: 2,
    title: 'Bases Tapizadas',
    brand: 'Torresol',
    image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=2074&auto=format&fit=crop',
    description: 'Elegancia y funcionalidad',
  },
  {
    id: 3,
    title: 'Textil Premium',
    brand: 'Ivorimatex',
    image: 'https://images.unsplash.com/photo-1615800098779-1be32e60cca3?q=80&w=2070&auto=format&fit=crop',
    description: 'Tejidos de alta calidad',
  },
  {
    id: 4,
    title: 'Almohadas Inteligentes',
    brand: 'B-Sensible',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2070&auto=format&fit=crop',
    description: 'Tecnología para tu bienestar',
  },
  {
    id: 5,
    title: 'Cabeceros de Diseño',
    brand: 'Torresol',
    image: 'https://images.unsplash.com/photo-1578898886225-c5e1b6c523e2?q=80&w=2070&auto=format&fit=crop',
    description: 'Exclusividad en cada detalle',
  },
  {
    id: 6,
    title: 'Ropa de Cama Luxury',
    brand: 'Ivorimatex',
    image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=2070&auto=format&fit=crop',
    description: 'Suavidad incomparable',
  },
];

const ProductGallery = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="products" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Nuestros Productos
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">
            Descubre nuestra selección de productos premium para transformar tu
            descanso en una experiencia única
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-sm shadow-soft hover:shadow-hover transition-all duration-500 transform hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === product.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent transition-opacity duration-500 ${
                    hoveredId === product.id ? 'opacity-90' : 'opacity-70'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div
                  className={`transform transition-all duration-500 ${
                    hoveredId === product.id
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  }`}
                >
                  <span className="inline-block font-body text-xs uppercase tracking-wider text-accent-foreground/80 bg-accent/80 px-3 py-1 rounded-sm mb-3">
                    {product.brand}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {product.title}
                </h3>

                <p
                  className={`font-body text-sm text-white/90 transform transition-all duration-500 ${
                    hoveredId === product.id
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  }`}
                >
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-body text-base text-muted-foreground mb-6">
            ¿Necesitas asesoramiento para elegir el producto perfecto?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-base bg-accent hover:bg-accent/90 text-accent-foreground rounded-sm shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-105"
          >
            Contacta con Nosotros
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;

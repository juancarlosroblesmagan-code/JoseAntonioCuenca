import { Tag } from 'lucide-react';

// =====================================================
// EDITAR PROMOCIONES AQUÍ
// Añade, modifica o elimina objetos en este array para
// gestionar las promociones mensuales/trimestrales.
// Cuando no haya promociones activas, deja el array vacío: []
// =====================================================
const promotions = [
  // Ejemplo de promoción. Eliminar o reemplazar con las actuales:
  // {
  //   id: 1,
  //   brand: 'KARIBIAN',
  //   title: 'Oferta de temporada',
  //   description: 'Descuento especial en colchones seleccionados durante este mes.',
  //   validUntil: 'Válido hasta el 28 de febrero de 2026',
  //   badge: 'Febrero 2026',
  // },
];

// Tipo de promoción (para referencia):
// {
//   id: number,
//   brand: string,          // Nombre de la marca
//   title: string,          // Título de la promoción
//   description: string,    // Descripción detallada
//   validUntil: string,     // Fecha de validez (texto libre)
//   badge: string,          // Etiqueta (ej: "Enero 2026", "Q1 2026")
// }

const Promotions = () => {
  if (promotions.length === 0) return null;

  return (
    <section id="promotions" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-accent text-sm font-medium mb-6">
            <Tag size={14} />
            <span>Ofertas especiales</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Promociones
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Las mejores ofertas del mes en productos seleccionados
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-card rounded-3xl p-8 shadow-glass hover:shadow-elevated transition-all duration-300 hover-lift border border-accent/20"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block font-body text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                  {promo.brand}
                </span>
                <span className="font-body text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                  {promo.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-primary mb-3">
                {promo.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                {promo.description}
              </p>

              {/* Valid until */}
              <p className="font-body text-xs text-muted-foreground/70 italic">
                {promo.validUntil}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;

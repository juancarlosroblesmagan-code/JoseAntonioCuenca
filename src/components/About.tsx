import { Award, Users, Heart, TrendingUp } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Experiencia desde 2002',
      description: 'Más de 20 años ofreciendo calidad de descanso a nuestros clientes',
    },
    {
      icon: Users,
      title: 'Atención Personalizada',
      description: 'Asesoramiento profesional para encontrar el sistema de descanso perfecto',
    },
    {
      icon: Heart,
      title: 'Compromiso con la Calidad',
      description: 'Solo trabajamos con las mejores marcas y productos del mercado',
    },
    {
      icon: TrendingUp,
      title: 'Crecimiento Continuo',
      description: 'Innovando constantemente para ofrecer las últimas tendencias',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative animate-fade-up">
            <div className="relative rounded-sm overflow-hidden shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop"
                alt="Luxury bedroom interior"
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground p-8 rounded-sm shadow-elevated">
              <div className="text-center">
                <div className="font-display text-5xl font-bold mb-2">+20</div>
                <div className="font-body text-sm uppercase tracking-wider">
                  Años de Experiencia
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                Sobre Nosotros
              </h2>
              <div className="space-y-4 font-body text-lg text-muted-foreground">
                <p>
                  Desde 2002, Jose Antonio Cuenca se ha consolidado como
                  referente en la distribución de sistemas de descanso de alta
                  calidad. Nuestra pasión es ayudarte a encontrar el descanso
                  perfecto.
                </p>
                <p>
                  Trabajamos únicamente con las mejores marcas del sector,
                  garantizando productos de máxima calidad que transformarán tus
                  noches y mejorarán tu calidad de vida.
                </p>
                <p>
                  Nuestro compromiso es ofrecer un servicio personalizado,
                  escuchando tus necesidades y asesorándote profesionalmente
                  para que encuentres el sistema de descanso ideal para ti.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

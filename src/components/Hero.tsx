import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury bedroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            Jose Antonio Cuenca
          </h1>

          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-white/90 italic">
            Distribuidor de Sistemas de Descanso
          </p>

          <div className="pt-6">
            <p className="font-body text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Desde 2002 vendiendo Calidad de Descanso
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#brands"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-base bg-accent hover:bg-accent/90 text-accent-foreground rounded-sm shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-105"
            >
              Nuestras Marcas
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-base bg-background/90 hover:bg-background text-foreground rounded-sm shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-105"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span className="font-body text-sm uppercase tracking-wider">Descubre más</span>
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;

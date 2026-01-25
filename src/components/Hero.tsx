import { ChevronDown, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <img
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury bedroom"
          className="w-full h-full object-cover scale-105"
          style={{ transform: 'translateZ(0)' }}
        />
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-50 animate-pulse" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-dark px-6 py-3 rounded-full text-white/90 text-sm font-medium animate-fade-in mb-6">
            <Sparkles size={16} className="text-accent" />
            <span>Calidad de Descanso desde 2002</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] animate-fade-up">
            Jose Antonio
            <span className="block text-gradient mt-2" style={{ animationDelay: '100ms' }}>
              Cuenca
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-display text-2xl sm:text-3xl md:text-4xl text-white/90 font-light tracking-wide animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            Distribuidor de Sistemas de Descanso
          </p>

          {/* Description */}
          <p
            className="font-body text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            Transformamos tu descanso en una experiencia única con las mejores marcas del sector
          </p>

          {/* CTA Buttons */}
          <div
            className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <a
              href="#brands"
              className="group relative inline-flex items-center justify-center px-10 py-5 font-body font-bold text-base bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl shadow-elevated hover:shadow-hover transition-all duration-500 transform hover:scale-105 hover-glow overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">Nuestras Marcas</span>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-10 py-5 font-body font-bold text-base glass-dark text-white rounded-2xl shadow-glass hover:shadow-elevated transition-all duration-500 transform hover:scale-105 border border-white/20 hover:border-white/40"
            >
              <span className="relative z-10">Contactar</span>
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-6 max-w-3xl mx-auto pt-12 animate-fade-up"
            style={{ animationDelay: '500ms' }}
          >
            {[
              { number: '20+', label: 'Años de experiencia' },
              { number: '5', label: 'Marcas premium' },
              { number: '100%', label: 'Satisfacción' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="glass-dark p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 hover-lift"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="font-body text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a
          href="#about"
          className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-all duration-300 group"
        >
          <span className="font-body text-sm uppercase tracking-widest">Descubre más</span>
          <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <ChevronDown size={24} />
          </div>
        </a>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
};

export default Hero;

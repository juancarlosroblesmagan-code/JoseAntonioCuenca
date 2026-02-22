import { Award, Users, Heart, CheckCircle } from 'lucide-react';

const features = [
  { icon: Award, title: 'Experiencia desde 2002', desc: 'Más de 20 años como referente en el sector del descanso.' },
  { icon: Users, title: 'Asesoramiento personalizado', desc: 'Soluciones a medida para cada comercio y cada cliente.' },
  { icon: Heart, title: 'Solo las mejores marcas', desc: 'Karibian, Koala, Torresol, Ivorimatex y B-Sensible.' },
];

const bullets = [
  'Representación exclusiva de 5 marcas premium',
  'Asesoramiento técnico y formación para tu equipo',
  'Gestión directa de pedidos con el fabricante',
  'Precios competitivos y condiciones preferenciales',
];

const SobreNosotrosPage = () => {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-black/60" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/5 blur-2xl" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full text-white/80 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Desde 2002 en el sector del descanso
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Tu <span className="text-gradient">Representante</span><br />de Confianza
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-light text-white/70 max-w-2xl mx-auto">
            Más de 20 años especializados en colchones premium, canapés abatibles, sofás de piel, almohadas cervicales y ropa de cama inteligente
          </h2>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src="/joseantoniocuenca-sobre-nosotros.webp"
                  alt="Jose Antonio Cuenca - Agente comercial sistemas de descanso"
                  className="w-full h-[540px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-8 rounded-3xl shadow-elevated">
                <div className="text-center">
                  <div className="font-display text-5xl font-black mb-1">+20</div>
                  <div className="font-body text-xs uppercase tracking-widest opacity-90">Años de experiencia</div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 glass-dark p-6 rounded-2xl shadow-glass">
                <div className="text-center">
                  <div className="font-display text-3xl font-black text-white mb-1">5</div>
                  <div className="font-body text-xs text-white/70 uppercase tracking-wider">Marcas premium</div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-4xl md:text-5xl font-black text-primary mb-6 leading-tight">
                  Desde 2002, Referente en Sistemas de Descanso
                </h3>
                <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Desde 2002, Jose Antonio Cuenca se ha consolidado como referente en la
                    representación de sistemas de descanso de alta calidad. Somos agentes
                    comerciales especializados en <strong className="text-foreground">colchones de alta gama</strong>,
                    canapés abatibles premium, sofás de diseño, almohadas cervicales y ropa de cama inteligente.
                  </p>
                  <p>
                    Trabajamos únicamente con las mejores marcas del sector, garantizando
                    productos de alta calidad que maximizarán el confort del cliente y su calidad de vida.
                  </p>
                  <p>
                    Nuestro compromiso es ofrecer un servicio personalizado, escuchando tus
                    necesidades para que encuentres el sistema de descanso ideal.
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 font-body text-base text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="py-24 bg-gradient-to-b from-muted/40 to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-display text-4xl md:text-5xl font-black text-primary mb-6">
              Tu Colaborador de <span className="text-gradient">Confianza</span>
            </h3>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              En José Antonio Cuenca nos hemos especializado en la gestión de venta de colchones
              de alta gama, canapés abatibles premium, almohadas y ropa de cama de máxima calidad,
              así como en sofás de reconocido prestigio. Te ayudamos a comercializar estos productos
              con total confianza en la mejor calidad, precio y servicio postventa.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative bg-card rounded-3xl p-8 shadow-glass hover:shadow-elevated transition-all duration-500 hover-lift overflow-hidden animate-scale-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                    <f.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-primary mb-3">{f.title}</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS - fondo oscuro */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-display text-4xl md:text-5xl font-black text-white mb-8">
              ¿Por qué elegir<br /><span className="text-gradient">Jose Antonio Cuenca?</span>
            </h3>
            <div className="space-y-4 font-body text-lg text-white/70 leading-relaxed mb-12">
              <p>
                Llevamos más de 20 años ayudando a cientos de comercios a mejorar su calidad
                de servicio en productos de descanso. Como responsables de zona de las marcas
                más reconocidas del sector, ofrecemos una selección cuidada de productos que
                combinan innovación, confort y durabilidad.
              </p>
              <p>
                Nuestro compromiso es ofrecerte asesoramiento experto, precios competitivos
                y un servicio postventa excepcional.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Representación exclusiva', text: '5 marcas premium con representación oficial en tu zona.' },
                { title: 'Asesoramiento técnico', text: 'Formación y soporte continuo para tu equipo de ventas.' },
                { title: 'Gestión directa con fabricante', text: 'Pedidos, incidencias y garantías tramitadas directamente.' },
                { title: 'Precios competitivos', text: 'Las mejores condiciones comerciales del mercado.' },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-6">
                  <h5 className="font-display text-base font-bold text-white mb-2">{item.title}</h5>
                  <p className="font-body text-sm text-white/60">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default SobreNosotrosPage;

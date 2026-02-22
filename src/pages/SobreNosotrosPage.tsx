import { Award, Users, Heart } from 'lucide-react';

const SobreNosotrosPage = () => {
  return (
    <main>
      {/* Hero banner de la página */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* H1 - Keyword principal: representante comercial colchones, sistemas de descanso */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Representante Comercial de Colchones y Sistemas de Descanso de Alta Gama
          </h1>
          {/* H2 - Keyword: experiencia distribución sistemas de descanso */}
          <h2 className="font-display text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto">
            Más de 20 años especializados en la distribución de colchones premium, canapés abatibles, sofás y ropa de cama de alta calidad
          </h2>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-sm overflow-hidden shadow-elevated">
                <img
                  src="/joseantoniocuenca-sobre-nosotros.webp"
                  alt="Jose Antonio Cuenca - Agente comercial sistemas de descanso"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground p-8 rounded-sm shadow-elevated">
                <div className="text-center">
                  <div className="font-display text-5xl font-bold mb-2">+20</div>
                  <div className="font-body text-sm uppercase tracking-wider">Años de Experiencia</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* H3 - Keyword: agente comercial descanso desde 2002 */}
              <h3 className="font-display text-3xl md:text-4xl font-bold text-primary">
                Desde 2002, Referente en la Representación de Sistemas de Descanso
              </h3>
              <div className="space-y-4 font-body text-lg text-muted-foreground">
                <p>
                  Desde 2002, Jose Antonio Cuenca se ha consolidado como referente en la
                  representación de sistemas de descanso de alta calidad. Somos agentes
                  comerciales especializados en colchones de alta gama, canapés abatibles
                  premium, sofás de diseño, almohadas cervicales y ropa de cama inteligente.
                </p>
                <p>
                  Trabajamos únicamente con las mejores marcas del sector, garantizando
                  productos de alta calidad que maximizarán el confort del cliente y
                  su calidad de vida.
                </p>
                <p>
                  Nuestro compromiso es ofrecer un servicio personalizado, escuchando tus
                  necesidades y asesorándote profesionalmente para que encuentres el
                  sistema de descanso ideal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compromiso */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* H3 - Keyword: colaborador oficial marcas descanso */}
          <h3 className="font-display text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Tu Colaborador de Confianza en la Venta de Sistemas de Descanso
          </h3>
          <p className="font-body text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            En José Antonio Cuenca nos hemos especializado en la gestión de venta de colchones
            de alta gama, canapés abatibles premium, almohadas y ropa de cama de máxima calidad,
            así como en sofás de reconocido prestigio y calidad. Te ayudamos a comercializar
            estos productos, garantizando un asesoramiento personalizado para que consigas
            trabajar con total confianza y seguridad en la mejor calidad, precio, servicio
            y atención postventa.
          </p>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                /* H4 - Keyword: experiencia sector descanso */
                title: 'Experiencia desde 2002',
                description: 'Más de 20 años ofreciendo calidad de descanso. Conocemos el sector mejor que nadie.',
              },
              {
                icon: Users,
                /* H4 - Keyword: asesoramiento colchones personalizado */
                title: 'Asesoramiento Personalizado en Colchones y Sofás',
                description: 'Te ayudamos a encontrar el colchón, canapé o sofá perfecto para tus clientes.',
              },
              {
                icon: Heart,
                /* H4 - Keyword: marcas premium colchones sofás */
                title: 'Solo las Mejores Marcas de Colchones y Sofás',
                description: 'Karibian, Koala Beds, Torresol, Ivorimatex y B-Sensible. Calidad garantizada.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 bg-card rounded-3xl shadow-glass">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                {/* H4 */}
                <h4 className="font-display text-xl font-bold text-primary mb-3">{item.title}</h4>
                <p className="font-body text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* H3 - Keyword: por qué elegir distribuidor colchones */}
          <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-8">
            ¿Por qué elegir Jose Antonio Cuenca como tu representante de colchones?
          </h3>
          <div className="space-y-4 font-body text-lg text-muted-foreground">
            <p>
              Llevamos más de 20 años ayudando a cientos de comercios a mejorar su calidad
              de servicio en productos de descanso. Como responsables de zona de las marcas
              más reconocidas del sector del descanso, ofrecemos una selección cuidada de
              productos que combinan innovación, confort y durabilidad.
            </p>
            <p>
              Nuestro compromiso es ofrecerte asesoramiento experto, precios competitivos
              y un servicio postventa excepcional.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {[
              { /* H5 */ title: 'Representación exclusiva en colchones de alta gama', text: '5 marcas premium con representación oficial en tu zona.' },
              { /* H5 */ title: 'Asesoramiento técnico en sistemas de descanso', text: 'Formación y soporte continuo para tu equipo de ventas.' },
              { /* H5 */ title: 'Gestión directa con fabricante', text: 'Tramitación de pedidos, incidencias y garantías directamente con el fabricante.' },
              { /* H5 */ title: 'Precios competitivos en colchones y sofás premium', text: 'Las mejores condiciones comerciales del mercado para tu negocio.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                <div>
                  {/* H5 */}
                  <h5 className="font-display text-base font-semibold text-primary mb-1">{item.title}</h5>
                  <p className="font-body text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SobreNosotrosPage;

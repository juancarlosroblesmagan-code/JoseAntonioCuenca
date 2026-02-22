const TrustSection = () => {
  return (
    <section id="trust" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto animate-fade-up">
          {/* Main title */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 text-center uppercase tracking-wide">
            Tu colaborador de confianza en la venta de sistemas de descanso
          </h2>

          {/* Main paragraph */}
          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-12 text-center">
            En José Antonio Cuenca nos hemos especializado en la gestión de venta de colchones de
            alta gama, canapés abatibles premium, almohadas y ropa de cama de máxima calidad, así
            como en sofás de reconocido prestigio y calidad. Te ayudamos a comercializar estos
            productos, garantizando un asesoramiento personalizado para que consigas trabajar con
            total confianza y seguridad en la mejor calidad, precio, servicio y atención postventa.
          </p>

          {/* Why choose us */}
          <div className="bg-muted/40 rounded-3xl p-8 md:p-12">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
              ¿Por qué elegir Jose Antonio Cuenca?
            </h3>
            <div className="space-y-4 font-body text-lg text-muted-foreground">
              <p>
                Llevamos más de 20 años ayudando a cientos de comercios a mejorar su calidad de
                servicio en productos de descanso. Como responsables de zona de las marcas más
                reconocidas del sector del descanso, ofrecemos una selección cuidada de productos
                que combinan innovación, confort y durabilidad.
              </p>
              <p>
                Nuestro compromiso es ofrecerte asesoramiento experto, precios competitivos y un
                servicio postventa excepcional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

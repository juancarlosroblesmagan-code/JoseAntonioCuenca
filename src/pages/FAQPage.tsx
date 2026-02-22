import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    /* H2 keyword: marcas colchones representadas */
    question: '¿Qué marcas de colchones representáis?',
    answer: 'Somos agentes comerciales oficiales de Karibian Descanso, una de las marcas líderes en colchones de alta gama. Karibian ofrece colchones con tecnología de muelles ensacados, viscoelástica de alta densidad y materiales naturales, todos con certificación sanitaria y garantías extendidas.',
  },
  {
    /* H2 keyword: canapes abatibles ventajas */
    question: '¿Qué son los canapés abatibles y qué ventajas tienen?',
    answer: 'Los canapés abatibles son bases de cama que se levantan para ofrecer un gran espacio de almacenaje debajo del colchón. Koala Beds, nuestra marca especializada en canapés, ofrece modelos con apertura fácil mediante pistones de gas, estructura reforzada y tapizados de alta calidad. Son ideales para optimizar el espacio en dormitorios.',
  },
  {
    /* H2 keyword: sofas torresol piel */
    question: '¿Los sofás de Torresol se fabrican en piel?',
    answer: 'Sí, Torresol es reconocido por fabricar prácticamente todos sus modelos de sofás con pieles de primera calidad. Utilizan pieles con diseños exclusivos, ofreciendo una durabilidad excepcional y un confort superior. Además, disponen de una amplia gama de colores y acabados para adaptarse a cualquier decoración.',
  },
  {
    /* H2 keyword: almohadas cervicales ivorimatex */
    question: '¿Qué tipo de almohadas ofrece Ivorimatex?',
    answer: 'Ivorimatex es especialista en almohadas ergonómicas fabricadas con materiales de alta calidad como viscoelástica y viscocell. Sus almohadas están diseñadas para ofrecer un soporte cervical óptimo, son hipoalergénicas y cuentan con fundas transpirables y con tejidos técnicos, para un descanso fresco y saludable.',
  },
  {
    /* H2 keyword: ropa cama bsensible impermeable */
    question: '¿Qué hace especial a la ropa de cama de B-Sensible?',
    answer: 'B-Sensible es líder en protectores y sábanas con tecnología inteligente. Sus productos son impermeables pero transpirables, protegen contra ácaros, bacterias y alérgenos, y son muy fáciles de lavar. Ideales para personas alérgicas, niños o simplemente para prolongar la vida útil de tu colchón.',
  },
  {
    /* H2 keyword: garantia colchones sofas */
    question: '¿Qué garantía tienen los productos?',
    answer: 'Todos nuestros productos cuentan con la garantía oficial del fabricante. Los colchones Karibian tienen garantías de hasta 5 años, los canapés Koala Beds hasta 3 años, y los sofás Torresol ofrecen garantías extendidas hasta 5 años en mecanismos y bancadas y garantía de por vida en estructura. Como colaborador oficial, gestionamos cualquier incidencia directamente con el fabricante.',
  },
  {
    /* H2 keyword: asesoramiento personalizado colchones sofas */
    question: '¿Puedo recibir asesoramiento personalizado en colchones y sofás?',
    answer: 'Por supuesto. Contamos con más de 20 años de experiencia en el sector del descanso. Te ayudamos a elegir el colchón, canapé, sofá o complementos que mejor se adapten a tus necesidades, preferencias de firmeza, postura al dormir y presupuesto. Contáctanos por teléfono o a través del formulario web.',
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main>
      {/* Hero banner */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* H1 - Keyword principal: preguntas frecuentes colchones canapes sofas descanso */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Preguntas Frecuentes sobre Colchones, Canapés Abatibles, Sofás y Sistemas de Descanso
          </h1>
          {/* H2 - Keyword: dudas colchones sofas calidad precio */}
          <h2 className="font-display text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto">
            Resolvemos tus dudas sobre colchones de alta gama, canapés, sofás de piel, almohadas cervicales y ropa de cama inteligente
          </h2>
        </div>
      </section>

      {/* FAQ Acordeón */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-2xl shadow-glass overflow-hidden">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  {/* H2 o H3 semántico para cada pregunta */}
                  <h3 className="font-display font-semibold text-primary text-lg">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-accent transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 font-body text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="font-body text-base text-muted-foreground mb-4">
              No encuentras lo que buscas
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-bold text-base bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-105"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;

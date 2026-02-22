import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Qué marcas de colchones representáis?',
    answer:
      'Somos agentes comerciales oficiales de Karibian Descanso, una de las marcas líderes en colchones de alta gama. Karibian ofrece colchones con tecnología de muelles ensacados, viscoelástica de alta densidad y materiales naturales, todos con certificación sanitaria y garantías extendidas.',
  },
  {
    question: '¿Qué son los canapés abatibles y qué ventajas tienen?',
    answer:
      'Los canapés abatibles son bases de cama que se levantan para ofrecer un gran espacio de almacenaje debajo del colchón. Koala Beds, nuestra marca especializada en canapés, ofrece modelos con apertura fácil mediante pistones de gas, estructura reforzada y tapizados de alta calidad. Son ideales para optimizar el espacio en dormitorios.',
  },
  {
    question: '¿Los sofás de Torresol se fabrican en piel?',
    answer:
      'Sí, Torresol es reconocido por fabricar prácticamente todos sus modelos de sofás con pieles de primera calidad. Utilizan pieles con diseños exclusivos, ofreciendo una durabilidad excepcional y un confort superior. Además, disponen de una amplia gama de colores y acabados para adaptarse a cualquier decoración.',
  },
  {
    question: '¿Qué tipo de almohadas ofrece Ivorimatex?',
    answer:
      'Ivorimatex es especialista en almohadas ergonómicas fabricadas con materiales de alta calidad como viscoelástica y viscocell. Sus almohadas están diseñadas para ofrecer un soporte cervical óptimo, son hipoalergénicas y cuentan con fundas transpirables y con tejidos técnicos, para un descanso fresco y saludable.',
  },
  {
    question: '¿Qué hace especial a la ropa de cama de B-Sensible?',
    answer:
      'B-Sensible es líder en protectores y sábanas con tecnología inteligente. Sus productos son impermeables pero transpirables, protegen contra ácaros, bacterias y alérgenos, y son muy fáciles de lavar. Ideales para personas alérgicas, niños o simplemente para prolongar la vida útil de tu colchón.',
  },
  {
    question: '¿Qué garantía tienen los productos?',
    answer:
      'Todos nuestros productos cuentan con la garantía oficial del fabricante. Los colchones Karibian tienen garantías de hasta 5 años, los canapés Koala Beds hasta 3 años, y los sofás Torresol ofrecen garantías extendidas hasta 5 años en mecanismos y bancadas y garantía de por vida en estructura. Como colaborador oficial, gestionamos cualquier incidencia directamente con el fabricante.',
  },
  {
    question: '¿Puedo recibir asesoramiento personalizado?',
    answer:
      'Por supuesto. Contamos con más de 20 años de experiencia en el sector del descanso. Te ayudamos a elegir el colchón, canapé, sofá o complementos que mejor se adapten a tus necesidades, preferencias de firmeza, postura al dormir y presupuesto. Contáctanos por teléfono o a través del formulario web.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Preguntas Frecuentes
          </h2>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl shadow-glass overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left font-display font-semibold text-primary hover:text-accent transition-colors duration-200"
              >
                <span className="text-lg">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 font-body text-base text-muted-foreground leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No encuentras lo que buscas */}
        <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: '400ms' }}>
          <p className="font-body text-base text-muted-foreground mb-4">
            No encuentras lo que buscas
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 font-body font-bold text-base bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-105"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

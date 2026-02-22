import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: '¿Qué marcas de colchones representáis?',
    answer: 'Somos agentes comerciales oficiales de Karibian Descanso, una de las marcas líderes en colchones de alta gama. Karibian ofrece colchones con tecnología de muelles ensacados, viscoelástica de alta densidad y materiales naturales, todos con certificación sanitaria y garantías extendidas.',
  },
  {
    question: '¿Qué son los canapés abatibles y qué ventajas tienen?',
    answer: 'Los canapés abatibles son bases de cama que se levantan para ofrecer un gran espacio de almacenaje debajo del colchón. Koala Beds, nuestra marca especializada en canapés, ofrece modelos con apertura fácil mediante pistones de gas, estructura reforzada y tapizados de alta calidad. Son ideales para optimizar el espacio en dormitorios.',
  },
  {
    question: '¿Los sofás de Torresol se fabrican en piel?',
    answer: 'Sí, Torresol es reconocido por fabricar prácticamente todos sus modelos de sofás con pieles de primera calidad. Utilizan pieles con diseños exclusivos, ofreciendo una durabilidad excepcional y un confort superior. Además, disponen de una amplia gama de colores y acabados para adaptarse a cualquier decoración.',
  },
  {
    question: '¿Qué tipo de almohadas ofrece Ivorimatex?',
    answer: 'Ivorimatex es especialista en almohadas ergonómicas fabricadas con materiales de alta calidad como viscoelástica y viscocell. Sus almohadas están diseñadas para ofrecer un soporte cervical óptimo, son hipoalergénicas y cuentan con fundas transpirables y con tejidos técnicos, para un descanso fresco y saludable.',
  },
  {
    question: '¿Qué hace especial a la ropa de cama de B-Sensible?',
    answer: 'B-Sensible es líder en protectores y sábanas con tecnología inteligente. Sus productos son impermeables pero transpirables, protegen contra ácaros, bacterias y alérgenos, y son muy fáciles de lavar. Ideales para personas alérgicas, niños o simplemente para prolongar la vida útil de tu colchón.',
  },
  {
    question: '¿Qué garantía tienen los productos?',
    answer: 'Todos nuestros productos cuentan con la garantía oficial del fabricante. Los colchones Karibian tienen garantías de hasta 5 años, los canapés Koala Beds hasta 3 años, y los sofás Torresol ofrecen garantías extendidas hasta 5 años en mecanismos y bancadas y garantía de por vida en estructura. Como colaborador oficial, gestionamos cualquier incidencia directamente con el fabricante.',
  },
  {
    question: '¿Puedo recibir asesoramiento personalizado en colchones y sofás?',
    answer: 'Por supuesto. Contamos con más de 20 años de experiencia en el sector del descanso. Te ayudamos a elegir el colchón, canapé, sofá o complementos que mejor se adapten a tus necesidades, preferencias de firmeza, postura al dormir y presupuesto. Contáctanos por teléfono o a través del formulario web.',
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-transparent to-black/50" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-28">
          <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full text-white/80 text-sm font-medium mb-8">
            <MessageCircle size={14} className="text-accent" />
            Resolvemos tus dudas
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Preguntas <span className="text-gradient">Frecuentes</span>
          </h1>
          <h2 className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Colchones, canapés abatibles, sofás de piel, almohadas cervicales y ropa de cama inteligente
          </h2>
        </div>
      </section>

      {/* FAQ ACORDEÓN */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group bg-card rounded-2xl shadow-glass overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'shadow-elevated' : ''
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-muted/30 transition-colors duration-200"
                >
                  <h3 className={`font-display font-bold text-lg transition-colors duration-200 ${
                    openIndex === index ? 'text-accent' : 'text-primary'
                  }`}>
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index ? 'bg-accent text-white rotate-180' : 'bg-muted text-muted-foreground'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 border-t border-border/30">
                    <p className="font-body text-base text-muted-foreground leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-primary text-white rounded-3xl px-10 py-8 shadow-elevated">
              <p className="font-display text-lg font-semibold">
                ¿No encuentras lo que buscas?
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-bold text-sm bg-accent text-white rounded-2xl hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-elevated"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default FAQPage;

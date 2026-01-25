import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica de envío del formulario
    alert('Gracias por tu mensaje. Te contactaremos pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+34 XXX XXX XXX',
      href: 'tel:+34XXXXXXXXX',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@joseantoniocuenca.es',
      href: 'mailto:info@joseantoniocuenca.es',
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'España',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Contáctanos
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte a encontrar el
            sistema de descanso perfecto
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="animate-fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-body text-sm font-medium text-foreground mb-2"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-body text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block font-body text-sm font-medium text-foreground mb-2"
                >
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="+34 XXX XXX XXX"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-body text-sm font-medium text-foreground mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-body font-semibold text-base bg-accent hover:bg-accent/90 text-accent-foreground rounded-sm shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-105"
              >
                <Send size={20} />
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-card rounded-sm shadow-soft p-8 space-y-6">
              <h3 className="font-display text-2xl font-bold text-primary mb-6">
                Información de Contacto
              </h3>

              {contactInfo.map((info, index) => (
                <a
                  key={info.title}
                  href={info.href}
                  className="flex items-start gap-4 group hover:bg-muted/50 p-4 rounded-sm transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-muted-foreground mb-1">
                      {info.title}
                    </h4>
                    <p className="font-body text-base text-foreground group-hover:text-accent transition-colors">
                      {info.content}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-accent text-accent-foreground rounded-sm shadow-elevated p-8">
              <h3 className="font-display text-xl font-bold mb-4">
                Horario de Atención
              </h3>
              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span className="font-semibold">9:00 - 14:00 | 16:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span className="font-semibold">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span className="font-semibold">Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

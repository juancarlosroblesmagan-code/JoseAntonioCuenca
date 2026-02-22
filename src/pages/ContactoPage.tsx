import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const ContactoPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Gracias por tu mensaje. Te contactaremos pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Phone, title: 'Teléfono', content: '615 559 577', href: 'tel:+34615559577', desc: 'Llámanos directamente' },
    { icon: Mail, title: 'Email', content: 'info@joseantoniocuenca.es', href: 'mailto:info@joseantoniocuenca.es', desc: 'Escríbenos cuando quieras' },
    { icon: MapPin, title: 'Zona de actuación', content: 'España', href: '#', desc: 'Cobertura nacional' },
  ];

  const schedule = [
    { day: 'Lunes – Viernes', hours: '9:00–14:00 / 16:00–20:00' },
    { day: 'Sábados', hours: '10:00–14:00' },
    { day: 'Domingos', hours: 'Cerrado' },
  ];

  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-transparent to-black/50" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-28">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            <span className="text-gradient">Contáctanos</span>
          </h1>
          <h2 className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Asesoramiento personalizado en colchones de alta gama, canapés abatibles, sofás de piel y ropa de cama para tu negocio
          </h2>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.href}
                className="group relative bg-card rounded-3xl p-8 shadow-glass hover:shadow-elevated transition-all duration-500 hover-lift text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <info.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{info.title}</h3>
                  <p className="font-display text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-1">{info.content}</p>
                  <p className="font-body text-xs text-muted-foreground">{info.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + SCHEDULE */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">

            {/* Formulario */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-3xl shadow-glass p-8 md:p-10">
                <h3 className="font-display text-2xl font-black text-primary mb-8">
                  Envíanos tu consulta
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block font-body text-sm font-medium text-foreground/70 mb-2">Nombre completo</label>
                      <input
                        type="text" id="name" name="name" value={formData.name}
                        onChange={handleChange} required
                        className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-body text-sm"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-body text-sm font-medium text-foreground/70 mb-2">Teléfono</label>
                      <input
                        type="tel" id="phone" name="phone" value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-body text-sm"
                        placeholder="+34 XXX XXX XXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-sm font-medium text-foreground/70 mb-2">Email</label>
                    <input
                      type="email" id="email" name="email" value={formData.email}
                      onChange={handleChange} required
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-body text-sm"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-body text-sm font-medium text-foreground/70 mb-2">Mensaje</label>
                    <textarea
                      id="message" name="message" value={formData.message}
                      onChange={handleChange} required rows={6}
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none font-body text-sm"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-bold text-base bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl shadow-elevated hover:shadow-hover transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Send size={18} />
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>

            {/* Horario + info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-primary rounded-3xl p-8 shadow-elevated relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">Horario de Atención</h3>
                  </div>
                  <div className="space-y-4">
                    {schedule.map((s) => (
                      <div key={s.day} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                        <span className="font-body text-sm text-white/70">{s.day}</span>
                        <span className="font-display text-sm font-semibold text-white">{s.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-glass">
                <h3 className="font-display text-lg font-bold text-primary mb-4">Asesoramiento Directo</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  Más de 20 años ayudando a comercios a vender colchones, canapés, sofás y complementos de descanso de alta gama.
                </p>
                <a
                  href="tel:+34615559577"
                  className="flex items-center gap-3 w-full px-5 py-4 bg-accent/10 hover:bg-accent hover:text-white text-accent rounded-2xl transition-all duration-300 group"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-display font-bold text-base">615 559 577</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default ContactoPage;

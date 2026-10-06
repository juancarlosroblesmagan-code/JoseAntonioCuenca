// Generate structured data from the visible FAQ: one source, no divergent answers.
function plain(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
export function renderSEO(html, siteUrl = '') {
  const script = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
  const match = script.exec(html);
  if (!match) throw new Error('Missing entity graph');
  const schema = JSON.parse(match[1]);
  const home = schema['@graph'].find(entity => entity['@id'] === '/#home');
  const person = schema['@graph'].find(entity => entity['@id'] === '/#jose-antonio');
  Object.assign(person, { name: 'José Antonio Cuenca Gómez', alternateName: 'José Antonio Cuenca', givenName: 'José Antonio', familyName: 'Cuenca Gómez', telephone: '+34615559577', email: 'info@joseantoniocuenca.es', address: { '@type': 'PostalAddress', streetAddress: 'Calle Ibáñez Ibero, 11, 3.º A', postalCode: '02005', addressLocality: 'Albacete', addressCountry: 'ES' }, contactPoint: { '@type': 'ContactPoint', telephone: '+34615559577', email: 'info@joseantoniocuenca.es', contactType: 'Información comercial para profesionales', availableLanguage: 'es' } });
  const faq = /<section class="faq[\s\S]*?<\/section>/.exec(html)?.[0] || '';
  const questions = [...faq.matchAll(/<details[^>]*>[\s\S]*?<summary>([\s\S]*?)<\/summary>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<\/details>/g)].map(([, question, answer]) => ({ '@type': 'Question', name: plain(question), acceptedAnswer: { '@type': 'Answer', text: plain(answer) } }));
  home['@type'] = questions.length ? ['WebPage', 'FAQPage'] : 'WebPage';
  home.mainEntity = questions;
  home.about = [{ '@id': '/#jose-antonio' }, { '@id': '/#gestion-comercial' }];
  home.audience = { '@type': 'BusinessAudience', audienceType: 'Colchonerías, tiendas de muebles, distribuidores y profesionales del sector del descanso' };
  schema['@graph'].push({ '@type': 'Service', '@id': '/#gestion-comercial', name: 'Gestión comercial en sistemas de descanso premium', serviceType: 'Gestión comercial B2B', provider: { '@id': '/#jose-antonio' }, description: 'Información de producto y asesoramiento comercial para profesionales del sector del descanso. Colchones, canapés, bases, sofás, textil y complementos.', audience: home.audience });
  if (siteUrl) {
    const base = new URL(siteUrl);
    if (!['https:', 'http:'].includes(base.protocol) || base.pathname !== '/' || base.search || base.hash) throw new Error('SITE_URL must be the verified site origin');
    const absolutize = value => {
      if (Array.isArray(value)) return value.map(absolutize);
      if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, key === '@id' && typeof entry === 'string' && entry.startsWith('/') ? new URL(entry, base).href : absolutize(entry)]));
      return value;
    };
    home.url = base.href;
    person.url = base.href;
    schema['@graph'] = absolutize(schema['@graph']);
    html = html.replace('</head>', `  <link rel="canonical" href="${base.href}">\n  <meta property="og:url" content="${base.href}">\n</head>`).replace('content="/assets/images/social.jpg"', `content="${new URL('/assets/images/social.jpg', base).href}"`);
  }
  return html.replace(script, `<script type="application/ld+json">\n${JSON.stringify(schema)}\n  </script>`);
}

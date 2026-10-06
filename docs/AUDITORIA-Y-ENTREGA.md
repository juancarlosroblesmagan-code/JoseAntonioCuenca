# Estado actual y entrega

## Alcance vigente

HOME de José Antonio Cuenca, Gestor Comercial en Sistemas de Descanso Premium desde 2002, orientada a profesionales. Marcas: Karibian, Koala Beds, Torresol, Ivorimatex y B-Sensible. Sin ecommerce, precios, opiniones inventadas ni páginas interiores vacías.

Diseño contemporáneo con composición asimétrica, tipografía local Manrope y DM Serif Display, paleta piedra/grafito, movimiento al scroll y respeto a `prefers-reduced-motion`. Nombre de cabecera ampliado y alineado con los menús; descriptor compacto. Firma del diseñador con ambos enlaces en el footer.

## Recursos actuales

- Imágenes AVIF/WebP con nombres descriptivos y alt individual. Procedencia en `assets/sources.json`.
- Fotografía profesional Torresol de 1920 px con menos compresión, selección responsive adaptada al recorte y sin zoom adicional.
- Tres vídeos distintos: Feria Hábitat, ferias de diseño y Torresol. H.264 faststart, reproducción solo tras interacción, controles nativos y limpieza al cerrar.
- Música ambiental sintetizada para el proyecto, sin voces, con fundidos. WebVTT identifica la música; descripciones visuales disponibles en la HOME.
- Originales intactos en Descargas. Procedencia, hashes y especificaciones en `assets/videos/manifest.json`.
- Fuentes y medios servidos localmente. No se requiere una conexión a servicios externos durante la visita.

## SEO

Un único grafo Schema: Person, WebSite, WebPage/FAQPage, Service y marcas. Preguntas y respuestas derivadas del contenido visible. `SITE_URL` permite URLs absolutas cuando se confirme el dominio. No se inventan fechas de publicación de vídeos ni dominio.

La HOME pasa a `index, follow` por autorización expresa del titular. Las tres páginas legales completas mantienen `noindex, follow`. No se han creado páginas futuras ni rutas vacías. Sitemap y robots permiten descubrimiento; Schema incorpora nombre completo y contacto verificados. `llms.txt` aporta información factual sin prometer uso por asistentes.

## Validación registrada

- Diez anchuras entre 320 y 2560 px: sin desbordamientos, imágenes rotas, errores de consola/red ni incidencias axe en la ejecución registrada.
- Revisión táctil Chrome emulado con DPR 2: 320 × 568, 375 × 812, 390 × 844, 430 × 932 y horizontal 844 × 390. Menú, tres vídeos, FAQ y modal de contacto comprobados.
- Objetivos táctiles principales de 44 px y CTA del hero visible en los móviles verticales probados.
- Movimiento/reveals y modo de movimiento reducido comprobados.
- Hashes originales, dimensiones/duración, audio AAC y rangos HTTP 206 verificados.
- Medición Lighthouse del dominio público tras lanzamiento: rendimiento 94 móvil / 100 escritorio; accesibilidad, buenas prácticas y SEO 100 / 100; LCP 2,0 s / 0,6 s; CLS 0; TBT 160 ms / 0 ms. Son mediciones de laboratorio, no garantías ni resultados constantes.

Las pruebas automatizadas y Chrome emulado no sustituyen una revisión manual WCAG ni pruebas en Safari/iOS y teléfono físico.

## Operación y pendientes de revisión

1. Aprobar la vista en un móvil real y los audiovisuales.
2. Confirmar recepción del mensaje técnico en el email verificado `info@joseantoniocuenca.es`. El formulario SMTP ya funciona; teléfono opcional aún no facilitado.
3. Validar periódicamente el despliegue indexable en `https://joseantoniocuenca.es`.
4. Documentos legales publicados con datos y plazo confirmados; recomendable revisión profesional y cumplimiento real del borrado de consultas en tres meses.
5. Conservar las autorizaciones de medios de fabricantes/ferias y revisar las fechas antes de cualquier actualización del contenido.
6. Comprobar HTTPS, tipos MIME, rangos MP4 y enlaces en el servidor.
7. Registrar el sitio y su sitemap en Search Console/Bing si el titular facilita acceso; no se han creado cuentas ni reclamado propiedades.

## Limpieza y repositorio

Se retiran la implementación React anterior del árbol vigente del repositorio, snapshots antiguos, recursos con nombres previos, vídeos sustituidos y herramientas puntuales de migración. Se conservan solo el sitio actual, herramientas reproducibles, documentación y evidencias vigentes. El historial de Git no se reescribe. `styles.css` y `modern.css` son ambos necesarios actualmente.

Subir código a GitHub no equivale a desplegar ni publicar en el servidor.

El 6 de octubre de 2026, a petición explícita del cliente, se ha sustituido la web pública en Plesk y autorizado su indexación. Detalles en [DESPLIEGUE.md](DESPLIEGUE.md) y [SEGURIDAD-LEGALES-SEO.md](SEGURIDAD-LEGALES-SEO.md).

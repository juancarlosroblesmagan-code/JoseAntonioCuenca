# Seguridad, documentos legales y descubrimiento

## Datos y aprobación

Titular confirmado por el cliente: José Antonio Cuenca Gómez, NIF 44393436D, Calle Ibáñez Ibero, 11, 3.º A, 02005 Albacete, España. Email `info@joseantoniocuenca.es`; teléfono `+34 615 55 95 77`.

El cliente elige **máximo tres meses** para las consultas; se concreta desde su recepción, también en correo y copias de trabajo. La aplicación no guarda mensajes en disco ni accede al buzón. El titular debe implantar el borrado/revisión de esos correos. No se ha configurado ni se promete una regla automática en IONOS.

Se publican aviso legal, privacidad y cookies como páginas completas. Incluyen identificación, finalidad B2B, condiciones de uso, propiedad intelectual, bases jurídicas, conservación, encargados de servicio, garantías de transferencias, derechos y reclamación ante la AEPD. El checkbox enlaza la política. No se inventan datos registrales, fechas de ferias, proveedores jurídicos exactos ni contratos que no se hayan aportado.

Recomendable revisión profesional del texto y del tratamiento real, especialmente contratos de encargados, ubicación/garantías de proveedores, obligaciones de conservación y gestión de derechos. Publicar estos documentos no acredita por sí solo el cumplimiento del RGPD/LSSI. Referencia consultada: https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos.

## Protección aplicada

- HTTPS, HSTS de un año (sin preload ni extensión a subdominios).
- CSP: recursos propios, scripts propios, sin objetos/plugins ni iframes; restricción de conexiones, formularios y base URL.
- Anti-clickjacking mediante `frame-ancestors 'none'` y X-Frame-Options DENY.
- `nosniff`, Referrer-Policy y Permissions-Policy para desactivar cámara, micrófono, geolocalización, pagos y USB.
- Listado de directorios desactivado y bloqueo HTTP de archivos ocultos/configuraciones/logs/backups/ZIP.
- Errores PHP no públicos mediante `.user.ini`; el servidor puede tardar en aplicar su caché de configuración. Cabecera X-Powered-By eliminada por Apache.
- Credenciales SMTP fuera de la raíz web con permisos 0600, nunca en GitHub; librerías PHP sin acceso HTTP directo.
- Validación de entrada, origen permitido, token HMAC temporal, honeypot y límites por IP/global para correo. No se registra el contenido del mensaje en los logs de aplicación.
- Sin analítica, cookies ni almacenamiento persistente en el navegador en las comprobaciones realizadas.

Se permite `unsafe-inline` **solo para estilos**, porque el movimiento aplica variables CSS y existe un fallback sin JavaScript. Los scripts no tienen `unsafe-inline` ni `unsafe-eval`. No se declara COEP/COOP restrictivo innecesario ni se añade un banner de cookies ficticio.

No se han alterado firewall, SSH, cuentas administrativas, bases de datos o configuración global de otros dominios. La seguridad no es absoluta: mantener PHP, Plesk y PHPMailer actualizados, activar MFA en Plesk/IONOS/GitHub, restringir accesos y proteger/rotar backups. No se ha efectuado un pentest exhaustivo ni una auditoría del sistema operativo.

## SEO y asistentes de IA

- HTML semántico y contenido visible coherente, sin páginas vacías ni datos comerciales inventados.
- HOME indexable por aprobación explícita del cliente; canonical/OG absolutos y grafo único Person, WebSite, WebPage/FAQPage, Service y marcas.
- Nombre completo, teléfono, email y domicilio verificados en Schema; preguntas derivadas de las respuestas visibles. No se crean reseñas, ratings ni acciones de búsqueda inexistentes.
- Sitemap con la HOME indexable. Legales accesibles y enlazados, pero con `noindex, follow` para evitar resultados administrativos innecesarios.
- Robots permite búsqueda y bloquea `/api/`. Los agentes de búsqueda de IA siguen la regla general permitida. GPTBot y ClaudeBot, orientados a entrenamiento, se bloquean expresamente; estas reglas son voluntarias para los rastreadores, no controles de seguridad.
- `llms.txt` describe actividad/contacto y enlaza fuentes oficiales. Es una convención emergente, no un estándar que garantice indexación o recomendaciones.
- No se han enviado solicitudes a Search Console ni Bing ni se han creado cuentas. El titular puede verificar la propiedad y enviar https://joseantoniocuenca.es/sitemap.xml.

La indexación depende del rastreador y puede tardar. Schema y llms.txt no garantizan rich results, ranking ni apariciones en asistentes de IA.

## Identidad de navegador

Monograma JC propio en grafito, marfil y bronce: SVG vectorial, ICO 16/32/48 y PNG 32/180/192. Apple touch icon incluido. La URL principal SVG es nueva para reducir problemas de caché; `/favicon.ico` cubre detección convencional.

## Verificación reproducible

`TEST_URL=https://joseantoniocuenca.es node scripts/test-release.mjs` comprueba legales responsive, axe, conservación, ausencia de cookies/almacenamiento, cabeceras, contacto en Schema, favicon, sitemap y rutas privadas. En PowerShell, establecer `$env:TEST_URL` por separado.

`node scripts/test-contact.mjs` valida el formulario sin enviar correos; `--send` requiere autorización y envía una prueba real. `scripts/verify-deployment.mjs` compara archivos estáticos por SHA256; la API se verifica funcionalmente y su código no se descarga como archivo público.

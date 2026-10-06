# José Antonio Cuenca

Web corporativa B2B de gestión comercial en sistemas de descanso premium. Este repositorio contiene únicamente la implementación vigente: HOME estática, diseño responsive, movimiento accesible y tres vídeos con música ambiental original.

## Desarrollo

Requiere Node.js 22 o superior.

```sh
npm ci
npm run dev
```

Abrir http://localhost:4173. Sin React ni Vite: HTML, CSS y JavaScript Vanilla. El envío de contacto requiere PHP 8.1+ en Plesk y PHPMailer incluido en `api/lib/`.

## Build y servidor

```sh
npm run build
```

Subir **el contenido de `dist/`** a la raíz del dominio. No subir el código de desarrollo, `node_modules`, originales ni informes. Las rutas de recursos son absolutas: no está preparada para una subcarpeta sin adaptación. El servidor debe servir MP4 con rangos HTTP y WebVTT como `text/vtt`, ejecutar PHP y conservar la configuración de correo fuera de `httpdocs`.

El build utiliza `https://joseantoniocuenca.es` por defecto. `SITE_URL` permite cambiar el origen confirmado de canonical, Open Graph y Schema. La HOME está indexable por autorización expresa del titular; las páginas legales mantienen `noindex, follow`.

## Validación

```powershell
$env:BROWSER_CHANNEL='chrome'
npm test
node scripts/review-mobile.mjs
node scripts/test-motion.mjs
node scripts/test-seo.mjs
node scripts/check-image-quality.mjs
```

`npm test` también funciona con Chromium instalado mediante `npx playwright install chromium`. Las revisiones específicas utilizan Chrome instalado. Resultados y capturas se generan en `reports/` y no se versionan.

## Documentación

- [Estado actual y entrega](docs/AUDITORIA-Y-ENTREGA.md)
- [Operación, recursos y publicación](docs/OPERACION.md)

**Publicada e indexable en https://joseantoniocuenca.es.** Teléfono confirmado: 615 55 95 77. Formulario operativo hacia `info@joseantoniocuenca.es`, con envío técnico aceptado por IONOS. Aviso legal, privacidad y cookies a nombre de José Antonio Cuenca Gómez. Conservación de consultas: máximo tres meses desde su recepción, también en el buzón; no hay borrado automático de emails.

Favicon JC multiformato, HTTPS, CSP/HSTS, protección del formulario, Schema, sitemap, robots y descripción factual para asistentes de IA. Detalles: [despliegue](docs/DESPLIEGUE.md), [contacto](docs/CONTACTO.md) y [seguridad, legales y SEO](docs/SEGURIDAD-LEGALES-SEO.md). No se garantiza seguridad absoluta, cumplimiento jurídico sin revisión ni posicionamiento. Los originales del cliente siguen intactos.

Diseño: [Juan Carlos Robles Magán](https://roblesmagan.com/) y [Grupo Comunicación 360º](https://grupocomunicacion360.com/).

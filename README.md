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

Con el dominio confirmado, configurar `SITE_URL` antes del build para canonical, Open Graph y Schema absolutos. Esto **no elimina el `noindex`**: la indexación debe activarse expresamente tras aprobar contacto, legales y permisos.

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

**Desplegada en https://joseantoniocuenca.es, con `noindex`.** Formulario operativo hacia `info@joseantoniocuenca.es`, con envío técnico aceptado por IONOS. Pendientes: aprobación visual en teléfono real, textos legales completos y permisos de medios. Los originales del cliente en Descargas siguen intactos. Registro en [docs/DESPLIEGUE.md](docs/DESPLIEGUE.md) y [configuración del formulario](docs/CONTACTO.md).

Diseño: [Juan Carlos Robles Magán](https://roblesmagan.com/) y [Grupo Comunicación 360º](https://grupocomunicacion360.com/).

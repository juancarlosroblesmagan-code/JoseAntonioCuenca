# Despliegue · 6 de octubre de 2026

## Destino y alcance

- Dominio confirmado: https://joseantoniocuenca.es.
- Plesk: directorio público `httpdocs` de ese dominio exclusivamente.
- Build con `SITE_URL=https://joseantoniocuenca.es`.
- Sustitución autorizada por el cliente del contenido anterior, incluido el frontend React, imágenes anteriores, API antigua y reglas SPA.
- Sin cambios en correo, bases de datos ni otros dominios.

## Seguridad y recuperación

Antes de sustituir la web se creó `backup-web-20261006.zip` (14,3 MB) con el contenido anterior, incluido `.htaccess`, y se movió al directorio principal de la suscripción, fuera de `httpdocs`. Plesk conservó además los elementos retirados en su papelera, también fuera del directorio público. El backup no se incorpora al repositorio.

Para recuperar: desde Plesk, copiar el backup a un directorio de recuperación y extraerlo; sustituir únicamente el contenido del `httpdocs` de este dominio tras comprobar los archivos. No extraer sobre otros espacios web.

## Versión pública

Contiene `index.html`, `styles.css`, `modern.css`, `app.js`, `.htaccess`, `assets/` y la API de contacto PHP con PHPMailer del build actual. Los ZIP de transferencia se retiraron del directorio público después de extraerlos. No se subieron informes, originales, dependencias Node ni herramientas de desarrollo.

Tras incorporar favicon, documentos, seguridad y SEO se verificaron **75 archivos estáticos públicos** contra sus SHA256 locales: idénticos al build. También HTTPS, canonical del dominio, WebVTT `text/vtt`, MP4 `video/mp4` con rangos HTTP 206 y bloqueo de la ruta pública del backup. La API PHP se valida funcionalmente; no se descarga su código fuente.

## Estado editorial

La HOME es indexable por autorización expresa del titular. Las páginas legales completas mantienen `noindex, follow`. El formulario está operativo con IONOS y el destinatario confirmado, sin resetear la contraseña; detalles en [CONTACTO.md](CONTACTO.md). Se han incorporado teléfono, favicon JC, documentos legales, sitemap, robots, descripción para IA y cabeceras de seguridad. Un bloqueo de rastreo no sustituye controles de acceso.

El árbol vigente de GitHub se sustituye por esta implementación mediante un commit normal, sin reescribir el historial anterior.

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

Solo contiene `index.html`, `styles.css`, `modern.css`, `app.js`, `.htaccess` y `assets/` del build actual. Los ZIP de transferencia se retiraron del directorio público después de extraerlos. No se subieron informes, originales, dependencias ni herramientas de desarrollo.

Se verificaron **63 archivos públicos** contra sus SHA256 locales: idénticos al build. También HTTPS, canonical del dominio, WebVTT `text/vtt`, MP4 `video/mp4` con rangos HTTP 206 y respuesta 404 a la ruta pública del backup.

## Estado editorial

La web es accesible públicamente, pero conserva `noindex, nofollow`. Contacto y legales siguen pendientes y no simulan envíos. No se debe anunciar el lanzamiento indexable hasta completar datos y permisos. El `noindex` no es una medida de privacidad ni impide visitar la web.

El árbol vigente de GitHub se sustituye por esta implementación mediante un commit normal, sin reescribir el historial anterior.

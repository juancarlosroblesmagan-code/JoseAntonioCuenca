# Operación y publicación

## Estructura

- `index.html`: contenido, navegación, FAQ y diálogos.
- `styles.css` + `modern.css`: estilos actuales; ambos se cargan.
- `app.js`: navegación, movimiento y reproducción.
- `assets/`: medios finales, fuentes, licencias y procedencia.
- `scripts/`: desarrollo, build, generación y verificación.
- `dist/`: salida de publicación, regenerable y no versionada.
- `reports/`: pruebas/capturas locales, regenerables y no versionadas.

## Recursos

`npm run assets` descarga medios oficiales y fuentes y genera las imágenes optimizadas. Necesita acceso a las fuentes externas; sus originales de trabajo quedan en `assets/originals/`, fuera de Git. No es necesario ejecutarlo para construir el sitio porque los recursos finales ya están incluidos.

`npm run videos` necesita los tres originales del cliente en Descargas, con los nombres indicados en el manifiesto. Optimiza vídeo, genera posters y aplica la banda sonora. No es necesario para el build normal. No usar `--rename-originals` salvo que se quiera renombrar expresamente los originales.

`npm run sound` sintetiza la pista y sustituye únicamente el audio de las copias web. El WAV intermedio no se versiona; se incluye la muestra MP3. La imagen no se recodifica al sustituir el sonido.

`node scripts/verify-media.mjs` compara los hashes con los originales de Descargas y verifica las copias y el servidor local; no puede comprobar los originales en otro equipo sin proporcionarlos.

## Preparar entrega

```powershell
npm ci
$env:SITE_URL='https://DOMINIO-CONFIRMADO/'
npm run build
```

Sustituir el ejemplo por un dominio real verificado. Publicar el contenido de `dist/` en la raíz del sitio. No requiere servidor Node ni reglas SPA. No reutilizar las reglas de redirección de la aplicación React anterior sin revisarlas.

Configurar HTTPS y tipos MIME para `.avif`, `.webp`, `.mp4` y `.vtt`. Permitir rangos HTTP para buscar dentro de los vídeos. Verificar caché y actualizar HTML/CSS/JS durante despliegues para no mostrar versiones mezcladas.

La versión presente está desplegada en `https://joseantoniocuenca.es`, continúa bloqueada para indexación y muestra avisos de contacto/legal pendientes. Validar en teléfono real y completar datos y permisos antes de autorizar indexación. No introducir analítica ni formularios sin ajustar privacidad y seguridad.

`node scripts/verify-deployment.mjs` compara todos los archivos públicos con `dist/`, verifica rangos MP4, MIME de subtítulos y que el backup no sea público. Para ejecutar pruebas contra el dominio: configurar `TEST_URL=https://joseantoniocuenca.es` antes de `npm test` o `node scripts/review-mobile.mjs`.

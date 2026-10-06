# Formulario de contacto

## Configuración

- Destinatario y remitente: `info@joseantoniocuenca.es`, confirmado por el titular.
- SMTP: `smtp.ionos.es`, puerto 587, STARTTLS con verificación TLS predeterminada de PHPMailer.
- IMAP no se utiliza para enviar. No se accede al buzón ni se leen mensajes.
- PHPMailer 7.0.2 incluido con licencia LGPL en `api/lib/`.
- PHP 8.1 o superior; extensión OpenSSL; conexiones salientes al puerto 587.

La contraseña configurada en la implementación anterior se ha migrado en el propio servidor, sin devolverla al navegador ni incorporarla a GitHub. No se ha cambiado ni reseteado la contraseña del buzón.

`contact-config.php` se guarda en el directorio principal de la suscripción, **fuera de `httpdocs`**, con permisos 0600. Devuelve un array PHP con `smtp_password` y `token_key` (clave aleatoria de 32 bytes representada en hexadecimal). Es una configuración privada necesaria para operar el formulario; los backups del servidor deben protegerla. Nunca copiarla a `dist/`, al repositorio o a documentación.

El instalador temporal se ha eliminado después de la migración. La aplicación no depende del backup ni de la papelera para funcionar.

## Seguridad y funcionamiento

- Destinatario fijo: no es un relay hacia direcciones indicadas por visitantes.
- `Reply-To` usa el email validado del visitante; `From` sigue siendo la cuenta IONOS.
- Validación de campos y longitudes tanto en frontend como en PHP; rechazo de saltos de línea en cabeceras.
- Solo JSON, POST con origen `https://joseantoniocuenca.es`, token HMAC válido ligado a IP y tiempo; sin CORS permisivo.
- Campo trampa y mínimo de dos segundos antes del envío; token expira a la hora.
- Límite de tres envíos por IP en diez minutos y treinta envíos totales en diez minutos, incluyendo intentos SMTP fallidos.
- Estado antiabuso privado en `contact-rate/limits.json`, IP seudonimizada mediante HMAC y sin guardar consultas en disco. No utiliza cookies ni almacenamiento local.
- Respuesta de éxito solo tras aceptación SMTP. Nunca devuelve diagnósticos SMTP ni contraseñas al visitante.
- Las librerías no son accesibles directamente por HTTP.
- Aviso de tratamiento y autorización para responder visibles, con enlace a la política completa. Titular confirmado: José Antonio Cuenca Gómez. Plazo elegido: máximo tres meses desde la recepción de consultas. El titular debe eliminar también los correos/copias correspondientes; la aplicación no accede al buzón para borrarlos.

## Pruebas

`node scripts/test-contact.mjs` revisa el formulario público en 320, 390 y 1440 px, accesibilidad, campos obligatorios y protecciones. **No envía correo por defecto.**

`node scripts/test-contact.mjs --send` añade un único mensaje técnico real a la cuenta confirmada. Usarlo solo con autorización. El 6 de octubre de 2026, un mensaje enviado desde el formulario nuevo ha sido aceptado por el SMTP de IONOS. Aceptación SMTP no garantiza recepción en bandeja; confirmarla con el titular, incluido spam.

El servidor Node de desarrollo no ejecuta PHP ni sirve su código fuente. Las pruebas locales generales simulan únicamente la obtención del token, no envíos. Para comprobar PHP y SMTP, usar el servidor Plesk.

Para otro dominio, adaptar la validación de origen en PHP; no usar comodines. Para errores SMTP, revisar configuración privada y logs del servidor sin mostrar credenciales ni habilitar depuración pública.

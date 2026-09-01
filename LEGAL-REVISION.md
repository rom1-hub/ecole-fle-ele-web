# Revisión legal — v12

Esta versión incorpora los datos identificativos facilitados para el titular y elimina los textos de borrador visibles en producción.

## Servicios técnicos previstos
- Alojamiento/publicación web: GitHub Pages.
- DNS, proxy y seguridad: Cloudflare.
- Formulario de contacto: FormSubmit.
- Correo de recepción de formularios: info@ecole-fle-ele.com.

## Cookies
Actualmente la web utiliza Google Analytics 4 (GA4), identificado mediante el ID de medición G-3QLVRV8MDZ. La carga de Google Analytics está condicionada al consentimiento del usuario mediante el sistema de gestión de cookies implementado en la web. Se ha eliminado el banner de cookies de demostración para no pedir un consentimiento que no corresponde a una herramienta no instalada. Si se añaden servicios que requieran consentimiento, habrá que actualizar la política y el mecanismo de consentimiento antes de activarlos.

## Estado del proyecto y pendientes

### Completado

- Alojamiento y publicación mediante GitHub Pages.
- DNS, proxy y seguridad configurados mediante Cloudflare.
- Dominio personalizado y HTTPS funcionando correctamente.
- Redirección permanente de `www.ecole-fle-ele.com` hacia `ecole-fle-ele.com`.
- Redirecciones 301 históricas configuradas mediante Cloudflare Bulk Redirects.
- `robots.txt` configurado para permitir el rastreo y declarar el sitemap.
- Sitemap XML operativo y enviado correctamente a Google Search Console.
- Configuración de Google Analytics 4 condicionada al consentimiento del usuario.
- Formulario de contacto operativo mediante FormSubmit.
- Página de confirmación del formulario configurada con `noindex`.
- Páginas legales configuradas con `noindex`.
- Comprobación de las principales páginas y enlaces de la web.

### Pendientes

1. Confirmar que el formulario FormSubmit continúa funcionando correctamente y que los correos se reciben con normalidad.
2. Comprobar en Google Analytics 4 que el evento `generate_lead` se registra correctamente tras un envío del formulario con consentimiento.
3. Esperar la reevaluación de Google para las páginas `/clases-frances-online/` y `/blog/`, cuya solicitud de indexación ya ha sido realizada.
4. Revisar el informe de indexación de Google Search Console cuando termine de procesar los datos.
5. Añadir los horarios de atención de la academia al footer y a la página de contacto.
6. Añadir el enlace a las opiniones de Infoidiomas.
7. Realizar una auditoría final de rendimiento, Core Web Vitals y accesibilidad.
8. Revisar y ampliar progresivamente el SEO on-page y el enlazado interno del sitio.
9. Valorar la transferencia del registro del dominio desde IONOS a Cloudflare Registrar una vez estabilizada toda la configuración.

# GlobalOffice LLC · Laboratorio de landings

Entorno de prueba para diseñar y testear landings de captación de leads antes de llevarlas al sitio oficial ([start.globaloffice.llc](https://start.globaloffice.llc/)).

- **Se publica en:** `test.globaloffice.llc` (protegido con usuario y contraseña).
- **Deploy:** automático. Cada cambio en la rama `main` se publica solo vía Hostinger Git.
- **No se indexa:** `robots.txt` bloquea todo y cada página lleva `noindex`.
- **No toca producción:** `order` y `pay` viven en otros repos y los gestiona Dan.

## Estructura

```
index.html            → sitio v2 (home completa, ES/EN, estilo bufete azul + naranja)
assets/site.css       → estilos del sitio v2
assets/site.js        → idioma ES/EN, pestañas de precios, plan elegido en el formulario
landings/index.html   → índice con todas las landings de prueba
assets/base.css       → estilos compartidos (colores y tipografías en :root)
assets/config.js      → WhatsApp y endpoint de leads (un solo lugar)
assets/lead.js        → envío de formularios + UTM/fbclid/gclid
landings/<nombre>/    → una carpeta por landing (ej. landings/llc-v1/)
```

## Crear una landing nueva

1. Copiar `landings/llc-v1/` con un nombre nuevo (ej. `landings/llc-v2-ads/`).
2. Cambiar el valor de `data-lead-form="..."` por el nombre nuevo, así se sabe de qué landing vino cada lead.
3. Agregar la landing a `landings/index.html`.

## Leads

- Con `leadEndpoint` vacío en `assets/config.js`, el formulario funciona en **modo prueba**: muestra el mensaje de éxito y el lead solo se ve en la consola del navegador.
- Para enviar a un CRM o automatización (n8n, Make, webhook), completar `leadEndpoint`. Se envía un JSON con los campos del formulario + `landing`, `page_url`, `submitted_at` y los UTM.

## Importante

- **No subir un `.htaccess`**: la protección con contraseña de Hostinger vive en el `.htaccess` del servidor y se podría pisar.
- **Nunca subir claves** (Stripe, API keys, tokens). Este repo es público.

## Sitio v2 (home)

- **Idioma:** botones ES/EN arriba, o `?lang=en` en la URL. Los textos van en pares `<span class="es">` / `<span class="en">`.
- **Precios (benchmark oct. 2026):** Esencial USD 499 (base: International+ de LLC Attorney), Pro 799, Año Cubierto 1,349, Mantenimiento 649/año. Adicionales: Form 5472 + 1120 329/año, ITIN 349, cuenta bancaria adicional 199.
- **Referencia de mercado:** la línea gris bajo cada plan se controla con `showMarketRef` en `assets/config.js`. Poner `false` antes de llevar el diseño al sitio oficial.
- **Preseleccionar plan:** `?plan=pro` (valores: esencial, pro, ano-cubierto, mantenimiento, adicional).
- Los leads salen con `landing: "sitio-v2"`, el `plan` y el `idioma`.

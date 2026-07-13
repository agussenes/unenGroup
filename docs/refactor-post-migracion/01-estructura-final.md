# 01 — Estructura final y decisiones

## Decisiones aplicadas (validadas con el usuario)
- **Consolidación conservadora:** se comparte solo lo 100% idéntico (helpers, API, lightbox, config,
  y reglas CSS byte-idénticas). `card()` y `openDetail()` quedan por página (difieren de verdad).
- **ES Modules** para los archivos nuevos (`import`/`export`, sin globals). Terceros (Bootstrap,
  Swiper, Analytics, reCAPTCHA, SweetAlert) y los scripts clásicos existentes (`scriptNavbarFixed`,
  `scriptSwiperHome`, `scriptHome`, `scriptSwiperValores`) siguen como `<script>` clásicos.

## Estructura final

```
css/
  stylesGen.css              (chrome — sin cambios)
  stylesInicio.css           (base Home — sin cambios)
  stylesNosotros.css         (Nosotros — sin cambios)
  home.css                   (NUEVO — CSS específico de Home, extraído del <style> inline)
  propiedades.css            (NUEVO — CSS específico de Propiedades, extraído del <style> inline)
  components/
    property-cards.css       (NUEVO — 15 reglas de card compartidas, byte-idénticas)
    property-detail.css      (NUEVO — 11 reglas de detalle/offcanvas/fact/spinner compartidas)
    lightbox.css             (NUEVO — 7 reglas de lightbox compartidas)
js/
  core/
    config.js                (NUEVO — API_BASE/URL, WhatsApp, PLACEHOLDER, TIPO_LABEL, RETRIES)
    helpers.js               (NUEVO — esc, sanitize, num, money, resolveImg, normalize, supTotal, waLink, tipoLabel, fact)
    api.js                   (NUEVO — fetchProperties(filter) con reintentos; reemplaza fetchProps/fetchDestacadas)
    lightbox.js              (NUEVO — openLightbox)
  pages/
    home.js                  (NUEVO — ES module: destacadas grid/carrusel, detalle, form; importa core)
    propiedades.js           (NUEVO — ES module: filtros/?tipo/#filtros/?propiedad, detalle, form; importa core)
  scriptNavbarFixed.js       (sin cambios)   scriptSwiperHome.js (sin cambios)
  scriptHome.js              (sin cambios, setContactType)   scriptSwiperValores.js (sin cambios)
```

## Archivos eliminados (código muerto, ya sin referencias)
- `css/stylesPropiedades.css`
- `js/scriptPropiedades.js`, `js/scriptPorpiedadDestBoton.js`, `js/scriptHomeDestacados.js`
- `js/scriptSwiperTestimonials.js`
- `js/formularios/formPropiedades.js`, `js/formularios/formServicios.js` (+ carpeta `js/formularios/` vacía)
- carpetas `/propuesta/` y `/propuesta-home/`
- línea comentada de testimonials en `index.html`

## Carga en el HTML
- **CSS** (`<head>`): `stylesGen` [+ `stylesInicio` en Home] → `components/property-cards` →
  `components/property-detail` → `components/lightbox` → `home.css`/`propiedades.css`.
  (Orden validado: componentes antes de la hoja de página; cascada preservada.)
- **JS** (fin de `<body>`): terceros y clásicos como hasta ahora + `<script type="module"
  src="/js/pages/{home|propiedades}.js">` al final. `gtag` y `JSON-LD` permanecen inline.

## Qué NO se tocó
- Diseño, branding, UX, textos, markup del `<body>` (byte-idéntico), header, footer, modales,
  formularios (endpoints/campos/reCAPTCHA), SEO/OG/Twitter/canonical/robots/favicon/Analytics,
  rutas, `nosotros/`, `stylesGen.css`, `stylesInicio.css`, `stylesNosotros.css`, y los PHP.
- Atributos `style="..."` inline en el markup (parte del diseño aprobado): fuera de alcance
  (la Etapa 3 pedía quitar bloques `<style>`, no atributos del HTML aprobado).

## Deuda técnica restante (documentada)
- `card()` / `openDetail()` siguen por página (decisión conservadora). Si en el futuro convergen,
  se pueden extraer a `js/components/`. No es duplicación de helpers/API/lightbox (eso ya está unificado).

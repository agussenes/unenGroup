# 02 — Plan Etapa 3: `/propuesta-home/` → `/` (Home)

> ⛔ **NO implementar hasta que el usuario valide la Etapa 1 (Propiedades).**

## Alcance previsto

- Reemplazar `<body>` + `<style>`/`<script>` inline de `index.html` por los de `/propuesta-home/`.
- **Conservar el `<head>` productivo actual de la Home** (ya tiene SEO, Analytics, OG, Twitter,
  canonical, favicon y JSON-LD) y **agregar** el bloque `<style>` premium de la propuesta.
- CSS sin cambios: `stylesGen.css` + `stylesInicio.css` (la home migrada los sigue usando).

## Estilos

- **Se conservan:** `stylesGen.css` (chrome) y `stylesInicio.css` (hero, servicios, `#propiedades`,
  `#contacto`, `.hr-with-text`).
- **Conflicto ya neutralizado por la propuesta:** `stylesInicio.css` tiene
  `#propiedades .swiper-slide img { height:350px; object-fit:contain }`. La propuesta lo anula solo
  dentro de su carrusel con `#propiedades .dest-carousel .prop-media img { height:100%!important;
  object-fit:cover!important }`. Las cards en grid no matchean la regla (no son `.swiper-slide`).
- No se deja de cargar ningún CSS en la Home.

## Scripts

- **Se conservan:** `scriptSwiperHome.js` (hero), `scriptNavbarFixed.js` (chrome), `scriptHome.js`
  (`setContactType()` de los modales de servicios).
- **Dejan de cargarse (retirar del HTML, no borrar):**
  - `js/scriptHomeDestacados.js` (destacadas viejas → reemplazadas por inline)
  - `js/formularios/formServicios.js` (submit viejo → reemplazado por `bindForm` inline)
- El bloque inline de la propuesta trae: destacadas (grid/carrusel), detalle offcanvas, lightbox y
  el handler del form `#formContacto` → `/php/formServicios.php`.

## Riesgos específicos

- **Doble submit** si `formServicios.js` + `bindForm` inline conviven → retirar `formServicios.js`.
- **Doble fetch/render** si `scriptHomeDestacados.js` + inline conviven → retirar el viejo.
- Swiper: hero (`.main-slider`), destacadas (`.dest-*`) y detalle (`#detailSwiper`) usan selectores
  distintos → sin colisiones.

## Diseño aprobado a respetar

- Destacadas: "Me interesa" del layout viejo se reemplaza por "Ver todas" → `/propiedades/`
  (cambio de diseño aprobado; no reintroducir el comportamiento viejo).
- `setContactType()` sigue preseleccionando el tipo y scrolleando a `#contacto` desde los modales.

## Validaciones (resumen; detalle en `05-qa-rollback.md`)

Un solo submit del form, destacadas correctas (grid ≤4 / carrusel >4), detalle+lightbox, modales de
servicios, hero Swiper, footer con año dinámico, responsive, sin errores de consola, SEO/Analytics
intactos.

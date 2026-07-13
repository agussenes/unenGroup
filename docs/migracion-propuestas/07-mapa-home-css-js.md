# 07 — Mapa CSS / JS del Home

## CSS

| Archivo | Rol en Home | Tras migrar |
|---|---|---|
| `css/stylesGen.css` | chrome (navbar fijo, footer, WhatsApp, powered-by, body) | **Mantener** (compartido, intacto) |
| `css/stylesInicio.css` | hero `.main-slider`/`.hero-content`, `.servicio-card` base, `#sobre-unengroup`, `#propiedades`, `#contacto` base, `.hr-with-text` | **Mantener** (la Home lo sigue usando) |
| `<style>` inline de la propuesta | upgrade premium (servicios, destacadas `.prop-card`/`.dest-*`, detalle/lightbox, `contact-shell`, modales) | **Migrar** (se agrega tal cual) |

**Ningún CSS deja de cargarse en Home** (a diferencia de Propiedades, que soltó `stylesPropiedades.css`).

### Conflictos y estado
| Selector | Riesgo | Estado |
|---|---|---|
| `stylesInicio` `#propiedades .swiper-slide img {height:350px; object-fit:contain}` vs carrusel de destacadas | Alto (franjas) | **Neutralizado** por `#propiedades .dest-carousel .prop-media img{height:100%!important;object-fit:cover!important}`. La grilla (no `.swiper-slide`) no matchea. |
| `stylesInicio` `#propiedades .btn/.btn-secondary` vs `.btn.btn-wa`/`.btn.btn-interes` de la propuesta | Bajo | La maqueta ya carga `stylesInicio` → lo aprobado ya incluye ese efecto |
| `stylesInicio` `#contacto` (fondo/tipos) vs `contact-shell` de la propuesta | Bajo | Overrides de alta especificidad + `!important` acotado en la propuesta (`#contacto .contact-aside-inner …`) |
| `.modal-*` de la propuesta (header marrón, X blanca) | Bajo | Reglas nuevas, no chocan con Bootstrap base |
| Media queries | — | Sin duplicados nocivos; breakpoints coherentes con Bootstrap |

**Clasificación de reglas:** las de `stylesGen`/`stylesInicio` = **Mantener**; las del `<style>`
inline = **Migrar**; ninguna a **Eliminar** (salvo, en la consolidación DRY futura, unificar el
`<style>` de Home y Propiedades si se decide extraer a archivo — fuera de alcance ahora).

## JavaScript

| Script | Rol | Tras migrar |
|---|---|---|
| `js/scriptNavbarFixed.js` | chrome + año footer + reveal secciones | **Mantener** (compartido) |
| `js/scriptSwiperHome.js` | init Swiper del hero `.main-slider` | **Mantener** (Home lo necesita) |
| `js/scriptHome.js` | `setContactType()` de los modales de servicios | **Mantener** |
| Bootstrap bundle, Swiper, SweetAlert2 (CDN) | librerías | **Mantener** |
| Inline: destacadas (API + grid/carrusel + detalle + lightbox) + `bindForm` | lógica de la propuesta | **Mantener** (Path A) |
| `js/scriptHomeDestacados.js` | destacadas viejas + detalle modal + lightbox viejo | **Retirar del HTML** |
| `js/formularios/formServicios.js` | submit viejo de `#formContacto` | **Retirar del HTML** |
| Pannellum (CDN) | visor 360 (comentado, sin uso) | **Retirar** (recomendado; sin efecto visual) |

### Duplicación Home-inline vs Propiedades-inline (para la consolidación futura)
- **Compartido (~200 líneas):** `esc`, `sanitize`, `num`, `money`, `PLACEHOLDER`, `resolveImg`,
  `normalize`, `supTotal`, `waLink`, `TIPO`/`tipoLabel`, `card()`, `fact()`, `openDetail()`,
  `openLightbox()`.
- **Diferencias por página (por eso hoy no comparten archivo):** Home filtra `destacado&&active`,
  grilla≤4/carrusel>4, badge «Destacada» fija, acción «Ver todas»→`/propiedades/`, ids
  `#propertyDetailsPanel`/`#propertyDetailsContent`; Propiedades tiene filtros/chips/`?tipo=`,
  acción «Me interesa»→form, ids `#detailPanel`/`#detailContent`.
- **Sin colisiones globales:** ambos scripts viven en IIFE `(){'use strict'}`; único global
  necesario `setContactType` (de `scriptHome.js`). Sin variables globales repetidas.

### Doble init / listeners
- **Swiper:** hero (`.main-slider`, `scriptSwiperHome.js`), destacadas (`.dest-swiper`, inline) y
  detalle (`#detailSwiper`, inline) usan selectores distintos → sin colisión.
- **Bootstrap:** una sola carga; Offcanvas con instancia cacheada; Modales de servicios nativos.
- **Fetch:** un solo `fetch` (inline). `scriptHomeDestacados.js` retirado evita el segundo.
- **Submit:** un solo listener (inline). `formServicios.js` retirado evita el doble POST.

## Código muerto / obsoleto tras migrar (NO borrar aún)
| Elemento | Motivo | Reemplazo |
|---|---|---|
| `js/scriptHomeDestacados.js` | destacadas reimplementadas | inline Home |
| `js/formularios/formServicios.js` | handler inline nuevo | `bindForm` inline |
| markup `#propertyDetailsModal` en `index.html` | detalle ahora en offcanvas | `#propertyDetailsPanel` |
| Pannellum (si se retira) | sin uso | — |
| `js/scriptSwiperTestimonials.js` | testimonios comentados (ya no lo carga nadie tras Etapa 1) | — |

> Eliminación física: solo tras aprobar **ambas** migraciones (Home + Propiedades).

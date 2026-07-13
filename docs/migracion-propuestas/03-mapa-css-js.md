# 03 — Mapa de CSS y JS

## CSS — dueño por vista

| Archivo | Función | Lo usa | Tras migrar |
|---|---|---|---|
| `css/stylesGen.css` | navbar `position:fixed`, footer, botón WhatsApp, powered-by, `body` | **todas** las vistas + ambas propuestas | **Intacto — no tocar** |
| `css/stylesInicio.css` | hero `.main-slider`/`.hero-content`, `.servicio-card`, `#propiedades`, `#contacto`, `.hr-with-text` | Home | **Se conserva** (Home) |
| `css/stylesNosotros.css` | vista Nosotros | Nosotros | Sin cambios |
| `css/stylesPropiedades.css` | vista Propiedades actual | Propiedades | **Huérfano** tras Etapa 1 (nadie lo enlaza) |

### Conflictos CSS y estado
- `#propiedades .swiper-slide img {height:350px; contain}` (Home) → **neutralizado** por override
  `!important` de la propuesta dentro de `.dest-carousel`. Grid no matchea.
- `#propiedades .btn/.btn-secondary` (Home) puede teñir `.btn.btn-wa`/`.btn.btn-interes` dentro de
  `#propiedades` → riesgo bajo; la maqueta ya carga `stylesInicio.css`, así que lo aprobado ya lo
  incluye.
- `#contacto` (Home) vs `contact-shell` de la propuesta → resuelto con overrides de alta
  especificidad + `!important` acotado en la propuesta.
- En Propiedades **no hay conflicto**: la propuesta no carga `stylesPropiedades.css`.

## JS — conservar / retirar

### Compartidos (no tocar)
- `js/scriptNavbarFixed.js` — logo shrink, cierre menú mobile, IntersectionObserver de secciones,
  **año dinámico del footer**. Lo usan todas las vistas + ambas propuestas.

### Propiedades (Etapa 1)
| Script | Acción |
|---|---|
| `scriptNavbarFixed.js` | **Conservar** |
| Bootstrap bundle, Swiper, SweetAlert2 (CDN) | **Conservar** |
| Handler de form inline + app inline (`?tipo=`/`?propiedad=`/detalle/lightbox) | **Conservar** (propuesta) |
| `js/scriptPropiedades.js` | **Retirar del HTML** |
| `js/scriptPorpiedadDestBoton.js` | **Retirar del HTML** |
| `js/formularios/formPropiedades.js` | **Retirar del HTML** |
| `js/scriptSwiperTestimonials.js` | **Retirar del HTML** |
| `js/scriptSwiperHome.js` | **Retirar del HTML** |
| Pannellum | No se incluye (no se usa) |

### Home (Etapa 3, futura)
| Script | Acción |
|---|---|
| `scriptSwiperHome.js`, `scriptNavbarFixed.js`, `scriptHome.js` | **Conservar** |
| `js/scriptHomeDestacados.js` | **Retirar del HTML** |
| `js/formularios/formServicios.js` | **Retirar del HTML** |

## Riesgo de doble fetch

Ambas propuestas hacen **un solo** `fetch(API_URL)` desde su IIFE. Si además se cargara
`scriptPropiedades.js` (propiedades) o `scriptHomeDestacados.js` (home), habría **2 fetch** y
render duplicado. Mitigación: retirar los scripts viejos del HTML.

## Riesgo de doble submit

Las propuestas adjuntan su propio `submit` a `#formPropiedades` / `#formContacto`. Si conviven con
`formPropiedades.js` / `formServicios.js`, cada envío dispararía **2 POST** al PHP. Mitigación:
retirar los form-scripts viejos del HTML.

## Encapsulación

Toda la lógica de las propuestas vive en IIFE `(function(){'use strict'; …})()` → no contamina el
scope global (`API_BASE`, `card`, `openDetail`, etc. son privados). Único global necesario:
`setContactType` (en `scriptHome.js`, solo Home). Sin colisiones de nombres.

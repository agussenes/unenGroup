# 00 — Auditoría de arquitectura (Etapa 3, refactor)

> Refactor arquitectónico. **Cero cambio visual/funcional.** Solo mejora de código.
> **Antes de crear/borrar archivos se valida esta arquitectura con el usuario.**

## Inventario de código inline

| Vista | CSS inline (`<style>`) | JS inline (`<script>`, sin gtag/JSON-LD) |
|---|---|---|
| `index.html` (Home) | 776 líneas | 202 líneas (1 bloque: destacadas + `bindForm`) |
| `propiedades/index.html` | 633 líneas | 462 líneas (2 bloques: form + app) |

Debe permanecer inline: **Google Analytics (gtag)** y **JSON-LD** (config, no lógica de app).

## JS — solapamiento real (medido)

**Idéntico → seguro de extraer a módulo compartido:**
- Constantes: `API_BASE`, `API_URL`, `WHATSAPP`, `WA_MSG`, `RETRIES`, `RETRY_DELAY`, `PLACEHOLDER`, mapa `TIPO`.
- Helpers puros: `esc`, `sanitize`, `num`, `money`, `resolveImg`, `normalize`, `supTotal`, `waLink`, `tipoLabel`, `fact`.
- `openLightbox` (byte-idéntico).
- `fetch` con reintentos (parametrizable por un filtro opcional).

**Mismo nombre pero cuerpo distinto → NO fusionar a ciegas (regla «solo si es exactamente igual»):**
- `card` (Home: badge «Destacada» fija + acción; Propiedades: badge condicional + «Ver detalle»).
- `openDetail` (Home: acción «Ver todas» + ids `#propertyDetailsContent/#propertyDetailsPanel`;
  Propiedades: «Me interesa» + ids `#detailContent/#detailPanel`).
- `showState`/`hideState` (difieren solo en el id del mount).

**Exclusivo por página (se queda en el módulo de página):**
- Home: `fetchDestacadas` (filtra `destacado && active`), `renderDestacadas` (grid≤4 / carrusel>4), `bindForm` (→`formServicios.php`).
- Propiedades: `fetchProps`, `buildFilters`, `populateInteres`, `readFilters`, `applyFilters`, `updateCounter`, `render`, `goToContact`, `bindEvents`, `handleQueryProp`, `normalizeTipo`, `applyTipoFromQuery`, `scrollToFiltersIfHash`, `bindForm` (→`formPropiedades.php`).

## CSS — solapamiento real

**Compartido y (casi) idéntico → candidato a `components/`:**
`.prop-card`, `.prop-body`, `.prop-price`, `.prop-title`, `.prop-loc`, `.prop-metrics`, badges
(`badge-op/fav/count`), `.detail-hero`, `.detail-content`, `.detail-price`, `.fact-grid`, `.fact`,
`.detail-desc`, `.detail-actions`, `.offcanvas.detail`, `.lightbox` + `.lb-*`, `.spinner-brand`,
`@keyframes spin`, botones `.btn-detalle/.btn-wa/.btn-interes`.

**Difiere → NO compartir (queda page-specific):**
- `.prop-media`: Home `height:220px` (carrusel parejo) vs Propiedades `aspect-ratio:4/3`.
- Overrides solo-Home: `#propiedades .dest-carousel .prop-media img{…!important}`,
  `#propertyDetailsContent .detail-hero .swiper-slide img{…}` (fix del detalle).
- Home-only: servicios upgrade, `.dest-*` (carrusel), `contact-shell`, modales premium, `trust-badges`, `up-eyebrow`.
- Props-only: `.hero`, `.chips/.chip`, `.filterbar`, `.counter-pill`, `.section-props`, `.contact-card`, `.state`, `#contacto` (portada), `#filtros`.

## Estructura propuesta (a validar)

```
css/
  stylesGen.css              (keep — chrome, intacto)
  stylesInicio.css           (keep — base Home: hero/servicios/#sobre/#contacto base/hr)
  stylesNosotros.css         (keep — Nosotros)
  home.css                   (NUEVO — CSS solo-Home extraído del <style>)
  propiedades.css            (NUEVO — CSS solo-Propiedades extraído del <style>)
  components/
    property-cards.css       (NUEVO — reglas de card compartidas idénticas)
    property-detail.css      (NUEVO — offcanvas/detalle/fact compartidos)
    lightbox.css             (NUEVO — lightbox compartido)
js/
  core/
    config.js                (NUEVO — constantes API/WhatsApp/PLACEHOLDER/TIPO)
    helpers.js               (NUEVO — esc/sanitize/num/money/resolveImg/normalize/supTotal/waLink/tipoLabel/fact)
    api.js                   (NUEVO — fetchProperties({filter}) con reintentos)
    lightbox.js              (NUEVO — openLightbox)
  pages/
    home.js                  (NUEVO — destacadas grid/carrusel + card/openDetail Home + bindForm Home)
    propiedades.js           (NUEVO — filtros/?tipo + card/openDetail Props + bindForm Props)
  scriptNavbarFixed.js       (keep)   scriptSwiperHome.js (keep, hero Home)
  scriptHome.js              (keep, setContactType)   scriptSwiperValores.js (keep, Nosotros)
```

## Archivos a eliminar (Fase 3, ya autorizado por Etapa 3)

Solo tras extraer todo y confirmar 0 referencias:
- `css/stylesPropiedades.css` (huérfano desde Etapa 1)
- `js/scriptPropiedades.js`, `js/scriptPorpiedadDestBoton.js`, `js/scriptHomeDestacados.js`
- `js/formularios/formPropiedades.js`, `js/formularios/formServicios.js`
- `js/scriptSwiperTestimonials.js`
- carpetas `/propuesta/` y `/propuesta-home/`
- markup muerto: línea comentada de testimonials en `index.html`

## Decisiones abiertas (requieren tu OK antes de implementar)

1. **Profundidad de consolidación** de `card()` y `openDetail()` (difieren entre páginas):
   conservador (quedan por página, se comparte solo lo idéntico) vs agresivo (parametrizar a un
   componente compartido con opciones).
2. **Sistema de módulos**: ES Modules (`type="module"`, import/export — 2026) vs objeto global
   (`window.UNEN`, `<script>` clásicos) — impacta semántica de carga.

## Plan por fases (tras aprobar arquitectura)
- **F1** Extraer CSS inline → archivos (byte-a-byte). **F2** Extraer JS inline → archivos.
- **F3** Consolidar lo idéntico (helpers/api/lightbox/config + CSS components).
- **F4** Eliminar código muerto y archivos obsoletos. **F5** QA final (diff visual + runtime).

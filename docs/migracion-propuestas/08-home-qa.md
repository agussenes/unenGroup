# 08 — QA y Rollback del Home

## QA Visual (método: diff de fuente contra `/propuesta-home/`)
El `<body>` + `<style>` migrados deben ser **byte-idénticos** a `/propuesta-home/`; las únicas
diferencias esperadas en `index.html` son: (a) el `<head>` productivo del Home (se conserva, no el de
la maqueta) y (b) los `<script>` viejos retirados. Validar con `diff`.

- [ ] Header, hero, `#sobre-unengroup`, servicios, modales, destacadas, contacto, footer: idénticos.
- [ ] Tipografías, espaciados, sombras, badges, botones: idénticos.

## QA Funcional

### Header / Hero / Bloque inicial
- [ ] Navbar fijo, logo shrink on-scroll, menú mobile cierra al click, WhatsApp flotante.
- [ ] Hero Swiper (`.main-slider`) autoplay/flechas/paginación; responsive.
- [ ] `#sobre-unengroup` (misión/visión/valores/objetivos) intacto.

### Servicios + modales (crítico)
- [ ] 6 cards con textos/imágenes/botones intactos.
- [ ] Los **6 modales** abren/cierran (X blanca sobre header marrón), textos completos sin recortes.
- [ ] `setContactType()` preselecciona `#tipoContacto` y scrollea a `#contacto`.

### Propiedades destacadas + carrusel dinámico
- [ ] Filtra `destacado && active` (hoy 6 destacadas → carrusel).
- [ ] **N=3** → grilla; **N=6/10/20/50** → carrusel Swiper, sin romper responsive ni diseño.
- [ ] Loader (`spinner-brand`), empty state, error state.
- [ ] Cards: imágenes + fallback `onerror`→PLACEHOLDER, badges, hover, WhatsApp con propiedad correcta.
- [ ] «Ver todas» → `/propiedades/`.

### Detalle / Lightbox
- [ ] Offcanvas `#propertyDetailsPanel` abre/cierra; galería Swiper interna navega.
- [ ] Lightbox: click en imagen abre; teclado (Escape/←/→); click fuera cierra; foco vuelve.

### Formulario
- [ ] `#formContacto` → `/php/formServicios.php`; campos `nombre/email/tipoContacto/mensaje` + reCAPTCHA.
- [ ] **Un solo POST**; mensajes éxito/error (SweetAlert2); `reset()` + `grecaptcha.reset()`.

### Footer
- [ ] Año dinámico, Powered By (Senestrari), redes, enlaces, WhatsApp.

## QA Responsive
- [ ] 360 / 390 / 768 / 992 / 1200 / 1440 / 1920: cards, servicios, modales, detalle, form, navbar, footer.

## QA Técnico
- [ ] Consola: 0 errores / 0 warnings críticos.
- [ ] Network: **un solo fetch** de propiedades, **un solo submit**, assets sin 404, fonts/imágenes OK.
- [ ] Sin scripts/CSS viejos cargados (`scriptHomeDestacados.js`, `formServicios.js`).
- [ ] Sin doble init de Swiper/Bootstrap; sin listeners duplicados; sin globales repetidas.
- [ ] `#propertyDetailsModal` (detalle viejo) ya no presente.

## SEO (conservado del Home actual)
- [ ] title, description, keywords, robots `index,follow`, canonical `/`, OG, Twitter, favicon,
      JSON-LD Organization, gtag `G-LSES4S50PT`, reCAPTCHA (una sola vez).

## Verificaciones automatizables (como en Etapa 1)
- [ ] `diff /propuesta-home/ vs /` = solo head + scripts retirados.
- [ ] Sintaxis JS inline OK.
- [ ] Runtime (jsdom + API real): destacadas filtradas `destacado&&active`; grilla si N≤4, carrusel
      si N>4 (simular N=3/6/10/20/50 duplicando el set); 0 errores.
- [ ] IDs duplicados (esperado: solo `telefonoFooter` preexistente).
- [ ] Un solo `<script>` Bootstrap/Swiper; `.main-slider` presente 1×.

## Rollback
- Un solo archivo: `index.html`. `git checkout -- index.html`.
- CSS/JS/PHP compartidos sin tocar; viejos en disco hasta limpieza final.
- Pruebas mínimas post-rollback: home carga, destacadas listan, modales abren, form 1 POST, footer año.

## Resultados QA Etapa 2 (2026-07-13)

- **Decisión:** Path A (migrar tal cual; sin tocar Propiedades; DRY diferida a limpieza).
- **Diff `/propuesta-home/` vs `/`:** únicas diferencias = head productivo (gtag, SEO, OG, Twitter,
  canonical, robots `index,follow`, JSON-LD) + remoción de Pannellum (CSS y JS, sin uso). `<style>`,
  `<body>` y script inline **byte-idénticos** → identidad visual/funcional por fuente.
- **Sintaxis JS inline:** 2/2 OK.
- **Runtime (jsdom):** API real (6 destacado&&active) → carrusel/6; N=3 y N=4 → grilla; N=6/10/20/50
  → carrusel con TODAS las slides (sin cap); filtro `destacado && active` correcto (3 de 8);
  `#formContacto` presente; **0 errores** de ejecución.
- **Assets/carga:** un solo `<script>` Bootstrap/Swiper; hero `.main-slider` 1×; un solo submit; un
  solo fetch; sin `scriptHomeDestacados.js`/`formServicios.js`/Pannellum; `#propertyDetailsModal`
  eliminado; línea de `scriptSwiperTestimonials.js` queda **comentada** (inerte, igual que la propuesta).
- **SEO:** title, description, keywords, robots `index,follow`, canonical `/`, OG (6), Twitter (6),
  favicon, gtag, JSON-LD (parsea OK). `og:image`/`twitter:image` → `/images/seo/seoImg.jpg`
  (verificado 200 en Etapa 1).
- **6 modales de servicios** presentes con contenido intacto.
- **Observaciones:** IDs duplicados `telefonoFooter` y `admProp` — **preexistentes** en la propuesta
  aprobada y el sitio; ningún JS los usa por id; no se corrigen (fuera de alcance / mantener idéntico).
- **Propiedades:** sin cambios en la Etapa 2 (su `M` en git es la Etapa 1 aún sin comitear).
- **Pendiente de smoke en navegador/servidor:** widget reCAPTCHA, envío real (SMTP), animaciones de
  hero/offcanvas/lightbox/carrusel y responsive visual. Respaldados por identidad de fuente.

## Fix puntual — detalle de destacadas (2026-07-13)

- **Causa:** `css/stylesInicio.css:827` → `#propertyDetailsContent .swiper-slide img { height:auto;
  max-height:70vh; object-fit:contain }` (regla legacy del detalle viejo). El offcanvas nuevo reutiliza
  el id `#propertyDetailsContent`, así que la regla lo alcanza; su especificidad `(1,1,1)` vence a la
  inline correcta `.detail-hero .swiper-slide img` `(0,2,1)` → `object-fit:contain` + `height:auto`
  letterboxeaban la imagen y mostraban el fondo `#3f3838`. `/propiedades/` no sufre esto porque **no
  carga stylesInicio.css**.
- **Fix:** override local en el `<style>` del Home (no se toca stylesInicio ni Propiedades):
  `#propertyDetailsContent .detail-hero .swiper-slide img { height:100%; max-height:none;
  object-fit:cover; border-radius:0 }`. Especificidad `(1,2,1) > (1,1,1)`, **sin `!important`**.
  Iguala el tratamiento de `/propiedades/`. Lightbox (`.lightbox img{object-fit:contain}`) no se
  toca (correcto e idéntico a Propiedades). Regresión de destacadas (grid/carrusel) revalidada OK.

## Veredicto (al finalizar)
`ETAPA 2 APROBADA` · `ETAPA 2 APROBADA CON OBSERVACIONES` · `ETAPA 2 REQUIERE AJUSTES`.

# 02 — Validaciones del refactor (Etapa 3)

Objetivo: probar **cero cambio visual/funcional**. Todo verificado de forma automatizada.

## CSS

1. **Equivalencia de reglas (byte-a-byte).** Se parseó el `<style>` inline original (snapshot previo)
   y se comparó, regla por regla (selector → cuerpo), contra la unión de los archivos nuevos
   (`components/*` + `home.css`/`propiedades.css`):
   - HOME: **105/105 reglas idénticas, 0 diferencias.**
   - PROPIEDADES: **84/84 reglas idénticas, 0 diferencias.**
2. **Cascada preservada.** Validador por (target, propiedad, especificidad): 0 conflictos reales.
   El único flag (`.prop-media img` vs `.lightbox img`, ambos terminan en `img`, misma especificidad)
   es un falso positivo: apuntan a elementos **disjuntos** (una card nunca está dentro de `.lightbox`).
3. **Dedup:** 33 reglas que estaban duplicadas en ambas vistas quedaron en `components/` (una sola copia).

## JavaScript

1. **Identidad de helpers.** Se verificó que los helpers/constantes movidos a `core/` son
   idénticos (o solo difieren en nombre de variable, p. ej. `waLink(t)` vs `waLink(titulo)`,
   comportamiento igual) entre Home y Propiedades antes de unificarlos.
2. **Sintaxis:** `node --check` OK en los 6 módulos.
3. **Runtime real (jsdom + `import` resuelto desde disco + datos reales de la API):**
   - HOME (`js/pages/home.js`): 6 destacadas (`destacado && active`) → carrusel; `#formContacto`
     presente; badge «Destacada»; **0 errores**.
   - PROPIEDADES (`js/pages/propiedades.js`) `?tipo=alquiler#filtros`: `#fTipo=alquiler`, chip activo,
     **8 cards**, contador «8 propiedades disponibles», `#propiedadInteres` con 24 opciones,
     `#formPropiedades` presente; **0 errores**.
   - Repetido contra el HTML ya cableado (post-wiring): mismos resultados.
   - (La lógica de grilla/carrusel para N=3/4/6/10/20/50 y el filtrado `?tipo` para todos los valores
     ya se validaron en Etapas 1 y 2; el código de `card`/`render`/`openDetail`/filtros es el mismo.)

## HTML / integración

- `<style>` inline: **0** en ambas vistas. `<script>` inline de app: **0** (solo permanecen `gtag` y `JSON-LD`).
- `<script type="module" src="/js/pages/…">` presente en cada vista, **después** de los scripts clásicos.
- Integridad de referencias: **todas** las `href`/`src` a `/css/` y `/js/` de las 3 vistas resuelven
  a archivos existentes (0 faltantes).
- SEO/Analytics/OG/Twitter/canonical/robots/favicon/JSON-LD/reCAPTCHA: intactos (head sin cambios de contenido).
- `nosotros/` intacto (solo usa `stylesGen` + `stylesNosotros` + `scriptNavbarFixed` + `scriptSwiperValores`).
- `/propiedades/` conserva el comportamiento aprobado en Etapa 1 (fix de detalle incluido en `home.css`
  para Home; Propiedades no lo necesita).

## Métricas

| | Antes (inline) | Después (archivos) |
|---|---|---|
| CSS inline en HTML | ~1.409 líneas (`<style>`) | 0 |
| JS inline en HTML | ~664 líneas (`<script>` app) | 0 (solo gtag + JSON-LD) |
| `index.html` | 1.978 líneas | 1.066 |
| `propiedades/index.html` | ~1.408 líneas | 348 |
| Archivos nuevos | — | 5 CSS + 6 JS |
| Archivos eliminados | — | 7 (código muerto) + 2 carpetas de propuesta |
| Reglas CSS dedup | 33 duplicadas | 1 copia en `components/` |
| Helpers/API/lightbox JS | duplicados en 2 scripts | 1 copia en `core/` |

## Pendiente de smoke en navegador/servidor (no ejecutable aquí)
Render pixel, widget reCAPTCHA, envío real (SMTP), animaciones e interacción (offcanvas/lightbox/
carrusel/hero) y responsive. Respaldados por: markup `<body>` byte-idéntico, CSS byte-idéntico por
regla + cascada preservada, y runtime de módulos sin errores.

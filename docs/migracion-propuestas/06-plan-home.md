# 06 — Plan Etapa 2: `/propuesta-home/` → `/` (Home)

> Reemplaza y amplía al stub preliminar `02-plan-home.md`.
> **No implementar hasta validar este plan y resolver la decisión de reutilización (§2).**

## 1. Estado actual (comparación de las 3 vistas)

| Aspecto | Home actual `/` | Propuesta `/propuesta-home/` | Propiedades `/propiedades/` (ya migrada) |
|---|---|---|---|
| Head SEO/Analytics | ✅ completo (gtag, OG, Twitter, canonical, JSON-LD, favicon, robots) | ❌ `noindex`, sin gtag/SEO | ✅ portado en Etapa 1 |
| CSS | stylesGen + stylesInicio | stylesGen + stylesInicio + `<style>` inline | stylesGen + `<style>` inline |
| Hero | `.main-slider` Swiper (2 slides) | idéntico | (no aplica) |
| Servicios + 6 modales | ✅ | ✅ idénticos (UX/UI mejorada) | (no aplica) |
| Detalle destacadas | modal Bootstrap (`#propertyDetailsModal`) + `scriptHomeDestacados.js` | **offcanvas** `#propertyDetailsPanel` + inline | offcanvas `#detailPanel` + inline |
| Form | `#formContacto` + `formServicios.js` | `#formContacto` + `bindForm` inline | `#formPropiedades` + inline |

## 2. DECISIÓN CLAVE — estrategia de reutilización (requiere tu confirmación)

Existe una **tensión entre reglas** del pedido:
- «Reutilizar la implementación de Propiedades / **no duplicar código** / no crear implementaciones paralelas».
- «**No tocar Propiedades** / no modificar la implementación aprobada / **exactamente igual** a la propuesta / no reinterpretar».

El problema: hoy la lógica de cards/detalle/lightbox/normalización **vive inline dentro de
`propiedades/index.html`** (no hay módulo JS compartido). La `propuesta-home` trae su **propia copia
inline** de esa lógica, adaptada al Home (filtra `destacado && active`, grilla≤4/carrusel>4,
acción «Ver todas» en vez de «Me interesa», ids `#propertyDetailsPanel`). Es decir: la propuesta ya
**reutiliza el mismo diseño/componentes** (mismas clases `.prop-card`, badges, detalle, lightbox),
pero **a nivel de archivo el código está duplicado**.

No se puede lograr «single source of truth» **sin tocar Propiedades** (que está congelado). Opciones:

| Path | Qué hace | Respeta «no tocar Propiedades» | Respeta «idéntico a lo aprobado» | Elimina duplicación real |
|---|---|---|---|---|
| **A (recomendado)** | Migrar la propuesta-home **tal cual** (script inline propio). Reutiliza el diseño/componentes de Propiedades. Consolidación DRY a un módulo compartido se difiere a la etapa de limpieza final (con tu OK, tocando ambas). | ✅ | ✅ (byte-idéntico a la propuesta) | ⏳ diferido a limpieza |
| B | Extraer módulo JS compartido que use **solo Home** ahora; Propiedades se re-apunta después. | ✅ (ahora) | ⚠️ requiere parametrizar → riesgo de desvío | ⚠️ temporalmente 2 copias igual |
| C | Extraer módulo compartido y actualizar **Home + Propiedades ahora**. | ❌ toca Propiedades + re-QA | ⚠️ riesgo de desvío en ambas | ✅ inmediato |

**Recomendación: Path A.** Es el único que honra las restricciones duras (fidelidad + freeze de
Propiedades + no reinterpretar). «Reutilizar» se cumple a nivel de **componente/diseño** (la
propuesta fue construida «coherente con /propuesta/»). La unificación física del código (un módulo
`js/components/…` que usen ambas páginas) se documenta como **consolidación DRY opcional** para la
etapa de limpieza final —cuando tocar Propiedades ya esté permitido—, evitando riesgo ahora.

> ⛔ Sin tu confirmación de A/B/C no se implementa. El resto del plan asume **Path A**.

## 3. Alcance (Path A)

- Reemplazar `<body>` + `<style>` inline de `index.html` por los de `/propuesta-home/`.
- **Conservar el `<head>` productivo actual del Home** (gtag, SEO, OG, Twitter, canonical, JSON-LD,
  favicon, robots) y **agregar** el `<style>` premium de la propuesta.
- CSS sin cambios de archivos: `stylesGen.css` + `stylesInicio.css` (la Home migrada los sigue usando).
- Retirar del HTML (no borrar del disco): `scriptHomeDestacados.js`, `formServicios.js`, y el
  markup del detalle viejo `#propertyDetailsModal` (reemplazado por el offcanvas). Recomendado:
  retirar también **Pannellum** (no se usa; el visor 360 está comentado) — igual criterio que Etapa 1.
- **No se toca Propiedades** ni ningún componente aprobado.

## 4. Componentes reutilizados (nivel diseño/lógica, idénticos a Propiedades)

`prop-card`, badges (op/fav/count), botones (`btn-detalle`/`btn-wa`/`btn-interes`), loader
(`spinner-brand`), empty/error states, detalle en offcanvas, galería Swiper interna, lightbox
(Escape/←/→/click-fuera/foco), helpers (`esc`, `sanitize`, `num`, `money`, `PLACEHOLDER`,
`resolveImg`, `normalize`, `supTotal`, `waLink`, `tipoLabel`), consumo de API (mismo endpoint,
retries, `cache:no-store`). **Única diferencia funcional permitida:** filtro `destacado && active`
+ grilla/carrusel dinámico.

## 5. Servicios (crítico — sin pérdida de contenido)

Los **6 modales** (`adminPropiedadesModal`, `ventasModal`, `alquilerModal`, `tasacionesModal`,
`alquilerTempModal`, `compraPropiedadesModal`) se migran **con todo su texto e íconos intactos**.
Solo cambia presentación (sombras, header marrón, X blanca, acento bajo el título). `setContactType()`
(en `scriptHome.js`) sigue preseleccionando el tipo y scrolleando a `#contacto`. Bootstrap Modal nativo.

## 6. Carrusel dinámico (crecimiento futuro)

La propuesta ya soporta **cualquier N sin límite**: `DEST.length <= 4` ⇒ grilla; `> 4` ⇒ Swiper con
breakpoints (1/2/3/4 por vista), `rewind`, paginación y navegación propias (`.dest-*`). Probar con
3/6/10/20/50. **No se modifica el umbral ni el diseño** (eso sería alterar lo aprobado).
Observación menor: con N muy alto (p.ej. 50) la paginación muestra muchos bullets; es funcional y no
se cambia (cambiarlo alteraría el diseño aprobado).

## 7. Head SEO — se conserva el del Home actual

No se porta desde la maqueta (la maqueta es `noindex`). Se mantiene el head actual de `index.html`
(title, description, keywords, robots `index,follow`, canonical `/`, OG, Twitter, favicon, JSON-LD
Organization, gtag `G-LSES4S50PT`) y se **agrega** el `<script src=recaptcha/api.js>` (la maqueta ya
lo tiene; verificar que quede una sola vez).

## 8. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Doble submit (`formServicios.js` + `bindForm`) | Retirar `formServicios.js` del HTML |
| Doble fetch/render (`scriptHomeDestacados.js` + inline) | Retirar `scriptHomeDestacados.js` |
| `#propiedades .swiper-slide img{height:350px;contain}` (stylesInicio) pisa el carrusel | Ya neutralizado por override `!important` en `.dest-carousel` de la propuesta |
| Doble init de Swiper del hero | `scriptSwiperHome.js` se carga una sola vez; carrusel usa `.dest-swiper` (clase propia) |
| Deuda técnica por duplicación | Documentada; consolidación DRY diferida a limpieza (§2) |

## 9. Plan por etapas

- **2.0 — Inventario/decisión:** confirmar Path A/B/C (este doc). *(bloqueante)*
- **2.1 — Migrar Home:** reemplazar body + `<style>`; conservar head; retirar JS/markup viejos.
- **2.2 — QA Home:** checklist `08-home-qa.md` (incluye N=3/6/10/20/50).
- **2.3 — (diferida) Consolidación DRY** de Home+Propiedades a módulo compartido — solo tras aprobar
  ambas migraciones, junto con la limpieza física.

## 10. Criterio de finalización

Todas las validaciones de `08-home-qa.md` en verde; diseño idéntico a `/propuesta-home/`; un solo
fetch; un solo submit; 6 modales intactos; head SEO conservado; sin errores de consola/Network;
Propiedades sin tocar.

## 11. Rollback

Un solo archivo cambia: `index.html`. Revertir: `git checkout -- index.html`. CSS/JS/PHP compartidos
no se tocan; los viejos siguen en disco hasta la limpieza. Pruebas mínimas post-rollback: home
carga, destacadas listan, modales abren, form envía 1 POST, footer con año.

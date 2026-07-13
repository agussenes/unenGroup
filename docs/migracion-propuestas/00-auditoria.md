# 00 — Auditoría técnica

## Estado actual

Sitio estático (HTML + CSS + JS vanilla) servido por Apache. Consume una API externa
(`https://api.unengroup.com.ar/properties`) y envía formularios a endpoints PHP con PHPMailer +
reCAPTCHA. Vistas: `/` (Home), `/propiedades/`, `/nosotros/`.

Las dos propuestas son **archivos únicos autocontenidos** (`index.html` con `<style>` y `<script>`
embebidos). **Todas sus rutas son absolutas desde raíz** (`/css/…`, `/js/…`, `/images/…`,
`/php/…`, `/propiedades/…`) → funcionan igual desde cualquier ubicación; no hay rutas relativas
frágiles que reescribir.

## Reutilización de assets (por qué "se ve igual")

| Propuesta | CSS que carga | JS reutilizado | Lógica propia (inline) |
|---|---|---|---|
| `/propuesta/` → propiedades | `stylesGen.css` **solo** | `scriptNavbarFixed.js` | estilos + fetch/normalize/render/detalle/lightbox/form |
| `/propuesta-home/` → home | `stylesGen.css` + `stylesInicio.css` | `scriptSwiperHome.js`, `scriptNavbarFixed.js`, `scriptHome.js` | estilos premium + destacadas + detalle/lightbox + form |

Cada propuesta reutiliza los mismos stylesheets que la vista que reemplaza → fidelidad visual
por construcción.

## Diferencias propuesta ↔ producción

### Propiedades (`/propuesta/` vs `/propiedades/`)
- **Conserva de la propuesta:** hero propio, filtros (buscador + operación + localidad + switch
  "solo destacadas" + chips + contador), cards `.prop-card`, detalle en **offcanvas** con Swiper,
  lightbox (teclado/Escape/click-fuera/foco), WhatsApp por card y en detalle, "Me interesa" →
  rellena `#propiedadInteres` y scrollea a `#contacto`, form real sobre imagen de portada.
- **Compatibilidad backend:** `#formPropiedades` con `name="nombre|correo|telefono|propiedadInteres|mensaje"`
  ⇢ coincide 1:1 con `php/formPropiedades.php`.
- **Mejora que se conserva:** link "Servicios" del navbar pasa de `#servicios` (roto en /propiedades/)
  a `/#servicios` (correcto).
- **Regresiones a corregir en Etapa 1 (obligatorio):** la maqueta NO aplica `?tipo=` y NO tiene
  ancla `#filtros`. Los IDs cambiaron (`#tipoPropiedad`→`#fTipo`, `#localidad`→`#fLocalidad`).
- **Falta portar:** todo el `<head>` productivo (SEO, Analytics, OG, Twitter, canonical, favicon,
  JSON-LD, reCAPTCHA) y quitar `noindex, nofollow`.

### Home (`/propuesta-home/` vs `/`)
- Idénticos: header, hero Swiper, "Descubre UnenGroup", 6 cards de servicios, los 5 modales,
  footer, WhatsApp, `setContactType()`.
- Mejora aprobada: destacadas con cards nuevas (grid ≤4 / carrusel >4), detalle en offcanvas,
  lightbox; contacto con `contact-shell`. Mismo `#formContacto`, mismos `name`, mismo backend.
- Cambio de diseño aprobado: en destacadas, "Me interesa" (que iba al form de la home) se
  reemplaza por "Ver todas" → `/propiedades/`.
- Falta portar: `<head>` productivo ya lo tiene la home real; al migrar se conserva ese head y se
  agrega el `<style>` premium de la propuesta.

## Universo real de `?tipo=` (auditado en todo el repo + API)

Valores que llegan por `?tipo=` (navbar, home, botones de servicios, nosotros): **idénticos** en
todas las fuentes →

```
venta · alquiler · alquiler-temporario · terreno · local-oficina-cochera · all
```

La API devuelve exactamente esos `tipo`:
`venta:8, alquiler:8, local-oficina-cochera:4, alquiler-temporario:3, terreno:1` (total 24;
6 destacadas activas). El `value` de cada `<option>`/`chip` en `#fTipo` es el `tipo` crudo de la API,
por lo que el mapeo es 1:1. Aun así se implementa normalización + alias defensivos (ver `01`).

## Riesgos principales

1. **Doble submit / doble fetch** si conviven scripts viejos + inline → mitigación: retirarlos del HTML.
2. **Pérdida de SEO/Analytics** por publicar la maqueta `noindex` → mitigación: portar el `<head>`.
3. **Regresión `?tipo=` + `#filtros`** → mitigación: restaurar en Etapa 1 (este es el foco).

## Veredicto

**APTO PARA MIGRAR CON OBSERVACIONES.** Integración limpia y de bajo riesgo (rutas absolutas, CSS
con dueño claro por vista, JS encapsulado en IIFE sin colisiones, formularios/API compatibles).
Condiciones: (1) portar `<head>` productivo y quitar `noindex`; (2) no cargar viejo + nuevo a la vez;
(3) restaurar `?tipo=` + `#filtros` en Propiedades.

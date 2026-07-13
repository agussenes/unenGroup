# 01 — Plan Etapa 1: `/propuesta/` → `/propiedades/`

Migrar la maqueta aprobada de propiedades a la vista oficial, **idéntica visualmente** y
**conservando la navegación funcional** (`?tipo=`, `#filtros`, `?propiedad=`).

## Alcance

- Reemplazar el contenido de `propiedades/index.html` por el de `/propuesta/`.
- Portar el `<head>` productivo y quitar `noindex`.
- Restaurar `?tipo=` + `#filtros` sin tocar el diseño.
- Retirar del HTML (no borrar del disco) los CSS/JS reemplazados.

**No se toca:** `css/stylesGen.css`, `js/scriptNavbarFixed.js`, los PHP, ni `nosotros/`.
**No se migra el Home en esta etapa.**

## Archivos

- **Modificado:** `propiedades/index.html` (reemplazo completo).
- **Nuevos:** ninguno de código (solo documentación en `docs/migracion-propuestas/`).
- **Sin tocar / que quedan huérfanos tras QA:** ver `03-mapa-css-js.md`.

## `<head>` productivo a portar

Del `propiedades/index.html` actual: `gtag` (G-LSES4S50PT), charset/viewport/X-UA,
`<title>`, description, keywords, author, `robots = index, follow`, `canonical` a
`/propiedades/`, Open Graph, Twitter Card, favicon, `<script>` de reCAPTCHA.
Se **agrega** JSON-LD (Organization, reutilizado de la Home) para cumplir el requisito de
datos estructurados (producción no lo tenía en esta vista).
Se **conserva** el `<link>` de fuentes de la propuesta (`Montserrat 600;700;800` /
`Raleway 300;400;500`) por fidelidad de diseño. Se mantiene `stylesGen.css`.
**NO** se enlaza `stylesPropiedades.css`.

## Restauración de `?tipo=` + `#filtros` (sin alterar el diseño)

### 1) Ancla `#filtros`
Se agrega `id="filtros"` al contenedor `<div class="filterbar">` (sin cambiar sus clases) y se
añade en el `<style>` inline:

```css
#filtros { scroll-margin-top: 90px; } /* despeja el navbar fijo, no afecta el layout */
```

### 2) Mapeo compatible query → `#fTipo`
Valores canónicos (auditados en repo + API): `venta`, `alquiler`, `alquiler-temporario`,
`terreno`, `local-oficina-cochera`, `all`. El `value` de las `<option>`/`chip` de `#fTipo` es el
`tipo` crudo de la API, por lo que el mapeo es identidad. Se agrega igualmente normalización y una
tabla de **alias defensivos** (no se asume que texto visible == value):

```js
const TIPO_ALIASES = {
  'todas':'all','todos':'all',
  'ventas':'venta',
  'alquileres':'alquiler',
  'temporario':'alquiler-temporario','alquiler-vacacional':'alquiler-temporario','vacacional':'alquiler-temporario',
  'terrenos':'terreno',
  'locales':'local-oficina-cochera','oficinas':'local-oficina-cochera','cocheras':'local-oficina-cochera',
  'local':'local-oficina-cochera','oficina':'local-oficina-cochera','cochera':'local-oficina-cochera'
};
function normalizeTipo(raw){
  const v = String(raw ?? '').trim().toLowerCase();
  if(!v) return '';
  if(v==='all') return 'all';
  return TIPO_ALIASES[v] || v; // canónicos pasan tal cual
}
```

### 3) Inicialización (en el `DOMContentLoaded` del script principal)
Orden exacto tras `buildFilters()` + `populateInteres()`:

1. `applyTipoFromQuery()` → lee `URLSearchParams`, obtiene `tipo`, normaliza, y setea
   `#fTipo.value`. Si el tipo no tiene propiedades (opción ausente), **crea la opción** para
   reflejar el filtro con resultado vacío (igual que el sitio actual).
2. `applyFilters()` → aplica el filtro, **sincroniza los chips** (`.chip.active`), actualiza el
   **contador** y renderiza. (Reemplaza al `VIEW = ALL.slice(); render();` original.)
3. `handleQueryProp()` → `?propiedad=` preselecciona la propiedad en el formulario.
4. `scrollToFiltersIfHash()` → si `location.hash === '#filtros'`, hace `scrollIntoView` suave.

Ambos parámetros (`?tipo=` y `?propiedad=`) **conviven sin errores**; si no hay parámetros, el
comportamiento por defecto (todas las propiedades) es idéntico al de la maqueta.

## Scripts / estilos que NO deben convivir en esta vista (retirar del HTML)

```
css/stylesPropiedades.css
js/scriptPropiedades.js
js/scriptPorpiedadDestBoton.js
js/formularios/formPropiedades.js
js/scriptSwiperTestimonials.js
js/scriptSwiperHome.js
```

(La copia de `/propuesta/` ya trae el set correcto: Bootstrap + Swiper + `scriptNavbarFixed.js`
+ SweetAlert2 + 2 scripts inline. No incluye Pannellum, que no se usa.)

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Doble fetch a la API | Solo el script inline hace `fetch`; scripts viejos retirados |
| Doble submit del form | Solo el handler inline; `formPropiedades.js` retirado |
| `stylesPropiedades.css` pisando la propuesta | No se enlaza |
| Navbar fijo tapando `#filtros` | `scroll-margin-top: 90px` |
| `?tipo=` inexistente en datos | Se crea la opción → resultado vacío, sin romper |

## Criterio de finalización

Todas las validaciones de `05-qa-rollback.md` (sección Etapa 1) en verde: un solo request, un solo
submit, filtro inicial correcto, chips/contador sincronizados, scroll a `#filtros`, `?propiedad=`
operativo, SEO/Analytics presentes, sin `noindex`, sin errores de consola ni 404.

## Rollback

`git checkout -- propiedades/index.html` (o restaurar backup). No hay cambios en CSS/JS/PHP
compartidos, por lo que el rollback es un único archivo. Ver `05-qa-rollback.md`.

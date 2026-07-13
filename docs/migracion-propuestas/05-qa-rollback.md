# 05 — QA y Rollback

## QA — Etapa 1 (Propiedades)

### URLs a validar
```
/propiedades/
/propiedades/?tipo=venta#filtros
/propiedades/?tipo=alquiler#filtros
/propiedades/?tipo=alquiler-temporario#filtros
/propiedades/?tipo=terreno#filtros
/propiedades/?tipo=local-oficina-cochera#filtros
/propiedades/?tipo=all
/propiedades/?propiedad=<NombreDePropiedad>
```

### Checklist
- [ ] **Un solo request** a `api.unengroup.com.ar/properties` (pestaña Network).
- [ ] **Un solo submit** del formulario (un POST a `formPropiedades.php`).
- [ ] Filtro inicial correcto según `?tipo=` (muestra solo lo que corresponde).
- [ ] Chips sincronizados con el filtro activo.
- [ ] Contador de propiedades actualizado.
- [ ] Scroll correcto a `#filtros` cuando el hash está presente (sin quedar tapado por el navbar).
- [ ] `?tipo=all` y sin `?tipo=` → muestra todas.
- [ ] "Me interesa" preselecciona la propiedad en `#propiedadInteres` y scrollea a `#contacto`.
- [ ] `?propiedad=` preselecciona la propiedad en el formulario.
- [ ] Formulario envía correctamente (éxito/errores con SweetAlert2).
- [ ] reCAPTCHA se renderiza y valida.
- [ ] WhatsApp (card y detalle) contiene el título de la propiedad correcta.
- [ ] Offcanvas de detalle abre/cierra; galería Swiper interna navega.
- [ ] Lightbox: abre al click en imagen; teclado (Escape / ← / →); click fuera cierra; foco vuelve.
- [ ] Sin errores en consola.
- [ ] Sin assets 404 (Network).
- [ ] SEO productivo presente (title, description, canonical, OG, Twitter, favicon, JSON-LD, gtag).
- [ ] **No existe** `noindex` en el HTML.
- [ ] Header (navbar fijo, logo shrink, menú mobile) y footer (año dinámico) funcionan.
- [ ] Responsive correcto (360 / 768 / 992 / 1200).
- [ ] Diseño idéntico a `/propuesta/`.

### Verificaciones estáticas ya realizadas
- Set de `<script>` = Bootstrap + Swiper + `scriptNavbarFixed.js` + SweetAlert2 + 2 inline; sin
  `scriptPropiedades.js`, `scriptPorpiedadDestBoton.js`, `formPropiedades.js`,
  `scriptSwiperTestimonials.js`, `scriptSwiperHome.js`, ni Pannellum.
- `<link>` CSS = Bootstrap + Swiper + Animate + fuentes + `stylesGen.css`; sin `stylesPropiedades.css`.
- `id="filtros"` presente en la barra de filtros.
- Valores `?tipo=` mapeados 1:1 con la API; alias defensivos añadidos.

## QA — General (aplica a ambas etapas)
- [ ] Navegación cruzada entre `/`, `/propiedades/`, `/nosotros/`.
- [ ] `nosotros/` intacto (no comparte nada salvo el chrome, que no se toca).
- [ ] Consola y Network limpias.
- [ ] Accesibilidad básica (foco, roles del lightbox/offcanvas, `aria-label`).

## Rollback

### Etapa 1
- Un solo archivo cambia: `propiedades/index.html`.
- Revertir: `git checkout -- propiedades/index.html` (o restaurar backup de Etapa 0).
- No hace falta revertir CSS/JS/PHP: los viejos siguen en disco intactos (se retiran solo del HTML,
  no se borran hasta el QA completo).

### Pruebas mínimas post-rollback
- La vista carga; lista propiedades; formulario envía (1 POST); WhatsApp abre; footer con año.

## Resultados QA Etapa 1 (2026-07-13)

- **Diff `/propuesta/` vs `/propiedades/`:** solo las 4 diferencias intencionales (head SEO/Analytics,
  regla `#filtros`, `id="filtros"`, helpers `?tipo=` + rewiring del init). `<style>`, `<body>` y
  lógica del app/form **byte-idénticos** → identidad visual/funcional por fuente.
- **Runtime (jsdom + datos reales de la API, 24 items):** todos los `?tipo=` preseleccionan `#fTipo`,
  sincronizan el chip, actualizan el contador y renderizan la cantidad correcta —
  venta 8 · alquiler 8 · alquiler-temporario 3 · terreno 1 · local-oficina-cochera 4 · (all/sin-param) 24.
  Alias en runtime OK: `temporario`→3, `locales`/`oficina`/`cochera`→4. **0 errores** de ejecución.
- **Assets/carga:** un solo `<script>` de Bootstrap y de Swiper; sin `.main-slider`; sin scripts/CSS
  viejos; JSON-LD parsea OK; sintaxis de los 3 scripts inline válida.
- **SEO:** title, description, keywords, `robots=index,follow`, canonical, OG (5), Twitter (4),
  favicon, gtag, JSON-LD presentes. `og:image`/`twitter:image` → `/images/seo/seoImg.jpg`
  **verificado HTTP 200** (asset real; no requiere cambio).
- **Observación:** `id="telefonoFooter"` duplicado en el footer — **preexistente** (heredado del
  footer del sitio y presente también en `/propuesta/`); no introducido por la migración; no se
  corrige (fuera de alcance / mantener idéntico a la propuesta).
- **Pendiente de smoke en navegador/servidor real:** render del widget reCAPTCHA, envío real del
  form (SMTP), y confirmación visual de interacciones (offcanvas/lightbox/Swiper). Respaldados por
  identidad de fuente + revisión de código, pero no ejecutables fuera de un entorno vivo.

## Política de limpieza (posterior al QA)
1. Migrar (reemplazar HTML, dejar de enlazar viejos).
2. Validar.
3. Marcar obsoletos (sin referencias).
4. Borrar en etapa posterior: `css/stylesPropiedades.css`, `js/scriptPropiedades.js`,
   `js/scriptPorpiedadDestBoton.js`, `js/formularios/formPropiedades.js`,
   `js/scriptSwiperTestimonials.js`, y las carpetas `/propuesta/` y `/propuesta-home/`
   (esta última solo tras migrar y validar la Home).

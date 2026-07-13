# 04 — Formularios, API, reCAPTCHA y SEO

## API

- Endpoint único: `GET https://api.unengroup.com.ar/properties` (verificado: HTTP 200, 24 items).
- Config del fetch (ambas propuestas): `cache:'no-store'`, `credentials:'omit'`, **2 reintentos**
  con backoff 800 ms.
- `normalize()` tolerante a alias de campos; `sanitize()` de la descripción HTML (elimina
  `script/style/iframe/object/embed/link/meta`, atributos `on*` y `javascript:`; fuerza
  `target=_blank rel=noopener` en `<a>`).
- `resolveImg()` con fallback + `PLACEHOLDER` SVG.
- Campos reales por item: `id, tipo, titulo, precio, localidad, metrosCuadrados, habitaciones,
  banos, petFriendly, metrosCubiertos, imagenes, descripcion, destacado, active`.
- **Home** filtra en cliente `destacado && active` (6 items). **Propiedades** muestra todas.
- **Un solo fetch por página** (con los scripts viejos retirados).

### `tipo` reales (para `?tipo=`)
`venta:8 · alquiler:8 · local-oficina-cochera:4 · alquiler-temporario:3 · terreno:1`.
Coinciden 1:1 con los valores de `?tipo=` usados en navbar/home/servicios/nosotros.

## Formularios — payload ↔ backend (verificado leyendo el PHP)

### Propiedades — `#formPropiedades` → `php/formPropiedades.php`
Envía (FormData): `nombre`, `correo`, `telefono`, `propiedadInteres`, `mensaje` +
`g-recaptcha-response`. El PHP lee **exactamente** esos campos. ✔
- "Me interesa" preselecciona `#propiedadInteres` (crea la `<option>` si falta) y scrollea a
  `#contacto`.
- `?propiedad=Nombre` preselecciona la propiedad en el form (deep-link).

### Home — `#formContacto` → `php/formServicios.php`
Envía: `nombre`, `email`, `tipoContacto`, `mensaje` + `g-recaptcha-response`. El PHP lee
exactamente esos campos. ✔ `setContactType()` preselecciona `#tipoContacto`.

### Handlers inline (propuestas)
- `preventDefault`, validan campos + reCAPTCHA, deshabilitan el botón con spinner (evita doble
  envío), `fetch(POST)` al PHP, parsean `{status}`, notifican con SweetAlert2 (fallback `alert`),
  `form.reset()` + `grecaptcha.reset()` en éxito.

## reCAPTCHA

- Sitekey (cliente): `6LduadcqAAAAAMAPmj2iEoWSjgfKXKH3FAnT3D1f` (idéntica en las 4 páginas).
- El `<script src="https://www.google.com/recaptcha/api.js" async defer>` debe estar en el
  `<head>`. La propuesta de propiedades ya lo trae; se conserva al portar el head.
- El PHP valida `g-recaptcha-response` contra Google (secret server-side). Sin cambios.

## Portado de SEO / Analytics (Propiedades, Etapa 1)

Del `<head>` productivo se porta:
- **Google Analytics** `gtag.js` id `G-LSES4S50PT`.
- `<title>`, `description`, `keywords`, `author`, `robots = index, follow`.
- `canonical` → `https://unengroup.com.ar/propiedades/`.
- **Open Graph** (title/description/image/url/type/site_name).
- **Twitter Card** (summary_large_image).
- **Favicon** `/images/faviCon2.jpg`.
- **JSON-LD** Organization (agregado; reutilizado de la Home).

Se **elimina** `robots = noindex, nofollow` de la maqueta. Se conserva el `<link>` de fuentes de la
propuesta (pesos 600;700;800 / 300;400;500) por fidelidad de diseño.

## Convivencia `?tipo=` + `?propiedad=`

Ambos parámetros se procesan en el `init` sin errores. Si solo hay `?tipo=…#filtros`, se filtra y
se scrollea a filtros. Si solo hay `?propiedad=`, se preselecciona la propiedad y se scrollea al
form. Si estuvieran ambos, no hay excepción (comportamiento definido, sin romper).

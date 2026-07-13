# Refactor post-migración (Etapa 3)

Refactorización arquitectónica: extraer todo el CSS/JS inline a archivos, consolidar lo
verdaderamente compartido y eliminar código muerto — **sin ningún cambio visual ni funcional**.

## Documentos
| Archivo | Contenido |
|---|---|
| `00-auditoria-arquitectura.md` | Inventario de inline, solapamiento, estructura propuesta, decisiones |
| `01-estructura-final.md` | Estructura final, archivos nuevos/eliminados, qué NO se tocó |
| `02-validaciones.md` | Validaciones (CSS byte-a-byte, cascada, runtime de módulos) y métricas |

## Estado
- ✅ CSS inline extraído a `css/home.css`, `css/propiedades.css`, `css/components/*` (byte-idéntico por regla).
- ✅ JS inline extraído a ES modules `js/core/*` (compartido) + `js/pages/*` (por vista).
- ✅ Código muerto eliminado (7 archivos + 2 carpetas de propuesta).
- ✅ Validado: 0 diferencias CSS, cascada preservada, runtime de módulos sin errores, refs íntegras.
- ⏳ Pendiente: smoke visual en navegador/servidor (reCAPTCHA, envío real, animaciones).

## Decisiones
- Consolidación **conservadora** (solo lo 100% idéntico; `card()`/`openDetail()` quedan por página).
- **ES Modules** para archivos nuevos; terceros y scripts clásicos existentes sin cambios.

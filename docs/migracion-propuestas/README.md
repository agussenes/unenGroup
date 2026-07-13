# Migración de propuestas a producción — UnenGroup

Documentación de la migración de las maquetas aprobadas a las vistas oficiales del sitio.

- `/propuesta/` → `/propiedades/`
- `/propuesta-home/` → `/` (Home)

## Objetivo

Que ambas propuestas queden **visual y funcionalmente idénticas** a como se ven hoy en sus
carpetas de maqueta, pero integradas de forma limpia en la arquitectura real (SEO, Analytics,
formularios reales, header/footer, navegación por `?tipo=` / `?propiedad=` / `#filtros`).

## Índice de documentos

| Archivo | Contenido |
|---|---|
| `00-auditoria.md` | Estado actual, diferencias propuesta↔producción, veredicto |
| `01-plan-propiedades.md` | **Etapa 1** — plan detallado + mapeo `?tipo=` + `#filtros` + validaciones |
| `02-plan-home.md` | Stub preliminar Home (**superado por `06`**) |
| `03-mapa-css-js.md` | Qué CSS/JS se conservan, cuáles dejan de cargarse, conflictos |
| `04-formularios-api.md` | Payloads, API, reCAPTCHA, portado de SEO/Analytics |
| `05-qa-rollback.md` | Checklist de QA y rollback (incluye resultados QA Etapa 1) |
| `06-plan-home.md` | **Etapa 2** — plan Home + decisión de reutilización (A/B/C) |
| `07-mapa-home-css-js.md` | Mapa CSS/JS del Home, duplicación, código muerto |
| `08-home-qa.md` | Checklist de QA del Home y rollback |

## Estado de la migración

| Etapa | Descripción | Estado |
|---|---|---|
| 0 | Auditoría + documentación | ✅ Completado |
| 1 | Migrar `/propuesta/` → `/propiedades/` | ✅ Aprobada con observaciones |
| 2 | Migrar `/propuesta-home/` → `/` (Home) | ✅ Implementada Path A (validación estática+runtime OK) |
| 3 | Validar Home | ⏳ Pendiente de smoke en navegador + validación del usuario |
| 4 | Consolidación DRY + limpieza física (Etapa 3) | ✅ Hecha — ver `docs/refactor-post-migracion/` |

> Etapa 3 (refactor) eliminó las carpetas `/propuesta/` y `/propuesta-home/` y el código muerto.
> El CSS/JS inline se movió a archivos (`css/`, `js/core/`, `js/pages/`). Detalle en
> [`docs/refactor-post-migracion/`](../refactor-post-migracion/README.md).

## Decisiones registradas

- **2026-07-13 — `?tipo=` y `#filtros` son OBLIGATORIOS.** Se descarta la opción de aceptar la
  pérdida de ese comportamiento. La propuesta se migra visualmente idéntica **y además** conserva
  la navegación funcional actual: `/propiedades/?tipo=alquiler#filtros` abre la vista, scrollea a
  filtros, preselecciona el tipo, aplica el filtro y muestra solo las propiedades que corresponden.
- El diseño visual aprobado de las propuestas **no se modifica**.
- Los archivos obsoletos **no se borran** hasta terminar el QA; solo se retiran de los `<link>`/`<script>`.

## Regla dura de integración

En cada vista migrada, **reemplazar** (no sumar): jamás deben convivir el JS/CSS viejo y el nuevo,
para evitar **doble fetch** a la API y **doble submit** del formulario.

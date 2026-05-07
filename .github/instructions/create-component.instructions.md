---
description: 'Usar cuando se crea o modifica un componente Astro. Cubre la estructura obligatoria, convención de ficheros CSS separados, nomenclatura BEM, tipado de props y variables CSS disponibles.'
applyTo: 'src/components/**/*.astro'
---

# Crear o modificar componentes Astro

## Estructura de un componente

```astro
---
// 1. Importar el CSS del componente (SIEMPRE primero)
import '../styles/components/MiComponente.css'

// 2. Importar otros componentes si los hay
import OtroComponente from './OtroComponente.astro'

// 3. Tipar las props con una interfaz local
interface Props {
  titulo: string
  descripcion?: string
}

const { titulo, descripcion } = Astro.props
---

<section class="mi-componente">
  <h2 class="mi-componente__titulo">{titulo}</h2>
  {descripcion && <p class="mi-componente__descripcion">{descripcion}</p>}
</section>
```

## Regla del CSS separado

**Cada componente tiene su propio fichero CSS.**

| Componente                                  | CSS                                                      |
| ------------------------------------------- | -------------------------------------------------------- |
| `src/components/MiComponente.astro`         | `src/styles/components/MiComponente.css`                 |
| `src/components/calendar/CalendarDay.astro` | `src/styles/components/CalendarDay.css` (si lo necesita) |

- El CSS se importa **siempre en el frontmatter** del componente, no en el `<style>` tag
- No usar `<style>` tags en componentes Astro — todo el CSS va en el fichero separado

## Nomenclatura BEM

```css
/* Bloque */
.mi-componente {
}

/* Elemento */
.mi-componente__titulo {
}
.mi-componente__descripcion {
}

/* Modificador */
.mi-componente--destacado {
}
.mi-componente__titulo--grande {
}
```

## Variables CSS disponibles

Definidas en `src/styles/global.css`:

```css
/* Layout */
--layout-max-width
--layout-horizontal-padding

/* Colores */
--bg-main          /* fondo principal */
--bg-dark          /* fondo oscuro */
--text-body        /* texto principal */
--text-inverse     /* texto sobre fondo oscuro */

/* Tipografía */
--font-sans

/* Logo (solo en contextos con logo) */
--logo-primary
--logo-secondary
--logo-primary-inverse
--logo-secondary-inverse
```

## Clases de Tailwind

**No usar clases de Tailwind en los templates de componentes.** Tailwind se usa como herramienta de configuración/reset, no como sistema de clases utilitarias. Toda la lógica de estilos va en CSS vanilla dentro del fichero CSS del componente.

## Idioma en la UI

- Todos los textos visibles al usuario deben estar en **gallego** (`gl`)
- Usar `SITE_CONFIG.LOCALE` para formateo de fechas con `Intl.DateTimeFormat`
- Los mensajes de estado vacío siguen el patrón del resto: "Non se atoparon..."

## Tipos reutilizables

Antes de definir interfaces locales complejas, revisar `src/types/`:

- `src/types/community.ts` — tipos para comunidades y sus props
- `src/types/calendar.ts` — tipos para el calendario

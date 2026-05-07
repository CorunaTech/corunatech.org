---
description: 'Use when creating or modifying an Astro component. Covers required structure, separate CSS file convention, BEM naming, props typing and available CSS variables.'
applyTo: 'src/components/**/*.astro'
---

# Creating or modifying Astro components

## Component structure

```astro
---
// 1. Import the component CSS (ALWAYS first)
import '../styles/components/MyComponent.css'

// 2. Import other components if needed
import OtherComponent from './OtherComponent.astro'

// 3. Type props with a local interface
interface Props {
  title: string
  description?: string
}

const { title, description } = Astro.props
---

<section class="my-component">
  <h2 class="my-component__title">{title}</h2>
  {description && <p class="my-component__description">{description}</p>}
</section>
```

## Separate CSS rule

**Each component has its own CSS file.**

| Component                                   | CSS                                                        |
| ------------------------------------------- | ---------------------------------------------------------- |
| `src/components/MyComponent.astro`          | `src/styles/components/MyComponent.css`                    |
| `src/components/calendar/CalendarDay.astro` | `src/styles/components/CalendarDay.css` (if needed)        |

- CSS is imported **always in the frontmatter**, not in a `<style>` tag
- Do not use `<style>` tags in Astro components — all CSS goes in the separate file

## BEM naming

```css
/* Block */
.my-component {
}

/* Element */
.my-component__title {
}
.my-component__description {
}

/* Modifier */
.my-component--featured {
}
.my-component__title--large {
}
```

## Available CSS variables

Defined in `src/styles/global.css`:

```css
/* Layout */
--layout-max-width
--layout-horizontal-padding

/* Colors */
--bg-main          /* main background */
--bg-dark          /* dark background */
--text-body        /* main text */
--text-inverse     /* text on dark background */

/* Typography */
--font-sans

/* Logo (only in logo contexts) */
--logo-primary
--logo-secondary
--logo-primary-inverse
--logo-secondary-inverse
```

## Tailwind classes

**Do not use Tailwind classes in component templates.** Tailwind is used as a configuration/reset tool, not as a utility class system. All styling logic goes in vanilla CSS inside the component's CSS file.

## UI language

- All user-visible text must be in **Galician** (`gl`)
- Use `SITE_CONFIG.LOCALE` for date formatting with `Intl.DateTimeFormat`
- Empty state messages follow the existing pattern: "Non se atoparon..."

## Reusable types

Before defining complex local interfaces, check `src/types/`:

- `src/types/community.ts` — types for communities and their props
- `src/types/calendar.ts` — types for the calendar

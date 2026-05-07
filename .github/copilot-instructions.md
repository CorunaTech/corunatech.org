# CoruñaTech — Agent Instructions

## What this project is

**CoruñaTech** is a static platform that aggregates tech communities from A Coruña and their events. There is no backend or database: content is managed through YAML files in `src/content/`.

## Stack

- **Astro 5** (SSG) + **TypeScript** + **Tailwind CSS v4**
- **pnpm** as package manager
- **GitHub Actions** for CI/CD and deploy
- Active integrations: `@astrojs/mdx`, `@astrojs/sitemap`

## Key commands

```bash
pnpm dev       # development server
pnpm build     # production build
pnpm preview   # preview the build
```

## Architecture

```
src/
  content/          # YAML data (communities and events)
  components/       # Reusable Astro components
  layouts/          # BaseLayout, DetailLayout, PageLayout
  pages/            # Routes: index.astro, 404.astro, communities/[slug].astro
  styles/           # Global CSS + one CSS file per component/layout
  utils/            # Pure TypeScript functions
  types/            # Shared TypeScript types
  scripts/          # Client-side scripts (browser interactivity)
```

## Critical conventions

### Content

- **Communities** are added in `src/content/communities/<slug>.yaml`
- **Events** are added in `src/content/events/<slug>.yaml`
- Slugs must be kebab-case, unique and descriptive
- The `community` field in an event must match exactly the slug of the community file

### Astro components

- Each component has its own CSS file in `src/styles/components/<ComponentName>.css`
- CSS is imported inside the component frontmatter: `import '../styles/components/MyComponent.css'`
- CSS classes follow BEM convention: `.component-name`, `.component-name__element`, `.component-name--modifier`

### Styles

- Global CSS variables are in `src/styles/global.css`
- Layout: `--layout-max-width`, `--layout-horizontal-padding`
- Colors: `--bg-main`, `--bg-dark`, `--text-body`, `--text-inverse`
- Typography: `--font-sans`
- Do not use Tailwind classes directly in components (the project uses vanilla CSS with variables; Tailwind is only used as a reset/config utility)

### TypeScript

- Reusable types in `src/types/`
- Pure utilities in `src/utils/`
- Component props are typed with local interfaces in the frontmatter

### Language

- The UI uses **Galician** (`gl`) as the primary language
- Date formatters use `'gl'` (Intl.DateTimeFormat) to display dates
- `SITE_CONFIG.LOCALE = 'gl'`

## Content schemas

See `src/content/config.ts` for the full Zod schemas.

### Community (summary)

```yaml
name: string           # Official name
description: string    # Description
website: url?          # Website
logo: string?          # Logo URL
socials: [{name, url}]?
tags: string[]
technologies: string[]?
meetingFrequency: string?  # "Weekly", "Monthly", etc.
contactEmail: email?
```

### Event (summary)

```yaml
title: string
description: string
date: datetime # ISO 8601, e.g. 2025-10-01T10:00:00Z
endDate: datetime?
duration: string? # "2h", "90min"
location: string?
rsvpLink: url?
tags: string[]
community: string # community slug (without extension)
```

## What NOT to do

- Do not add dependencies without confirming with the user
- Do not create duplicate layout or utility files
- Do not use `applyTo: "**"` in instructions that only apply to specific files
- Do not hardcode UI text in Spanish or English — use Galician

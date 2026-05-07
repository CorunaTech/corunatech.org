# CoruñaTech — Instruciones para el agente

## Qué es este proyecto

**CoruñaTech** es una plataforma estática que agrega comunidades tecnológicas de A Coruña y sus eventos. No tiene backend ni base de datos: el contenido se gestiona mediante ficheros YAML en `src/content/`.

## Stack

- **Astro 5** (SSG) + **TypeScript** + **Tailwind CSS v4**
- **pnpm** como gestor de paquetes
- **GitHub Actions** para CI/CD y deploy
- Integrations activas: `@astrojs/mdx`, `@astrojs/sitemap`

## Comandos clave

```bash
pnpm dev       # servidor de desarrollo
pnpm build     # build de producción
pnpm preview   # previsualizar el build
```

## Arquitectura

```
src/
  content/          # Datos en YAML (comunidades y eventos)
  components/       # Componentes Astro reutilizables
  layouts/          # BaseLayout, DetailLayout, PageLayout
  pages/            # Rutas: index.astro, 404.astro, communities/[slug].astro
  styles/           # CSS global + un fichero CSS por componente/layout
  utils/            # Funciones puras TypeScript
  types/            # Tipos TypeScript compartidos
  scripts/          # Scripts de cliente (interactividad del browser)
```

## Convenciones críticas

### Contenido

- Las **comunidades** se añaden en `src/content/communities/<slug>.yaml`
- Los **eventos** se añaden en `src/content/events/<slug>.yaml`
- Los slugs deben ser kebab-case, únicos y descriptivos
- El campo `community` en un evento debe coincidir exactamente con el slug del fichero de comunidad

### Componentes Astro

- Cada componente tiene su propio fichero CSS en `src/styles/components/<NombreComponente>.css`
- El CSS se importa dentro del frontmatter del componente: `import '../styles/components/MiComponente.css'`
- Clases CSS siguen convención BEM: `.nombre-componente`, `.nombre-componente__elemento`, `.nombre-componente--modificador`

### Estilos

- Las variables CSS globales están en `src/styles/global.css`
- Layout: `--layout-max-width`, `--layout-horizontal-padding`
- Colores: `--bg-main`, `--bg-dark`, `--text-body`, `--text-inverse`
- Tipografía: `--font-sans`
- No usar clases de Tailwind directamente en componentes (el proyecto usa CSS vanilla con variables, Tailwind sólo como utilidad de reset/config)

### TypeScript

- Tipos reutilizables en `src/types/`
- Utilidades puras en `src/utils/`
- Las props de componentes se tipan con interfaces locales en el frontmatter

### Idioma

- La UI usa **gallego** (`gl`) como idioma principal
- Los formateadores de fecha usan `'gl'` (Intl.DateTimeFormat) para mostrar fechas
- `SITE_CONFIG.LOCALE = 'gl'`

## Esquemas de contenido

Ver `src/content/config.ts` para los schemas Zod completos.

### Comunidad (resumido)

```yaml
name: string           # Nombre oficial
description: string    # Descripción
website: url?          # Sitio web
logo: string?          # URL del logo
socials: [{name, url}]?
tags: string[]
technologies: string[]?
meetingFrequency: string?  # "Semanal", "Mensual", etc.
contactEmail: email?
```

### Evento (resumido)

```yaml
title: string
description: string
date: datetime # ISO 8601, ej: 2025-10-01T10:00:00Z
endDate: datetime?
duration: string? # "2h", "90min"
location: string?
rsvpLink: url?
tags: string[]
community: string # slug de la comunidad (sin extensión)
```

## Lo que NO hacer

- No añadir dependencias sin confirmar con el usuario
- No crear ficheros de layout o utilidades duplicados
- No usar `applyTo: "**"` en instrucciones que sólo aplican a ficheros específicos
- No hardcodear textos en inglés en la UI (usar gallego)

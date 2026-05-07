---
description: 'Usar cuando se añade una nueva comunidad tecnológica al proyecto. Cubre la estructura del YAML, validaciones del schema, convenciones de slug y campos obligatorios.'
applyTo: 'src/content/communities/**/*.yaml'
---

# Añadir una nueva comunidad

## Ubicación

Crear el fichero en `src/content/communities/<slug>.yaml`.

## Reglas del slug

- Debe ser **kebab-case** y único (ej: `python-coruna`, `coruna-jug`)
- Sin tildes ni caracteres especiales
- El slug coincide con el nombre del fichero sin extensión

## Estructura completa

```yaml
name: Nombre Oficial de la Comunidad # obligatorio
description: Descripción de la comunidad # obligatorio
website: https://... # opcional, URL válida
logo: https://... # opcional, URL de imagen
socials: # opcional
  - name: Twitter
    url: https://x.com/...
  - name: GitHub
    url: https://github.com/...
tags: [tag1, tag2] # obligatorio, array de strings en minúscula
technologies: [Tech1, Tech2] # opcional, nombres de tecnologías
meetingFrequency: Mensual # opcional: "Semanal", "Quincenal", "Mensual"
contactEmail: contacto@ejemplo.com # opcional, email válido
```

## Validaciones automáticas (Zod)

- `name` y `description` son requeridos
- `website` y `rsvpLink` deben ser URLs válidas si se proporcionan
- `contactEmail` debe ser email válido si se proporciona
- `tags` debe ser un array no vacío
- El schema completo está en `src/content/config.ts`

## Después de añadir

- La comunidad aparecerá automáticamente en la sección "Comunidades" del index
- Se genera una ruta `/communities/<slug>` automáticamente via `pages/communities/[slug].astro`
- No es necesario modificar ningún fichero de código

---
description: 'Usar cuando se añade un nuevo evento a una comunidad. Cubre la estructura del YAML, formato de fechas ISO 8601, referencia a la comunidad y convenciones de slug.'
applyTo: 'src/content/events/**/*.yaml'
---

# Añadir un nuevo evento

## Ubicación

Crear el fichero en `src/content/events/<slug>.yaml`.

## Convención de slug

- **Formato recomendado**: `<comunidad>-<descripcion>-<fecha>`, ej: `gpul-installparty-2025-10-01`
- Kebab-case, sin tildes ni caracteres especiales

## Estructura completa

```yaml
title: Título del evento # obligatorio
description: Descripción del evento # obligatorio
date: 2025-10-01T10:00:00Z # obligatorio, ISO 8601
endDate: 2025-10-01T14:00:00Z # opcional, ISO 8601
duration: '2h' # opcional, ej: "2h", "90min", "1h30min"
location: Nombre del lugar o dirección # opcional
rsvpLink: https://... # opcional, URL de registro
tags: [tag1, tag2] # obligatorio, array en minúscula kebab-case
community: slug-de-la-comunidad # obligatorio, debe coincidir con el slug del YAML de comunidad
```

## Regla crítica: campo `community`

El valor de `community` **debe coincidir exactamente** con el nombre del fichero YAML de la comunidad (sin la extensión `.yaml`).

```yaml
# ✅ Correcto — existe src/content/communities/gpul.yaml
community: gpul

# ✅ Correcto — existe src/content/communities/python-coruna.yaml
community: python-coruna

# ❌ Incorrecto — no hay fichero con ese nombre
community: GPUL
community: python_coruna
```

## Formato de fechas

- Usar siempre ISO 8601 con zona horaria explícita
- Eventos en España: `T10:00:00Z` (UTC) o `T10:00:00+02:00` (CEST verano)

## Después de añadir

- El evento aparece en la sección "Eventos" del index si la fecha es futura
- Aparece en la página de la comunidad correspondiente
- Los eventos pasados se muestran en el historial de la comunidad
- La clasificación futuros/pasados se hace comparando con la fecha actual en `src/utils/date-utils.ts`

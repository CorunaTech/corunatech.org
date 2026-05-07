---
description: 'Use when adding a new event to a community. Covers YAML structure, ISO 8601 date format, community reference and slug conventions.'
applyTo: 'src/content/events/**/*.yaml'
---

# Adding a new event

## Location

Create the file at `src/content/events/<slug>.yaml`.

## Slug convention

- **Recommended format**: `<community>-<description>-<date>`, e.g. `gpul-installparty-2025-10-01`
- Kebab-case, no accents or special characters

## Full structure

```yaml
title: Event title # required — quote if it contains colons (e.g. "Title: subtitle")
description: Event description # required
date: 2025-10-01T10:00:00Z # required, ISO 8601
endDate: 2025-10-01T14:00:00Z # optional, ISO 8601
duration: '2h' # optional, e.g. "2h", "90min", "1h30min"
location: Venue name or address # optional
rsvpLink: https://... # optional, registration URL
tags: [tag1, tag2] # required, lowercase kebab-case array
community: community-slug # required, must match the community YAML slug
```

## Critical rule: `community` field

The `community` value **must match exactly** the community YAML filename (without the `.yaml` extension).

```yaml
# ✅ Correct — src/content/communities/gpul.yaml exists
community: gpul

# ✅ Correct — src/content/communities/python-coruna.yaml exists
community: python-coruna

# ❌ Wrong — no file with that name
community: GPUL
community: python_coruna
```

## Date format

- Always use ISO 8601 with explicit timezone
- Events in Spain: `T10:00:00Z` (UTC) or `T10:00:00+02:00` (CEST summer)

## Title with colons

If the title contains a colon (`:`) followed by a space, it must be quoted, otherwise YAML will fail to parse:

```yaml
# ✅ Correct
title: "Advanced terminal: bash scripting"

# ❌ Wrong — YAML parse error
title: Advanced terminal: bash scripting
```

## After adding

- The event appears in the "Events" section of the index if the date is in the future
- It appears on the corresponding community page
- Past events are shown in the community history
- Future/past classification is done by comparing against the current date in `src/utils/date-utils.ts`

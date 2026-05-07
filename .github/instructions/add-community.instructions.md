---
description: 'Use when adding a new tech community to the project. Covers YAML structure, schema validations, slug conventions and required fields.'
applyTo: 'src/content/communities/**/*.yaml'
---

# Adding a new community

## Location

Create the file at `src/content/communities/<slug>.yaml`.

## Slug rules

- Must be **kebab-case** and unique (e.g. `python-coruna`, `coruna-jug`)
- No accents or special characters
- The slug matches the filename without the extension

## Full structure

```yaml
name: Official Community Name # required
description: Community description # required
website: https://... # optional, valid URL
logo: https://... # optional, image URL
socials: # optional
  - name: Twitter
    url: https://x.com/...
  - name: GitHub
    url: https://github.com/...
tags: [tag1, tag2] # required, lowercase string array
technologies: [Tech1, Tech2] # optional, technology names
meetingFrequency: Monthly # optional: "Weekly", "Biweekly", "Monthly"
contactEmail: contact@example.com # optional, valid email
```

## Automatic validations (Zod)

- `name` and `description` are required
- `website` and `rsvpLink` must be valid URLs if provided
- `contactEmail` must be a valid email if provided
- `tags` must be a non-empty array
- Full schema is in `src/content/config.ts`

## After adding

- The community will appear automatically in the "Communities" section of the index
- A route `/communities/<slug>` is generated automatically via `pages/communities/[slug].astro`
- No code files need to be modified

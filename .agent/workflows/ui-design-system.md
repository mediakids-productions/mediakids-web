---
description: MediaKids UI rules based on the homepage and curriculum Apple/Liquid Glass style
---

# MediaKids UI Design System

## Design Direction

Use a light, premium Apple-inspired style. The two strongest references are:

- Homepage: clean white/gray background, soft blue/yellow blobs, strong hero typography, rounded image frames
- `curriculum/`: liquid glass background, blue gradient title, translucent glass cards

When adding UI, make it feel like it belongs to these pages.

## Typography

Use the existing stack:

```css
font-family: 'Inter', 'Noto Sans Thai', -apple-system, BlinkMacSystemFont, 'Sukhumvit Set', sans-serif;
```

Avoid introducing a new font unless the owner explicitly asks.

## Colors

Core colors:

- Primary blue: `#0066cc`
- MediaKids blue: `#0052CC`
- Apple blue: `#007AFF`
- Liquid cyan: `#5AC8FA`
- Main text: `#1d1d1f`
- Secondary text: `#86868b`
- Soft body text: `#6b7280`
- Homepage background: `#f8f9fa` to `#ffffff`
- Curriculum background: `#e8f4fc`, `#f0f8ff`, `#e4f0f8`

Use yellow accents sparingly for MediaKids warmth:

- `#FFD100`
- `#FFCC00`
- `#FF9500`

## Homepage Additions

New homepage sections should:

- Stay inside or visually align with the existing `bg-hero-pattern` feel.
- Use soft white panels, low-opacity borders, and gentle shadows.
- Continue the page-wide soft blob style if decorative background is needed.
- Keep section backgrounds light unless the owner explicitly asks for a dark section.

Avoid:

- Heavy gradients
- Dark unrelated sections
- Beige/brown themes
- Purple/pink-dominant sections
- Decorative blobs that look unrelated to existing blobs

## Liquid Glass Components

For curriculum-like sections:

```css
background: linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4), rgba(255,255,255,0.6));
backdrop-filter: blur(40px) saturate(200%);
-webkit-backdrop-filter: blur(40px) saturate(200%);
border: 1px solid rgba(255,255,255,0.7);
border-radius: 32px;
box-shadow: 0 8px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9);
```

Use pill buttons:

```css
border-radius: 100px;
```

or:

```css
border-radius: 980px;
```

## Layout Rules

- No card inside card unless the existing local pattern already does it for a clear reason.
- Text must not overflow on mobile.
- Check desktop and mobile.
- Prefer existing components and classes before inventing new ones.
- Keep navigation/footer behavior intact.

## GPT Image Preview Workflow

For new website design, layout, section, campaign visual, or major visual-direction work:

1. Before editing website files, create a static visual preview/mockup with GPT Image 2 when available.
2. Match the MediaKids homepage and `curriculum/` Apple/Liquid Glass direction.
3. Show the owner the preview image and briefly state what would be implemented.
4. Wait for the owner to approve the visual direction before coding.
5. After approval, implement the approved direction in HTML/CSS/JS, then follow the normal preview and PR workflow.

Skip this step for small text edits, bug fixes, simple link changes, or clearly specified content swaps.

## Required UI Review

Before PR:

- Screenshot homepage if changed.
- Screenshot `curriculum/` if design tokens were touched.
- Check mobile width.
- Confirm background, typography, card radius, and colors match the design direction.

# MkDocs Modern Theme

A clean, fast, Nextra-inspired theme for MkDocs. Built with Tailwind CSS v4, Alpine.js, and the Geist font family.

---

## Why Modern?

Most MkDocs themes are either dated in appearance or heavy with features you never use. Modern takes a different approach: start with excellent typography, a sharp layout, and zero clutter -- then let you customize through CSS custom properties rather than a wall of YAML options.

- **Looks great by default.** No fiddling required. Drop it in, build, and ship.
- **Dark mode that works.** System-aware with a manual toggle. Every color token has a dark variant.
- **Fast.** No jQuery, no Bootstrap. Alpine.js for interactivity, Tailwind for styles, both tree-shaken to the minimum.
- **Search built in.** Ctrl+K / Cmd+K opens a modal powered by lunr.js -- loaded lazily so it never blocks your page.
- **Fully customizable.** Override any of the 30+ CSS custom properties. Swap fonts, change the accent color, adjust the layout -- all without touching theme internals.

## Features

| Feature | Details |
|---|---|
| Dark / light / system mode | Three-way toggle, remembers preference in `localStorage` |
| Geist font family | Variable-weight sans and mono fonts, bundled and self-hosted |
| Responsive sidebar | Collapsible on mobile, sticky on desktop, configurable depth |
| Table of contents | Scroll-spy highlights the current section, smooth-scroll on click |
| Search modal | Cmd+K / Ctrl+K, keyboard-navigable results, lazy-loaded index |
| Breadcrumbs | Auto-generated from the nav tree |
| Prev / Next navigation | Links at the bottom of every page |
| Admonitions | Five color-coded types with SVG icons |
| Tabbed content | Styled tab sets via `pymdownx.tabbed` |
| Code highlighting | Light and dark Pygments themes tuned for readability |
| Print styles | Header and sidebar hidden, links expanded |
| Accessible | Focus rings, reduced-motion support, semantic HTML |

## Quick start

Install the theme:

```bash
pip install mkdocs-modern-theme
```

Set it in your `mkdocs.yml`:

```yaml
theme:
  name: modern
```

Build and serve:

```bash
mkdocs serve
```

That is all you need. Read on for [installation details](getting-started.md), [configuration options](configuration.md), and [customization guides](customization/theming.md).

## Requirements

- Python 3.9+
- MkDocs 1.5+
- pymdown-extensions 10.0+
- Pygments 16+

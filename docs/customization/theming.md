# Theming

Modern exposes its entire visual system through CSS custom properties (variables). You can override any of them without modifying theme source files.

## How to override

Create a CSS file in your `docs/` directory -- for example, `docs/stylesheets/overrides.css` -- and reference it in `mkdocs.yml`:

```yaml
extra_css:
  - stylesheets/overrides.css
```

Inside that file, override any `--modern-*` variable on `:root` (for light mode) or `.dark` (for dark mode):

```css
:root {
  --modern-accent: #8b5cf6;
  --modern-accent-hover: #7c3aed;
}

.dark {
  --modern-accent: #a78bfa;
  --modern-accent-hover: #c4b5fd;
}
```

## Complete variable reference

### Accent colors

| Variable | Default (light) | Default (dark) | Purpose |
|---|---|---|---|
| `--modern-accent` | `#0070f3` | `#3b82f6` | Primary brand color, links, active states |
| `--modern-accent-hover` | `#005cc5` | `#60a5fa` | Hover state for accent-colored elements |

### Surface colors

| Variable | Default (light) | Default (dark) | Purpose |
|---|---|---|---|
| `--modern-surface` | `#fafafa` | `#111111` | Page background |
| `--modern-surface-alt` | `#f0f0f0` | `#1a1a1a` | Alternate background (table headers, tab bars) |

### Border colors

| Variable | Default (light) | Default (dark) | Purpose |
|---|---|---|---|
| `--modern-border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | Subtle borders, dividers |
| `--modern-border-strong` | `rgba(0,0,0,0.15)` | `rgba(255,255,255,0.15)` | Emphasized borders, table headers |

### Text colors

| Variable | Default (light) | Default (dark) | Purpose |
|---|---|---|---|
| `--modern-text-primary` | `#171717` | `#ededed` | Body text, headings |
| `--modern-text-secondary` | `#525252` | `#a3a3a3` | Supporting text, descriptions |
| `--modern-text-tertiary` | `#a3a3a3` | `#666666` | Muted text, placeholders |

### Typography

| Variable | Default | Purpose |
|---|---|---|
| `--modern-font-sans` | `"Geist", ui-sans-serif, system-ui, sans-serif` | Body text font stack |
| `--modern-font-mono` | `"Geist Mono", ui-monospace, SFMono-Regular, monospace` | Code font stack |

### Border radius

| Variable | Default | Purpose |
|---|---|---|
| `--modern-radius-sm` | `4px` | Small elements (inline code, badges) |
| `--modern-radius-md` | `6px` | Medium elements (code blocks, admonitions) |
| `--modern-radius-lg` | `8px` | Large elements (cards, images) |

### Layout dimensions

| Variable | Default | Purpose |
|---|---|---|
| `--modern-header-height` | `64px` | Fixed header height |
| `--modern-sidebar-width` | `256px` | Left sidebar width on desktop |
| `--modern-toc-width` | `224px` | Right TOC panel width |
| `--modern-content-max-width` | `90rem` | Maximum width of the page container |

### Admonition colors

| Variable | Default (light) | Default (dark) | Purpose |
|---|---|---|---|
| `--modern-note` | `#0070f3` | `#3b82f6` | Note, abstract, seealso |
| `--modern-tip` | `#16a34a` | `#22c55e` | Tip, hint, success, check, done |
| `--modern-warning` | `#f59e0b` | `#eab308` | Warning, caution, attention |
| `--modern-danger` | `#dc2626` | `#ef4444` | Danger, error, failure, bug |
| `--modern-info` | `#06b6d4` | `#22d3ee` | Info, todo, faq, question, help |

### Code backgrounds

| Variable | Default (light) | Default (dark) | Purpose |
|---|---|---|---|
| `--modern-code-bg` | `#f5f5f5` | `#1a1a1a` | Fenced code block background |
| `--modern-code-inline-bg` | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.08)` | Inline `code` background |

## Example: brand override

Here is a complete override file that rebrands the theme with a purple accent and tighter layout:

```css
:root {
  --modern-accent: #7c3aed;
  --modern-accent-hover: #6d28d9;
  --modern-sidebar-width: 220px;
  --modern-toc-width: 200px;
  --modern-radius-sm: 2px;
  --modern-radius-md: 4px;
  --modern-radius-lg: 6px;
}

.dark {
  --modern-accent: #a78bfa;
  --modern-accent-hover: #c4b5fd;
}
```

## Example: warm palette

```css
:root {
  --modern-accent: #ea580c;
  --modern-accent-hover: #c2410c;
  --modern-surface: #fffbeb;
  --modern-surface-alt: #fef3c7;
  --modern-text-primary: #292524;
  --modern-text-secondary: #57534e;
}

.dark {
  --modern-accent: #fb923c;
  --modern-accent-hover: #fdba74;
  --modern-surface: #1c1917;
  --modern-surface-alt: #292524;
  --modern-text-primary: #fafaf9;
  --modern-text-secondary: #a8a29e;
}
```

## Scoping overrides

You can scope overrides to specific pages by adding a class to the page via the `extra` metadata in your Markdown front matter, then targeting that class in CSS. The theme applies styles through the `.modern-content` wrapper, so all content rules can be further qualified.

## See also

- [Colors](colors.md) — detailed color token reference
- [Typography](typography.md) — font stacks and sizing
- [Layout](layout.md) — sidebar, header, and content dimensions

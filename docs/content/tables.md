# Tables

Tables are the best way to present structured data like option references, comparison matrices, and feature lists. Modern styles Markdown tables with clean borders, hover highlighting, and a design that works in both light and dark modes.

## Requirements

Enable the tables extension in your `mkdocs.yml`:

```yaml
markdown_extensions:
  - tables
```

## Basic table

```markdown
| Name | Type | Default |
|---|---|---|
| `color_mode` | string | `"system"` |
| `navigation_depth` | integer | `3` |
| `show_toc` | boolean | `true` |
```

Renders as:

| Name | Type | Default |
|---|---|---|
| `color_mode` | string | `"system"` |
| `navigation_depth` | integer | `3` |
| `show_toc` | boolean | `true` |

## Column alignment

Use colons in the separator row to control alignment:

```markdown
| Left aligned | Center aligned | Right aligned |
|:---|:---:|---:|
| Text | Text | Text |
| Longer text | Longer text | Longer text |
```

| Left aligned | Center aligned | Right aligned |
|:---|:---:|---:|
| Text | Text | Text |
| Longer text | Longer text | Longer text |

## CSS custom properties table

Here is a larger example showing the theme's color tokens:

| Variable | Light | Dark | Purpose |
|---|---|---|---|
| `--modern-accent` | `#0070f3` | `#3b82f6` | Brand color |
| `--modern-accent-hover` | `#005cc5` | `#60a5fa` | Hover state |
| `--modern-surface` | `#fafafa` | `#111111` | Page background |
| `--modern-surface-alt` | `#f0f0f0` | `#1a1a1a` | Secondary background |
| `--modern-border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | Subtle dividers |
| `--modern-text-primary` | `#171717` | `#ededed` | Body text |
| `--modern-text-secondary` | `#525252` | `#a3a3a3` | Supporting text |
| `--modern-text-tertiary` | `#a3a3a3` | `#666666` | Muted text |

## Table styling details

Modern applies the following styles to tables:

- **Full width** -- tables expand to fill the content area
- **Header row** -- bold text on a `--modern-surface-alt` background with a 2px bottom border
- **Body rows** -- 1px bottom border using `--modern-border`
- **Row hover** -- background shifts to `--modern-surface-alt`
- **Font size** -- `0.875rem` (14px) for compact readability
- **Cell padding** -- `0.75rem` vertical, `1rem` horizontal
- **Border collapse** -- cells share borders, no double lines

## Wide tables

Tables with many columns may overflow the content area. The theme wraps tables in a horizontally scrollable container when needed, so wide tables remain usable on narrow screens.

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 |
|---|---|---|---|---|---|
| Data | Data | Data | Data | Data | Data |
| Data | Data | Data | Data | Data | Data |

## Tables with inline code

Tables often contain code references. Inline code renders cleanly inside table cells:

| Option | Type | Example |
|---|---|---|
| `color_mode` | `str` | `color_mode: dark` |
| `navigation_depth` | `int` | `navigation_depth: 2` |
| `show_toc` | `bool` | `show_toc: false` |
| `logo` | `str \| null` | `logo: assets/logo.svg` |

## Definition lists

For key-value data that does not fit a table structure, consider using definition lists instead (requires the `def_list` extension):

```yaml
markdown_extensions:
  - def_list
```

```markdown
`color_mode`
:   Controls the default color scheme. Accepts `system`, `light`, or `dark`.

`navigation_depth`
:   Maximum sidebar nesting depth. Default: `3`.
```

Renders as:

`color_mode`
:   Controls the default color scheme. Accepts `system`, `light`, or `dark`.

`navigation_depth`
:   Maximum sidebar nesting depth. Default: `3`.

## See also

- [Extensions](../extensions.md) — enabling `tables` and `def_list`

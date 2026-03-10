# Colors

Modern uses a token-based color system. Every color in the theme flows through a `--modern-*` CSS custom property, making it straightforward to swap palettes without editing theme internals.

## Color theme presets

The theme ships with 8 ready-made color themes. Set `color_theme` in your `mkdocs.yml`:

```yaml
theme:
  name: modern
  color_theme: ocean
```

Available presets:

| Preset | Accent | Surface | Character |
|---|---|---|---|
| `default` | Blue | Neutral gray | Clean, familiar |
| `ocean` | Teal | Cool blue-gray | Technical, calm |
| `purple` | Violet | Warm lavender | Creative, modern |
| `rose` | Pink | Warm rose-gray | Bold, editorial |
| `emerald` | Green | Cool sage | Natural, fresh |
| `amber` | Gold | Warm cream | Warm, approachable |
| `slate` | Gray | Cool blue-slate | Minimal, understated |
| `ruby` | Red | Neutral | Strong, high-contrast |

Each preset provides light and dark mode variants automatically. The dark/light toggle continues to work as usual.

!!! tip "Further customization"
    Presets override accent and surface colors. You can still use `extra_css` to fine-tune individual tokens on top of a preset.

## How color mode works

The theme supports three modes: **system**, **light**, and **dark**.

1. On page load, the theme reads the saved preference from `localStorage` (key: `modern-theme-mode`).
2. If no preference is saved, it falls back to the `color_mode` value in `mkdocs.yml` (default: `system`).
3. In `system` mode, the theme checks `prefers-color-scheme: dark` and reacts to changes in real time.
4. The header contains a toggle button that cycles through system, light, and dark. The choice is persisted immediately.

Dark mode works by adding a `dark` class to the `<html>` element. All dark-mode overrides target `.dark`.

## Light mode defaults

```css
:root {
  --modern-accent: #0070f3;
  --modern-accent-hover: #005cc5;
  --modern-surface: #fafafa;
  --modern-surface-alt: #f0f0f0;
  --modern-border: rgba(0, 0, 0, 0.08);
  --modern-border-strong: rgba(0, 0, 0, 0.15);
  --modern-text-primary: #171717;
  --modern-text-secondary: #525252;
  --modern-text-tertiary: #a3a3a3;
  --modern-code-bg: #f5f5f5;
  --modern-code-inline-bg: rgba(0, 0, 0, 0.05);
}
```

## Dark mode defaults

```css
.dark {
  --modern-accent: #3b82f6;
  --modern-accent-hover: #60a5fa;
  --modern-surface: #111111;
  --modern-surface-alt: #1a1a1a;
  --modern-border: rgba(255, 255, 255, 0.08);
  --modern-border-strong: rgba(255, 255, 255, 0.15);
  --modern-text-primary: #ededed;
  --modern-text-secondary: #a3a3a3;
  --modern-text-tertiary: #666666;
  --modern-code-bg: #1a1a1a;
  --modern-code-inline-bg: rgba(255, 255, 255, 0.08);
}
```

## Changing the accent color

The accent color appears on links, active navigation items, the search highlight, focus rings, and the active tab indicator. Override it in both `:root` and `.dark` to keep both modes consistent:

```css
:root {
  --modern-accent: #059669;
  --modern-accent-hover: #047857;
}

.dark {
  --modern-accent: #34d399;
  --modern-accent-hover: #6ee7b7;
}
```

!!! tip "Pick accessible pairs"
    Make sure your accent color has sufficient contrast against `--modern-surface` in both modes. A good rule of thumb: light mode accents should be darker shades; dark mode accents should be lighter shades of the same hue.

## Admonition colors

Each admonition type has its own color token. The color is used for the left border, the title text, and a 5% tinted background (via `color-mix`).

| Token | Light | Dark | Used by |
|---|---|---|---|
| `--modern-note` | `#0070f3` | `#3b82f6` | `note`, `abstract`, `seealso` |
| `--modern-tip` | `#16a34a` | `#22c55e` | `tip`, `hint`, `success`, `check`, `done` |
| `--modern-warning` | `#f59e0b` | `#eab308` | `warning`, `caution`, `attention` |
| `--modern-danger` | `#dc2626` | `#ef4444` | `danger`, `error`, `failure`, `fail`, `missing`, `bug` |
| `--modern-info` | `#06b6d4` | `#22d3ee` | `info`, `todo`, `faq`, `question`, `help` |

Override them the same way:

```css
:root {
  --modern-tip: #15803d;
  --modern-warning: #d97706;
}
```

## Surface and background colors

The theme uses two surface levels:

- `--modern-surface` -- the main page background
- `--modern-surface-alt` -- used for table headers, tab bars, keyboard shortcuts, and other secondary surfaces

Keep sufficient contrast between the two. In light mode, `surface-alt` should be slightly darker than `surface`. In dark mode, `surface-alt` should be slightly lighter.

## Border colors

Two border tokens control all dividers and outlines:

- `--modern-border` -- subtle separators (heading underlines, table rows, code block outlines)
- `--modern-border-strong` -- emphasized separators (table header bottoms, blockquote bars, kbd shadows)

Both use `rgba` values by default so they blend naturally with any surface color. If you switch to opaque hex values, test against both light and dark backgrounds.

## Code backgrounds

Fenced code blocks and inline code each have their own background token:

```css
:root {
  --modern-code-bg: #f5f5f5;
  --modern-code-inline-bg: rgba(0, 0, 0, 0.05);
}
```

The syntax highlighting colors are separate from these tokens -- they are defined in the theme's Pygments stylesheet. See [Code Blocks](../content/code-blocks.md) for details.

## Full palette swap example

Here is a complete warm-toned palette:

```css
:root {
  --modern-accent: #b45309;
  --modern-accent-hover: #92400e;
  --modern-surface: #fffbeb;
  --modern-surface-alt: #fef3c7;
  --modern-border: rgba(120, 53, 15, 0.1);
  --modern-border-strong: rgba(120, 53, 15, 0.2);
  --modern-text-primary: #292524;
  --modern-text-secondary: #57534e;
  --modern-text-tertiary: #a8a29e;
  --modern-code-bg: #fef9ee;
  --modern-code-inline-bg: rgba(120, 53, 15, 0.06);
  --modern-note: #b45309;
  --modern-tip: #15803d;
  --modern-warning: #ca8a04;
  --modern-danger: #b91c1c;
  --modern-info: #0e7490;
}

.dark {
  --modern-accent: #fbbf24;
  --modern-accent-hover: #fcd34d;
  --modern-surface: #1c1917;
  --modern-surface-alt: #292524;
  --modern-border: rgba(253, 230, 138, 0.08);
  --modern-border-strong: rgba(253, 230, 138, 0.15);
  --modern-text-primary: #fafaf9;
  --modern-text-secondary: #a8a29e;
  --modern-text-tertiary: #78716c;
  --modern-code-bg: #292524;
  --modern-code-inline-bg: rgba(253, 230, 138, 0.08);
  --modern-note: #fbbf24;
  --modern-tip: #4ade80;
  --modern-warning: #facc15;
  --modern-danger: #f87171;
  --modern-info: #22d3ee;
}
```

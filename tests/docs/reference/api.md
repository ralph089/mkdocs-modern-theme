# API Reference

## Theme Configuration

### `color_mode`

Controls the color scheme of the theme.

| Value    | Type  | Default  |
| -------- | ----- | -------- |
| `system` | `str` | `system` |

Possible values: `system`, `light`, `dark`

### `navigation_depth`

Maximum depth for sidebar navigation tree expansion.

| Value | Type  | Default |
| ----- | ----- | ------- |
| `3`   | `int` | `3`     |

### `show_toc`

Toggle the table of contents panel.

| Value  | Type   | Default |
| ------ | ------ | ------- |
| `true` | `bool` | `true`  |

## CSS Custom Properties

### Colors

```css
:root {
  --modern-accent: #0070f3;
  --modern-accent-hover: #005cc5;
  --modern-surface: #fafafa;
  --modern-surface-alt: #f0f0f0;
  --modern-border: rgba(0, 0, 0, 0.08);
  --modern-text-primary: #171717;
  --modern-text-secondary: #525252;
  --modern-text-tertiary: #a3a3a3;
}
```

### Layout

```css
:root {
  --modern-header-height: 64px;
  --modern-sidebar-width: 256px;
  --modern-toc-width: 224px;
  --modern-content-max-width: 90rem;
}
```

### Typography

```css
:root {
  --modern-font-sans: "Geist", system-ui, sans-serif;
  --modern-font-mono: "Geist Mono", monospace;
}
```

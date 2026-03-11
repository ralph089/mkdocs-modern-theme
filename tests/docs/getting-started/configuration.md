# Configuration

All configuration is done in your `mkdocs.yml` file.

## Theme Options

```yaml
theme:
  name: modern
  color_mode: system    # system | light | dark
  navigation_depth: 3   # Max sidebar nesting depth
  show_toc: true        # Show table of contents
  show_breadcrumbs: true # Show breadcrumb trail
  show_prev_next: true  # Show prev/next navigation
  show_edit_link: false  # Show "Edit this page" link
  logo: null            # Path to custom logo image
```

## Color Mode

| Value    | Description                     |
| -------- | ------------------------------- |
| `system` | Follow the user's OS preference |
| `light`  | Always use light mode           |
| `dark`   | Always use dark mode            |

## Navigation Depth

Controls how many levels deep the sidebar navigation expands. Set to `0` for unlimited depth.

## Custom CSS

Override any theme variable via `extra_css`:

```yaml
extra_css:
  - css/custom.css
```

```css
:root {
  --modern-accent: #e11d48;
  --modern-font-sans: "Inter", sans-serif;
}
```

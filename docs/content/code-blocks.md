# Code Blocks

Modern includes hand-tuned Pygments color schemes for both light and dark modes, styled to match the GitHub code highlighting aesthetic.

## Requirements

Enable syntax highlighting in your `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences
```

## Fenced code blocks

Use triple backticks with a language identifier:

````markdown
```python
def greet(name: str) -> str:
    return f"Hello, {name}!"
```
````

Renders as:

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

## Language examples

### Python

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class Theme:
    name: str
    version: str
    color_mode: str = "system"
    navigation_depth: int = 3
    show_toc: bool = True
    logo: Optional[str] = None

    def is_dark(self) -> bool:
        return self.color_mode == "dark"
```

### JavaScript

```javascript
document.addEventListener('alpine:init', () => {
  Alpine.store('theme', {
    mode: localStorage.getItem('modern-theme-mode') || 'system',

    get isDark() {
      if (this.mode === 'dark') return true;
      if (this.mode === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    cycle() {
      const modes = ['system', 'light', 'dark'];
      const next = (modes.indexOf(this.mode) + 1) % modes.length;
      this.mode = modes[next];
      localStorage.setItem('modern-theme-mode', this.mode);
    }
  });
});
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>MkDocs Modern Theme</title>
  <link rel="stylesheet" href="css/theme.css" />
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
    </nav>
  </header>
</body>
</html>
```

### CSS

```css
:root {
  --modern-accent: #0070f3;
  --modern-surface: #fafafa;
  --modern-text-primary: #171717;
  --modern-font-sans: "Geist", system-ui, sans-serif;
}

.dark {
  --modern-accent: #3b82f6;
  --modern-surface: #111111;
  --modern-text-primary: #ededed;
}
```

### YAML

```yaml
site_name: My Documentation
theme:
  name: modern
  color_mode: system
  navigation_depth: 3
  show_toc: true

markdown_extensions:
  - admonition
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences
```

### Bash

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Installing mkdocs-modern-theme..."
pip install mkdocs-modern-theme

echo "Building documentation..."
mkdocs build --strict

echo "Done."
```

### JSON

```json
{
  "name": "mkdocs-modern-theme",
  "version": "0.1.0",
  "description": "A modern, minimal MkDocs theme",
  "keywords": ["mkdocs", "theme", "documentation"]
}
```

## Inline code

Wrap text in single backticks for inline code: `--modern-accent` renders with a subtle background tint and the monospace font.

Inline code inside links also works: [`mkdocs serve`](../getting-started.md).

## Code block styling

Fenced code blocks are styled with:

- Background: `--modern-code-bg` (`#f5f5f5` light / `#1a1a1a` dark)
- Border: `1px solid var(--modern-border)`
- Border radius: `--modern-radius-md` (6px)
- Font: `--modern-font-mono` at `0.875rem`
- Line height: 1.6
- Padding: `1rem`
- Horizontal scrolling for long lines

## Customizing code backgrounds

Override the background tokens in your custom CSS:

```css
:root {
  --modern-code-bg: #f8f8f8;
  --modern-code-inline-bg: rgba(0, 0, 0, 0.04);
}

.dark {
  --modern-code-bg: #1e1e1e;
  --modern-code-inline-bg: rgba(255, 255, 255, 0.06);
}
```

## Syntax highlighting colors

The theme includes two complete Pygments color schemes (light and dark) that are applied automatically based on the current color mode. The light scheme uses GitHub-style colors. The dark scheme uses GitHub Dark-style colors.

The syntax colors are defined in the theme's CSS and are not exposed as custom properties. To fully replace them, add your own Pygments-compatible styles targeting `.modern-content .highlight` selectors.

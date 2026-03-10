# Code Blocks

The theme includes syntax highlighting for all major languages.

## Python

```python
def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence."""
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib[:n]

if __name__ == "__main__":
    print(fibonacci(10))
```

## JavaScript

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch:', error);
    return null;
  }
}
```

## HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
```

## YAML

```yaml
site_name: My Documentation
theme:
  name: modern
  color_mode: system

nav:
  - Home: index.md
  - Guide: guide.md
```

## Bash

```bash
#!/bin/bash
echo "Installing dependencies..."
pip install mkdocs-modern-theme
mkdocs serve --dev-addr localhost:8000
```

## Inline Code

Use backticks for `inline code` in your text. For example, the `mkdocs serve` command starts the development server.

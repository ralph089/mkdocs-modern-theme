# Tabs

Tabbed content lets you present alternatives -- different languages, platforms, or approaches -- in a compact, switchable interface.

## Requirements

Enable the tabbed extension in your `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.superfences
```

The `alternate_style: true` option is required. It uses the modern CSS-based tab implementation rather than the legacy JavaScript version.

## Basic usage

````markdown
=== "Python"

    ```python
    print("Hello, world!")
    ```

=== "JavaScript"

    ```javascript
    console.log("Hello, world!");
    ```

=== "Bash"

    ```bash
    echo "Hello, world!"
    ```
````

Renders as:

=== "Python"

    ```python
    print("Hello, world!")
    ```

=== "JavaScript"

    ```javascript
    console.log("Hello, world!");
    ```

=== "Bash"

    ```bash
    echo "Hello, world!"
    ```

## Installation methods

A common use case is showing installation commands for different package managers:

=== "pip"

    ```bash
    pip install mkdocs-modern-theme
    ```

=== "pipx"

    ```bash
    pipx install mkdocs-modern-theme
    ```

=== "uv"

    ```bash
    uv pip install mkdocs-modern-theme
    ```

=== "Poetry"

    ```bash
    poetry add mkdocs-modern-theme
    ```

## Rich content in tabs

Tabs can contain any Markdown content, not just code blocks:

=== "Overview"

    Modern is a clean, Nextra-inspired theme for MkDocs.

    - Built with Tailwind CSS v4
    - Powered by Alpine.js
    - Ships with Geist fonts

=== "Features"

    | Feature      | Status   |
    | ------------ | -------- |
    | Dark mode    | Included |
    | Search       | Included |
    | Responsive   | Included |
    | Print styles | Included |

=== "Requirements"

    !!! note

        You need Python 3.9 or later.

    - MkDocs 1.5+
    - pymdown-extensions 10.0+
    - Pygments 2.16+

## Tab styling

Tabs are rendered with these visual properties:

- Tab bar sits in a `--modern-surface-alt` background with a bottom border
- Active tab shows a `--modern-accent` colored bottom border and text
- Inactive tabs use `--modern-text-secondary` and shift to `--modern-text-primary` on hover
- Tab labels are `0.875rem` at font-weight 500
- The entire tab set is wrapped in a border with `--modern-radius-md` rounding
- The tab bar scrolls horizontally if there are too many tabs to fit

## Multiple tab sets

You can have multiple independent tab sets on the same page. Each set maintains its own selection state:

=== "macOS"

    ```bash
    brew install python
    ```

=== "Linux"

    ```bash
    sudo apt install python3
    ```

=== "Windows"

    ```bash
    winget install Python.Python.3
    ```

______________________________________________________________________

=== "Development"

    ```bash
    mkdocs serve
    ```

=== "Production"

    ```bash
    mkdocs build --strict
    ```

## See also

- [Extensions](../extensions.md) — configuring `pymdownx.tabbed`
- [Code Blocks](code-blocks.md) — syntax highlighting inside tabs

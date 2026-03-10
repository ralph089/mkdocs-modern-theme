# Components

The theme supports various content components.

## Tabs

=== "Python"

    ```python
    print("Hello from Python!")
    ```

=== "JavaScript"

    ```javascript
    console.log("Hello from JavaScript!");
    ```

=== "Bash"

    ```bash
    echo "Hello from Bash!"
    ```

## Tables

| Feature | Support | Notes |
|---------|---------|-------|
| Dark Mode | Yes | System-aware |
| Search | Yes | Ctrl+K |
| TOC | Yes | Scroll-spy |
| Responsive | Yes | 3 breakpoints |
| Offline | Yes | Fully bundled |

## Details

<details>
<summary>Click to see more details</summary>

This content is hidden by default and can be revealed by clicking the summary.

- Item one
- Item two
- Item three

</details>

## Mixed Content

Here's a combination of elements working together:

!!! tip "Pro Tip"
    You can combine **admonitions** with code blocks:

    ```python
    # This works great inside admonitions
    result = compute_something()
    ```

> **Note:** Blockquotes also support `inline code` and other formatting.

## Steps

<div class="steps" markdown>

1. **Install the theme**

    ```bash
    pip install mkdocs-modern-theme
    ```

2. **Configure mkdocs.yml**

    Set `theme: name: modern` in your config.

3. **Start developing**

    Run `mkdocs serve` and open your browser.

</div>

## Cards

<div class="cards" markdown>

- **[Installation](../getting-started/installation.md)**
  Get up and running in minutes.

- **[Configuration](../getting-started/configuration.md)**
  Customize every aspect of the theme.

- **[Writing Docs](writing-docs.md)**
  Learn how to write great documentation.

- **[Admonitions](admonitions.md)**
  Use callout boxes to highlight content.

</div>

## File Tree

<div class="file-tree" markdown>

- docs/
  - index.md
  - getting-started/
    - installation.md
    - configuration.md
  - guide/
    - writing-docs.md
    - components.md

</div>

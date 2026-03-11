# Admonitions

Admonitions are colored callout boxes used to draw attention to important information. Modern supports all standard admonition types with distinct colors and SVG icons.

## Requirements

Enable the `admonition` extension in your `mkdocs.yml`:

```yaml
markdown_extensions:
  - admonition
```

For collapsible admonitions, also enable `pymdownx.details`:

```yaml
markdown_extensions:
  - admonition
  - pymdownx.details
```

## Syntax

```markdown
!!! note "Optional custom title"
    Content goes here. Indented by four spaces.
```

To use the default title (the type name), omit the quoted string:

```markdown
!!! note
    This admonition uses "Note" as its title.
```

For a title-less admonition, use an empty string:

```markdown
!!! note ""
    This admonition has no title bar.
```

## Types

### Note

!!! note

    Use `note` for general information that supplements the main content. Also triggered by `abstract` and `seealso`.

```markdown
!!! note
    Use `note` for general information that supplements the main content.
```

### Tip

!!! tip

    Use `tip` for helpful suggestions and best practices. Also triggered by `hint`, `success`, `check`, and `done`.

```markdown
!!! tip
    Use `tip` for helpful suggestions and best practices.
```

### Warning

!!! warning

    Use `warning` for information about potential pitfalls or non-obvious behavior. Also triggered by `caution` and `attention`.

```markdown
!!! warning
    Use `warning` for information about potential pitfalls.
```

### Danger

!!! danger

    Use `danger` for information about actions that could cause data loss or security issues. Also triggered by `error`, `failure`, `fail`, `missing`, and `bug`.

```markdown
!!! danger
    Use `danger` for actions that could cause data loss.
```

### Info

!!! info

    Use `info` for supplementary details and context. Also triggered by `todo`, `faq`, `question`, and `help`.

```markdown
!!! info
    Use `info` for supplementary details and context.
```

## Type aliases

Each color group responds to multiple type keywords:

| Color                      | Types                                                  |
| -------------------------- | ------------------------------------------------------ |
| Blue (`--modern-note`)     | `note`, `abstract`, `seealso`                          |
| Green (`--modern-tip`)     | `tip`, `hint`, `success`, `check`, `done`              |
| Amber (`--modern-warning`) | `warning`, `caution`, `attention`                      |
| Red (`--modern-danger`)    | `danger`, `error`, `failure`, `fail`, `missing`, `bug` |
| Cyan (`--modern-info`)     | `info`, `todo`, `faq`, `question`, `help`              |

## Collapsible admonitions

With `pymdownx.details` enabled, use `???` for a collapsed block or `???+` for one that starts expanded:

???+ note "Click to collapse this"

    This admonition starts expanded but can be collapsed by clicking the title.

```markdown
???+ note "Click to collapse this"
    This admonition starts expanded but can be collapsed.
```

??? tip "Click to expand this"

    This admonition starts collapsed.

```markdown
??? tip "Click to expand this"
    This admonition starts collapsed.
```

## Nested content

Admonitions can contain any Markdown content -- lists, code blocks, tables, and even other admonitions:

!!! note "Complex example"

    Here is a list inside an admonition:

    - First item
    - Second item
    - Third item

    And a code block:

    ```python
    print("Hello from inside an admonition")
    ```

## Customizing colors

Override the admonition color tokens in your custom CSS:

```css
:root {
  --modern-note: #6366f1;
  --modern-tip: #059669;
  --modern-warning: #d97706;
  --modern-danger: #dc2626;
  --modern-info: #0891b2;
}
```

Each admonition's background is generated automatically using `color-mix(in srgb, <color> 5%, var(--modern-surface))`, so you only need to set the primary color.

## See also

- [Extensions](../extensions.md) — enabling `admonition` and `pymdownx.details`
- [Colors](../customization/colors.md) — customizing admonition color tokens

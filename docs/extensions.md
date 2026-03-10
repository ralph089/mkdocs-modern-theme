# Extensions

Modern works with standard MkDocs and PyMdown Extensions. Enabling the right extensions unlocks admonitions, tabbed content, syntax highlighting, and other features that make documentation more engaging and readable. This page lists the recommended extensions and explains what each one enables.

## Recommended configuration

```yaml
markdown_extensions:
  - admonition
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.details
  - toc:
      permalink: true
  - tables
  - def_list
```

## Extension reference

### admonition

Enables callout boxes (notes, tips, warnings, etc.).

```markdown
!!! note "Title"
    Content here.
```

The theme provides styled callouts in five color groups with SVG icons. See [Admonitions](content/admonitions.md) for the full list of types and examples.

**Package:** Built into Python-Markdown.

---

### pymdownx.highlight

Enables syntax highlighting for fenced code blocks using Pygments.

```yaml
- pymdownx.highlight:
    anchor_linenums: true
```

The `anchor_linenums` option makes line numbers clickable anchors, which is useful for linking to specific lines in code examples.

The theme includes custom Pygments color schemes for both light and dark modes. See [Code Blocks](content/code-blocks.md) for examples.

**Package:** `pymdownx` (pymdown-extensions).

---

### pymdownx.superfences

Extends fenced code blocks with additional capabilities. Required for proper syntax highlighting and for nesting code blocks inside admonitions and tabs.

```yaml
- pymdownx.superfences
```

Without this extension, code blocks inside admonitions or tab content may not render correctly.

**Package:** `pymdownx` (pymdown-extensions).

---

### pymdownx.tabbed

Enables tabbed content blocks.

```yaml
- pymdownx.tabbed:
    alternate_style: true
```

The `alternate_style: true` option is required. It produces semantic HTML that the theme styles with CSS. See [Tabs](content/tabs.md) for usage examples.

**Package:** `pymdownx` (pymdown-extensions).

---

### pymdownx.details

Enables collapsible content using HTML `<details>` and `<summary>` elements, integrated with admonition syntax.

```yaml
- pymdownx.details
```

Use `???` for collapsed and `???+` for initially expanded:

```markdown
??? tip "Collapsible tip"
    This content is hidden by default.

???+ warning "Expanded warning"
    This content is visible but can be collapsed.
```

**Package:** `pymdownx` (pymdown-extensions).

---

### toc

Generates a table of contents from headings and adds permalink anchors.

```yaml
- toc:
    permalink: true
```

The `permalink: true` option adds a `#` link next to each heading. The theme styles these links to appear on hover with a smooth fade transition.

The TOC sidebar panel (controlled by `show_toc` in the theme config) reads the same heading structure to build its scroll-spy navigation.

**Package:** Built into Python-Markdown.

---

### tables

Enables Markdown table syntax.

```yaml
- tables
```

The theme provides styled tables with header highlighting, row hover effects, and horizontal scroll for wide content. See [Tables](content/tables.md).

**Package:** Built into Python-Markdown.

---

### def_list

Enables definition list syntax.

```yaml
- def_list
```

Useful for glossaries, option references, and key-value documentation:

```markdown
Term
:   Definition of the term.

Another term
:   Its definition.
```

**Package:** Built into Python-Markdown.

## Optional extensions

These extensions are not included in the recommended set but work well with Modern if your content needs them:

### pymdownx.critic

Track changes with insertion, deletion, and comment markup.

```yaml
- pymdownx.critic
```

### pymdownx.mark

Highlight text with `==marked text==`.

```yaml
- pymdownx.mark
```

The theme styles `<mark>` elements with a yellow-tinted background.

### pymdownx.keys

Render keyboard shortcuts with `++ctrl+k++`.

```yaml
- pymdownx.keys
```

The theme styles `<kbd>` elements with a raised, bordered appearance.

### pymdownx.emoji

Use emoji shortcodes in your Markdown.

```yaml
- pymdownx.emoji:
    emoji_index: !!python/name:pymdownx.emoji.twemoji
    emoji_generator: !!python/name:pymdownx.emoji.to_svg
```

!!! warning "Don't use Material paths"
    Some guides reference `material.extensions.emoji.twemoji` and `material.extensions.emoji.to_svg`. Those paths require `mkdocs-material` as a dependency. Use the `pymdownx.emoji` paths shown above instead.

### attr_list

Add HTML attributes to Markdown elements.

```yaml
- attr_list
```

### footnotes

Add footnotes with `[^1]` syntax.

```yaml
- footnotes
```

### pymdownx.tasklist

Renders GitHub-style task list checkboxes.

```yaml
- pymdownx.tasklist:
    custom_checkbox: true
```

The `custom_checkbox: true` option produces styled checkboxes. The theme provides custom checkbox styling that matches the overall design.

```markdown
- [x] Completed task
- [ ] Incomplete task
```

### pymdownx.arithmatex

Render LaTeX math expressions.

```yaml
- pymdownx.arithmatex:
    generic: true
```

The `generic: true` option outputs math in a format compatible with both KaTeX and MathJax. You also need to include one of them via `extra_javascript`:

```yaml
extra_javascript:
  - https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js
extra_css:
  - https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css
```

### pymdownx.caret

Insert text with `^^insert^^` and superscript with `^sup^`.

```yaml
- pymdownx.caret
```

### pymdownx.tilde

Strikethrough text with `~~delete~~` and subscript with `~sub~`.

```yaml
- pymdownx.tilde
```

## Installation

All `pymdownx.*` extensions come from the `pymdown-extensions` package, which is installed automatically as a dependency of `mkdocs-modern-theme`. The remaining extensions (`admonition`, `toc`, `tables`, `def_list`, `attr_list`, `footnotes`) are built into Python-Markdown and require no additional installation.

# File Tree

File trees display project or directory structures with file and folder icons.

## Usage

Wrap a nested Markdown list in a `<div class="file-tree">` container:

```markdown
<div class="file-tree" markdown>

- docs/
  - index.md
  - getting-started/
    - installation.md
    - configuration.md
  - guide/
    - writing-docs.md

</div>
```

## Example

<div class="file-tree" markdown>

- my-project/
    - docs/
        - index.md
        - getting-started.md
        - configuration.md
        - content/
            - admonitions.md
            - code-blocks.md
            - tabs.md
    - mkdocs.yml
    - pyproject.toml
    - README.md

</div>

## Folder vs file icons

Items that contain nested lists are automatically displayed with a **folder icon** in the theme accent color. Leaf items (no children) show a **file icon** in a muted color.

This works via the CSS `:has(> ul)` selector — no extra markup or classes needed.

<div class="file-tree" markdown>

- src/
    - components/
        - Header.tsx
        - Sidebar.tsx
    - styles/
        - theme.css
    - index.ts
- package.json
- tsconfig.json

</div>

## How it works

The `.file-tree` class styles the child lists with:

- Monospace font (`--modern-font-mono`) at `0.875rem`
- Border and background matching cards (`--modern-card-bg`)
- SVG mask icons for files and folders
- Vertical connector lines on nested levels via `border-left`

## Requirements

Both `attr_list` and `md_in_html` extensions must be enabled for the `markdown` attribute to work on HTML wrapper divs:

```yaml
markdown_extensions:
  - attr_list
  - md_in_html
```

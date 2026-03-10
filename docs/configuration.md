# Configuration

All theme options live under the `theme:` key in your `mkdocs.yml`. Every option has a default value, so you only need to set what you want to change.

## Full example

```yaml
theme:
  name: modern
  color_mode: system
  color_theme: default
  navigation_depth: 3
  show_toc: true
  show_breadcrumbs: true
  show_prev_next: true
  show_edit_link: false
  show_copy_markdown: true
  show_last_updated: true
  logo: null
```

## Option reference

### `color_mode`

Controls the default color scheme.

| Value | Behavior |
|---|---|
| `system` | Follows the user's operating system preference (default) |
| `light` | Forces light mode |
| `dark` | Forces dark mode |

Regardless of this setting, visitors can cycle through modes using the toggle button in the header. Their choice is saved in `localStorage`.

```yaml
theme:
  name: modern
  color_mode: dark
```

### `color_theme`

Selects a color theme preset that sets the accent and surface colors for both light and dark mode.

- **Type:** string
- **Default:** `default`
- **Options:** `default`, `ocean`, `purple`, `rose`, `emerald`, `amber`, `slate`, `ruby`

```yaml
theme:
  name: modern
  color_theme: ocean
```

Each preset provides both light and dark variants automatically. You can further customize individual tokens on top of a preset using `extra_css`. See [Colors](customization/colors.md) for screenshots and details of each preset.

### `navigation_depth`

Maximum nesting depth shown in the sidebar navigation.

- **Type:** integer
- **Default:** `3`

A value of `1` shows only top-level pages. A value of `3` shows up to three levels of nested sections.

```yaml
theme:
  name: modern
  navigation_depth: 2
```

### `show_toc`

Whether to show the table of contents panel on the right side of content pages.

- **Type:** boolean
- **Default:** `true`

The TOC is generated from `h2` and `h3` headings on the current page. It includes scroll-spy highlighting and smooth-scroll on click.

```yaml
theme:
  name: modern
  show_toc: false
```

### `show_breadcrumbs`

Whether to show breadcrumb navigation above the page title.

- **Type:** boolean
- **Default:** `true`

Breadcrumbs are auto-generated from your `nav` structure and help readers understand where they are in the documentation hierarchy.

```yaml
theme:
  name: modern
  show_breadcrumbs: false
```

### `show_prev_next`

Whether to show previous/next page links at the bottom of each page.

- **Type:** boolean
- **Default:** `true`

These links are derived from the `nav` order and make it easy for readers to walk through your documentation sequentially.

```yaml
theme:
  name: modern
  show_prev_next: false
```

### `show_edit_link`

Whether to show an "Edit this page" link that points to the source file on your repository.

- **Type:** boolean
- **Default:** `false`

For this to work, you must also set `repo_url` and optionally `edit_uri` at the top level of your `mkdocs.yml`.

```yaml
repo_url: https://github.com/your-org/your-repo
edit_uri: edit/main/docs/

theme:
  name: modern
  show_edit_link: true
```

### `show_copy_markdown`

Whether to show a button that copies the page's Markdown source to the clipboard.

- **Type:** boolean
- **Default:** `true`

This adds a small copy icon alongside the edit link area. Visitors can click it to copy the raw Markdown of the current page.

```yaml
theme:
  name: modern
  show_copy_markdown: false
```

### `show_last_updated`

Whether to show a "Last updated" date below the page content.

- **Type:** boolean
- **Default:** `true`

The date is pulled from git history. For this to work, you need the `git-revision-date-localized` plugin:

```yaml
plugins:
  - search
  - git-revision-date-localized:
      enable_creation_date: true
```

```yaml
theme:
  name: modern
  show_last_updated: false
```

### `logo`

Path to a custom logo image displayed in the header. When set to `null` (the default), the site name is displayed as text.

- **Type:** string or null
- **Default:** `null`

The path is relative to the `docs/` directory.

```yaml
theme:
  name: modern
  logo: assets/logo.svg
```

## Top-level MkDocs settings

These are standard MkDocs options that interact with the theme:

```yaml
site_name: My Project           # Shown in the header and browser tab
site_url: https://example.com/  # Used for canonical URLs
repo_url: https://github.com/…  # Adds a repository link in the header
repo_name: GitHub               # Label for the repo link
edit_uri: edit/main/docs/       # Path template for edit links
```

## Plugins

The theme works with the built-in search plugin out of the box. It also ships with [mkdocs-glightbox](https://github.com/blueswen/mkdocs-glightbox) as a dependency for image lightbox support.

```yaml
plugins:
  - search
  - glightbox
```

The search plugin generates a `search_index.json` that the theme's Cmd+K search modal consumes via lunr.js.

The glightbox plugin adds lightbox functionality to images — clicking any image opens it in a fullscreen overlay. The plugin is installed automatically with the theme; just add `- glightbox` to your `plugins` list to enable it.

!!! tip "Recommended plugins"
    Add `glightbox` to your plugins list for the best experience. The search modal, dark mode toggle, scroll spy, and mobile menu are all built into the theme itself.

## See also

- [Getting Started](getting-started.md) — installation and first build
- [Colors](customization/colors.md) — color theme presets and palette customization
- [Theming](customization/theming.md) — CSS custom properties for visual customization
- [Extensions](extensions.md) — Markdown extensions that unlock additional features

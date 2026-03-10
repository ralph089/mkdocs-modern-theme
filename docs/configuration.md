# Configuration

All theme options live under the `theme:` key in your `mkdocs.yml`. Every option has a default value, so you only need to set what you want to change.

## Full example

```yaml
theme:
  name: modern
  color_mode: system
  navigation_depth: 3
  show_toc: true
  show_breadcrumbs: true
  show_prev_next: true
  show_edit_link: false
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

The theme works with the built-in search plugin out of the box:

```yaml
plugins:
  - search
```

The search plugin generates a `search_index.json` that the theme's Cmd+K search modal consumes via lunr.js.

!!! tip "No extra plugins required"
    Modern does not require any third-party MkDocs plugins. The search modal, dark mode toggle, scroll spy, and mobile menu are all built into the theme itself.

# Configuration

All theme options live under the `theme:` key in your `mkdocs.yml`. Every option has a default value, so you only need to set what you want to change.

## Full example

```yaml
theme:
  name: modern
  locale: en
  color_mode: system
  color_theme: default
  navigation_depth: 3
  show_toc: true
  show_breadcrumbs: true
  show_prev_next: true
  show_edit_link: false
  show_copy_markdown: true
  show_last_updated: true
  announcement: ""
  announcement_dismissible: true
  announcement_color: ""
  logo: null
```

## Option reference

### `locale`

Sets the language for all UI strings (navigation labels, search placeholder, button text, etc.).

- **Type:** string
- **Default:** `en`
- **Supported:** `en`, `de`, `es`, `fr`, `ja`, `zh_CN`

When set to a supported language, all built-in theme strings are translated automatically. Page content is not affected — only the theme's UI chrome.

```yaml
theme:
  name: modern
  locale: de
```

To add a new language, install the optional `babel` dependency and use the i18n Makefile targets:

```bash
pip install mkdocs-modern-theme[i18n]
make i18n-init LANG=pt_BR
# Edit mkdocs_modern_theme/locales/pt_BR/LC_MESSAGES/messages.po
make i18n-compile
```

### `color_mode`

Controls the default color scheme.

| Value    | Behavior                                                 |
| -------- | -------------------------------------------------------- |
| `system` | Follows the user's operating system preference (default) |
| `light`  | Forces light mode                                        |
| `dark`   | Forces dark mode                                         |

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

### `show_feedback`

Whether to show a "Was this page helpful?" feedback widget at the bottom of each page. Readers can vote thumbs up or thumbs down, and optionally leave a comment after a negative vote.

- **Type:** boolean
- **Default:** `true`

The widget dispatches a `modern-feedback` custom event on `window` with `{ page, rating, comment }` in the detail. If Google Analytics 4 is loaded (`gtag` is available), it also fires a `page_feedback` GA4 event automatically.

Votes are stored in `localStorage` per page URL to prevent duplicate submissions.

```yaml
theme:
  name: modern
  show_feedback: false
```

### `announcement`

HTML string displayed in a banner bar above the header. Useful for version releases, breaking changes, or important notices.

- **Type:** string
- **Default:** `""` (empty — no bar shown)

The bar uses the theme's accent color as its background with white text. HTML is supported, so you can include links.

```yaml
theme:
  name: modern
  announcement: 'v2.0 is out! <a href="/changelog/">See what changed</a>'
```

### `announcement_dismissible`

Whether visitors can dismiss the announcement bar by clicking an X button.

- **Type:** boolean
- **Default:** `true`

Dismissal is persisted in `localStorage` using a hash of the announcement text. When you change the announcement text, the bar automatically reappears for all visitors — even those who dismissed the previous one.

```yaml
theme:
  name: modern
  announcement: 'New release available!'
  announcement_dismissible: false
```

### `announcement_color`

Custom background color for the announcement bar. Accepts any CSS color value.

- **Type:** string
- **Default:** `""` (empty — uses the theme accent color)

When left empty, the bar inherits `--modern-accent`. Set a custom value to override:

```yaml
theme:
  name: modern
  announcement: 'Scheduled maintenance on Friday'
  announcement_color: '#dc2626'
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

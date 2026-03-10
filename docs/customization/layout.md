# Layout

Modern uses a three-column layout on desktop: a left sidebar for navigation, a center content area, and a right panel for the table of contents. On smaller screens, the sidebar collapses into a mobile menu and the TOC is hidden.

## Layout dimensions

Four CSS custom properties control the major dimensions:

| Variable | Default | Description |
|---|---|---|
| `--modern-header-height` | `64px` | Height of the fixed header |
| `--modern-sidebar-width` | `256px` | Width of the left navigation sidebar |
| `--modern-toc-width` | `224px` | Width of the right TOC panel |
| `--modern-content-max-width` | `90rem` | Maximum width of the outer page container |

Override them in your custom CSS:

```css
:root {
  --modern-sidebar-width: 280px;
  --modern-toc-width: 200px;
  --modern-content-max-width: 80rem;
}
```

## Header

The header is fixed at the top of the viewport with a height of `--modern-header-height`. It contains:

- **Logo or site name** -- links to the home page
- **Search trigger** -- shows the keyboard shortcut hint (Ctrl+K / Cmd+K)
- **Color mode toggle** -- cycles through system, light, and dark
- **Repository link** -- shown when `repo_url` is set in `mkdocs.yml`
- **Mobile menu button** -- visible on screens below 1024px

### Customizing the logo

Set the `logo` option in `mkdocs.yml`:

```yaml
theme:
  name: modern
  logo: assets/logo.svg
```

When `logo` is `null` (the default), the site name from `site_name` is displayed as text.

## Sidebar

The sidebar is visible on screens 1024px and wider. It is sticky, scrollable, and positioned below the header. Its width is controlled by `--modern-sidebar-width`.

### Navigation depth

The `navigation_depth` option controls how many levels of nesting are shown:

```yaml
theme:
  name: modern
  navigation_depth: 2
```

With a depth of `2`, only top-level items and their immediate children appear. Deeper items are still accessible via their parent pages.

### Hiding the sidebar

There is no built-in toggle to hide the sidebar entirely, but you can collapse it with CSS:

```css
:root {
  --modern-sidebar-width: 0px;
}
```

Or hide it on specific pages using front-matter metadata and a custom CSS class.

## Table of contents

The TOC panel appears on the right side of the content area. It lists `h2` and `h3` headings from the current page with scroll-spy highlighting -- the heading closest to the top of the viewport is marked as active.

### Disabling the TOC

```yaml
theme:
  name: modern
  show_toc: false
```

This hides the TOC panel and gives the content area the full remaining width.

### Scroll-to-top button

A "Back to top" button appears in the TOC area after the user scrolls past 300px. Clicking it smooth-scrolls to the top of the page.

## Breadcrumbs

Breadcrumbs appear above the page title and reflect the current page's position in the `nav` tree.

```yaml
theme:
  name: modern
  show_breadcrumbs: true
```

Set to `false` to hide them.

## Previous / Next links

Footer navigation links appear at the bottom of each page, pointing to the previous and next pages in the `nav` order.

```yaml
theme:
  name: modern
  show_prev_next: true
```

## Mobile layout

On screens below 1024px:

- The sidebar is replaced by a slide-over mobile menu (triggered by the hamburger button in the header)
- The TOC panel is hidden
- Content fills the full width
- The mobile menu can be dismissed by pressing Escape, tapping outside, or resizing the window to desktop width

## Responsive breakpoints

The theme follows Tailwind's default breakpoints:

| Breakpoint | Width | Layout change |
|---|---|---|
| Default | < 640px | Single column, mobile menu |
| `sm` | 640px | Minor spacing adjustments |
| `md` | 768px | Minor spacing adjustments |
| `lg` | 1024px | Sidebar appears, desktop layout |
| `xl` | 1280px | TOC panel appears |

## Print styles

When printing, the header, sidebar, TOC, and search modal are hidden. The content area expands to fill the page. Links are expanded to show their `href` values inline.

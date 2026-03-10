# Getting Started

This page covers installing the theme, creating a minimal project, and running a local preview.

<div class="steps" markdown>

1. **Install the theme**

    The theme is not yet published on PyPI. Install directly from GitHub.

    === "uv (recommended)"

        ```bash
        uv add mkdocs-modern-theme@git+https://github.com/ralph089/mkdocs-modern-theme.git@v{version}
        ```

    === "pip"

        ```bash
        pip install git+https://github.com/ralph089/mkdocs-modern-theme.git@v{version}
        ```

    Replace `v{version}` with the version you want. Check the [releases page](https://github.com/ralph089/mkdocs-modern-theme/releases) for all available versions.

    !!! warning "Always pin a version"

        Install a specific release tag instead of `main`. The `main` branch may contain unreleased breaking changes.

2. **Configure mkdocs.yml**

    Create an `mkdocs.yml` at the root of your project:

    ```yaml
    site_name: My Documentation
    theme:
      name: modern
    ```

    That is the only required configuration. Every theme option has a sensible default.

3. **Add your first page**

    Create a `docs/` directory and an `index.md` inside it:

    ```markdown
    # Welcome

    This is your documentation home page.
    ```

4. **Serve locally**

    Start the development server:

    ```bash
    mkdocs serve
    ```

    Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser. MkDocs watches for file changes and reloads automatically.

5. **Build for production**

    ```bash
    mkdocs build
    ```

    The static site is written to the `site/` directory by default. Deploy it to any static hosting provider — GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a plain web server.

</div>

## Upgrading

To upgrade to a newer version, change the tag and re-run the install command:

=== "uv"

    ```bash
    uv add mkdocs-modern-theme@git+https://github.com/ralph089/mkdocs-modern-theme.git@v{version}
    ```

=== "pip"

    ```bash
    pip install --upgrade git+https://github.com/ralph089/mkdocs-modern-theme.git@v{version}
    ```

## Dependencies

Both methods pull in the required dependencies automatically:

- `mkdocs >= 1.5`
- `pymdown-extensions >= 10.0`
- `pygments >= 2.16`

## Installing from source

Clone the repository and install in editable mode:

```bash
git clone https://github.com/ralph089/mkdocs-modern-theme.git
cd mkdocs-modern-theme
pip install -e .
```

## Recommended project structure

```
my-project/
  docs/
    index.md
    getting-started.md
    guides/
      first-guide.md
    reference/
      api.md
  mkdocs.yml
```

## Adding navigation

Define a `nav` key in `mkdocs.yml` to control the sidebar order:

```yaml
nav:
  - Home: index.md
  - Getting Started: getting-started.md
  - Guides:
    - First Guide: guides/first-guide.md
  - Reference:
    - API: reference/api.md
```

If you omit `nav`, MkDocs auto-discovers pages from the `docs/` directory and sorts them alphabetically.

## Enabling extensions

Modern works best with a few Markdown extensions enabled. Add these to your `mkdocs.yml`:

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
```

See the [Extensions](extensions.md) page for a full breakdown of what each extension provides.

## Next steps

- [Configuration](configuration.md) — all theme options explained
- [Customization](customization/theming.md) — override colors, fonts, and layout
- [Content](content/admonitions.md) — admonitions, code blocks, tabs, and tables

# Deployment

Once your documentation is ready, you can deploy it to any static hosting platform. The most common option is GitHub Pages, which works automatically with the included workflow.

## GitHub Pages

This project includes a GitHub Actions workflow (`.github/workflows/docs.yml`) that builds and deploys your documentation on every push to `main`.

### Enable GitHub Pages

1. Go to your repository's **Settings > Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the workflow will build and deploy automatically

Your site will be available at `https://<username>.github.io/<repo>/`.

### Custom domain

To use a custom domain:

1. Add a `CNAME` file to your `docs/` directory containing your domain name
2. In **Settings > Pages**, enter your custom domain
3. Configure your DNS provider to point to GitHub Pages ([GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

## Other platforms

### Netlify

Create a `netlify.toml` in your repository root:

```toml
[build]
  command = "pip install -e . && mkdocs build --strict"
  publish = "site"
```

Or configure the build command in the Netlify dashboard.

### Vercel

Set the following in your Vercel project settings:

- **Build command:** `pip install -e . && mkdocs build --strict`
- **Output directory:** `site`

### Cloudflare Pages

Set the following in your Cloudflare Pages project:

- **Build command:** `pip install -e . && mkdocs build --strict`
- **Build output directory:** `site`

## Manual deployment

Run `mkdocs build` to generate a static site in the `site/` directory:

```bash
mkdocs build
```

Upload the contents of `site/` to any static file host — S3, a VPS, or even a simple web server.

## Build tips

Use `--strict` in CI to catch warnings as errors:

```bash
mkdocs build --strict
```

This ensures broken links, missing pages, and other issues fail the build rather than silently producing a broken site.

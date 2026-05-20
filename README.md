# Scapder landing page

Static landing page for Scapder / EdgeSight AI.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static server.

## GitHub Pages deployment

This repository includes a GitHub Actions workflow that deploys only the public static site files:

- `index.html`
- `styles.css`
- `script.js`
- `img/`
- `.nojekyll`

Internal documents under `docs/`, `design-spec.md`, and local metadata are intentionally excluded from the deployed artifact.

To publish:

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`; the workflow will publish the site.

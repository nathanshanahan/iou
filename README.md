# Shopify Base Theme - 2026-2

A minimal Shopify theme scaffold following OS 2.0 / Sections Everywhere best practices.

## Stack

- **Shopify CLI 3.x** — dev server, push/pull, theme check
- **Vite 5** — JS/SCSS bundling, outputs to `/assets`
- **Vanilla JS Web Components** — no framework
- **SCSS** — with modern-compiler API

## Getting Started

**First-time setup** - You need to authenticate with Shopify CLI:

```bash
npm install

# First, trigger Shopify authentication (this will prompt for login)
shopify theme dev --store bone-development-store.myshopify.com
# Exit this with Control+C after authentication is complete

# Then run the normal dev command
npm run dev -- --environment development
```

**Subsequent runs** - Once authenticated, you can use:

```bash
npm install

# Start dev (runs Shopify CLI + Vite in watch mode concurrently)
npm run dev -- --environment development
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Shopify dev server + Vite watch |
| `npm run build` | Production Vite build |
| `npm run push` | Push to production theme |
| `npm run push:staging` | Push to staging theme |
| `npm run check` | Run Theme Check linter |


## Project Structure

```
├── assets/               # Static assets + Vite output (vite-theme.js, vite-theme.css)
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
├── frontend/             # Source files (excluded from Shopify push via .shopifyignore)
│   ├── components/       # Web components (JS)
│   ├── entrypoints/
│   │   └── theme.js      # Vite entrypoint
│   └── styles/
│       ├── theme.scss    # Root import
│       ├── _tokens.scss  # CSS custom properties / Shopify settings bridge
│       ├── base/
│       ├── layout/
│       └── components/
├── layout/
│   ├── theme.liquid
│   └── password.liquid
├── locales/
│   └── en.default.json
├── sections/
│   ├── header-group.json   # Section groups (sticky header/footer in editor)
│   ├── footer-group.json
│   ├── header.liquid
│   ├── footer.liquid
│   ├── main-index.liquid
│   ├── main-product.liquid
│   ├── main-collection.liquid
│   ├── main-cart.liquid
│   ├── main-page.liquid
│   ├── main-blog.liquid
│   ├── main-article.liquid
│   ├── main-search.liquid
│   └── main-404.liquid
├── snippets/
│   ├── card-product.liquid
│   ├── pagination.liquid
│   ├── icon-cart.liquid
│   └── icon-account.liquid
├── templates/            # All JSON templates (Sections Everywhere)
│   ├── index.json
│   ├── product.json
│   ├── collection.json
│   ├── cart.json
│   ├── page.json
│   ├── blog.json
│   ├── article.json
│   ├── search.json
│   ├── 404.json
│   └── gift_card.liquid  # Must remain .liquid — Shopify requirement
├── .shopifyignore        # Excludes tooling files from theme push
├── shopify.theme.toml    # Environment config (dev / staging / production)
├── vite.config.js
└── package.json
```

## Environments

Configure your stores in `shopify.theme.toml`:

```toml
[environments.development]
store = "your-dev-store.myshopify.com"

[environments.staging]
store = "your-staging-store.myshopify.com"

[environments.production]
store = "your-production-store.myshopify.com"
```

## GitHub Integration

This theme is designed to work with the **Shopify GitHub App** for automatic deployment and sync.

### Connecting a New Repository

1. **Confirm installation of the Shopify GitHub App**: https://github.com/apps/shopify
2. **⚠️ IMPORTANT**: When connecting a new repository, **James or Thuen must approve the repository access via GitHub** before it can be connected to Shopify
3. **In Shopify Admin**: Go to **Online Store > Themes** → **Add theme** → **Connect from GitHub**
4. **Select your repository** and **branch** (typically `main`)
5. **Test the connection** by making a change in either GitHub or Shopify Admin

### Benefits

- **Automatic sync**: Changes in GitHub → Auto-deploy to Shopify
- **Bidirectional**: Changes in Shopify Admin → Auto-commit to GitHub  
- **No manual deployment**: No need for CLI authentication or manual pushes
- **Official support**: Maintained by Shopify

## Developer Notes

### Frontend Directory Structure

The `frontend/` directory contains all source files that get processed by Vite:

#### **Components** (`frontend/components/`)
- **What it contains**: Vanilla JS Web Components and reusable JavaScript modules
- **When to use**: For interactive UI elements, product forms, variant selectors, etc.
- **Example**: `product-form.js`, `variant-selector.js`

#### **Entrypoints** (`frontend/entrypoints/`)
- **What it contains**: Main Vite entry file (`theme.js`)  
- **Development**: **No need to touch this** - it's pre-configured to import everything properly

#### **JS Modules** (`frontend/js/modules/`)
- **What it contains**: Theme-related JavaScript functionality
- **How to use**: All theme JS should go here and be **included via `app.js`**
- **Examples**: `global-measurements.js`, `media.js`, `reveals.js`

#### **Styles** (`frontend/styles/`)
- **What it contains**: All SCSS files organized by purpose
- **Structure**: Base styles, components, layout, sections, helpers
- **Entry point**: `theme.scss` imports all other SCSS files

### Adding Custom Fonts

If your project requires custom fonts, follow these steps:

#### **1. Add Font Files**
- Place font files (`.woff`, `.woff2`, `.ttf`) in the `assets/` directory

#### **2. Configure Font Snippet**
Edit the `snippets/custom-fonts.liquid` file to add your fonts:

## Vite + Shopify Notes

- `emptyOutDir: false` is critical — Vite must not delete other files in `/assets`
- Vite output is committed to `/assets` so Shopify CLI can push it
- In CI, run `npm run build` before `shopify theme push`
- The `frontend/` directory is excluded from Shopify push via `.shopifyignore`

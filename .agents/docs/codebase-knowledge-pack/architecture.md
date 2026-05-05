# Architecture & Patterns

## Localization Approach
The site implements a simple directory-based localization strategy:
- English (default) pages are located at the root (`/`) and within the `/en/` directory.
- Vietnamese pages are located within the `/vi/` directory.
- Cross-linking uses standard `<a hreflang="vi">` and the language switcher is built into the navigation bar of each page.
- Pages include `<link rel="alternate" hreflang="...">` tags in the `<head>` for SEO purposes, pointing to the respective localized versions.

## Styling Architecture
- **Tailwind CSS (production build)**: Tailwind is **not** loaded from `cdn.tailwindcss.com`. Source entry is `assets/css/tailwind.source.css` (`@tailwind` layers). Configuration (custom colors, fonts, border radii, Material Design 3–style palette) lives in **`tailwind.config.js` at the repo root**, with **`@tailwindcss/forms`** and **`@tailwindcss/container-queries`**. Run **`npm run build:css`** to emit the minified **`assets/css/tailwind.build.css`**, which every page links in `<head>` before Google Fonts and **`assets/css/site.css`**. Regenerate that file after changing HTML class names or `tailwind.config.js`, then commit the updated bundle for GitHub Pages (no Node required at deploy time if the bundle is committed).
- **CSS Overrides**: `assets/css/site.css` contains custom rules and classes (e.g., `.glass-nav`, `.btn-gradient`, `.asymmetric-gradient`, mobile nav toggle helpers) that sit on top of the compiled Tailwind layer.
- **Dark Mode**: Configured with `darkMode: 'class'` in `tailwind.config.js`, though `class="light"` is often forced on the `<html>` tag currently.

## Javascript Architecture
- **Minimal dependency**: No frontend frameworks (React, Vue, etc.). The only Node-based step is optional local use of **npm** to compile Tailwind; the shipped site is plain static HTML/CSS/JS.
- **Component Interactivity**: Interactivity (like the mobile navigation menu toggle) is handled by a small IIFE (Immediately Invoked Function Expression) script in `assets/js/site.js`. It looks for `data-nav-toggle` attributes and toggles the `hidden` class on the target element defined in `aria-controls`. This pattern ensures clean global scope and declarative HTML bindings.

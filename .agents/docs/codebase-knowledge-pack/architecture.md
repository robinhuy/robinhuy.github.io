# Architecture & Patterns

## Localization Approach
The site implements a simple directory-based localization strategy:
- English (default) pages are located at the root (`/`) and within the `/en/` directory.
- Vietnamese pages are located within the `/vi/` directory.
- Cross-linking uses standard `<a hreflang="vi">` and the language switcher is built into the navigation bar of each page.
- Pages include `<link rel="alternate" hreflang="...">` tags in the `<head>` for SEO purposes, pointing to the respective localized versions.

## Styling Architecture
- **Tailwind Configuration**: Instead of a build step, Tailwind is imported via CDN script (`<script src="https://cdn.tailwindcss.com?..."></script>`). The theme configuration, including custom colors (Material Design 3 inspired color palette), fonts, and border radii, is injected via `assets/js/tailwind-config.js` which is loaded right after the CDN script.
- **CSS Overrides**: `assets/css/site.css` contains custom utility classes like `.glass-nav`, gradient backgrounds (`.btn-gradient`, `.asymmetric-gradient`), and layout specifics.
- **Dark Mode**: Configured with `darkMode: 'class'` in Tailwind, though `class="light"` is forced on the `<html>` tag currently.

## Javascript Architecture
- **Minimal Dependency**: No frontend frameworks (React, Vue) or build tools are used. This keeps the site lightweight and fast to load.
- **Component Interactivity**: Interactivity (like the mobile navigation menu toggle) is handled by a small IIFE (Immediately Invoked Function Expression) script in `assets/js/site.js`. It looks for `data-nav-toggle` attributes and toggles the `hidden` class on the target element defined in `aria-controls`. This pattern ensures clean global scope and declarative HTML bindings.

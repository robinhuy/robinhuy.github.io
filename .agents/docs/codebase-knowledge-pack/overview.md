# Silverbit Studio Landing Page - Codebase Knowledge Pack

## Overview
This is the static landing page for **Silverbit Studio**, an independent development studio creating friendly mini-apps and casual games, prominently featuring **Hidden Mind**.
The project is a lightweight, highly-optimized static HTML website with Tailwind CSS (compiled to a static file) for styling and minimal vanilla JavaScript for interaction. It features localization support (English and Vietnamese).

## Tech Stack
- **HTML5**: Semantic and accessible HTML structure.
- **Tailwind CSS (CLI build)**: Utility-first CSS compiled with the Tailwind v3 CLI; configuration in `tailwind.config.js`, with **Forms** and **Container Queries** official plugins. Pages load `assets/css/tailwind.build.css` (run `npm run build:css` after template or config changes).
- **Vanilla JavaScript**: Minimal JS (`assets/js/site.js`) used mainly for mobile navigation toggles and basic UX helpers.
- **Google Fonts & Icons**: Uses *Plus Jakarta Sans*, *Be Vietnam Pro*, and *Material Symbols Outlined*.
- **Custom CSS**: `assets/css/site.css` for rules Tailwind does not express (e.g., glassmorphism nav, gradients, nav-toggle alignment).
- **SEO & Meta**: Complete meta tags, Open Graph tags, JSON-LD structured data (Organization, WebSite, SoftwareApplication) and localized alternate links (`hreflang`).

## Key Products
- **Hidden Mind**: A casual puzzle game highlighted across the site with dedicated product and privacy policy pages.

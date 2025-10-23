# Convertaimbot Shopify Theme

This repository now contains a Shopify Online Store 2.0 theme that mirrors the original Azec Unlocks marketing site. All major layout elements have been rebuilt as modular, theme-editor friendly sections with reusable snippets and localized strings.

## Project Layout

- `layout/` & `sections/`: Liquid layout shell plus modular sections (hero, stats, product grid, testimonials, CTA, header/footer, customer/account flows, etc.).
- `templates/`: JSON templates that assemble pages with reorderable sections (`index.json`, `product.json`, `collection.json`, `cart.json`, `page.about.json`, `page.contact.json`, customer templates, and more).
- `snippets/`: Shared UI fragments (`product-card`, `price`, `pagination`, `icon`, `customer-address-form`, etc.).
- `assets/`: Theme CSS/JS (`app.css`, `app.js`) and hooks for Shopify-managed media.
- `config/settings_schema.json`: Theme/global settings for colors, fonts, socials, and collection defaults.
- `locales/en.default.json`: User-facing copy and button labels moved out of templates for translation.
- `Azec-Unlocks-back-test/`: The original Vite/React site preserved for reference (CSS/JS/markup sources when wiring final content).

> **TODO markers** in sections call out areas where original long-form copy or imagery still needs to be pasted from the legacy build.

## Getting Started

1. Install dependencies (for formatting and Shopify CLI commands):
   ```bash
   npm install
   ```
2. Log in to your store (replace with your shop domain):
   ```bash
   shopify login --store <your-store>.myshopify.com
   ```
3. Run the theme locally:
   ```bash
   npm run dev
   ```
4. Run Shopify theme check (recommended before pushing):
   ```bash
   npm run check
   ```
5. Push changes to the connected theme:
   ```bash
   npm run push
   ```
6. Format Liquid/JSON/CSS/JS:
   ```bash
   npm run format
   ```

Legacy Vite project commands are still available if you need to compare markup:
```bash
npm run legacy:dev
npm run legacy:build
```

## Theme Editor Notes

- **Header & Footer**: Configurable logos, menus, CTAs, social links, payment icons.
- **Homepage**: `index.json` loads sections in this order — hero → features → stats → product grid → testimonials → CTA. Every chunk exposes settings matching the original marketing content.
- **About & Contact**: Dedicated JSON templates (`page.about.json`, `page.contact.json`) using reusable sections (`hero`, `rich-text`, `contact-form`).
- **Products & Collections**: `main-product` handles variant selectors, add-to-cart, metafield TODO. `main-collection` adds pagination and sort controls. `product-grid` uses the selected collection with pagination and reuses the `product-card` snippet.
- **Customer Pages**: All customer flows (login, register, account, addresses, order history, password reset) are implemented as sections and JSON templates.
- **Locales**: Common UI strings are located in `locales/en.default.json`. Add/translate here instead of hardcoding Liquid.
- **Assets**: Upload hero imagery and product art via the theme editor. Sections include `TODO` placeholders that reference original files under `Azec-Unlocks-back-test/public`.

## Migration Checklist

- [ ] Move hero, carousel, testimonial, and CTA copy from the original site into the corresponding section settings.
- [ ] Upload brand imagery (logos, hero backgrounds, product renders) to the Shopify theme assets and wire them through section settings.
- [ ] Connect collections/products to the `product-grid` and product recommendation sections.
- [ ] Configure metafields (`custom.extra_details`) for product specs if needed.
- [ ] Verify navigation menus (`main-menu`, footer menus) exist in Shopify and match the expected structure.
- [ ] Set social/profile links under **Theme settings → Footer & Social**.

## Testing Matrix

Run through this checklist after wiring content:

- Home page sections can be edited, reordered, and hidden in the theme editor.
- Product/collection templates surface real catalog data and pagination.
- Add to cart, update quantity, and checkout buttons function (use Shopify preview environment).
- Cart template shows totals and renders CTA.
- Customer login/register/reset flows render and submit.
- Mobile header toggle and address form toggles work (`app.js` handles this behavior).
- `shopify theme check` reports no errors.
- `npm run format` keeps Liquid/JSON consistent.

## Additional Notes

- Any interactive experiences from the React build (carousels, countdowns, modals) should be ported as needed into new sections/snippets. Use the preserved source under `Azec-Unlocks-back-test/src/components` as reference.
- For advanced features (e.g., custom analytics, external API unlock flows), plan for a Shopify app proxy or custom app integration. Mark required hooks with `TODO` comments.
- Consider creating translated locales by duplicating `locales/en.default.json`.

Happy theme editing!

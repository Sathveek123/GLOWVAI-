# GLOW VAI Technical SEO Launch Checklist

## Production Canonical Facts
- **Production URL**: `https://glowvai.in`
- **Environment Variable**: `NEXT_PUBLIC_SITE_URL="https://glowvai.in"`
- **Strict Rule**: No em-dashes (`—`) allowed anywhere in titles, descriptions, or visible metadata strings.

---

## 1. Indexing & Metadata Audit Checklist
- [x] Single source of truth `lib/site-url.ts` enforces `SITE_URL` and `getAbsoluteUrl()`.
- [x] Fail production build if `NEXT_PUBLIC_SITE_URL` is missing.
- [x] Root layout `<html lang="en-IN">` configured.
- [x] Title template `%s | GLOW VAI` active; duplicated brand suffixes fixed.
- [x] `app/robots.ts` allows `/` in production, disallows query params (`/*?*`), `/admin/`, `/api/`, `/checkout/`, `/account/`, `/draft/`. Non-production defaults to `Disallow: /`.
- [x] `app/sitemap.ts` includes 200 OK indexable routes only with priorities and `lastModified` dates.
- [x] `siteConfig.LEGAL_APPROVED` toggles `noindex` and draft banner visibility on `/privacy` and `/terms`.
- [x] `/journal` set to `noindex, nofollow`.
- [x] Dynamic OpenGraph images using `next/og` generated for root and product pages (`/product/[slug]/opengraph-image.tsx`).
- [x] Category and Brand landing pages created (`/shop/minimalist`, `/shop/the-derma-co`, `/shop/face-serums`, `/shop/face-washes`, `/shop/sunscreen`, `/shop/moisturizers`).

---

## 2. Automated SEO Scripts
Run the following verification commands before every deployment:
```bash
npm run seo:sitemap
npm run seo:links
npm run seo:test
```

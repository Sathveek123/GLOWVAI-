# Claims and Compliance

Source of truth: `config/claims.ts`. A claim renders ONLY when `verified` is `true`.

## Rules
1. No invented ratings, review counts, customer counts, or testimonials.
2. Any score shown in marketing is labelled "Sample report". Real scores come only from the analysis engine or deterministic quiz.
3. Every scan screen shows: "Cosmetic skin insights, not medical advice. Lighting and camera quality affect results."
4. Delivery times appear only when fastDelivery is verified and the pincode is serviceable.
5. Product names must not contain unverified claim words.
6. Reviews with a "verified purchase" tag need a real order behind them.
7. Cosmetic labelling (name, ingredients, net quantity, MRP, marketer details, batch and dates, country of origin) is shown on product pages.
8. **GLOW VAI is an independent retailer of Minimalist and The Derma Co.** Never imply we make the products, and never claim an official partnership without written authorisation.
9. Prices and stock are confirmed on WhatsApp. Show "as on website" wording.
10. Keep distributor invoices to prove genuine stock.

## Claim Status at Launch
See `config/claims.ts`. Verified at launch: `freeScan`, `imageStoredPrivately`.
Everything else is hidden until proof exists.

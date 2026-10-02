# Claims and compliance

Source of truth: config/claims.ts. A claim renders only when verified is true.

## Rules
1. No invented ratings, review counts, customer counts, or testimonials.
2. Any score shown in marketing is labelled "Sample report". Real scores come only from the analysis engine.
3. Every scan screen shows: "Cosmetic skin insights, not medical advice. Lighting and camera quality affect results."
4. Delivery times appear only when fastDelivery is verified and the pincode is serviceable.
5. Product names must not contain unverified claim words (for example "Cold-Pressed"). Rename until proven.
6. Reviews with a "verified purchase" tag need a real order behind them.
7. Cosmetic labelling (name, ingredients, net quantity, MRP, marketer details, batch and dates,
   country of origin) is shown on product pages. Confirm requirements with a lawyer or
   regulatory consultant.

## Claim status at launch
See config/claims.ts. Verified at launch: freeScan, imageStoredPrivately.
Everything else is hidden until proof exists. Keep the proof file name in the proof field.

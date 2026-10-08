# Ordering: WhatsApp Now, Payments Later

Orders go through WhatsApp with reference `GV-YYMMDD-XXXX`.
`/api/order-intent` logs the basket (prices taken strictly from the catalogue layer, never the browser).

## Current Active Flow: WhatsApp Checkout
1. Product page / Cart drawer CTA: **"Order on WhatsApp"**
2. Order builder (`lib/whatsapp.ts`) constructs `wa.me` URL with reference number and line items.
3. Server receives non-blocking POST to `/api/order-intent` to store the order intent in the `OrderIntents` tab.

## Future Roadmap: Razorpay Online Payment Integration
Razorpay integration is preserved as a future phase roadmap for when online checkout opens across India.

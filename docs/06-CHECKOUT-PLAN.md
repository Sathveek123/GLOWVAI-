# Checkout plan (not built yet)

- Gateway: Razorpay (or similar). Amounts in paise.
- The browser sends product ids and quantities only. The server recomputes price, MRP, stock,
  and pincode serviceability.
- The server creates the order with an idempotency key. The client pays. The server verifies
  the HMAC signature. A webhook confirms asynchronously with a raw-body signature check.
- Orders live in a real database, not Sheets. Reserve inventory at order creation, release on failure.
- GST invoice: HSN code, CGST/SGST or IGST split, GSTIN.
- COD: separate rules (limits, confirmation call or OTP).
- Refunds: through the gateway API, logged with a reason.
- Until built, checkoutEnabled is false and the cart offers waitlist or WhatsApp ordering.

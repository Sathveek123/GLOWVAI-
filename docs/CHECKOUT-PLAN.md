# GLOW VAI Checkout & Payment Integration Plan

## Overview
This document outlines the architecture for connecting the cart system (`/lib/store/cart.ts`) to a payment gateway such as **Razorpay** or **Stripe India**.

## Server-Side Order Verification Flow

```mermaid
sequenceDiagram
    autonumber
    Client->>Server API (/api/checkout/create-order): POST Cart Items & Address
    Server API-->>Server API: Re-calculate Price & MRP from /config/products.ts
    Server API->>Razorpay API: Create Order (amount, currency INR)
    Razorpay API-->>Server API: order_id
    Server API-->>Client: order_id & amount
    Client->>Razorpay SDK: Open Payment Modal
    Razorpay SDK-->>Client: payment_id & signature
    Client->>Server API (/api/checkout/verify-payment): POST payment_id, order_id, signature
    Server API-->>Server API: Verify HMAC SHA256 Signature
    Server API->>Google Sheets / DB: Log Confirmed Order & Trigger Dispatch
```

## Security & Integrity Rules
1. **Never Trust Client Prices**: The browser sends product IDs and quantities only. The server re-fetches prices from `/lib/catalog.ts` before creating the order.
2. **HMAC Signature Verification**: Payment callbacks verify the `razorpay_signature` header using `RAZORPAY_SECRET` before marking an order as paid.
3. **Webhook Handling**: Implement `/api/webhooks/razorpay` with raw body signature verification to handle asynchronous payment confirmations.
4. **GST Invoice Compliance**: Output invoices containing HSN codes, SGST/CGST breakdown, and registered GSTIN number.

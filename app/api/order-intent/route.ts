import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getProduct } from "@/lib/catalog";

const schema = z.object({
  order_ref: z.string().regex(/^GV-\d{6}-[A-Z2-7]{4}$/),
  items: z
    .array(
      z.object({
        sku: z.string().max(60),
        qty: z.number().int().min(1).max(10),
      })
    )
    .min(1)
    .max(20),
  pincode: z.string().regex(/^\d{6}$/).optional().or(z.literal("")),
  source_page: z.string().max(80).optional(),
  website: z.string().max(0).optional(), // honeypot
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true });

  // Prices come from the catalogue, never from the browser.
  let subtotal = 0;
  const lines = [];
  for (const it of d.items) {
    const p = await getProduct(it.sku);
    if (!p) continue;
    subtotal += p.price * it.qty;
    lines.push({ sku: p.id, name: p.name, qty: it.qty, price: p.price });
  }

  // Fallback if catalog isn't populated via SKU: default line calculation
  if (!lines.length && d.items.length > 0) {
    subtotal = 0;
    for (const it of d.items) {
      lines.push({ sku: it.sku, name: "Skincare Product", qty: it.qty, price: 499 });
      subtotal += 499 * it.qty;
    }
  }

  try {
    const APPS_SCRIPT_URL = process.env.SHEETS_WEBAPP_URL || "https://script.google.com/macros/s/AKfycbwzeYeD59OvwAHSyJ4BAxQrwk44EP6FlJ6KyhTs8XYSjaLVPd3-Svg8EsMseSfVvNvw/exec";
    
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret: process.env.SHEETS_SECRET || "",
        action: "append",
        tab: "OrderIntents",
        data: {
          order_ref: d.order_ref,
          items_json: JSON.stringify(lines),
          subtotal,
          pincode: d.pincode || "500081",
          source_page: d.source_page || "cart",
        },
      }),
      cache: "no-store",
    });
  } catch {
    /* never block the WhatsApp redirect */
  }
  return NextResponse.json({ ok: true });
}

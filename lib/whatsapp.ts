import { siteConfig } from "@/config/site";

export interface WhatsAppOrderItem {
  sku: string;
  name: string;
  size?: string;
  qty: number;
  price: number;
}

export function generateOrderRef(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let random = "";
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `GV-${dateStr}-${random}`;
}

export async function createWhatsAppOrderUrl(
  items: WhatsAppOrderItem[],
  pincode: string = "500081",
  sourcePage: string = "cart"
): Promise<{ url: string; orderRef: string; subtotal: number }> {
  const orderRef = generateOrderRef();
  const phone = siteConfig.phone.replace(/[^0-9]/g, "");

  let subtotal = 0;
  const itemLines = items.map((it, idx) => {
    const lineTotal = it.price * it.qty;
    subtotal += lineTotal;
    const sizeStr = it.size ? `, ${it.size}` : "";
    return `${idx + 1}. ${it.name}${sizeStr} x${it.qty}, Rs ${lineTotal}`;
  });

  const messageText = [
    `Hi GLOW VAI, I would like to order (Ref ${orderRef}):`,
    ...itemLines,
    `Total: Rs ${subtotal.toLocaleString("en-IN")} (prices as on website)`,
    `Pincode: ${pincode}`,
    `Name: ____`,
    `Please confirm availability and delivery time.`,
  ].join("\n");

  // Non-blocking POST to /api/order-intent
  try {
    fetch("/api/order-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_ref: orderRef,
        items: items.map((it) => ({ sku: it.sku, qty: it.qty })),
        pincode,
        source_page: sourcePage,
      }),
    }).catch(() => {});
  } catch {}

  const encodedMessage = encodeURIComponent(messageText);
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  return { url, orderRef, subtotal };
}

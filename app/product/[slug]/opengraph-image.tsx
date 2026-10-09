import { ImageResponse } from "next/og";
import { getProductBySlug, getProducts } from "@/lib/catalog";
import { BRAND_NAME } from "@/config/site";

export const dynamic = "force-static";
export const alt = "Product Detail";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  const productName = product ? product.name : "Product";
  const tagline = product ? product.tagline : "Authentic Dermaceutical Skincare";
  const price = product ? `₹${product.price}` : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0F172A",
          padding: "70px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#38BDF8",
          }}
        >
          {BRAND_NAME}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#F8FAFC",
              maxWidth: 950,
            }}
          >
            {productName}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#94A3B8",
              maxWidth: 900,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "2px solid #334155",
            paddingTop: 30,
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 700, color: "#38BDF8" }}>
            {price}
          </div>
          <div style={{ fontSize: 22, color: "#64748B" }}>
            15-Minute Doorstep Delivery
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

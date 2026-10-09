import { ImageResponse } from "next/og";
import { BRAND_NAME } from "@/config/site";

export const dynamic = "force-static";
export const alt = "GLOW VAI | Skincare that starts with a face scan";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0050FF",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#93C5FD",
            marginBottom: 20,
          }}
        >
          {BRAND_NAME}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 30,
            maxWidth: 900,
          }}
        >
          Your bestie says you’re glowing. Let’s see if your skin agrees.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#DBEAFE",
            maxWidth: 800,
          }}
        >
          Scan your face in 30 seconds for an instant diagnostic & personalized routine.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

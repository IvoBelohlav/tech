import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background:
            "linear-gradient(135deg, #f7f2ea 0%, rgba(227,90,45,0.22) 18%, rgba(12,122,117,0.18) 72%, #f7f2ea 100%)",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 750, letterSpacing: -1 }}>
          {SITE.name}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 60,
            fontWeight: 820,
            letterSpacing: -2,
            lineHeight: 1.02,
            maxWidth: 1040,
            color: "#141312",
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    size
  );
}

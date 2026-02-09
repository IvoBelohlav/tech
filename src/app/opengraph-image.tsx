import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 64,
          background:
            "linear-gradient(135deg, #f7f2ea 0%, rgba(227,90,45,0.22) 18%, rgba(12,122,117,0.18) 72%, #f7f2ea 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 6,
              background: "linear-gradient(135deg, #e35a2d, #f1c04c, #0c7a75)",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            {SITE.name}
          </div>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.02,
            maxWidth: 980,
            color: "#141312",
          }}
        >
          {SITE.tagline}
        </div>

        <div style={{ marginTop: 18, fontSize: 26, color: "rgba(20,19,18,0.7)" }}>
          Industrial thermal battery for process heat and steam.
        </div>
      </div>
    ),
    size
  );
}

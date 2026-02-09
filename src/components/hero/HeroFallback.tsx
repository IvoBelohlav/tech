import styles from "./HeroVisual.module.css";

export function HeroFallback() {
  return (
    <div className={styles.fallback} aria-label="Ebrix thermal battery visual">
      <svg
        viewBox="0 0 640 420"
        width="100%"
        height="100%"
        role="img"
        aria-label="Stylized thermal battery: charge, store, deliver heat"
        style={{ maxWidth: 560 }}
      >
        <defs>
          <linearGradient id="heat" x1="0" x2="1">
            <stop offset="0" stopColor="#0c7a75" stopOpacity="0.75" />
            <stop offset="0.55" stopColor="#f1c04c" stopOpacity="0.85" />
            <stop offset="1" stopColor="#e35a2d" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="40%" r="70%">
            <stop offset="0" stopColor="#e35a2d" stopOpacity="0.3" />
            <stop offset="1" stopColor="#e35a2d" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <rect x="0" y="0" width="640" height="420" fill="transparent" />
        <circle cx="320" cy="210" r="170" fill="url(#glow)" filter="url(#soft)" />

        <g transform="translate(180 70)">
          <ellipse
            cx="140"
            cy="30"
            rx="120"
            ry="30"
            fill="rgba(20,19,18,0.08)"
          />
          <path
            d="M20,30 C20,10 260,10 260,30 L260,280 C260,320 20,320 20,280 Z"
            fill="rgba(255,255,255,0.55)"
            stroke="rgba(20,19,18,0.18)"
            strokeWidth="2"
          />
          <path
            d="M38,55 C38,35 242,35 242,55 L242,255 C242,290 38,290 38,255 Z"
            fill="url(#heat)"
            opacity="0.75"
          />
          <ellipse
            cx="140"
            cy="55"
            rx="102"
            ry="24"
            fill="rgba(255,255,255,0.18)"
          />

          <g opacity="0.75" stroke="rgba(20,19,18,0.4)" strokeWidth="2">
            <path d="M-40,90 H10" />
            <path d="M270,220 H320" />
          </g>

          <g fontFamily="var(--font-mono)" fontSize="12" fill="rgba(20,19,18,0.7)">
            <text x="-50" y="82">
              electricity-in
            </text>
            <text x="278" y="212">
              heat/steam-out
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}


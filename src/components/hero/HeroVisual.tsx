"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import styles from "./HeroVisual.module.css";
import { HeroFallback } from "./HeroFallback";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { supportsWebGL } from "@/lib/webgl";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

function shouldEnable3D() {
  if (!supportsWebGL()) return false;

  if (typeof navigator !== "undefined") {
    // Optional guardrails: avoid loading WebGL for data-saver connections.
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData) return false;
  }

  return true;
}

export function HeroVisual() {
  const reduceMotion = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    // Let the first render/paint settle before pulling in the 3D bundle.
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, options?: { timeout?: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
      setTimeout: typeof window.setTimeout;
      clearTimeout: typeof window.clearTimeout;
    };

    if (w.requestIdleCallback && w.cancelIdleCallback) {
      const handle = w.requestIdleCallback(() => setReady(true), {
        timeout: 1500,
      });
      return () => w.cancelIdleCallback?.(handle);
    }

    const handle = w.setTimeout(() => setReady(true), 600);
    return () => w.clearTimeout(handle);
  }, [reduceMotion]);

  const enable = useMemo(() => {
    if (reduceMotion) return false;
    if (failed) return false;
    if (!ready) return false;
    return shouldEnable3D();
  }, [reduceMotion, failed, ready]);

  return (
    <div className={styles.wrap}>
      {enable ? <Hero3D onFailure={() => setFailed(true)} /> : <HeroFallback />}
      <div className={styles.caption}>
        <span className={styles.dot} aria-hidden="true" />
        {enable ? "Interactive 3D (progressive)" : "Fast fallback visual"}
      </div>
    </div>
  );
}

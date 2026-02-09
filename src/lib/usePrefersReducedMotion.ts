"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mediaQuery.matches);

    apply();
    mediaQuery.addEventListener("change", apply);
    return () => mediaQuery.removeEventListener("change", apply);
  }, []);

  return reduceMotion;
}


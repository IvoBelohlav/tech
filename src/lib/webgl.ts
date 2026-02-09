export function supportsWebGL() {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext("experimental-webgl", {
        failIfMajorPerformanceCaveat: true,
      });
    return !!gl;
  } catch {
    return false;
  }
}


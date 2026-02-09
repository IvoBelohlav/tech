"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./HeroVisual.module.css";

type Hero3DProps = {
  onFailure: () => void;
};

export default function Hero3D({ onFailure }: Hero3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let visible = true;
    let animateUntil = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.0, 4.2);

    const rig = new THREE.Group();
    scene.add(rig);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));

    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(3.4, 4.2, 2.2);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x0c7a75, 0.5);
    fill.position.set(-3.8, 2.2, 0.8);
    scene.add(fill);

    // Lower-poly geometry: enough to read as "industrial cylinder" without heavy cost.
    const bodyGeo = new THREE.CylinderGeometry(0.95, 0.95, 2.2, 28, 1, true);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x141312,
      metalness: 0.12,
      roughness: 0.55,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
    });
    rig.add(new THREE.Mesh(bodyGeo, bodyMat));

    const coreGeo = new THREE.CylinderGeometry(0.74, 0.74, 2.05, 28);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xe35a2d,
      emissive: 0xe35a2d,
      emissiveIntensity: 0.4,
      metalness: 0.02,
      roughness: 0.35,
      transparent: true,
      opacity: 0.26,
    });
    rig.add(new THREE.Mesh(coreGeo, coreMat));

    const capGeo = new THREE.TorusGeometry(0.86, 0.06, 16, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xf1c04c,
      emissive: 0xf1c04c,
      emissiveIntensity: 0.12,
      metalness: 0.25,
      roughness: 0.42,
      transparent: true,
      opacity: 0.7,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.rotation.x = Math.PI / 2;
    cap.position.y = 1.07;
    rig.add(cap);

    const shadowGeo = new THREE.CircleGeometry(1.25, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.12,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.25;
    rig.add(shadow);

    const target = { x: 0.18, y: 0.55 };
    const current = { x: target.x, y: target.y };

    const schedule = () => {
      if (raf || !renderer) return;
      raf = requestAnimationFrame(frame);
    };

    const frame = (t: number) => {
      raf = 0;
      if (!renderer || !visible) return;

      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      rig.rotation.x = current.x;
      rig.rotation.y = current.y;

      // Gentle motion without a permanent render loop.
      if (t < animateUntil) {
        rig.position.y = Math.sin(t * 0.0011) * 0.04;
      } else {
        rig.position.y = 0;
      }

      renderer.render(scene, camera);

      const stillMoving =
        Math.abs(target.x - current.x) > 0.001 ||
        Math.abs(target.y - current.y) > 0.001 ||
        t < animateUntil;

      if (stillMoving) schedule();
    };

    const nudgeAnimation = (ms: number) => {
      animateUntil = Math.max(animateUntil, performance.now() + ms);
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      target.y = (px - 0.5) * 1.2;
      target.x = (0.5 - py) * 0.9 + 0.18;
      nudgeAnimation(900);
    };

    host.addEventListener("pointermove", onPointerMove, { passive: true });

    const updateSize = () => {
      const { width, height } = host.getBoundingClientRect();
      const dpr = Math.min(1.25, window.devicePixelRatio || 1);
      camera.aspect = Math.max(1e-6, width) / Math.max(1e-6, height);
      camera.updateProjectionMatrix();
      renderer?.setPixelRatio(dpr);
      renderer?.setSize(width, height, false);
      schedule();
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        visible = entry?.isIntersecting ?? true;
        if (visible) nudgeAnimation(1200);
      },
      { root: null, threshold: 0.2 }
    );
    io.observe(host);

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      onFailure();
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    host.appendChild(renderer.domElement);

    resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(host);
    updateSize();
    nudgeAnimation(1400);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      resizeObserver?.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      if (renderer?.domElement?.parentNode === host) host.removeChild(renderer.domElement);

      bodyGeo.dispose();
      bodyMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      capGeo.dispose();
      capMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      renderer?.dispose();
      renderer = null;
      resizeObserver = null;
    };
  }, [onFailure]);

  return <div ref={hostRef} className={styles.canvas} aria-hidden="true" />;
}


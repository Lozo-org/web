"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function disposeScene(scene: THREE.Object3D) {
  scene.traverse((child) => {
    const node = child as THREE.Object3D & {
      geometry?: THREE.BufferGeometry;
      material?: THREE.Material | THREE.Material[];
    };
    node.geometry?.dispose();
    const material = node.material;
    if (Array.isArray(material)) material.forEach((item) => item.dispose());
    else material?.dispose();
  });
}

/** Draggable monochrome 3D object (drag to rotate, inertia, pauses off-screen). */
export function Object3D({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const el = canvas;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = reduceQuery.matches;
    let raf = 0;
    let running = false;
    let inView = true;
    let previous = performance.now();
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const velocity = { x: 0, y: 0 };
    const rot = { x: 0.32, y: 0.4 };

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    scene.add(new THREE.AmbientLight("#ffffff", 0.5));
    const keyLight = new THREE.DirectionalLight("#ffffff", 1.3);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight("#ffffff", 0.5);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const group = new THREE.Group();
    scene.add(group);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 1),
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        wireframe: true,
        transparent: true,
        opacity: 0.24,
      }),
    );
    group.add(wire);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.0, 0),
      new THREE.MeshStandardMaterial({
        color: "#0c0c10",
        metalness: 0.7,
        roughness: 0.3,
        emissive: "#1a1a1f",
        emissiveIntensity: 0.4,
      }),
    );
    const coreEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(core.geometry, 1),
      new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.7 }),
    );
    core.add(coreEdges);
    group.add(core);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.01, 16, 180),
      new THREE.MeshStandardMaterial({ color: "#ffffff", transparent: true, opacity: 0.5 }),
    );
    ring.rotation.set(Math.PI / 2.3, 0.2, 0);
    group.add(ring);

    function resize() {
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (reduceMotion) renderer.render(scene, camera);
    }

    function frame(time: number) {
      const delta = Math.min((time - previous) / 1000, 0.05);
      previous = time;
      if (!dragging) {
        if (!reduceMotion) rot.y += delta * 0.3;
        rot.x += velocity.x;
        rot.y += velocity.y;
        velocity.x *= 0.92;
        velocity.y *= 0.92;
      }
      group.rotation.x = rot.x;
      group.rotation.y = rot.y;
      renderer.render(scene, camera);
      if (running) raf = window.requestAnimationFrame(frame);
    }

    function start() {
      if (reduceMotion) {
        renderer.render(scene, camera);
        return;
      }
      if (running) return;
      running = true;
      previous = performance.now();
      raf = window.requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    }

    function onDown(event: PointerEvent) {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      velocity.x = 0;
      velocity.y = 0;
      el.setPointerCapture(event.pointerId);
    }
    function onMove(event: PointerEvent) {
      if (!dragging) return;
      const dx = (event.clientX - lastX) / 200;
      const dy = (event.clientY - lastY) / 200;
      rot.y += dx;
      rot.x += dy;
      velocity.y = dx;
      velocity.x = dy;
      lastX = event.clientX;
      lastY = event.clientY;
      if (reduceMotion || !running) {
        group.rotation.x = rot.x;
        group.rotation.y = rot.y;
        renderer.render(scene, camera);
      }
    }
    function onUp(event: PointerEvent) {
      dragging = false;
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        inView = entry?.isIntersecting ?? true;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    function onVisibility() {
      if (document.hidden) stop();
      else if (inView) start();
    }
    function onReduceChange(event: MediaQueryListEvent) {
      reduceMotion = event.matches;
      if (reduceMotion) {
        stop();
        renderer.render(scene, camera);
      } else if (inView && !document.hidden) {
        start();
      }
    }

    resize();
    renderer.render(scene, camera);
    window.addEventListener("resize", resize);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("visibilitychange", onVisibility);
    reduceQuery.addEventListener("change", onReduceChange);
    observer.observe(el);
    start();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceQuery.removeEventListener("change", onReduceChange);
      disposeScene(scene);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ touchAction: "none", cursor: "grab" }}
      role="img"
      aria-label="Objet 3D interactif — glisse pour le faire tourner"
    />
  );
}

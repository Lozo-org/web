"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function addEdges(mesh: THREE.Mesh, color = "#ffffff") {
  const geometry = new THREE.EdgesGeometry(mesh.geometry, 12);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.68,
  });
  const edges = new THREE.LineSegments(geometry, material);
  mesh.add(edges);
  return edges;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
      child.geometry?.dispose();
      const material = child.material;
      if (Array.isArray(material)) material.forEach((item) => item.dispose());
      else material?.dispose();
    }
  });
}

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = reduceMotionQuery.matches;
    let animationFrame = 0;
    let previousTime = performance.now();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    scene.add(new THREE.AmbientLight("#ffffff", 0.42));
    const keyLight = new THREE.DirectionalLight("#ffffff", 1.24);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight("#f6f6f7", 0.45);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    const group = new THREE.Group();
    group.position.set(2.2, 0.08, 0);
    group.rotation.set(0.22, -0.5, 0.08);
    scene.add(group);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 2),
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        wireframe: true,
        transparent: true,
        opacity: 0.22,
        roughness: 0.2,
      }),
    );
    group.add(wire);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.68,
    });
    const smokeRingMaterial = new THREE.MeshStandardMaterial({
      color: "#8f8f96",
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.011, 16, 160), ringMaterial);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const smokeRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.14, 0.008, 16, 160),
      smokeRingMaterial,
    );
    smokeRing.rotation.set(0.88, 0.28, 0.46);
    group.add(smokeRing);

    const silver = new THREE.MeshStandardMaterial({
      color: "#f6f6f7",
      metalness: 0.72,
      roughness: 0.24,
      envMapIntensity: 0.8,
    });

    const bars: THREE.Mesh[] = [
      new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), silver),
      new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), silver),
      new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), silver),
    ];
    bars[0].position.set(-0.36, 0, 0.08);
    bars[0].scale.set(0.18, 1.2, 0.16);
    bars[1].position.set(0.32, 0.46, 0.08);
    bars[1].scale.set(0.86, 0.16, 0.16);
    bars[2].position.set(0.52, -0.04, 0.08);
    bars[2].rotation.z = -0.32;
    bars[2].scale.set(0.16, 1.12, 0.16);
    bars.forEach((bar) => {
      addEdges(bar);
      group.add(bar);
    });

    const panels = [0, 1, 2].map((item) => {
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.56, 0.86, 0.025),
        new THREE.MeshStandardMaterial({
          color: item === 1 ? "#f8f8f8" : "#111113",
          emissive: item === 1 ? "#ffffff" : "#000000",
          emissiveIntensity: item === 1 ? 0.12 : 0,
          metalness: 0.28,
          roughness: 0.42,
          transparent: true,
          opacity: 0.62,
        }),
      );
      panel.position.set(1.7 + 1.15 + (item - 1) * 0.74, -0.55 + item * 0.26, -1.35 - item * 0.18);
      panel.rotation.set(0.16, -0.55, 0.04);
      addEdges(panel, item === 1 ? "#ffffff" : "#5f5f66");
      scene.add(panel);
      return panel;
    });

    function resize() {
      const rect = canvasElement.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function scrollProgress() {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      return Math.min(Math.max(window.scrollY / max, 0), 1);
    }

    function renderFrame(time: number) {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const p = reduceMotion ? 0 : Math.min(scrollProgress() * 2.2, 1);

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, p * -0.55, 0.045);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, p * 0.22, 0.045);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6 - p * 1.1, 0.045);
      camera.lookAt(0.7 - p * 0.8, 0, 0);

      group.position.x = THREE.MathUtils.lerp(group.position.x, 2.2 - p * 1.2, 0.055);
      group.position.y = THREE.MathUtils.lerp(group.position.y, 0.08 + p * 0.18, 0.055);
      group.position.z = THREE.MathUtils.lerp(group.position.z, p * 0.5, 0.055);
      group.rotation.y += reduceMotion ? 0 : delta * (0.34 + p * 0.44);
      group.rotation.x = 0.22 + Math.sin(time * 0.00042) * 0.08 + p * 0.18;
      group.rotation.z = 0.08 - p * 0.1;
      group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, 1.05 + p * 0.22, 0.05));

      panels.forEach((panel, index) => {
        const offset = index - 1;
        panel.rotation.y = -0.55 + p * 0.55 + Math.sin(time * 0.00036 + index) * 0.025;
        panel.position.z = -1.35 - index * 0.18 + p * 0.7;
        panel.position.x = 1.7 + 1.15 + offset * 0.74 - p * 0.22;
      });

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(renderFrame);
    }

    function handleMotionChange(event: MediaQueryListEvent) {
      reduceMotion = event.matches;
    }

    resize();
    renderer.render(scene, camera);
    window.addEventListener("resize", resize);
    reduceMotionQuery.addEventListener("change", handleMotionChange);
    animationFrame = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      reduceMotionQuery.removeEventListener("change", handleMotionChange);
      disposeObject(scene);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AmbientNetwork3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root group for all networking objects
    const group = new THREE.Group();
    scene.add(group);

    // Colors: Black, white, warm amber (#E5A93C). Zero blue/purple.
    const amberColor = new THREE.Color(0xe5a93c);
    const whiteColor = new THREE.Color(0xf0f0f0);
    const darkGrayColor = new THREE.Color(0x2a2a2a);

    // 1. Outer Torus Ring (Interlocking network orbit 1)
    const torusGeom1 = new THREE.TorusGeometry(1.6, 0.035, 16, 64);
    const torusMat1 = new THREE.MeshStandardMaterial({
      color: darkGrayColor,
      roughness: 0.3,
      metalness: 0.85,
    });
    const torusMesh1 = new THREE.Mesh(torusGeom1, torusMat1);
    group.add(torusMesh1);

    // 2. Inner Orthogonal Torus Ring (Interlocking orbit 2)
    const torusGeom2 = new THREE.TorusGeometry(1.3, 0.03, 16, 64);
    const torusMat2 = new THREE.MeshStandardMaterial({
      color: amberColor,
      roughness: 0.2,
      metalness: 0.9,
    });
    const torusMesh2 = new THREE.Mesh(torusGeom2, torusMat2);
    torusMesh2.rotation.x = Math.PI / 2.3;
    torusMesh2.rotation.y = Math.PI / 5;
    group.add(torusMesh2);

    // 3. Central Node (Core synergy hub)
    const centerGeom = new THREE.IcosahedronGeometry(0.45, 1);
    const centerMat = new THREE.MeshStandardMaterial({
      color: whiteColor,
      roughness: 0.1,
      metalness: 0.95,
      wireframe: true,
    });
    const centerMesh = new THREE.Mesh(centerGeom, centerMat);
    group.add(centerMesh);

    // 4. Orbiting Network Nodes (representing connected professionals)
    const nodeCount = 5;
    const nodes: THREE.Mesh[] = [];
    const nodeGeom = new THREE.SphereGeometry(0.08, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: amberColor,
      emissive: amberColor,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      node.position.x = Math.cos(angle) * 1.6;
      node.position.y = Math.sin(angle) * 1.6;
      torusMesh1.add(node);
      nodes.push(node);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe5a93c, 2.5, 10);
    pointLight1.position.set(2, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1.2, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    // Animation Loop with Reduced Motion & Visibility optimizations
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If reduced motion is preferred, render a single aesthetic static frame without animation loop
    if (prefersReducedMotion) {
      group.rotation.y = 0.5;
      group.rotation.x = 0.2;
      renderer.render(scene, camera);
    } else {
      let isVisible = true;

      const animate = () => {
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Continuous gentle rotation evocative of a slow-turning professional network
        group.rotation.y = elapsedTime * 0.15;
        group.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2;
        group.rotation.z = Math.cos(elapsedTime * 0.12) * 0.15;

        // Subtle counter-rotation on inner elements
        centerMesh.rotation.y = -elapsedTime * 0.3;
        centerMesh.rotation.x = elapsedTime * 0.2;

        torusMesh2.rotation.z = elapsedTime * 0.1;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      const handleVisibilityChange = () => {
        if (document.hidden) {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        } else {
          isVisible = true;
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      animate();

      var cleanupVisibility = () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (cleanupVisibility) cleanupVisibility();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      torusGeom1.dispose();
      torusGeom2.dispose();
      centerGeom.dispose();
      nodeGeom.dispose();
      torusMat1.dispose();
      torusMat2.dispose();
      centerMat.dispose();
      nodeMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute -top-12 -right-8 sm:top-2 sm:right-6 md:right-16 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 opacity-25 hover:opacity-40 transition-opacity duration-700 z-0"
      ref={mountRef}
    />
  );
}

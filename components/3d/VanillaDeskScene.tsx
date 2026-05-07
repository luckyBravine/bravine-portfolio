'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function VanillaDeskScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Transparent background so the gradient shows through
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 6);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none'; // Allow clicks to pass through
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Desk
    const deskGeometry = new THREE.BoxGeometry(6, 0.2, 3);
    const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.set(0, 0, 0);
    desk.receiveShadow = true;
    scene.add(desk);

    // Monitor
    const monitorGroup = new THREE.Group();
    
    // Monitor stand
    const standGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8);
    const standMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(0, -0.5, 0);
    monitorGroup.add(stand);

    // Monitor screen
    const screenGeometry = new THREE.BoxGeometry(1.6, 1.2, 0.08);
    const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.castShadow = true;
    monitorGroup.add(screen);

    // Screen content (glowing)
    const contentGeometry = new THREE.PlaneGeometry(1.5, 1.1);
    const contentMaterial = new THREE.MeshBasicMaterial({
      color: 0x003300,
      emissive: 0x00ff00,
      emissiveIntensity: 0.3,
    });
    const content = new THREE.Mesh(contentGeometry, contentMaterial);
    content.position.z = 0.05;
    monitorGroup.add(content);

    monitorGroup.position.set(-1.5, 1.2, -0.5);
    scene.add(monitorGroup);

    // Laptop
    const laptopGroup = new THREE.Group();

    // Laptop base
    const laptopBaseGeometry = new THREE.BoxGeometry(1.2, 0.04, 0.8);
    const laptopBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    const laptopBase = new THREE.Mesh(laptopBaseGeometry, laptopBaseMaterial);
    laptopGroup.add(laptopBase);

    // Laptop screen
    const laptopScreenGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.04);
    const laptopScreenMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const laptopScreen = new THREE.Mesh(laptopScreenGeometry, laptopScreenMaterial);
    laptopScreen.position.set(0, 0.5, -0.3);
    laptopScreen.rotation.x = -0.2;
    laptopScreen.castShadow = true;
    laptopGroup.add(laptopScreen);

    // Laptop screen content
    const laptopContentGeometry = new THREE.PlaneGeometry(1.1, 0.7);
    const laptopContentMaterial = new THREE.MeshBasicMaterial({
      color: 0x001a33,
      emissive: 0x0088ff,
      emissiveIntensity: 0.3,
    });
    const laptopContent = new THREE.Mesh(laptopContentGeometry, laptopContentMaterial);
    laptopContent.position.set(0, 0.5, -0.28);
    laptopContent.rotation.x = -0.2;
    laptopGroup.add(laptopContent);

    laptopGroup.position.set(1.5, 0.3, 0.5);
    laptopGroup.rotation.y = -0.3;
    scene.add(laptopGroup);

    // Desk Lamp with flickering light
    const lampGroup = new THREE.Group();

    const lampBaseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.08);
    const lampBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
    lampBase.position.set(0, -0.5, 0);
    lampGroup.add(lampBase);

    const lampArmGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.8);
    const lampArmMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const lampArm = new THREE.Mesh(lampArmGeometry, lampArmMaterial);
    lampArm.rotation.z = 0.4;
    lampGroup.add(lampArm);

    const lampHeadGeometry = new THREE.ConeGeometry(0.15, 0.25, 8);
    const lampHeadMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      emissive: 0xff8800,
      emissiveIntensity: 0.5,
    });
    const lampHead = new THREE.Mesh(lampHeadGeometry, lampHeadMaterial);
    lampHead.position.set(0.4, 0.4, 0);
    lampHead.rotation.z = -0.4;
    lampGroup.add(lampHead);

    const lampLight = new THREE.PointLight(0xffaa44, 3, 5);
    lampLight.position.set(0.4, 0.4, 0);
    lampLight.castShadow = true;
    lampGroup.add(lampLight);

    lampGroup.position.set(-2.5, 0.5, 0.8);
    scene.add(lampGroup);

    // Plants
    const createPlant = (x: number, z: number) => {
      const plantGroup = new THREE.Group();

      const potGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.3);
      const potMaterial = new THREE.MeshStandardMaterial({ color: 0x8b7355 });
      const pot = new THREE.Mesh(potGeometry, potMaterial);
      pot.position.y = -0.2;
      plantGroup.add(pot);

      const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x2d5016 });
      for (let i = 0; i < 5; i++) {
        const leafGeometry = new THREE.SphereGeometry(0.12, 8, 8);
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        const angle = (i / 5) * Math.PI * 2;
        leaf.position.set(
          Math.cos(angle) * 0.12,
          0.05 + i * 0.08,
          Math.sin(angle) * 0.12
        );
        plantGroup.add(leaf);
      }

      plantGroup.position.set(x, 0.3, z);
      return plantGroup;
    };

    scene.add(createPlant(-2.8, -1));
    scene.add(createPlant(2.8, -1));

    // Coffee mug
    const mugGroup = new THREE.Group();
    const mugGeometry = new THREE.CylinderGeometry(0.12, 0.1, 0.2);
    const mugMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mug = new THREE.Mesh(mugGeometry, mugMaterial);
    mugGroup.add(mug);

    const handleGeometry = new THREE.TorusGeometry(0.06, 0.015, 8, 16);
    const handle = new THREE.Mesh(handleGeometry, mugMaterial);
    handle.position.x = 0.15;
    handle.rotation.y = Math.PI / 2;
    mugGroup.add(handle);

    const coffeeGeometry = new THREE.CylinderGeometry(0.11, 0.11, 0.04);
    const coffeeMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2817 });
    const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
    coffee.position.y = 0.08;
    mugGroup.add(coffee);

    mugGroup.position.set(0.8, 0.15, 1.2);
    scene.add(mugGroup);

    // Keyboard
    const keyboardGeometry = new THREE.BoxGeometry(1, 0.04, 0.35);
    const keyboardMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0.3, 0.12, 0.9);
    keyboard.rotation.x = -0.05;
    scene.add(keyboard);

    // Mouse
    const mouseGeometry = new THREE.BoxGeometry(0.15, 0.06, 0.25);
    const mouseMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.position.set(2, 0.13, 0.8);
    mouse.rotation.y = -0.3;
    scene.add(mouse);

    // Books
    const booksGroup = new THREE.Group();
    const bookColors = [0x8b0000, 0x00008b, 0x006400];
    bookColors.forEach((color, i) => {
      const bookGeometry = new THREE.BoxGeometry(0.5 - i * 0.05, 0.06, 0.35 - i * 0.04);
      const bookMaterial = new THREE.MeshStandardMaterial({ color });
      const book = new THREE.Mesh(bookGeometry, bookMaterial);
      book.position.y = i * 0.06;
      booksGroup.add(book);
    });
    booksGroup.position.set(-2, 0.2, -0.8);
    scene.add(booksGroup);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      // Flickering lamp
      lampLight.intensity = 3 + Math.sin(time * 10) * 0.3 + Math.random() * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}

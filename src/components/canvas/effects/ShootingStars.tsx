import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points } from '@react-three/drei';

const SHOOTING_STAR_COUNT = 4; // Reduced from 8
const MAX_TRAIL_LENGTH = 35;
const SPAWN_INTERVAL = 8; // Increased from 4 for more sparse timing

interface ShootingStar {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  active: boolean;
  trail: THREE.Vector3[];
  timeToSpawn: number;
  color: THREE.Color;
  size: number;
}

const STAR_COLORS = [
  new THREE.Color('#ffffff').multiplyScalar(1.5), // Bright white
  new THREE.Color('#00ffff').multiplyScalar(1.2), // Cyan
  new THREE.Color('#fffacd').multiplyScalar(1.3), // Light yellow
  new THREE.Color('#87cefa').multiplyScalar(1.2), // Light blue
];

export default function ShootingStars() {
  const shootingStarsRef = useRef<ShootingStar[]>();
  const pointsRef = useRef<THREE.Points | null>(null);
  
  // Initialize shooting stars
  if (!shootingStarsRef.current) {
    shootingStarsRef.current = Array(SHOOTING_STAR_COUNT).fill(null).map(() => ({
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      active: false,
      trail: [],
      timeToSpawn: Math.random() * SPAWN_INTERVAL,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      size: 0.5 + Math.random() * 0.5
    }));
  }

  // Create geometries for head and trail
  const trailGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const trailMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      attribute float alpha;
      varying float vAlpha;
      void main() {
        vAlpha = alpha;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);

  // Particle material for the star head
  const particleMaterial = useMemo(() => new THREE.PointsMaterial({
    size: 2,
    map: new THREE.TextureLoader().load('/star.png'), // Make sure to add a star texture
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true
  }), []);

  // Spawn a new shooting star
  const spawnShootingStar = (star: ShootingStar) => {
    // Spawn further away from camera
    star.position.set(
      (Math.random() - 0.5) * 400, // Increased spread
      150 + Math.random() * 150,   // Higher spawn point
      -200 - Math.random() * 200   // Always spawn behind camera
    );
    
    // Adjust velocity for more distant trajectories
    const angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25; // Limited angle range
    const speed = 6 + Math.random() * 3;
    star.velocity.set(
      Math.cos(angle) * speed,
      -3 - Math.random() * 2,      // Slower vertical descent
      Math.sin(angle) * speed * 0.5 // Reduced Z velocity
    );
    
    star.active = true;
    star.trail = [star.position.clone()];
    star.timeToSpawn = SPAWN_INTERVAL + Math.random() * 4; // More random spawn timing
    star.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    star.size = 0.5 + Math.random() * 0.5;
  };

  useFrame((state, delta) => {
    if (!shootingStarsRef.current) return;

    const positions: number[] = [];
    const colors: number[] = [];
    const alphas: number[] = [];
    const particlePositions: number[] = [];
    const particleColors: number[] = [];
    
    shootingStarsRef.current.forEach(star => {
      if (!star.active) {
        star.timeToSpawn -= delta;
        if (star.timeToSpawn <= 0) {
          spawnShootingStar(star);
        }
        return;
      }

      // Update position with acceleration
      star.velocity.y -= delta * 2; // Add gravity effect
      star.position.add(star.velocity.clone().multiplyScalar(delta * 20));
      
      // Add new position to trail
      star.trail.push(star.position.clone());
      if (star.trail.length > MAX_TRAIL_LENGTH) {
        star.trail.shift();
      }

      // Add trail positions and colors with fade
      star.trail.forEach((pos, i) => {
        positions.push(pos.x, pos.y, pos.z);
        const alpha = (i / star.trail.length) * 0.6;
        alphas.push(alpha);
        colors.push(star.color.r, star.color.g, star.color.b);
      });

      // Add particle for star head
      if (star.active) {
        particlePositions.push(star.position.x, star.position.y, star.position.z);
        particleColors.push(star.color.r, star.color.g, star.color.b);
      }

      // Check if star should be deactivated
      if (star.position.y < -100) {
        star.active = false;
        star.trail = [];
        star.timeToSpawn = Math.random() * SPAWN_INTERVAL;
      }
    });

    // Update trail geometry
    trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    trailGeometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1));
    trailGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Update particle geometry
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));

    if (pointsRef.current) {
      pointsRef.current.geometry = particleGeometry;
    }

    // Update shader time
    trailMaterial.uniforms.time.value += delta;
  });

  return (
    <>
      <primitive object={new THREE.LineSegments(trailGeometry, trailMaterial)} />
      <points ref={pointsRef} material={particleMaterial} />
    </>
  );
} 
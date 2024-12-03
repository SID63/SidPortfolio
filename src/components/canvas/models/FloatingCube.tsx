import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import StandardMaterial from '../materials/StandardMaterial';

type Props = {
  position: [number, number, number]
  scrollProgress: number
}

export default function FloatingCube({ position, scrollProgress }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Use delta time for smooth animations
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <StandardMaterial color="#8b5cf6" />
    </mesh>
  );
}
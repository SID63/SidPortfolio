import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function FloatingCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
    
    // Add floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}
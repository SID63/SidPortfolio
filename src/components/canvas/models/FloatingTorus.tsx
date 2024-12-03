import { useRef } from 'react';
import { Mesh } from 'three';
import { useAnimationFrame } from '../../../hooks/useAnimationFrame';
import StandardMaterial from '../materials/StandardMaterial';
import React from 'react';

type Props = {
  position: [number, number, number]
  scrollProgress: number
}

export default function FloatingTorus({ position, scrollProgress }: Props) {
  const meshRef = useRef<Mesh>(null);

  useAnimationFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = scrollProgress * Math.PI * 2;
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.7, 0.2, 16, 32]} />
      <StandardMaterial color="#3b82f6" />
    </mesh>
  );
}
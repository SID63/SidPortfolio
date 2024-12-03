import { useRef } from 'react';
import { Mesh } from 'three';
import { useAnimationFrame } from '../../../hooks/useAnimationFrame';
import StandardMaterial from '../materials/StandardMaterial';

type Props = {
  position: [number, number, number]
  scrollProgress: number
}

export default function FloatingSphere({ position, scrollProgress }: Props) {
  const meshRef = useRef<Mesh>(null);

  useAnimationFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = scrollProgress * Math.PI * 2;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <StandardMaterial color="#ec4899" />
    </mesh>
  );
}
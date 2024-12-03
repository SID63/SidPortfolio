import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export default function CarModel({ position, scale = 2.5, rotation = [0, 0, 0] }: Props) {
  const { scene } = useGLTF("/nissan_skyline_r34_gt-r/scene.gltf");
  const modelRef = useRef<THREE.Group>(null);
  
  // More rigid, mechanical rotation
  useAnimationFrame((state, delta) => {
    if (!modelRef.current) return;
    // Slower, more deliberate rotation
    modelRef.current.rotation.y += delta * 0.15;
    // Smaller oscillation for weight simulation
    const hover = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    modelRef.current.position.y = position[1] + hover;
  });

  return (
    <primitive 
      ref={modelRef}
      object={scene.clone()} 
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

useGLTF.preload("/nissan_skyline_r34_gt-r/scene.gltf"); 
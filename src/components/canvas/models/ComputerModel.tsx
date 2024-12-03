import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export default function ComputerModel({ position, scale = 8, rotation = [0, 0, 0] }: Props) {
  const { scene } = useGLTF("/retro_computer_setup_free/scene.gltf");
  const modelRef = useRef<THREE.Group>(null);

  // More rigid, mechanical movement
  useAnimationFrame((state, delta) => {
    if (!modelRef.current) return;
    // Slower rotation for heavier feel
    modelRef.current.rotation.y += delta * 0.1;
    // Minimal vertical movement
    const hover = Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
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

useGLTF.preload("/retro_computer_setup_free/scene.gltf"); 
import React, { useRef, useEffect } from 'react';
import { Stars, Float, Preload } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CarModel from './models/CarModel';
import ComputerModel from './models/ComputerModel';
import SceneLighting from './SceneLighting';
import ShootingStars from './effects/ShootingStars';
import CollisionBoundary from './effects/CollisionBoundary';

type Props = {
  scrollProgress: number;
}

const SceneObjects = React.memo<Props>(({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { gl, scene, camera } = useThree();
  const lastSafePosition = useRef(new THREE.Vector3(0, 0, 8));

  useEffect(() => {
    if (gl && scene) {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      gl.setClearColor(0x000000, 1);
      scene.fog = new THREE.FogExp2(0x000000, 0.001);
    }
  }, [gl, scene]);

  useFrame(() => {
    const colliders = scene.children.filter(child => child.userData.isCollider);
    let collision = false;

    colliders.forEach(collider => {
      const box = new THREE.Box3().setFromObject(collider);
      if (box.containsPoint(camera.position)) {
        collision = true;
      }
    });

    if (collision) {
      camera.position.copy(lastSafePosition.current);
    } else {
      lastSafePosition.current.copy(camera.position);
    }
  });

  return (
    <>
      <SceneLighting />
      <CollisionBoundary 
        position={[4, 0, 0]} 
        size={[4, 3, 6]}
      />
      <CollisionBoundary 
        position={[-4, 0, 0]} 
        size={[4, 3, 4]}
      />
      
      <group renderOrder={-2}>
        <ShootingStars />
      </group>

      <group renderOrder={-1}>
        <Stars 
          radius={120}
          depth={60}
          count={7000}
          factor={6}
          saturation={1}
          fade
          speed={0.3}
        />
      </group>

      <Stars 
        radius={80}
        depth={40}
        count={3000}
        factor={5}
        saturation={0.8}
        fade
        speed={0.6}
      />

      <Stars 
        radius={50}
        depth={30}
        count={1500}
        factor={4}
        saturation={0.5}
        fade
        speed={1}
      />

      <Float
        speed={0.5}
        rotationIntensity={0.2}
        floatIntensity={0.2}
      >
        <group ref={groupRef}>
          <CarModel 
            position={[4, -1, 0]}
            scale={2.5}
            rotation={[0, -Math.PI / 3, 0]}
          />
          <ComputerModel 
            position={[-4, -1, 0]}
            scale={0.04}
            rotation={[0, Math.PI / 3, 0]}
          />
        </group>
      </Float>
      <Preload all />
    </>
  );
});

SceneObjects.displayName = 'SceneObjects';

export default SceneObjects;
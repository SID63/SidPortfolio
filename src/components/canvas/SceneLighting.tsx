import React from 'react';
import * as THREE from 'three';

const SceneLighting = React.memo(() => {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.4} />

      {/* Main directional light */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-near={0.1}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />

      {/* Car-specific lighting */}
      <spotLight
        position={[4, 4, 4]}
        angle={Math.PI / 3}
        penumbra={0.1}
        intensity={3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Rim light for the car */}
      <spotLight
        position={[6, 2, -4]}
        angle={Math.PI / 3}
        penumbra={0.2}
        intensity={2}
        color="#add8e6"
        castShadow={false}
      />

      {/* Fill light for car details */}
      <pointLight 
        position={[2, -2, 4]}
        intensity={1} 
        color="#ffffff"
        distance={8}
        decay={2}
      />

      {/* Accent lights */}
      <pointLight 
        position={[-10, -10, -5]} 
        intensity={0.4} 
        color="#ff3366"
        distance={100}
        decay={2}
      />
      <pointLight 
        position={[10, -10, 5]} 
        intensity={0.4} 
        color="#3366ff"
        distance={100}
        decay={2}
      />

      {/* Hemisphere light for natural ambient */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#000000"
        intensity={0.4}
      />
    </>
  );
});

SceneLighting.displayName = 'SceneLighting';

export default SceneLighting;
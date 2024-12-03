import React from 'react';
import * as THREE from 'three';

type Props = {
  position: [number, number, number];
  size: [number, number, number];
}

export default function CollisionBoundary({ position, size }: Props) {
  return (
    <mesh position={position} userData={{ isCollider: true }} visible={false}>
      <boxGeometry args={size} />
      <meshBasicMaterial wireframe />
    </mesh>
  );
} 
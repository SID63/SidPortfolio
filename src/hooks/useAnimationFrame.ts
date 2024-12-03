import { useFrame } from '@react-three/fiber';
import { RootState } from '@react-three/fiber';
import { useCallback } from 'react';

type AnimationCallback = (state: RootState, delta: number) => void;

export function useAnimationFrame(callback: AnimationCallback) {
  const memoizedCallback = useCallback(callback, [callback]);

  useFrame((state, delta) => {
    try {
      memoizedCallback(state, delta);
    } catch (error) {
      console.error('Animation frame error:', error);
    }
  });
}
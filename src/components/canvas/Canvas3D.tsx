import { useCallback, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import SceneObjects from './SceneObjects';
import LoadingScreen from '../ui/LoadingScreen';
import FallbackContent from '../ui/FallbackContent';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';

const THROTTLE_DELAY = 25;
const LERP_FACTOR = 0.1;

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastRun = 0;
  return function(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func.apply(this, args);
      lastRun = now;
    }
  };
}

interface Canvas3DProps {
  className?: string;
}

export default function Canvas3D({ className }: Canvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafIdRef = useRef<number>();
  const animationFrameRef = useRef<number>();
  const targetScrollProgressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const hasWebGLSupport = useWebGLSupport();
  const contextLostRef = useRef(false);

  const updateScrollProgress = useCallback(() => {
    setScrollProgress(prev => {
      const next = lerp(prev, targetScrollProgressRef.current, LERP_FACTOR);
      if (Math.abs(next - targetScrollProgressRef.current) < 0.001) {
        return targetScrollProgressRef.current;
      }
      return next;
    });

    animationFrameRef.current = requestAnimationFrame(updateScrollProgress);
  }, []);

  const calculateScrollProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollProgressRef.current = Math.max(0, Math.min(1, scrollY / maxScroll));
    
    if (animationFrameRef.current === undefined) {
      animationFrameRef.current = requestAnimationFrame(updateScrollProgress);
    }
  }, [updateScrollProgress]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(calculateScrollProgress);
    }, THROTTLE_DELAY);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [calculateScrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLostRef.current = true;
      console.warn('WebGL context lost');
    };

    const handleContextRestored = (event: Event) => {
      contextLostRef.current = false;
      console.log('WebGL context restored');
    };

    canvas.addEventListener('webglcontextlost', handleContextLost as EventListener);
    canvas.addEventListener('webglcontextrestored', handleContextRestored as EventListener);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost as EventListener);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored as EventListener);
    };
  }, []);

  if (!hasWebGLSupport || hasWebGLError) {
    return <FallbackContent />;
  }

  return (
    <div className={`fixed inset-0 w-full h-full ${className}`}>
      <Canvas
        ref={canvasRef}
        camera={{ 
          position: [0, 0, 8], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ 
          position: 'absolute',
          inset: 0,
          background: '#000000',
          pointerEvents: 'auto'
        }}
        onError={() => setHasWebGLError(true)}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          stencil: false,
          depth: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
          logarithmicDepthBuffer: true,
          failIfMajorPerformanceCaveat: true
        }}
        shadows="soft"
        frameloop="always"
        performance={{ 
          min: 0.5,
          max: 1,
          debounce: 200 
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={6}
            maxDistance={15}
            enableDamping={true}
            dampingFactor={0.05}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.75}
            target={[0, 0, 0]}
            makeDefault
          />
          {!contextLostRef.current && <SceneObjects scrollProgress={scrollProgress} />}
        </Suspense>
      </Canvas>
    </div>
  );
} 

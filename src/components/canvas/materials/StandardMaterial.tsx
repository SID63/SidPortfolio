import { MeshStandardMaterialProps } from '@react-three/fiber';

interface StandardMaterialProps extends MeshStandardMaterialProps {
  color: string;
}

export default function StandardMaterial({ color, ...props }: StandardMaterialProps) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.4}
      roughness={0.5}
      envMapIntensity={1}
      {...props}
    />
  );
}
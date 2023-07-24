import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from 'framer-motion';
import { FC } from 'react';
import { CubeTexture } from 'three';

import Environment from '@/components/canvas/Environment';
import Lights from '@/components/canvas/Lights';
import Logo3DText from '@/components/canvas/Logo3DText';

interface SceneProps {
  transformedX: number;
  transformedY: number;
  cubeTexture: CubeTexture;
}

const ROTATION_STRENGTH = 0.5;

const Scene: FC<SceneProps> = ({ transformedX, transformedY, cubeTexture }) => {
  const { camera } = useThree();
  const xSpring = useSpring(0);
  const ySpring = useSpring(0);

  useFrame(() => {
    xSpring.set(transformedX);
    ySpring.set(transformedY);

    if (xSpring) {
      camera.position.x = (xSpring.get() / 2) * ROTATION_STRENGTH;
    }

    if (ySpring) {
      camera.position.y = (ySpring.get() / 2) * ROTATION_STRENGTH;
    }
  });

  return (
    <>
      <Lights />
      <Environment cubeTexture={cubeTexture} />
      <Logo3DText transformedX={transformedX} transformedY={transformedY} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};

export default Scene;

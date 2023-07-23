import { OrbitControls } from '@react-three/drei';
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

const Scene: FC<SceneProps> = ({ transformedX, transformedY, cubeTexture }) => {
  return (
    <>
      <OrbitControls />
      <Lights />
      <Environment cubeTexture={cubeTexture} />
      <Logo3DText transformedX={transformedX} transformedY={transformedY} />
    </>
  );
};

export default Scene;

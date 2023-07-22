import { useThree } from '@react-three/fiber';
import { FC, useEffect } from 'react';

const Environment: FC<{ cubeTexture: THREE.CubeTexture }> = ({
  cubeTexture,
}) => {
  const { scene } = useThree();

  useEffect(() => {
    // scene.backgroundBlurriness = 0.5;
    scene.background = cubeTexture;
  }, [scene, cubeTexture]);

  return null;
};

export default Environment;

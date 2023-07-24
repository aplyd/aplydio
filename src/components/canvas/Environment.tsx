import { useThree } from '@react-three/fiber';
import { FC, useEffect } from 'react';

const Environment: FC<{ cubeTexture: THREE.CubeTexture }> = ({
  cubeTexture,
}) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = cubeTexture;
  }, [scene, cubeTexture]);

  return null;
};

export default Environment;

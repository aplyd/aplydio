import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { CubeTextureLoader } from 'three';

import useTransformedRelativeMousePosition from '@/hooks/useTransformedRelativeMousePosition';

import Scene from '@/components/canvas/Scene';

const Hero: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [containerDims, setContainerDims] = useState<{
    height: number;
    width: number;
    top: number;
    left: number;
  }>({
    height: 0,
    width: 0,
    top: 0,
    left: 0,
  });
  const [cubeTexture, setCubeTexture] = useState<THREE.CubeTexture | null>(
    null
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderGeo = useMemo(
    () => containerDims.height > 0 && containerDims.height > 0,
    [containerDims]
  );
  const { transformedX, transformedY } =
    useTransformedRelativeMousePosition(containerDims);

  useEffect(() => {
    if (ref.current) {
      const { height, width, top, left } = ref.current.getBoundingClientRect();
      setContainerDims({ height, width, top, left });
      new CubeTextureLoader().load(
        [
          '/cubeTexture.jpg',
          '/cubeTexture.jpg',
          '/cubeTexture.jpg',
          '/cubeTexture.jpg',
          '/cubeTexture.jpg',
          '/cubeTexture.jpg',
        ],
        (texture) => setCubeTexture(texture)
      );
    }
  }, [ref]);

  // console.log(transformedX, transformedY);

  return (
    <div
      className='min-h-[800px] bg-gradient-to-br flex justify-center content-center'
      ref={ref}
    >
      {renderGeo && cubeTexture && (
        <Canvas
          style={{ height: '800px' }}
          camera={{ fov: 35 }}
          ref={canvasRef}
        >
          <Scene
            transformedX={transformedX}
            transformedY={transformedY}
            cubeTexture={cubeTexture}
          />
          <Perf position='top-left' />
        </Canvas>
      )}
    </div>
  );
};

export default Hero;

import { Canvas } from '@react-three/fiber';
import { FC } from 'react';

import Scene from '@/components/canvas/Scene';

const Hero: FC = () => {
  return (
    <div className='min-h-[800px] bg-gradient-to-br flex justify-center content-center'>
      <Canvas style={{ height: '800px' }}>
        <Scene></Scene>
      </Canvas>
    </div>
  );
};

export default Hero;

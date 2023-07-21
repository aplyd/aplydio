import { Canvas } from '@react-three/fiber';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import Lights from '@/components/canvas/Lights';
import Logo3DText from '@/components/canvas/Logo3DText';

const Hero: FC = () => {
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
  const ref = useRef<HTMLDivElement | null>(null);
  const renderGeo = useMemo(
    () => containerDims.height > 0 && containerDims.height > 0,
    [containerDims]
  );

  useEffect(() => {
    if (ref.current) {
      const { height, width, top, left } = ref.current.getBoundingClientRect();
      setContainerDims({ height, width, top, left });
    }
  }, [ref]);

  return (
    <div
      className='min-h-[800px] bg-gradient-to-br flex justify-center content-center'
      ref={ref}
    >
      {renderGeo && (
        <Canvas style={{ height: '800px' }}>
          <Lights />
          <Logo3DText
            height={containerDims.height}
            width={containerDims.width}
            top={containerDims.top}
            left={containerDims.left}
          />
        </Canvas>
      )}
    </div>
  );
};

export default Hero;

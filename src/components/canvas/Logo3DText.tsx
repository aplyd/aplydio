import { MeshTransmissionMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useSpring } from 'framer-motion';
import { useControls } from 'leva';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import poppins from '../../../public/fonts/Poppins_Regular.json';

interface Logo3DTextProps {
  transformedX: number;
  transformedY: number;
}

const ROTATION_STRENGTH = 1;

const Logo3DText: FC<Logo3DTextProps> = ({ transformedX, transformedY }) => {
  const [geometry, setGeometry] = useState<TextGeometry | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const springX = useSpring(0);
  const springY = useSpring(0);
  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: true,
    backsideThickness: { value: 2, min: -10, max: 10 },
    samples: { value: 10, min: 0, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    backsideResolution: { value: 1024, min: 32, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    thickness: { value: 0.25, min: 0, max: 10, step: 0.01 },
    chromaticAberration: { value: 0.4, min: 0, max: 1 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.65, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 0.5, min: 0, max: 2.5, step: 0.01 },
    clearcoat: { value: 0, min: 0, max: 1 },
    attenuationColor: '#ffffff',
    color: 'white',
  });

  extend({ TextGeometry });

  const font = useMemo(() => new FontLoader().parse(poppins), []);
  const geo = useMemo(
    () =>
      new TextGeometry('aplyd', {
        font,
        size: 1,
        height: 0.75,
      }),
    [font]
  );

  // set geometry
  useEffect(() => {
    if (!geometry) {
      geo.center();
      setGeometry(geo);
    }
    return () => geo.dispose();
  }, [geometry, geo]);

  // animate rotation
  useFrame(() => {
    if (!meshRef.current) return;

    springX.set(transformedX);
    meshRef.current.rotation.x = (springY.get() / 2) * ROTATION_STRENGTH;

    springY.set(transformedY);
    meshRef.current.rotation.y = (springX.get() / 2) * ROTATION_STRENGTH;
  });

  if (!geometry) return null;

  return (
    <mesh position={[0, 0, 0]} ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial {...config} />
    </mesh>
  );
};

export default Logo3DText;

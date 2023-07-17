import { extend, useFrame } from '@react-three/fiber';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Euler } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import poppins from '../../../public/fonts/Poppins_Regular.json';

const Geometry: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [geometry, setGeometry] = useState<TextGeometry | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  extend({ TextGeometry });
  const font = useMemo(() => new FontLoader().parse(poppins), []);

  useEffect(() => {
    const updateMousePosition = (ev: globalThis.MouseEvent) => {
      const { clientX, clientY } = ev;
      setMousePosition({ x: clientX, y: clientY });
    };

    global.addEventListener('mousemove', updateMousePosition);

    return () => global.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useEffect(() => {
    const geo = new TextGeometry('aplyd', {
      font,
      size: 1,
      height: 1,
    });

    geo.center();
    setGeometry(geo);

    return () => geo.dispose();
  }, [font]);

  useFrame(() => {
    const x = (mousePosition.x / window.innerWidth - 0.5) * 2;
    const y = (mousePosition.y / window.innerHeight - 0.5) * 2;

    const euler = new Euler(-y / 2, x / 2, 0, 'YXZ');

    if (meshRef.current) {
      meshRef.current.rotation.copy(euler);
    }
  });

  if (!geometry) return null;

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      ref={meshRef}
      geometry={geometry}
    >
      <meshStandardMaterial attach='material' />
    </mesh>
  );
};

export default Geometry;

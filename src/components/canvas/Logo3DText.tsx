import { MeshTransmissionMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { transform, useSpring } from 'framer-motion';
import { useControls } from 'leva';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import poppins from '../../../public/fonts/Poppins_Regular.json';

interface Logo3DTextProps {
  height: number;
  width: number;
  left: number;
  top: number;
}

const Logo3DText: FC<Logo3DTextProps> = ({ height, width, top, left }) => {
  const [geometry, setGeometry] = useState<TextGeometry | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);
  const [relativeMousePosition, setRelativeMousePosition] = useState({
    relativeMouseX: 0,
    relativeMouseY: 0,
  });
  const prevScroll = useRef(scroll);
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

  // mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      if (clientX > 0 || clientY > 0) {
        setMousePosition({ x: clientX, y: clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (prevScroll.current !== window.scrollY) {
        setScroll(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // calculate relative position
  useEffect(() => {
    const { x, y } = mousePosition;

    if (x && y) {
      const relativeX = x - left;
      const relativeY = y - top + scroll;

      setRelativeMousePosition({
        relativeMouseX: relativeX,
        relativeMouseY: relativeY,
      });
    }
  }, [mousePosition, scroll, left, top]);

  // animate rotation
  useFrame(() => {
    if (!meshRef.current) return;

    const { relativeMouseX, relativeMouseY } = relativeMousePosition;

    const xTransformer = transform([0, width], [-1, 1]);
    const yTransformer = transform([0, height], [-1, 1]);

    if (xTransformer) {
      const animatedX = xTransformer(relativeMouseX);
      springX.set(animatedX);
      meshRef.current.rotation.x = springY.get() / 2;
    }

    if (yTransformer) {
      const animatedY = yTransformer(relativeMouseY);
      springY.set(animatedY);
      meshRef.current.rotation.y = springX.get() / 2;
    }
  });

  if (!geometry) return null;

  return (
    <mesh position={[0, 0, 0]} ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial {...config} />
    </mesh>
  );
};

export default Logo3DText;

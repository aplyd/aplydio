import { extend, useFrame } from '@react-three/fiber';
import { transform, useSpring } from 'framer-motion';
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

  extend({ TextGeometry });

  const font = useMemo(() => new FontLoader().parse(poppins), []);
  const geo = useMemo(
    () =>
      new TextGeometry('aplyd', {
        font,
        size: 1,
        height: 1,
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

    const xTransformer =
      relativeMouseX < width && transform([0, width], [-1, 1]);
    const yTransformer =
      relativeMouseX < height && transform([0, height], [-1, 1]);

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
      <meshStandardMaterial attach='material' />
    </mesh>
  );
};

export default Logo3DText;

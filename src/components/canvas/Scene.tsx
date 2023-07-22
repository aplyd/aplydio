import { transform } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';

import Logo3DText from '@/components/canvas/Logo3DText';

interface SceneProps {
  height: number;
  width: number;
  left: number;
  top: number;
}

const Scene: FC<SceneProps> = ({ height, width, top, left }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);
  const [relativeMousePosition, setRelativeMousePosition] = useState({
    relativeMouseX: 0,
    relativeMouseY: 0,
  });
  const [transformedY, setTransformedX] = useState(0);
  const [transformedX, setTransformedY] = useState(0);

  const prevScroll = useRef(scroll);
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

  useEffect(() => {
    const xTransformer = transform([0, width], [-1, 1]);
    const yTransformer = transform([0, height], [-1, 1]);

    if (yTransformer) {
      setTransformedY(yTransformer(relativeMousePosition.relativeMouseY));
    }

    if (xTransformer) {
      setTransformedX(xTransformer(relativeMousePosition.relativeMouseX));
    }
  }, [
    height,
    width,
    relativeMousePosition.relativeMouseX,
    relativeMousePosition.relativeMouseY,
  ]);

  return (
    <>
      <Logo3DText transformedX={transformedX} transformedY={transformedY} />
    </>
  );
};

export default Scene;

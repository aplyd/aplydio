import { useEffect, useState } from 'react';

const useViewport = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateDims = () => {
    setWidth(global.innerWidth);
    setHeight(global.innerHeight);
  };

  useEffect(() => {
    updateDims();
    global.addEventListener('resize', updateDims);
    return () => global.removeEventListener('resize', updateDims);
  }, []);

  return { width, height };
};

export default useViewport;

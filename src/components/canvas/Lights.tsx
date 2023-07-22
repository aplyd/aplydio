import { FC } from 'react';

const Lights: FC = () => {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight color='white' position={[0, 0, -5]} />
    </>
  );
};

export default Lights;

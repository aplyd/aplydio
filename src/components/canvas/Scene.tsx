import { FC, PropsWithChildren } from 'react';

import Lights from '@/components/canvas/Lights';
import Logo3DText from '@/components/canvas/Logo3DText';

const Scene: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Lights />
      <Logo3DText />
      {children}
    </>
  );
};

export default Scene;

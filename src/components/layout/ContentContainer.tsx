import { FC, PropsWithChildren } from 'react';

const ContentContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className='mx-auto px-4 lg:px-0 max-w-[1024px]'>{children}</div>
);

export default ContentContainer;

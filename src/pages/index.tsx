import * as React from 'react';

import ContentContainer from '@/components/layout/ContentContainer';
import Hero from '@/components/layout/Hero';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <>
      <Seo />
      <main className='min-h-[2000px] bg-white'>
        <Hero />
        <ContentContainer>
          <h1>hello</h1>
        </ContentContainer>
      </main>
    </>
  );
}

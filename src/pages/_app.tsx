import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { StoreProvider } from '@/components/Store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;

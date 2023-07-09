import { Head, Html, Main, NextScript } from 'next/document';

import Layout from '@/components/layout/Layout';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Layout>
          <Main />
        </Layout>
        <NextScript />
      </body>
    </Html>
  );
}

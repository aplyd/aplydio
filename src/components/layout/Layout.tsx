import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <p>header</p>
      </header>
      {children}
      <footer>
        <p>footer</p>
      </footer>
    </>
  );
}

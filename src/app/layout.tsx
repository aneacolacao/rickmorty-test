import type { Metadata } from 'next';
import ReduxProvider from '@/store/providers';
import { Roboto_Condensed } from 'next/font/google';
import '@/styles/globals.css';

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rick & Morty App',
  description: 'Prueba técnica',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}

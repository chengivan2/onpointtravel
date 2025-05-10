import { Inter, Alegreya_Sans } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const alegreyaSans = Alegreya_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  variable: '--font-heading'
})
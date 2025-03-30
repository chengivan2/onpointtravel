import type { Metadata } from "next";
import { inter, alegreyaSans } from './fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: 'OnPoint Travel',
  description: 'Travel website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${alegreyaSans}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "../rootcomponents/ScrollToTop";
import { alegreyaSans, inter } from '@/app/fonts';

export const metadata: Metadata = {
  title: "Sign In - OnPoint",
  description: "Sign in to manage your OnPoint account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${alegreyaSans}`}>
      <body className={`font-sans antialiased flex flex-col bg-lightmode-bg-color dark:bg-darkmode-bg-color`}>
        <ThemeProvider
        attribute="class"
        enableSystem
        defaultTheme="system">
          {children}
        </ThemeProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}

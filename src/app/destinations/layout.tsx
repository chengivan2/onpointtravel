import type { Metadata } from "next";
import { inter, alegreyaSans } from "@/app/fonts";
import { ThemeProvider } from "next-themes";
import "../../app/globals.css";
import ScrollToTop from "@/app/rootcomponents/ScrollToTop";

export const metadata: Metadata = {
  title: "OnPoint Travel Destinations",
  description: "Discover different destinations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${alegreyaSans}`}>
      <body
        className={`antialiased min-h-[100vh] flex flex-col bg-lightmode-bg-color dark:bg-darkmode-bg-color`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children}
        </ThemeProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}

import { inter, alegreyaSans } from "./fonts";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ScrollToTop from "./rootcomponents/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${alegreyaSans}`}>
      <body className={`antialiased min-h-[100vh] flex flex-col bg-lightmode-bg-color dark:bg-darkmode-bg-color`}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children}
        </ThemeProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}

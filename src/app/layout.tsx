import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./themes.css";

const inter = Inter({ subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'latin', 'latin-ext', 'vietnamese'] });

export const metadata: Metadata = {
  title: "Landing Pay",
  description: "Pay with crypto the easy way"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

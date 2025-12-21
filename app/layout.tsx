import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/store/StoreProvider";
import QueryProvider from "@/lib/providers/QueryProvider";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Token Discovery - Axiom Trade",
  description: "Real-time token trading data with live price updates",
  keywords: ["crypto", "tokens", "trading", "defi", "blockchain"],
  authors: [{ name: "Axiom Trade" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <QueryProvider>{children}</QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

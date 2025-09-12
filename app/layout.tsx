import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LineaMark — C-section Guide Tattoos",
  description: "Temporary tattoo guides for scar placement discussion & planning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen antialiased bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}

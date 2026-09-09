import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linkedinify™ — Turning nothing into a professional achievement",
  description: "The AI agent that transforms your mundane everyday actions into unbearable LinkedIn thought leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full font-sans antialiased bg-background text-text">
        {children}
      </body>
    </html>
  );
}

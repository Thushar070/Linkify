import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linkedinify™ — Turning nothing into a professional achievement",
  description:
    "The AI satire engine that transforms your mundane everyday actions into unbearable LinkedIn thought leadership.",
  keywords: [
    "LinkedIn satire",
    "thought leadership generator",
    "corporate humor",
    "LinkedIn post generator",
  ],
  authors: [{ name: "Linkedinify Team" }],
  openGraph: {
    title: "Linkedinify™ — Turning nothing into a professional achievement",
    description:
      "The AI satire engine that transforms your mundane everyday actions into unbearable LinkedIn thought leadership.",
    type: "website",
    siteName: "Linkedinify™",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkedinify™ — Turning nothing into a professional achievement",
    description:
      "The AI satire engine that transforms your mundane everyday actions into unbearable LinkedIn thought leadership.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
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

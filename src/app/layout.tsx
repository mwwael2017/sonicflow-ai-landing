import type { Metadata, Viewport } from "next";
import {
  Geist,
  IBM_Plex_Sans_Arabic,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

import { AppProvider } from "@/context/AppContext";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["monospace"],
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "SonicFlow AI",
    template: "%s | SonicFlow AI",
  },
  description:
    "Real-time AI audio enhancement, adaptive noise removal, voice reconstruction, and precision 3D spatial audio.",
  applicationName: "SonicFlow AI",
  keywords: [
    "SonicFlow AI",
    "AI audio",
    "spatial audio",
    "3D audio",
    "noise removal",
    "voice enhancement",
    "real-time audio",
  ],
  authors: [
    {
      name: "SonicFlow AI",
    },
  ],
  creator: "SonicFlow AI",
  publisher: "SonicFlow AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SonicFlow AI",
    title: "SonicFlow AI",
    description:
      "Make every voice extraordinary with real-time AI enhancement and precision 3D spatial audio.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SonicFlow AI",
    description:
      "Real-time AI enhancement and precision 3D spatial audio.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f8fafc",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0f131c",
    },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={[
          geist.variable,
          spaceGrotesk.variable,
          jetBrainsMono.variable,
          ibmPlexSansArabic.variable,
          "min-h-screen bg-surface text-on-surface antialiased",
        ].join(" ")}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
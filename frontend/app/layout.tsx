import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from '@/lib/LanguageContext';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mame-bara-portfolio.vercel.app"),
  title: "Mame Bara Samb | Portfolio - Développeur d'Applications Réparties",
  description: "Portfolio professionnel de Mame Bara Samb. Étudiant en L3 Informatique & Télécommunications (DAR) à l'UCAK. Spécialisé en architectures distribuées, microservices, IA et réseaux.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/monProfile.jpeg", type: "image/jpeg" }
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Mame Bara Samb | Portfolio - Développeur d'Applications Réparties",
    description: "Portfolio professionnel de Mame Bara Samb. Spécialisé en architectures distribuées, microservices, IA et réseaux.",
    url: "https://mame-bara-portfolio.vercel.app",
    siteName: "Mame Bara Samb Portfolio",
    images: [
      {
        url: "/monProfile.jpeg",
        width: 880,
        height: 1280,
        alt: "Mame Bara Samb - Photo de profil",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mame Bara Samb | Portfolio",
    description: "Développeur d'Applications Réparties & Systèmes Distribués (UCAK)",
    images: ["/monProfile.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}

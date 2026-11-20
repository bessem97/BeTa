import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B4F5C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://beta-engineering.com"),
  title: {
    default: "BeTA Engineering | Du réseau à l'automatisme, nous connectons votre performance",
    template: "%s | BeTA Engineering",
  },
  description:
    "Entreprise d'ingénierie et d'intégration à Tunis. Spécialiste des réseaux informatiques certifiés, vidéosurveillance CCTV, électricité bâtiment, fabrication d'armoires industrielles TGBT sur mesure, automatisme PLC & SCADA, et cybersécurité en Tunisie et sur tout le continent africain.",
  keywords: [
    "BeTA Engineering",
    "Société Didier",
    "installation caméras surveillance Tunisie",
    "réseau informatique Tunis",
    "armoire électrique industrielle Tunisie",
    "fabrication armoire électrique Tunis",
    "automatisme industriel Afrique",
    "SCADA PLC Siemens Tunisie",
    "câblage fibre optique Tunis",
    "cybersécurité Tunisie",
    "ingénierie électrique Afrique",
    "TGBT sur mesure",
  ],
  authors: [{ name: "BeTA Engineering" }],
  creator: "BeTA Engineering",
  publisher: "BeTA Engineering",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "BeTA Engineering | Ingénierie Réseaux, Électricité & Automatisme en Afrique",
    description:
      "Basée à Tunis, BeTA Engineering conçoit, fabrique et déploie vos infrastructures électriques industrielles, réseaux et automatismes partout en Afrique.",
    url: "https://beta-engineering.com",
    siteName: "BeTA Engineering",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BeTA Engineering - Du réseau à l'automatisme",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeTA Engineering | Solutions d'Ingénierie Panafricaine",
    description:
      "Du réseau à l'automatisme, nous connectons votre performance en Tunisie et dans toute l'Afrique.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "BeTA Engineering",
    alternateName: "Société Didier",
    url: "https://beta-engineering.com",
    logo: "https://beta-engineering.com/brand/logo.svg",
    image: "https://beta-engineering.com/og-image.jpg",
    description:
      "Société d'ingénierie spécialisée en réseaux informatiques, électricité bâtiment, fabrication d'armoires industrielles, automatisme SCADA et cybersécurité en Tunisie et Afrique.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Immeuble Le Grand Boulevard, Centre Urbain Nord",
      addressLocality: "Tunis",
      postalCode: "1082",
      addressCountry: "TN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.8488",
      longitude: "10.1983",
    },
    telephone: "+21671888999",
    email: "contact@beta-engineering.com",
    areaServed: ["Tunisia", "Africa"],
    priceRange: "$$",
    sameAs: [
      "https://facebook.com/betaengineering",
      "https://linkedin.com/company/beta-engineering",
    ],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${plusJakartaSans.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ice-white text-deep-teal min-h-screen flex flex-col font-sans antialiased selection:bg-soft-peach selection:text-deep-teal-950">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}

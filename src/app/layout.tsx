import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "../../site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { generateLegalServiceJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteConfig.name || "Kantor Hukum",
  description: siteConfig.tagline || undefined,
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const legalServiceLd = generateLegalServiceJsonLd();

  return (
    <html lang="id">
      <head>
        {legalServiceLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(legalServiceLd),
            }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Header config={siteConfig} />

        <main className="flex-1" id="main-content">
          {children}
        </main>

        <Footer config={siteConfig} />

        {/* Floating WhatsApp — only renders if whatsappNumber exists */}
        {siteConfig.whatsappNumber && (
          <FloatingWhatsApp
            whatsappNumber={siteConfig.whatsappNumber}
            defaultMessage={siteConfig.whatsappDefaultMessage}
          />
        )}

        {/* Mobile Bottom Bar — only renders if phone or whatsappNumber exists */}
        {(siteConfig.phone || siteConfig.whatsappNumber) && (
          <MobileBottomBar
            phone={siteConfig.phone}
            whatsappNumber={siteConfig.whatsappNumber}
            whatsappDefaultMessage={siteConfig.whatsappDefaultMessage}
          />
        )}
      </body>
    </html>
  );
}

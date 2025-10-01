import type { Metadata } from "next";
import "@/styles/globals.css";

import { Footer } from "@/components/sections/footer";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { CoinProvider } from "@/components/coin-context";
import { CoinDisplay } from "@/components/coin-display";
import { StoreProvider } from "@/components/store-provider";
import { ViewTransitions } from "next-view-transitions";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Components", "avalynndev"],
  authors: [
    {
      name: "avalynndev",
      url: "https://github.com/avalynndev",
    },
  ],
  creator: "avalynndev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: "@avalynndev",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/manifest.json`,
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <StoreProvider>
          <body className="min-h-screen bg-background antialiased">
            <div className="flex flex-col">
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
              >
                <Toaster />
                <main className="flex-1">
                  <CoinProvider>
                    <CoinDisplay />
                    {children}
                  </CoinProvider>
                </main>
                <Footer />
                <TailwindIndicator />
              </ThemeProvider>
            </div>
          </body>
        </StoreProvider>
      </html>
    </ViewTransitions>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.finishrichafrica.com"),
  title: {
    default: "Finish Rich Africa | The Poverty Cycle Ends With Me",
    template: "%s | Finish Rich Africa"
  },
  description: "Empowering the modern African with world-class financial literacy, investment coaching, and wealth preservation strategies. Join Dr. Temilola Adeyemi.",
  keywords: ["Financial Literacy Africa", "Investing in Nigeria", "Wealth Building", "Dr. Temilola Adeyemi", "Finish Rich Africa", "Stock Market Training", "Wealth Management Lagos"],
  authors: [{ name: "Dr. Temilola Adeyemi" }],
  creator: "Finish Rich Africa",
  openGraph: {
    title: "Finish Rich Africa | Premium Wealth Coaching",
    description: "The poverty cycle ends with you. Explore our 6-tier wealth programs and professional investment insights.",
    url: "https://www.finishrichafrica.com",
    siteName: "Finish Rich Africa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Finish Rich Africa - Wealth Coaching",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finish Rich Africa | Financial Literacy",
    description: "Empowering Africans to build lasting wealth through expert advisory.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
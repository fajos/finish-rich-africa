import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finish Rich Africa | Poverty Cycle Ends With Me",
  description: "Join Dr. Temilola Adeyemi at Finish Rich Africa. We provide world-class financial literacy, investment coaching, and wealth preservation strategies for the modern African.",
  keywords: ["Financial Literacy Africa", "Investing in Nigeria", "Wealth Building", "Dr. Temilola Adeyemi", "Finish Rich Africa", "Stock Market Training"],
  openGraph: {
    title: "Finish Rich Africa | Premium Wealth Coaching",
    description: "The poverty cycle ends with you. Explore our 6-tier wealth programs and the Web Journal.",
    url: "https://finishrich.africa",
    siteName: "Finish Rich Africa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Finish Rich Africa",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finish Rich Africa | Financial Literacy",
    description: "Empowering Africans to build lasting wealth.",
    images: ["/og-image.jpg"],
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
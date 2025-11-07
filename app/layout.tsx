import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PinDownloader - Download Pinterest Videos & Images",
  description: "Fast, free, and easy Pinterest downloader. Download videos, images, and GIFs from Pinterest in high quality without watermarks.",
  keywords: "pinterest downloader, download pinterest video, pinterest image downloader, save pinterest, pinterest gif downloader",
  openGraph: {
    title: "PinDownloader - Download Pinterest Videos & Images",
    description: "Fast, free, and easy Pinterest downloader. Download videos, images, and GIFs from Pinterest in high quality without watermarks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

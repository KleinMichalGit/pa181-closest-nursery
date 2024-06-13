import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AboutModal from "@/components/modals/about-modal";
import HighAccessibilityModal from "@/components/modals/high-accessibility-modal";
import { Providers } from "@/app/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PA181 Closest Nursery",
  description:
    "Service for finding the closest nursery school in Brno according to your location",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body className={inter.className}>
        <Providers>
          {children}
          <AboutModal />
          <HighAccessibilityModal />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

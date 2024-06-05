import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import AboutModal from "@/components/modals/about-modal";
import HighAccessibilityModal from "@/components/modals/high-accessibility-modal";

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
    <html lang="en">
      <body className={inter.className}>
        {children}
        <AboutModal />
        <HighAccessibilityModal />
      </body>
    </html>
  );
}

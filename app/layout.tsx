import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Camper rental service",
  keywords: ["camper rental", "travel trucks", "ukraine travel", "rent van"],
  authors: [{ name: "Kateryna Kulik" }],
  openGraph: {
    title: "TravelTrucks - Adventure Awaits",
    description: "Rent a camper and explore the world.",
    url: "https://travel-trucks-sooty-nu.vercel.app/",
    siteName: "TravelTrucks",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

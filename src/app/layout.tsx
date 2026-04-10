import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MainNav } from "@/shared/components/layout/main-nav";
import { MobileBottomNav } from "@/shared/components/layout/mobile-bottom-nav";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InfluencerSmart",
  description:
    "Plataforma para conectar empresas con influencers y gestionar campanas de promocion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MainNav />
        <div className="flex flex-1 flex-col pb-24 md:pb-0">{children}</div>
        <MobileBottomNav />
      </body>
    </html>
  );
}

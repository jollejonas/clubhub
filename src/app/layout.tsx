import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Barlow_Condensed, Barlow } from "next/font/google";
import type { CSSProperties } from "react";
import { clubConfig } from "@/config/club.config";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: clubConfig.name,
  description: `Officiel hjemmeside for ${clubConfig.name} (${clubConfig.shortName})`,
};

// Build CSS custom properties from club color config so Tailwind @theme vars
// and raw CSS can both consume `var(--club-primary)` etc. at runtime.
function buildClubCssVars(): CSSProperties {
  const { colors } = clubConfig;
  return {
    "--club-primary":         colors.primary,
    "--club-primary-dark":    colors.primaryDark,
    "--club-primary-light":   colors.primaryLight,
    "--club-secondary":       colors.secondary,
    "--club-secondary-dark":  colors.secondaryDark,
    "--club-secondary-light": colors.secondaryLight,
    "--club-accent":          colors.accent,
    "--club-background":      colors.background,
    "--club-surface":         colors.surface,
    "--club-text":            colors.text,
    "--club-textMuted":       colors.textMuted,
    "--club-border":          colors.border,
    "--club-success":         colors.success,
    "--club-draw":            colors.draw,
    "--club-loss":            colors.loss,
  } as CSSProperties;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clubVars = buildClubCssVars();

  return (
    <html
      lang="da"
      className={`${inter.variable} ${jetbrainsMono.variable} ${barlowCondensed.variable} ${barlow.variable} h-full antialiased`}
      style={clubVars}
    >
      <body className="min-h-full flex flex-col bg-background text-club-text">
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

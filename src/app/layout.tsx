import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Share, Parisienne } from "next/font/google";
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

// Share Bold — primary heading font for VBK (replaces Barlow Condensed)
const share = Share({
  variable: "--font-share",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Parisienne — free alternative to Monotype Corsiva; decorative/accent script
const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: ["400"],
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${share.variable} ${parisienne.variable} h-full antialiased`}
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

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Kedar Jadhav | Full Stack Developer · AI & 3D Web",
  description: "Full Stack Developer specializing in AI-powered applications, 3D web experiences, and scalable backend systems. Building with React, Node.js, Three.js, and LLMs. Based in Pune, India.",
  keywords: ["Kedar Jadhav", "Full Stack Developer", "AI Engineer", "3D Web", "React", "Node.js", "Three.js", "TypeScript", "Machine Learning", "Pune"],
  authors: [{ name: "Kedar Jadhav" }],
  creator: "Kedar Jadhav",
  publisher: "Kedar Jadhav",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kedarjadhav.dev",
    title: "Kedar Jadhav | Full Stack Developer · AI & 3D Web",
    description: "Full Stack Developer specializing in AI-powered applications, 3D web experiences, and scalable backend systems.",
    siteName: "Kedar Jadhav - Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kedar Jadhav | Full Stack Developer · AI & 3D Web",
    description: "Full Stack Developer specializing in AI-powered applications, 3D web experiences, and scalable backend systems.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#050510" },
    { media: "(prefers-color-scheme: dark)", color: "#050510" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${spaceGrotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kedar Jadhav",
              url: "https://kedarjadhav.dev",
              jobTitle: "Full Stack Developer",
              sameAs: [
                "https://www.linkedin.com/in/kedar-jadhav-190090317/",
                "https://github.com/KedarJ10-design",
              ],
              knowsAbout: ["Full Stack Development", "AI Engineering", "3D Web", "React", "Node.js", "Three.js"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressCountry: "IN",
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-bg text-text">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
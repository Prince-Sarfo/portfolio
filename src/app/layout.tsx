import type { Metadata, Viewport } from "next";
import { Sora, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const BASE_URL = "https://princesarfo.dev";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#06b6d4",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Prince Sarfo — Full-Stack Developer",
    template: "%s | Prince Sarfo",
  },
  description:
    "Full-stack developer based in Ghana, building fast, accessible, and beautiful web and mobile experiences with React, Next.js, Node.js, and more.",
  keywords: [
    "Prince Sarfo",
    "full-stack developer",
    "software engineer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "Ghana",
    "web developer",
    "portfolio",
  ],
  authors: [{ name: "Prince Sarfo", url: BASE_URL }],
  creator: "Prince Sarfo",
  publisher: "Prince Sarfo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Prince Sarfo",
    title: "Prince Sarfo — Full-Stack Developer",
    description:
      "Full-stack developer based in Ghana, building fast, accessible, and beautiful web and mobile experiences.",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Prince Sarfo — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Sarfo — Full-Stack Developer",
    description:
      "Full-stack developer based in Ghana, building fast, accessible, and beautiful web and mobile experiences.",
    images: ["/profile.png"],
    creator: "@princesarfo",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

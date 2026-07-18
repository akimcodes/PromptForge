import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "PromptForge | AI Prompt Generator",
  description:
    "Turn any image into professional AI prompts for ChatGPT, Midjourney, Flux, SDXL and Imagen in seconds.",

  keywords: [
    "AI Prompt Generator",
    "PromptForge",
    "Image to Prompt",
    "Midjourney Prompt",
    "ChatGPT Prompt",
    "Flux Prompt",
    "SDXL Prompt",
    "Imagen Prompt",
  ],

  authors: [{ name: "PromptForge" }],

  creator: "PromptForge",

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "PromptForge",
    description:
      "Generate production-ready AI prompts from any image instantly.",
    url: "https://promptforge.vercel.app",
    siteName: "PromptForge",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PromptForge",
    description:
      "Turn any image into professional AI prompts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

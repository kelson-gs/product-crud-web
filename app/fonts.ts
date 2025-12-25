import { Geist, Geist_Mono, Merienda } from "next/font/google";

export const merienda = Merienda({
  subsets: ["latin"],
  variable: "--font-merienda",
});

export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
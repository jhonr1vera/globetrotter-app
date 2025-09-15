import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GeneralText } from "@/constants/text";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Globetrotter",
  description: "Created by Jhon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="bg-primary py-4 text-center">
          <h1 className="text-3xl font-bold text-center text-white">{GeneralText.company.name}</h1>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

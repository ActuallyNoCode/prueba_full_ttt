import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import Providers from "@/components/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TO-DO list app",
  description: "TODO list app with simple auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-textPrimary`}
      >
        <Providers>
          <main className="min-h-screen flex flex-col items-center justify-center">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

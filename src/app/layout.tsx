import type { Metadata } from "next";
import { Roboto, Playfair_Display, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const fontSans = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Gill's Log",
  description: "A beautifully designed Markdown blog built with Next.js and Shadcn UI.",
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // 구글 서치 콘솔에서 발급받은 코드로 교체하세요
    other: {
      "naver-site-verification": ["YOUR_NAVER_VERIFICATION_CODE"], // 네이버 서치어드바이저에서 발급받은 코드로 교체하세요
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto, Playfair_Display, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Script from "next/script";

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
    google: "Umfsnm7rIMyx0hQEGfwijT7HAjVsovYXHeOhJ99dvUk",
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
          {/* Naver Analytics */}
          <Script 
            id="naver-analytics"
            strategy="afterInteractive"
          >
            {`
              if (!localStorage.getItem('is_blog_admin')) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = '//wcs.pstatic.net/wcslog.js';
                script.onload = function() {
                  if(!window.wcs_add) window.wcs_add = {};
                  window.wcs_add["wa"] = "19143454d3b5280";
                  if(window.wcs) {
                    window.wcs_do();
                  }
                };
                document.head.appendChild(script);
              }
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}

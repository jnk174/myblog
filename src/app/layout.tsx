import type { Metadata } from "next";
import { Roboto, Playfair_Display, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import VercelAnalytics from "@/components/VercelAnalytics";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Script from "next/script";
import { siteConfig } from "@/config/site";


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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["블로그", "코딩", "투자", "독서", "자동화", "Gill's Log"],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  verification: {
    google: "Umfsnm7rIMyx0hQEGfwijT7HAjVsovYXHeOhJ99dvUk",
    other: {
      "naver-site-verification": "541a00ad0213d2a34addd0ef545dec19e7fcdc56",
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8397942313843986"
          crossOrigin="anonymous"
        ></script>
      </head>
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
          <VercelAnalytics />
          <GoogleAnalytics />
          {/* Naver Analytics */}
          <Script 
            id="naver-analytics"
            strategy="afterInteractive"
          >
            {`
              (function() {
                var isAdmin = localStorage.getItem('is_blog_admin') === 'true' || 
                              window.location.search.indexOf('admin_secret=ska48*!qmf') !== -1;
                
                if (!isAdmin) {
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
              })();
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}

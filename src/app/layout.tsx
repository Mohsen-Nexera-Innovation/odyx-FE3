import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlobalToolsProvider } from "@/components/GlobalTools";
import SiteBackground from "@/components/SiteBackground";
import DevPreviewTools from "@/components/DevPreviewTools";
import MetaPixel from "@/components/MetaPixel";
import { getMetaPixelId } from "@/lib/meta-pixel";

export const metadata: Metadata = {
  title: "ODYX — One connected digital dentistry workflow",
  description:
    "ODYX is a complete digital dentistry ecosystem — intraoral scanner, design, 3D printer, curing and resin working as one connected workflow.",
};

const META_PIXEL_ID = getMetaPixelId();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={fontVars} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {META_PIXEL_ID ? (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"/>`,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="grain" suppressHydrationWarning>
        <SiteBackground />
        <MetaPixel />
        <GlobalToolsProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <DevPreviewTools />
        </GlobalToolsProvider>
      </body>
    </html>
  );
}

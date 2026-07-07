import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "./fonts";
import Header from "@/components/Header";
import { GlobalToolsProvider } from "@/components/GlobalTools";
import SiteBackground from "@/components/SiteBackground";
import BackgroundPicker from "@/components/BackgroundPicker";
import FontPicker from "@/components/FontPicker";

export const metadata: Metadata = {
  title: "ODYX — One connected digital dentistry workflow",
  description:
    "ODYX is a complete digital dentistry ecosystem — intraoral scanner, design, 3D printer, curing and resins working as one connected workflow.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={fontVars} suppressHydrationWarning>
      <body className="grain">
        <SiteBackground />
        <GlobalToolsProvider>
          <Header />
          <main>{children}</main>
          <BackgroundPicker />
          <FontPicker />
        </GlobalToolsProvider>
      </body>
    </html>
  );
}

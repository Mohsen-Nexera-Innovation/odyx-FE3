import type { Metadata } from "next";
import HomeV2Page from "@/components/pages/HomeV2Page";

export const metadata: Metadata = {
  title: "ODYX — One Ecosystem. Endless Possibilities.",
  description:
    "Everything you need for digital dentistry in one seamless ecosystem — scanner, printer, curing and resins working as one connected workflow.",
};

export default function Page() {
  return <HomeV2Page />;
}

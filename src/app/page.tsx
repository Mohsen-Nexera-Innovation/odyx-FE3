import type { Metadata } from "next";
import HomeV2Page from "@/components/home2/HomeV2Page";
import { HOME_META } from "@/content/home";

export const metadata: Metadata = {
  title: HOME_META.title,
  description: HOME_META.description,
};

export default function Page() {
  return <HomeV2Page />;
}

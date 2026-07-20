import type { Metadata } from "next";
import ProductsOverviewPage from "@/components/pages/ProductsOverviewPage";
import InnerPageMotion from "@/components/InnerPageMotion";

export const metadata: Metadata = {
  title: "Products | ODYX",
  description:
    "Explore the ODYX ecosystem — P1-26 printer, ODYX-S1 scanner, design software, curing and clinical resin.",
};

export default function Page() {
  return (
    <>
      <ProductsOverviewPage />
      <InnerPageMotion />
    </>
  );
}

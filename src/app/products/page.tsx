import type { Metadata } from "next";
import ProductsOverviewPage from "@/components/pages/ProductsOverviewPage";
import InnerPageMotion from "@/components/InnerPageMotion";

export const metadata: Metadata = {
  title: "Products | ODYX",
  description:
    "ODYX-S1, design software, ODYX P1-26, ODYX Cure, finishing and clinical Resin — one ecosystem.",
};

export default function Page() {
  return (
    <>
      <ProductsOverviewPage />
      <InnerPageMotion />
    </>
  );
}

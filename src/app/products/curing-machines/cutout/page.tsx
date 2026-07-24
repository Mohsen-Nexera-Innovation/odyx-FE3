import type { Metadata } from "next";
import CuringCutoutPage from "@/components/pages/CuringCutoutPage";
import InnerPageMotion from "@/components/InnerPageMotion";

export const metadata: Metadata = {
  title: "ODYX Cure UV-02 — Cutout Version | ODYX",
  description:
    "Floating cutout product presentation of ODYX Cure UV-02 — light, heat, and guided cycles for clinical post-curing.",
};

export default function Page() {
  return (
    <>
      <CuringCutoutPage />
      <InnerPageMotion />
    </>
  );
}

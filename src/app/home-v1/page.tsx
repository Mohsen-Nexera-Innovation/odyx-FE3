import type { Metadata } from "next";
import Home from "@/components/Home";
import OdyxMotion from "@/components/OdyxMotion";
import Spine from "@/components/Spine";

// The previous main home screen, kept reachable for side-by-side review after
// the V2 design took over `/`. Delete this route once V2 is signed off.
export const metadata: Metadata = {
  title: "ODYX — Home (previous design)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Spine />
      <Home />
      <OdyxMotion />
    </>
  );
}

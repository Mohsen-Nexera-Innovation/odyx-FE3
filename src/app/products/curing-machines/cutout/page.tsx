import { redirect } from "next/navigation";

/** Legacy cutout URL → catalog product */
export default function Page() {
  redirect("/products/cure-cutout");
}

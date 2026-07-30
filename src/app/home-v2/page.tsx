import { redirect } from "next/navigation";

// The V2 home is now the site's main home at `/`. This route stays so existing
// review links keep working — temporary (307) rather than permanent, so the URL
// can be handed back to a future preview without cached 308s in the way.
export default function Page() {
  redirect("/");
}

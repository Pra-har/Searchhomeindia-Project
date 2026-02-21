import { redirect } from "next/navigation";

export default function page() {
  redirect("/saved-properties?from=dashboard");
}

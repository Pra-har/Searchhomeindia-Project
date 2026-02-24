import { redirect } from "next/navigation";

export const metadata = {
  title: "Post Your Property Free | List on Search Homes India",
  description:
    "Post your property for free on Search Homes India. Reach thousands of genuine buyers and tenants across India. Easy listing in minutes.",
  alternates: { canonical: "https://searchhomesindia.com/post-property" },
  robots: { index: true, follow: true },
};

export default function PostPropertyRedirectPage() {
  redirect("/add-property");
}


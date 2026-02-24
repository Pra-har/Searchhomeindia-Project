import HomePage from "@/components/home/HomePage";

export const metadata = {
  title: "Search Homes India | Buy, Rent & Sell Properties Across India",
  description:
    "Search Homes India - India's trusted real estate portal. Find flats, villas, plots and commercial properties to buy or rent across Mumbai, Delhi, Bangalore, Pune and 100+ cities.",
  alternates: {
    canonical: "https://searchhomesindia.com",
  },
  openGraph: {
    title: "Search Homes India | Buy, Rent & Sell Properties Across India",
    description:
      "Find verified flats, villas, plots and commercial properties across 100+ Indian cities.",
    url: "https://searchhomesindia.com",
    type: "website",
  },
};

export default function RootHomePage() {
  return <HomePage city="all-india" />;
}


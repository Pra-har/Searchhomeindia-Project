export const propertyLinks = [
  {
    title: "Property",
    submenu: [
      { href: "/property-listing", label: "All Listings" },
      { href: "/property-detail/1", label: "Featured Property" },
    ],
  },
  {
    title: "By City",
    submenu: [
      { href: "/mumbai", label: "Properties in Mumbai" },
      { href: "/delhi", label: "Properties in Delhi NCR" },
      { href: "/bangalore", label: "Properties in Bangalore" },
      { href: "/hyderabad", label: "Properties in Hyderabad" },
      { href: "/chennai", label: "Properties in Chennai" },
      { href: "/pune", label: "Properties in Pune" },
    ],
  },
];

export const otherPages = [
  { href: "/home-loan-process", label: "Home Loan Process" },
  { href: "/career", label: "Careers" },
  { href: "/faq", label: "FAQs" },
  { href: "/compare", label: "Compare" },
  { href: "/dashboard", label: "Dashboard" },
];

export const blogMenu = [
  { href: "/blog-listing", label: "All Blogs" },
  { href: "/blog-details/1", label: "Featured Article" },
];

export const megaHeaderMenus = {
  buy: [
    {
      title: "Property Type",
      iconList: true,
      submenu: [
        { href: "/property-listing?intent=buy&type=apartment", label: "Flats" },
        { href: "/property-listing?intent=buy&type=house", label: "Houses" },
        { href: "/property-listing?intent=buy&type=builder-floor", label: "Builder Floors" },
        { href: "/property-listing?intent=buy&type=plot", label: "Plots" },
        { href: "/property-listing?intent=buy&type=villa", label: "Villas" },
        { href: "/property-listing?intent=buy&type=commercial", label: "Commercial Properties" },
      ],
      footerLink: { href: "/property-listing?intent=buy", label: "Explore all properties" },
    },
    {
      title: "Popular Areas",
      submenu: [
        { href: "/bangalore", label: "Whitefield" },
        { href: "/bangalore", label: "Electronic City" },
        { href: "/bangalore", label: "Yelahanka" },
        { href: "/bangalore", label: "Sarjapur Road" },
        { href: "/bangalore", label: "Vasanth Nagar" },
        { href: "/bangalore", label: "Lavelle Road" },
      ],
    },
    {
      title: "Search by BHK",
      submenu: [
        { href: "/property-listing?intent=buy&bhk=1rk", label: "1 RK Flats" },
        { href: "/property-listing?intent=buy&bhk=1", label: "1 BHK Flats" },
        { href: "/property-listing?intent=buy&bhk=2", label: "2 BHK Flats" },
        { href: "/property-listing?intent=buy&bhk=3", label: "3 BHK Flats" },
        { href: "/property-listing?intent=buy&bhk=1&home=house", label: "1 BHK Houses" },
        { href: "/property-listing?intent=buy&bhk=2&home=house", label: "2 BHK Houses" },
      ],
    },
    {
      title: "Popular Searches",
      submenu: [
        { href: "/property-listing?intent=buy&tag=no-brokerage", label: "Flats without brokerage" },
        { href: "/property-listing?intent=buy&status=under-construction", label: "Under construction flats" },
        { href: "/property-listing?intent=buy&tag=affordable", label: "Affordable projects for sale" },
        { href: "/property-listing?intent=buy&status=ready-to-move", label: "Ready to move-in projects" },
        { href: "/property-listing?intent=buy&tag=new-projects", label: "New residential projects" },
        { href: "/property-listing?intent=buy&tag=resale", label: "Resale properties" },
      ],
    },
  ],
  rent: [
    {
      title: "Rental Type",
      iconList: true,
      submenu: [
        { href: "/property-listing?intent=rent&type=apartment", label: "Flats for Rent" },
        { href: "/property-listing?intent=rent&type=house", label: "Independent Houses" },
        { href: "/property-listing?intent=rent&type=builder-floor", label: "Builder Floors" },
        { href: "/property-listing?intent=rent&type=pg", label: "PG / Hostels" },
        { href: "/property-listing?intent=rent&type=commercial", label: "Commercial Rentals" },
      ],
      footerLink: { href: "/property-listing?intent=rent", label: "Explore all rentals" },
    },
    {
      title: "Popular Rental Areas",
      submenu: [
        { href: "/bangalore", label: "HSR Layout" },
        { href: "/bangalore", label: "Marathahalli" },
        { href: "/bangalore", label: "Bellandur" },
        { href: "/bangalore", label: "Koramangala" },
        { href: "/bangalore", label: "Indiranagar" },
        { href: "/bangalore", label: "JP Nagar" },
      ],
    },
    {
      title: "Rental Budget",
      submenu: [
        { href: "/property-listing?intent=rent&budget=under-20k", label: "Under ₹20K" },
        { href: "/property-listing?intent=rent&budget=20k-40k", label: "₹20K - ₹40K" },
        { href: "/property-listing?intent=rent&budget=40k-60k", label: "₹40K - ₹60K" },
        { href: "/property-listing?intent=rent&budget=60k-1l", label: "₹60K - ₹1L" },
        { href: "/property-listing?intent=rent&budget=above-1l", label: "Above ₹1L" },
      ],
    },
    {
      title: "Popular Searches",
      submenu: [
        { href: "/property-listing?intent=rent&tag=family", label: "Family homes for rent" },
        { href: "/property-listing?intent=rent&tag=bachelors", label: "Bachelor friendly homes" },
        { href: "/property-listing?intent=rent&tag=fully-furnished", label: "Fully furnished rentals" },
        { href: "/property-listing?intent=rent&tag=pet-friendly", label: "Pet friendly rentals" },
        { href: "/property-listing?intent=rent&tag=near-metro", label: "Homes near metro" },
      ],
    },
  ],
  launch: [
    {
      title: "New Launch Type",
      iconList: true,
      submenu: [
        { href: "/property-listing?segment=new-launch&type=apartment", label: "Apartments" },
        { href: "/property-listing?segment=new-launch&type=villa", label: "Villas" },
        { href: "/property-listing?segment=new-launch&type=plot", label: "Plots" },
        { href: "/property-listing?segment=new-launch&type=township", label: "Townships" },
        { href: "/property-listing?segment=new-launch&type=commercial", label: "Commercial Launches" },
      ],
      footerLink: { href: "/property-listing?segment=new-launch", label: "Explore all new launches" },
    },
    {
      title: "Top Cities",
      submenu: [
        { href: "/bangalore", label: "Bangalore" },
        { href: "/mumbai", label: "Mumbai" },
        { href: "/delhi", label: "Delhi NCR" },
        { href: "/hyderabad", label: "Hyderabad" },
        { href: "/chennai", label: "Chennai" },
        { href: "/pune", label: "Pune" },
      ],
    },
    {
      title: "Launch by BHK",
      submenu: [
        { href: "/property-listing?segment=new-launch&bhk=1", label: "1 BHK New Launch" },
        { href: "/property-listing?segment=new-launch&bhk=2", label: "2 BHK New Launch" },
        { href: "/property-listing?segment=new-launch&bhk=3", label: "3 BHK New Launch" },
        { href: "/property-listing?segment=new-launch&bhk=4", label: "4 BHK New Launch" },
        { href: "/property-listing?segment=new-launch&bhk=5", label: "5 BHK New Launch" },
      ],
    },
    {
      title: "Popular Searches",
      submenu: [
        { href: "/property-listing?segment=new-launch&status=pre-launch", label: "Pre-launch projects" },
        { href: "/property-listing?segment=new-launch&status=ongoing", label: "Under construction projects" },
        { href: "/property-listing?segment=new-launch&tag=rera", label: "RERA approved launches" },
        { href: "/property-listing?segment=new-launch&tag=luxury", label: "Luxury new launches" },
        { href: "/property-listing?segment=new-launch&tag=affordable", label: "Affordable new launches" },
      ],
    },
  ],
};

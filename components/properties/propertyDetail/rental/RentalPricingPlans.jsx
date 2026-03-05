"use client";

import DynamicPricingPlans from "../common/DynamicPricingPlans";
import { getRentalDetailAdapter } from "./rentalDetailAdapter";

export default function RentalPricingPlans({ property }) {
  const detailData = getRentalDetailAdapter(property);
  const plans = Array.isArray(detailData.pricingPlans) ? detailData.pricingPlans : [];
  if (!plans.length) return null;

  const transformedPlans = plans.map((plan) => ({
    ...plan,
    tab: plan.bhk || plan.tab || detailData.bhkType,
    type: plan.bhk || plan.type || detailData.bhkType,
    area: plan.area || detailData.carpetArea,
    price: plan.rent || plan.price,
    priceNote: `Deposit: ${plan.deposit || detailData.securityDeposit}`,
    image: plan.image,
    highlights: plan.highlights,
  }));

  return (
    <DynamicPricingPlans
      sectionTitle="Rental Plans & Configurations"
      headTitle={`${detailData.title} Rental Plans`}
      headSubtitle={`${transformedPlans.length} options | ${detailData.monthlyRent}`}
      propertyTitle={detailData.title}
      plans={transformedPlans}
      tableHead={{ type: "BHK", area: "Area", price: "Rent" }}
      preferredTab={detailData.bhkType}
    />
  );
}


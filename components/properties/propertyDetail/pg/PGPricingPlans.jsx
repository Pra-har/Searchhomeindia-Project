"use client";

import DynamicPricingPlans from "../common/DynamicPricingPlans";
import { getPGDetailAdapter } from "./pgDetailAdapter";

export default function PGPricingPlans({ property }) {
  const detailData = getPGDetailAdapter(property);
  const plans = Array.isArray(detailData.pricingPlans) ? detailData.pricingPlans : [];
  if (!plans.length) return null;

  const transformedPlans = plans.map((plan) => ({
    ...plan,
    tab: plan.sharingType || plan.tab || plan.type,
    type: plan.sharingType || plan.type,
    area: plan.deposit || detailData.securityDeposit,
    price: plan.price,
    priceNote: plan.note || "Inclusive of meals",
    image: plan.image,
    highlights: plan.highlights,
  }));

  return (
    <DynamicPricingPlans
      sectionTitle="Sharing & Pricing Plans"
      headTitle={`${detailData.title} Sharing Plans`}
      headSubtitle={`${transformedPlans.length} options | ${detailData.minPrice} - ${detailData.maxPrice}`}
      propertyTitle={detailData.title}
      plans={transformedPlans}
      tableHead={{ type: "Type", area: "Deposit", price: "Price" }}
      preferredTab={transformedPlans[0]?.tab}
    />
  );
}


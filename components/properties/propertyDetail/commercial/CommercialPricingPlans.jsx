"use client";

import DynamicPricingPlans from "../common/DynamicPricingPlans";
import { getCommercialDetailAdapter } from "./commercialDetailAdapter";

export default function CommercialPricingPlans({ property }) {
  const detailData = getCommercialDetailAdapter(property);
  const plans = Array.isArray(detailData.pricingPlans) ? detailData.pricingPlans : [];
  if (!plans.length) return null;

  const transformedPlans = plans.map((plan) => ({
    ...plan,
    tab: plan.tab || "All Units",
    type: plan.unitType || plan.type,
    area: plan.area,
    price: plan.price,
    priceNote: plan.note || plan.priceNote || "Onwards Price",
    image: plan.image,
    highlights: plan.highlights,
  }));

  return (
    <DynamicPricingPlans
      sectionTitle="Unit Options & Pricing"
      headTitle={`${detailData.title} Units`}
      headSubtitle={`${transformedPlans.length} options | ${detailData.price}`}
      propertyTitle={detailData.title}
      plans={transformedPlans}
      tableHead={{ type: "Unit Type", area: "Area", price: "Price" }}
      preferredTab={transformedPlans[0]?.tab}
    />
  );
}


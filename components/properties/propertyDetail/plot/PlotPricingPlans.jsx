"use client";

import DynamicPricingPlans from "../common/DynamicPricingPlans";
import { getPlotDetailAdapter } from "./plotDetailAdapter";

export default function PlotPricingPlans({ property }) {
  const detailData = getPlotDetailAdapter(property);
  const plans = Array.isArray(detailData.pricingPlans) ? detailData.pricingPlans : [];
  if (!plans.length) return null;

  const transformedPlans = plans.map((plan) => ({
    ...plan,
    tab: plan.tab || "Plots",
    type: plan.plotSize || plan.type,
    area: `${plan.dimension || detailData.plotDimension} | ${plan.area || detailData.plotArea}`,
    price: plan.price,
    priceNote: plan.note || "Onwards Price",
    image: plan.image,
    highlights: plan.highlights,
  }));

  return (
    <DynamicPricingPlans
      sectionTitle="Plot Size Options & Pricing"
      headTitle={`${detailData.title} Plot Variants`}
      headSubtitle={`${transformedPlans.length} options | ${detailData.price}`}
      propertyTitle={detailData.title}
      plans={transformedPlans}
      tableHead={{ type: "Plot Size", area: "Dimension / Area", price: "Price" }}
      preferredTab={transformedPlans[0]?.tab}
    />
  );
}


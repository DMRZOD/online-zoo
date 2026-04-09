"use client";

import dynamic from "next/dynamic";

export const LazyPetsSlider = dynamic(
  () => import("@/components/slider/pets-slider"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] animate-pulse rounded-[5px] bg-foreground/5" />
    ),
  },
);

export const LazyCareSlider = dynamic(
  () => import("@/components/slider/care-slider"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] animate-pulse rounded-[5px] bg-foreground/5" />
    ),
  },
);

export const LazyReviewSlider = dynamic(
  () => import("@/components/slider/review-slider"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] animate-pulse rounded-[5px] bg-white/10" />
    ),
  },
);

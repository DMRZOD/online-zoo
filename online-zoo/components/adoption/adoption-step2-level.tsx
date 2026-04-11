"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion-wrapper";
import AdoptionTierCard from "./adoption-tier-card";
import BlurImage from "@/components/ui/blur-image";
import type {
  AdoptionFormState,
  AdoptionTranslations,
} from "./adoption-client";

interface AdoptionStep2Props {
  form: AdoptionFormState;
  translations: AdoptionTranslations;
  onUpdate: (updates: Partial<AdoptionFormState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AdoptionStep2Level({
  form,
  translations: t,
  onUpdate,
  onNext,
  onBack,
}: AdoptionStep2Props) {
  const tiers = [
    {
      id: "cub",
      name: t.step2.cub,
      price: 40,
      items: [
        t.step2.certificate,
        t.step2.factSheet,
        t.step2.activities,
        t.step2.bookmark,
      ],
    },
    {
      id: "bronze",
      name: t.step2.bronze,
      price: 45,
      items: [t.step2.certificate, t.step2.factSheet, t.step2.pen],
    },
    {
      id: "silver",
      name: t.step2.silver,
      price: 90,
      items: [
        t.step2.certificate,
        t.step2.factSheet,
        t.step2.cuddlyToy,
        t.step2.pen,
      ],
    },
    {
      id: "gold",
      name: t.step2.gold,
      price: 150,
      badge: t.step2.bestValue,
      items: [
        t.step2.certificate,
        t.step2.factSheet,
        t.step2.cuddlyToy,
        t.step2.tour,
        t.step2.pen,
      ],
    },
  ];

  const handleSelect = (tierId: string, price: number) => {
    onUpdate({ tierId, tierPrice: price });
  };

  const isValid = form.tierId !== "";

  return (
    <div>
      {/* Chosen animal summary */}
      <FadeIn className="mb-8 sm:mb-10">
        <div className="flex items-center gap-4 rounded-[10px] bg-turquoise/5 p-4 dark:bg-dark-surface sm:gap-6 sm:p-6">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-20">
            <BlurImage
              src={form.petImage}
              alt={form.petName}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-foreground/60">{t.step2.chosenAnimal}</p>
            <h3 className="text-lg font-semibold text-foreground sm:text-xl">
              {form.petName}
            </h3>
          </div>
        </div>
      </FadeIn>

      <FadeIn className="mb-6 sm:mb-8">
        <h2 className="text-[22px] font-bold text-turquoise dark:text-foreground sm:text-[28px] lg:text-[32px]">
          {t.step2.title}
        </h2>
      </FadeIn>

      {/* Tier grid */}
      <div className="mx-auto mb-8 grid max-w-[1000px] gap-4 sm:grid-cols-2 sm:gap-10 sm:mb-10">
        {tiers.map((tier, i) => (
          <FadeIn key={tier.id} delay={i * 0.1} className="h-full">
            <AdoptionTierCard
              tierId={tier.id}
              name={tier.name}
              price={tier.price}
              items={tier.items}
              badge={"badge" in tier ? tier.badge : undefined}
              isSelected={form.tierId === tier.id}
              onSelect={() => handleSelect(tier.id, tier.price)}
            />
          </FadeIn>
        ))}
      </div>

      {/* Navigation */}
      <div className="mx-auto flex max-w-[700px] items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-turquoise transition-all duration-300 hover:bg-turquoise hover:shadow-[0_4px_20px_0_rgba(0,160,146,0.25)] hover:text-background sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-base"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11 4L6 9L11 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{t.back}</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className={cn(
            "flex items-center gap-2 rounded-xl bg-turquoise px-6 py-3 text-sm font-semibold text-white transition-all duration-300 sm:gap-2.5 sm:px-8 sm:py-3.5 sm:text-base",
            isValid
              ? "cursor-pointer hover:bg-turquoise-hover hover:shadow-[0_4px_20px_0_rgba(0,160,146,0.25)]"
              : "cursor-not-allowed opacity-50",
          )}
        >
          <span>{t.next}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M7 4L12 9L7 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

"use client";

import { FadeIn, SlideIn } from "@/components/ui/motion-wrapper";
import BlurImage from "@/components/ui/blur-image";
import type { AdoptionRecord } from "@/types/api";
import type { AdoptionTranslations } from "./adoption-client";

interface AdoptionLandingProps {
  translations: AdoptionTranslations;
  adoptions: AdoptionRecord[];
  isLoggedIn: boolean;
  onStartAdoption: () => void;
  onViewCertificate: (adoption: AdoptionRecord) => void;
}

const TIER_CONFIG: Record<string, { label: string; badge: string }> = {
  cub: { label: "Cub", badge: "bg-emerald-100 text-emerald-700" },
  bronze: { label: "Bronze", badge: "bg-amber-100 text-amber-700" },
  silver: { label: "Silver", badge: "bg-slate-100 text-slate-600" },
  gold: { label: "Gold", badge: "bg-yellow-100 text-yellow-700" },
};

export default function AdoptionLanding({
  translations: t,
  adoptions,
  isLoggedIn,
  onStartAdoption,
  onViewCertificate,
}: AdoptionLandingProps) {
  return (
    <div>
      {/* Hero Section — white background with breadcrumb */}
      <section className="bg-white py-[40px] dark:bg-background sm:py-[50px] lg:py-[60px]">
        <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
          <FadeIn className="flex flex-col gap-5 lg:max-w-[700px]">
            <h1 className="text-[26px] font-medium uppercase text-turquoise sm:text-[54px] sm:font-semibold">
              {t.heroTitle}
            </h1>
            <p className="text-base leading-relaxed text-foreground/80 sm:text-[17px]">
              {t.heroText}
            </p>
            <p className="text-base leading-relaxed text-foreground/80 sm:text-[17px]">
              {t.heroTextExtended}
            </p>
            <button
              onClick={onStartAdoption}
              className="mt-2 flex w-fit cursor-pointer items-center gap-2.5 rounded-[5px] border-2 border-turquoise px-4 py-3.5 text-[15px] font-semibold text-turquoise transition-all duration-300 hover:bg-turquoise hover:text-white sm:px-5 sm:py-4 sm:text-base"
            >
              <span>{t.adoptOnline}</span>
            </button>
          </FadeIn>
        </div>
      </section>

      {/* From Ribbits to Roars */}
      <section className="bg-turquoise py-[50px] text-white sm:py-[70px] lg:py-[90px]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10">
          <SlideIn direction="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] shadow-[0_8px_40px_rgba(0,0,0,0.2)]">
              <BlurImage
                src="/images/adoption/adoption-1.jpg"
                alt="Penguins"
                fill
                sizes="(max-width: 920px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </SlideIn>
          <SlideIn direction="right" className="flex flex-col gap-5">
            <h2 className="font-montserrat text-[24px] font-bold uppercase tracking-wide sm:text-[30px] lg:text-[40px]">
              {t.fromRibbits}
            </h2>
            <p className="text-base leading-relaxed text-white/85 sm:text-[17px]">
              {t.fromRibbitsText}
            </p>
          </SlideIn>
        </div>
      </section>

      {/* After You Adopt */}
      <section className="bg-turquoise/5 py-[50px] dark:bg-dark-surface sm:py-[70px] lg:py-[90px]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10">
          <FadeIn className="flex flex-col gap-5">
            <h2 className="font-montserrat text-[24px] font-bold uppercase tracking-wide text-navy dark:text-foreground sm:text-[30px] lg:text-[40px]">
              {t.keepInTouch}
            </h2>
            {t.keepInTouchText.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-foreground/80 sm:text-[17px]"
              >
                {paragraph}
              </p>
            ))}
          </FadeIn>
          <SlideIn direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
              <BlurImage
                src="/images/adoption/adoption-2.jpg"
                alt="Red panda"
                fill
                sizes="(max-width: 920px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Your Adopted Animals */}
      {isLoggedIn && adoptions.length > 0 && (
        <section className="bg-white py-[50px] dark:bg-background sm:py-[70px] lg:py-[80px]">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <FadeIn>
              <h2 className="mb-8 font-montserrat text-[24px] font-bold uppercase tracking-wide text-turquoise dark:text-foreground sm:mb-12 sm:text-[32px] lg:text-[42px]">
                {t.yourAdoptions}
              </h2>
            </FadeIn>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {adoptions.map((adoption) => {
                const tier = TIER_CONFIG[adoption.tierId];
                return (
                  <FadeIn key={adoption.id}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => onViewCertificate(adoption)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") onViewCertificate(adoption);
                      }}
                      className="group relative cursor-pointer overflow-hidden rounded-[12px] shadow-md transition-shadow duration-300 hover:shadow-xl"
                    >
                      {/* Image with gradient overlay */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <BlurImage
                          src={adoption.petImage}
                          alt={adoption.petName}
                          fill
                          sizes="(max-width: 480px) 100vw, (max-width: 920px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {/* Tier badge */}
                        <span
                          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${tier?.badge ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {tier?.label ?? adoption.tierId}
                        </span>

                        {/* Info at bottom over gradient */}
                        <div className="absolute right-0 bottom-0 left-0 p-4">
                          <h3 className="text-lg font-bold text-white sm:text-xl">
                            {adoption.petName}
                          </h3>
                          <p className="mt-1 text-sm text-white/75">
                            {t.adoptedOn}{" "}
                            {new Date(adoption.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

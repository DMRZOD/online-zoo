"use client";

import Image from "next/image";
import { motion } from "motion/react";
import BlurImage from "@/components/ui/blur-image";
import type { AdoptionRecord } from "@/types/api";
import type {
  AdoptionFormState,
  AdoptionTranslations,
} from "./adoption-client";

const TIER_NAMES: Record<string, string> = {
  cub: "Cub",
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
};

interface AdoptionStep5Props {
  form?: AdoptionFormState;
  adoption?: AdoptionRecord;
  translations: AdoptionTranslations;
  onBackToLanding: () => void;
  onAdoptAnother?: () => void;
  viewOnly?: boolean;
}

export default function AdoptionStep5Certificate({
  form,
  adoption,
  translations: t,
  onBackToLanding,
  onAdoptAnother,
  viewOnly,
}: AdoptionStep5Props) {
  const handlePrint = () => {
    window.print();
  };

  // Normalize data from either adoption record or form
  const isGift = adoption?.isGift ?? form?.isGift ?? false;
  const recipientName = adoption?.recipientName ?? form?.recipientName ?? "";
  const adopterName = adoption?.adopterName ?? form?.name ?? "";
  const petImage = adoption?.petImage ?? form?.petImage ?? "";
  const petName = adoption?.petName ?? form?.petName ?? "";
  const tierId = adoption?.tierId ?? form?.tierId ?? "";
  const giftMessage = adoption?.giftMessage ?? form?.giftMessage ?? "";

  const tierName = TIER_NAMES[tierId] ?? tierId;
  const dateStr = adoption
    ? new Date(adoption.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <div className="flex flex-col items-center">
      {/* Success message — hidden when viewing an existing certificate */}
      {!viewOnly && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-12"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-turquoise sm:h-20 sm:w-20">
              <svg
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
                className="text-white sm:h-8 sm:w-10"
              >
                <path
                  d="M2 12L11 21L30 2"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-[24px] font-bold text-turquoise sm:text-[32px] lg:text-[42px]">
            {t.step5.title}
          </h2>
          <p className="mt-2 text-base text-foreground/70 sm:text-lg">
            {t.step5.subtitle}
          </p>
        </motion.div>
      )}

      {/* Certificate */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        id="adoption-certificate"
        className="print-only mb-8 w-full max-w-[700px] overflow-hidden rounded-[10px] border-4 border-turquoise bg-white p-6 text-center shadow-lg sm:mb-12 sm:p-10 lg:p-14 dark:bg-background"
      >
        {/* Logo */}
        <div className="mb-6 flex justify-center sm:mb-8">
          <Image
            src="/icons/logo.svg"
            alt="Online Zoo"
            width={96}
            height={50}
            className="h-10 w-auto sm:h-12 dark:invert"
          />
        </div>

        {/* Certificate title */}
        <h3 className="mb-6 font-montserrat text-[20px] font-bold uppercase tracking-widest text-turquoise sm:mb-8 sm:text-[26px] lg:text-[32px]">
          {t.step5.certificateTitle}
        </h3>

        {/* Decorative line */}
        <div className="mx-auto mb-6 h-0.5 w-24 bg-orange sm:mb-8 sm:w-32" />

        {/* Content */}
        <p className="mb-2 text-base text-foreground/70 sm:text-lg">
          {t.step5.certifiedText}
        </p>
        <p className="mb-4 text-[22px] font-bold text-navy dark:text-foreground sm:mb-6 sm:text-[28px]">
          {isGift ? recipientName : adopterName}
        </p>

        <p className="mb-2 text-base text-foreground/70 sm:text-lg">
          {t.step5.hasAdopted}
        </p>

        {/* Animal image + name */}
        <div className="mx-auto mb-4 flex flex-col items-center gap-3 sm:mb-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-3 border-turquoise sm:h-32 sm:w-32">
            <BlurImage
              src={petImage}
              alt={petName}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
          <p className="text-[22px] font-bold text-turquoise sm:text-[28px]">
            {petName}
          </p>
        </div>

        {/* Level */}
        <p className="mb-6 text-base font-semibold text-foreground/80 sm:mb-8 sm:text-lg">
          {t.step5.atLevel.replace("{tier}", tierName)}
        </p>

        {/* Decorative line */}
        <div className="mx-auto mb-4 h-0.5 w-24 bg-orange sm:w-32" />

        {/* Date */}
        <p className="text-sm text-foreground/60 sm:text-base">
          {t.step5.dateLabel}: {dateStr}
        </p>

        {/* Gift message */}
        {isGift && giftMessage && (
          <div className="mt-6 rounded-[5px] bg-turquoise/5 p-4 sm:mt-8">
            <p className="text-sm italic text-foreground/70 sm:text-base">
              &ldquo;{giftMessage}&rdquo;
            </p>
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
      >
        <button
          onClick={handlePrint}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[5px] bg-turquoise px-8 py-4 text-sm font-semibold uppercase text-white transition-all duration-300 hover:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] sm:w-auto sm:text-base"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          {t.step5.printCertificate}
        </button>

        {!viewOnly && onAdoptAnother && (
          <button
            onClick={onAdoptAnother}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[5px] border-2 border-turquoise px-8 py-4 text-sm font-semibold uppercase text-turquoise transition-all duration-300 hover:bg-turquoise hover:text-white sm:w-auto sm:text-base"
          >
            {t.step5.adoptAnother}
          </button>
        )}

        <button
          onClick={onBackToLanding}
          className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-turquoise transition-all duration-300 hover:bg-turquoise hover:text-white hover:shadow-[0_4px_20px_0_rgba(0,160,146,0.25)] sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-base"
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
          <span>{t.step5.backToAdoption}</span>
        </button>
      </motion.div>
    </div>
  );
}

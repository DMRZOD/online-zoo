"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-[5px] border border-border bg-background px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-100 focus:border-turquoise focus:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] focus:outline-none sm:px-4 sm:py-4 sm:text-base lg:min-h-[60px] lg:px-5 lg:py-[17px] lg:text-lg";

const inputError = "border-[#cc0000] bg-[rgba(204,0,0,0.05)] dark:border-[#f56565] dark:bg-[rgba(245,101,101,0.08)]";

const NAME_RE = /^[a-zA-Z\s]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface DonationStep2Props {
  form: {
    name: string;
    email: string;
  };
  onUpdate: (updates: Record<string, unknown>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

export default function DonationStep2({
  form,
  onUpdate,
  onNext,
  onBack,
  currentStep,
}: DonationStep2Props) {
  const t = useTranslations("donationPopup");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const nameValid = form.name.trim().length > 0 && NAME_RE.test(form.name);
  const emailValid =
    form.email.trim().length > 0 && EMAIL_RE.test(form.email.trim());
  const isStep2Valid = nameValid && emailValid;

  const handleName = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z\s]/g, "");
    onUpdate({ name: cleaned });
  };

  return (
    <div>
      {/* Step title */}
      <h4 className="border-b border-border px-4 pb-2 pt-4 text-sm font-semibold text-foreground sm:px-6 sm:pb-2.5 sm:pt-6 sm:text-base lg:px-[120px] lg:pb-2.5 lg:pt-[50px] lg:text-lg">
        {t("step2Title")}
      </h4>

      {/* Step body */}
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-[120px] lg:py-[50px]">
        {/* Name field */}
        <p className="mb-1.5 text-[13px] text-foreground sm:mb-2 sm:text-sm lg:mb-2.5 lg:text-lg">
          <span className="text-turquoise">* </span>
          {t("yourName")}
        </p>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleName(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          placeholder={t("namePlaceholder")}
          className={cn(
            inputBase,
            touched.name && !nameValid ? inputError : "",
            touched.name && !nameValid ? "mb-1" : "mb-4 sm:mb-5 lg:mb-[30px]",
          )}
        />
        {touched.name && !nameValid && (
          <p className="mb-3 text-sm text-[#cc0000] dark:text-[#f56565]" role="alert">
            {t("invalidName")}
          </p>
        )}

        {/* Email field */}
        <p className="mb-1.5 text-[13px] text-foreground sm:mb-2 sm:text-sm lg:mb-2.5 lg:text-lg">
          <span className="text-turquoise">* </span>
          {t("yourEmail")}
        </p>
        <input
          type="email"
          value={form.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          placeholder={t("emailPlaceholder")}
          className={cn(
            inputBase,
            touched.email && !emailValid ? inputError : "",
            touched.email && !emailValid
              ? "mb-1"
              : "mb-4 sm:mb-5 lg:mb-[30px]",
          )}
        />
        {touched.email && !emailValid && (
          <p className="mb-3 text-sm text-[#cc0000] dark:text-[#f56565]" role="alert">
            {t("invalidEmail")}
          </p>
        )}

        {/* Email note */}
        <p className="mb-5 text-[13px] leading-[1.5] text-foreground sm:mb-7 sm:text-sm lg:mb-[50px] lg:text-lg">
          {t("emailNote")}
        </p>

        {/* Navigation */}
        <div className="mt-5 flex flex-col items-center gap-4 sm:mt-7 lg:mt-[50px] sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-5">
          {/* Pagination dots */}
          <div className="flex items-center gap-2.5 order-3 sm:order-1">
            {[1, 2, 3].map((step) => (
              <span
                key={step}
                className={cn(
                  "h-1.5 w-1.5 rounded-full border border-turquoise sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5",
                  step <= currentStep ? "bg-turquoise" : "bg-transparent",
                )}
              />
            ))}
          </div>

          {/* Back link */}
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer text-[13px] font-semibold text-turquoise underline transition-colors duration-300 hover:text-turquoise-hover sm:text-sm lg:justify-self-center lg:text-lg order-2"
          >
            {t("back")}
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={onNext}
            disabled={!isStep2Valid}
            className={cn(
              "flex w-full min-w-0 items-center justify-center gap-2 rounded-[5px] bg-turquoise px-5 py-4 text-sm font-semibold uppercase text-white transition-all duration-300 sm:text-base lg:w-auto lg:min-w-[200px] lg:gap-2.5 lg:px-6 lg:py-[26px] lg:text-lg order-1 sm:order-3",
              isStep2Valid
                ? "cursor-pointer hover:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)]"
                : "cursor-not-allowed opacity-50",
            )}
          >
            <span>{t("next")}</span>
            <Image
              src="/icons/arrow-right.svg"
              alt=""
              width={25}
              height={22}
              className="brightness-0 invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

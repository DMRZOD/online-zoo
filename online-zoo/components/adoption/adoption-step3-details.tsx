"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion-wrapper";
import type {
  AdoptionFormState,
  AdoptionTranslations,
} from "./adoption-client";

const inputBase =
  "w-full rounded-[5px] border border-border bg-background px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-100 focus:border-turquoise focus:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] focus:outline-none sm:px-4 sm:py-4 sm:text-base lg:min-h-[60px] lg:px-5 lg:py-[17px] lg:text-lg";

const inputError =
  "border-[#cc0000] bg-[rgba(204,0,0,0.05)] dark:border-[#f56565] dark:bg-[rgba(245,101,101,0.08)]";

const NAME_RE = /^[a-zA-Z\s]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface AdoptionStep3Props {
  form: AdoptionFormState;
  translations: AdoptionTranslations;
  onUpdate: (updates: Partial<AdoptionFormState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AdoptionStep3Details({
  form,
  translations: t,
  onUpdate,
  onNext,
  onBack,
}: AdoptionStep3Props) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const nameValid = form.name.trim().length > 0 && NAME_RE.test(form.name);
  const emailValid =
    form.email.trim().length > 0 && EMAIL_RE.test(form.email.trim());
  const addressValid = form.address.trim().length > 0;
  const cityValid = form.city.trim().length > 0;
  const postcodeValid = form.postcode.trim().length > 0;
  const recipientValid = !form.isGift || form.recipientName.trim().length > 0;

  const isValid =
    nameValid &&
    emailValid &&
    addressValid &&
    cityValid &&
    postcodeValid &&
    recipientValid;

  const handleName = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z\s]/g, "");
    onUpdate({ name: cleaned });
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div>
      <div className="mx-auto max-w-[700px]">
        <FadeIn className="mb-6 sm:mb-8">
          <h2 className="text-[22px] font-bold text-turquoise dark:text-foreground sm:text-[28px] lg:text-[32px]">
            {t.step3.title}
          </h2>
        </FadeIn>
        {/* Name */}
        <div className="mb-4 sm:mb-5">
          <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
            <span className="text-turquoise">* </span>
            {t.step3.name}
          </p>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleName(e.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder={t.step3.namePlaceholder}
            className={cn(inputBase, touched.name && !nameValid && inputError)}
          />
          {touched.name && !nameValid && (
            <p
              className="mt-1 text-sm text-[#cc0000] dark:text-[#f56565]"
              role="alert"
            >
              {t.validation.invalidName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4 sm:mb-5">
          <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
            <span className="text-turquoise">* </span>
            {t.step3.email}
          </p>
          <input
            type="email"
            value={form.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            onBlur={() => handleBlur("email")}
            placeholder={t.step3.emailPlaceholder}
            className={cn(
              inputBase,
              touched.email && !emailValid && inputError,
            )}
          />
          {touched.email && !emailValid && (
            <p
              className="mt-1 text-sm text-[#cc0000] dark:text-[#f56565]"
              role="alert"
            >
              {t.validation.invalidEmail}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4 sm:mb-5">
          <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
            <span className="text-turquoise">* </span>
            {t.step3.address}
          </p>
          <input
            type="text"
            value={form.address}
            onChange={(e) => onUpdate({ address: e.target.value })}
            onBlur={() => handleBlur("address")}
            placeholder={t.step3.addressPlaceholder}
            className={cn(
              inputBase,
              touched.address && !addressValid && inputError,
            )}
          />
          {touched.address && !addressValid && (
            <p
              className="mt-1 text-sm text-[#cc0000] dark:text-[#f56565]"
              role="alert"
            >
              {t.validation.required}
            </p>
          )}
        </div>

        {/* City + Postcode row */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:mb-5 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
              <span className="text-turquoise">* </span>
              {t.step3.city}
            </p>
            <input
              type="text"
              value={form.city}
              onChange={(e) => onUpdate({ city: e.target.value })}
              onBlur={() => handleBlur("city")}
              placeholder={t.step3.cityPlaceholder}
              className={cn(
                inputBase,
                touched.city && !cityValid && inputError,
              )}
            />
            {touched.city && !cityValid && (
              <p
                className="mt-1 text-sm text-[#cc0000] dark:text-[#f56565]"
                role="alert"
              >
                {t.validation.required}
              </p>
            )}
          </div>
          <div>
            <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
              <span className="text-turquoise">* </span>
              {t.step3.postcode}
            </p>
            <input
              type="text"
              value={form.postcode}
              onChange={(e) => onUpdate({ postcode: e.target.value })}
              onBlur={() => handleBlur("postcode")}
              placeholder={t.step3.postcodePlaceholder}
              className={cn(
                inputBase,
                touched.postcode && !postcodeValid && inputError,
              )}
            />
            {touched.postcode && !postcodeValid && (
              <p
                className="mt-1 text-sm text-[#cc0000] dark:text-[#f56565]"
                role="alert"
              >
                {t.validation.required}
              </p>
            )}
          </div>
        </div>

        {/* Gift checkbox */}
        <label className="mb-5 flex cursor-pointer items-center gap-2.5 sm:gap-3">
          <input
            type="checkbox"
            checked={form.isGift}
            onChange={(e) => onUpdate({ isGift: e.target.checked })}
            className="h-[22px] w-[22px] cursor-pointer appearance-none rounded-[5px] border border-border bg-background transition-all duration-300 checked:border-turquoise checked:bg-turquoise checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27white%27%20stroke-width=%273%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpolyline%20points=%2720%206%209%2017%204%2012%27%3E%3C/polyline%3E%3C/svg%3E')] checked:bg-[length:14px] checked:bg-center checked:bg-no-repeat sm:h-6 sm:w-6"
          />
          <span className="text-sm text-foreground sm:text-base lg:text-lg">
            {t.step3.isGift}
          </span>
        </label>

        {/* Gift fields (conditional) */}
        {form.isGift && (
          <div className="mb-4 sm:mb-5">
            <div className="mb-4 sm:mb-5">
              <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
                <span className="text-turquoise">* </span>
                {t.step3.recipientName}
              </p>
              <input
                type="text"
                value={form.recipientName}
                onChange={(e) => onUpdate({ recipientName: e.target.value })}
                onBlur={() => handleBlur("recipient")}
                placeholder={t.step3.recipientPlaceholder}
                className={cn(
                  inputBase,
                  touched.recipient && !recipientValid && inputError,
                )}
              />
              {touched.recipient && !recipientValid && (
                <p
                  className="mt-1 text-sm text-[#cc0000] dark:text-[#f56565]"
                  role="alert"
                >
                  {t.validation.required}
                </p>
              )}
            </div>
            <div>
              <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
                {t.step3.giftMessage}
              </p>
              <textarea
                value={form.giftMessage}
                onChange={(e) => onUpdate({ giftMessage: e.target.value })}
                placeholder={t.step3.giftMessagePlaceholder}
                rows={3}
                className={cn(
                  inputBase,
                  "min-h-[100px] resize-y lg:min-h-[120px]",
                )}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4 sm:mt-10">
          <button
            type="button"
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-turquoise transition-all duration-300 hover:bg-turquoise hover:text-background hover:shadow-[0_4px_20px_0_rgba(0,160,146,0.25)] sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-base"
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
    </div>
  );
}

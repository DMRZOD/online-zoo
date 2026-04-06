"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { SAVED_CARDS_KEY } from "@/lib/constants";
import type { SavedCard } from "@/types/api";

const inputBase =
  "w-full rounded-[5px] border border-border bg-background px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-100 focus:border-turquoise focus:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] focus:outline-none sm:px-4 sm:py-4 sm:text-base lg:min-h-[60px] lg:px-5 lg:py-[17px] lg:text-lg";

const inputError = "border-[#cc0000] bg-[rgba(204,0,0,0.05)]";

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

function formatCardDisplay(cardNumber: string): string {
  return `${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(12)}`;
}

interface DonationStep3Props {
  form: {
    cardNumber: string;
    cvv: string;
    expiryMonth: string;
    expiryYear: string;
    saveCard: boolean;
  };
  onUpdate: (updates: Record<string, unknown>) => void;
  onBack: () => void;
  onComplete: () => void;
  isSubmitting: boolean;
  currentStep: number;
}

export default function DonationStep3({
  form,
  onUpdate,
  onBack,
  onComplete,
  isSubmitting,
  currentStep,
}: DonationStep3Props) {
  const t = useTranslations("donationPopup");
  const { isLoggedIn } = useAuth();

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [savedCards] = useState<SavedCard[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_CARDS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [savedCardDropdownOpen, setSavedCardDropdownOpen] = useState(false);
  const savedCardRef = useRef<HTMLDivElement>(null);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 11 }, (_, i) => String(currentYear + i));
  }, []);

  // Month dropdown state
  const [monthOpen, setMonthOpen] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);

  // Year dropdown state
  const [yearOpen, setYearOpen] = useState(false);
  const yearRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(e.target as Node)) {
        setMonthOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(e.target as Node)) {
        setYearOpen(false);
      }
      if (
        savedCardRef.current &&
        !savedCardRef.current.contains(e.target as Node)
      ) {
        setSavedCardDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    onUpdate({ cardNumber: digits });
  };

  const handleCvv = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 3);
    onUpdate({ cvv: digits });
  };

  const selectSavedCard = (card: SavedCard) => {
    onUpdate({
      cardNumber: card.cardNumber,
      cvv: card.cvv,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
    });
    setSavedCardDropdownOpen(false);
  };

  const isCardValid = form.cardNumber.length === 16;
  const isCvvValid = form.cvv.length === 3;
  const isExpiryValid = form.expiryMonth !== "" && form.expiryYear !== "";
  const isStep3Valid = isCardValid && isCvvValid && isExpiryValid;

  return (
    <div>
      {/* Step title */}
      <h4 className="border-b border-border px-4 pb-2 pt-4 text-sm font-semibold text-foreground sm:px-6 sm:pb-2.5 sm:pt-6 sm:text-base lg:px-[120px] lg:pb-2.5 lg:pt-[50px] lg:text-lg">
        {t("step3Title")}
      </h4>

      {/* Step body */}
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-[120px] lg:py-[50px]">
        {/* Saved cards dropdown */}
        {savedCards.length > 0 && (
          <div className="mb-4 sm:mb-5 lg:mb-5">
            <p className="mb-1.5 text-[13px] text-foreground sm:mb-2 sm:text-sm lg:mb-2.5 lg:text-lg">
              {t("chooseSavedCard")}
            </p>
            <div ref={savedCardRef} className="relative">
              <button
                type="button"
                onClick={() => setSavedCardDropdownOpen(!savedCardDropdownOpen)}
                className="grid min-h-12 w-full grid-cols-[1fr_35px] items-stretch overflow-hidden rounded-[5px] border border-border bg-background sm:min-h-14 sm:grid-cols-[1fr_40px] lg:min-h-[65px]"
              >
                <span className="self-center px-2.5 text-center text-[13px] text-muted-foreground sm:px-4 sm:text-left sm:text-sm lg:text-lg">
                  {t("chooseSavedCard")}
                </span>
                <span className="flex items-center justify-center border-l border-border bg-turquoise/80">
                  <svg
                    width="17"
                    height="10"
                    viewBox="0 0 17 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(
                      "transition-transform duration-200",
                      savedCardDropdownOpen && "rotate-180"
                    )}
                  >
                    <path
                      d="M0.359375 0.358887L8.11695 8.35889L16.3594 0.358887"
                      stroke="currentColor"
                    />
                  </svg>
                </span>
              </button>

              {savedCardDropdownOpen && (
                <ul className="absolute left-0 right-0 top-full z-10 max-h-[180px] list-none overflow-y-auto rounded-b-[5px] border border-t-0 border-border bg-background shadow-[0_4px_12px_rgba(0,0,0,0.1)] sm:max-h-[220px]">
                  {savedCards.map((card) => (
                    <li key={card.cardNumber}>
                      <button
                        type="button"
                        onClick={() => selectSavedCard(card)}
                        className="block w-full cursor-pointer px-4 py-3 text-left text-[13px] text-foreground transition-all duration-300 hover:bg-turquoise hover:text-white sm:px-5 sm:py-3.5 sm:text-sm lg:text-lg"
                      >
                        {formatCardDisplay(card.cardNumber)}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Card number + CVV row */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:mb-5 sm:grid-cols-[1fr_1fr] sm:gap-4 lg:mb-5 lg:grid-cols-[1fr_200px] lg:gap-10">
          <div>
            <p className="mb-1.5 text-[13px] text-foreground sm:mb-2 sm:text-sm lg:mb-2.5 lg:text-lg">
              <span className="text-turquoise">* </span>
              {t("creditCard")}
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={16}
              value={form.cardNumber}
              onChange={(e) => handleCardNumber(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, card: true }))}
              className={cn(
                inputBase,
                touched.card && !isCardValid && inputError
              )}
            />
            {touched.card && !isCardValid && (
              <p className="mt-1 text-sm text-[#cc0000]" role="alert">
                {t("invalidCard")}
              </p>
            )}
          </div>
          <div>
            <p className="mb-1.5 text-[13px] text-foreground sm:mb-2 sm:text-sm lg:mb-2.5 lg:text-lg">
              <span className="text-turquoise">* </span>
              {t("cvv")}
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={3}
              value={form.cvv}
              onChange={(e) => handleCvv(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, cvv: true }))}
              className={cn(
                inputBase,
                touched.cvv && !isCvvValid && inputError
              )}
            />
            {touched.cvv && !isCvvValid && (
              <p className="mt-1 text-sm text-[#cc0000]" role="alert">
                {t("invalidCvv")}
              </p>
            )}
          </div>
        </div>

        {/* Expiration date */}
        <p className="mb-1.5 text-[13px] text-foreground sm:mb-2 sm:text-sm lg:mb-2.5 lg:text-lg">
          <span className="text-turquoise">* </span>
          {t("expirationDate")}
        </p>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-5 sm:gap-4 lg:gap-10">
          {/* Month dropdown */}
          <div ref={monthRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setMonthOpen(!monthOpen);
                setYearOpen(false);
              }}
              className="grid min-h-12 w-full grid-cols-[1fr_35px] items-stretch overflow-hidden rounded-[5px] border border-border bg-background sm:min-h-14 sm:grid-cols-[1fr_40px] lg:min-h-[65px]"
            >
              <span className="self-center px-2.5 text-center text-[13px] text-muted-foreground sm:px-4 sm:text-sm lg:text-lg">
                {form.expiryMonth || t("month")}
              </span>
              <span className="flex items-center justify-center border-l border-border bg-turquoise/80">
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "transition-transform duration-200",
                    monthOpen && "rotate-180"
                  )}
                >
                  <path
                    d="M0.359375 0.358887L8.11695 8.35889L16.3594 0.358887"
                    stroke="currentColor"
                  />
                </svg>
              </span>
            </button>

            {monthOpen && (
              <ul className="absolute left-0 right-0 top-full z-10 max-h-[180px] list-none overflow-y-auto rounded-b-[5px] border border-t-0 border-border bg-background shadow-[0_4px_12px_rgba(0,0,0,0.1)] sm:max-h-[220px]">
                {MONTHS.map((m) => (
                  <li key={m}>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdate({ expiryMonth: m });
                        setMonthOpen(false);
                      }}
                      className={cn(
                        "block w-full cursor-pointer px-4 py-3 text-left text-[13px] text-foreground transition-all duration-300 hover:bg-turquoise hover:text-white sm:px-5 sm:py-3.5 sm:text-sm lg:text-lg",
                        form.expiryMonth === m && "bg-turquoise text-white"
                      )}
                    >
                      {m}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Year dropdown */}
          <div ref={yearRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setYearOpen(!yearOpen);
                setMonthOpen(false);
              }}
              className="grid min-h-12 w-full grid-cols-[1fr_35px] items-stretch overflow-hidden rounded-[5px] border border-border bg-background sm:min-h-14 sm:grid-cols-[1fr_40px] lg:min-h-[65px]"
            >
              <span className="self-center px-2.5 text-center text-[13px] text-muted-foreground sm:px-4 sm:text-sm lg:text-lg">
                {form.expiryYear || t("year")}
              </span>
              <span className="flex items-center justify-center border-l border-border bg-turquoise/80">
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "transition-transform duration-200",
                    yearOpen && "rotate-180"
                  )}
                >
                  <path
                    d="M0.359375 0.358887L8.11695 8.35889L16.3594 0.358887"
                    stroke="currentColor"
                  />
                </svg>
              </span>
            </button>

            {yearOpen && (
              <ul className="absolute left-0 right-0 top-full z-10 max-h-[180px] list-none overflow-y-auto rounded-b-[5px] border border-t-0 border-border bg-background shadow-[0_4px_12px_rgba(0,0,0,0.1)] sm:max-h-[220px]">
                {years.map((y) => (
                  <li key={y}>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdate({ expiryYear: y });
                        setYearOpen(false);
                      }}
                      className={cn(
                        "block w-full cursor-pointer px-4 py-3 text-left text-[13px] text-foreground transition-all duration-300 hover:bg-turquoise hover:text-white sm:px-5 sm:py-3.5 sm:text-sm lg:text-lg",
                        form.expiryYear === y && "bg-turquoise text-white"
                      )}
                    >
                      {y}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Save card checkbox (only for logged-in users) */}
        {isLoggedIn && (
          <label className="mb-5 flex cursor-pointer items-center gap-2.5 sm:mb-7 sm:gap-3 lg:mb-[50px] lg:gap-5">
            <input
              type="checkbox"
              checked={form.saveCard}
              onChange={(e) => onUpdate({ saveCard: e.target.checked })}
              className="h-[22px] w-[22px] cursor-pointer appearance-none rounded-[5px] border border-border bg-background transition-all duration-300 checked:border-turquoise checked:bg-turquoise checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27white%27%20stroke-width=%273%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpolyline%20points=%2720%206%209%2017%204%2012%27%3E%3C/polyline%3E%3C/svg%3E')] checked:bg-[length:14px] checked:bg-center checked:bg-no-repeat sm:h-6 sm:w-6 lg:h-[30px] lg:w-[30px] lg:checked:bg-[length:16px]"
            />
            <span className="text-[13px] text-foreground sm:text-sm lg:text-lg">
              {t("saveCardLabel")}
            </span>
          </label>
        )}

        {/* Navigation */}
        <div className="mt-5 flex flex-col items-center gap-4 sm:mt-7 lg:mt-[50px] lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-5">
          {/* Pagination dots */}
          <div className="flex items-center gap-2.5 lg:order-1">
            {[1, 2, 3].map((step) => (
              <span
                key={step}
                className={cn(
                  "h-1.5 w-1.5 rounded-full border border-turquoise sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5",
                  step <= currentStep ? "bg-turquoise" : "bg-transparent"
                )}
              />
            ))}
          </div>

          {/* Back link */}
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer text-[13px] font-semibold text-turquoise underline transition-colors duration-300 hover:text-turquoise-hover sm:text-sm lg:order-2 lg:justify-self-center lg:text-lg"
          >
            {t("back")}
          </button>

          {/* Complete Donation button (orange) */}
          <button
            type="button"
            onClick={onComplete}
            disabled={isSubmitting || !isStep3Valid}
            className={cn(
              "flex w-full min-w-0 items-center justify-center gap-2 rounded-[5px] bg-orange px-5 py-4 text-sm font-semibold uppercase text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base lg:order-3 lg:w-auto lg:min-w-[200px] lg:gap-2.5 lg:px-6 lg:py-[26px] lg:text-lg",
              !isSubmitting && isStep3Valid
                ? "cursor-pointer hover:brightness-105 hover:shadow-[0_4px_30px_0_rgba(245,128,33,0.3)]"
                : ""
            )}
          >
            <span>{t("completeDonation")}</span>
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

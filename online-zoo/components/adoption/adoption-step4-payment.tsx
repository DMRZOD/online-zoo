"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { FadeIn } from "@/components/ui/motion-wrapper";
import { SAVED_CARDS_KEY } from "@/lib/constants";
import type { SavedCard } from "@/types/api";
import type {
  AdoptionFormState,
  AdoptionTranslations,
} from "./adoption-client";

const inputBase =
  "w-full rounded-[5px] border border-border bg-background px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-100 focus:border-turquoise focus:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] focus:outline-none sm:px-4 sm:py-4 sm:text-base lg:min-h-[60px] lg:px-5 lg:py-[17px] lg:text-lg";

const inputError =
  "border-[#cc0000] bg-[rgba(204,0,0,0.05)] dark:border-[#f56565] dark:bg-[rgba(245,101,101,0.08)]";

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

function formatCardDisplay(cardNumber: string): string {
  return `${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(12)}`;
}

const TIER_NAMES: Record<string, string> = {
  cub: "Cub",
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
};

interface AdoptionStep4Props {
  form: AdoptionFormState;
  translations: AdoptionTranslations;
  onUpdate: (updates: Partial<AdoptionFormState>) => void;
  onBack: () => void;
  onComplete: () => void;
}

export default function AdoptionStep4Payment({
  form,
  translations: t,
  onUpdate,
  onBack,
  onComplete,
}: AdoptionStep4Props) {
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

  const [monthOpen, setMonthOpen] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);
  const [yearOpen, setYearOpen] = useState(false);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(e.target as Node))
        setMonthOpen(false);
      if (yearRef.current && !yearRef.current.contains(e.target as Node))
        setYearOpen(false);
      if (
        savedCardRef.current &&
        !savedCardRef.current.contains(e.target as Node)
      )
        setSavedCardDropdownOpen(false);
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
  const isValid = isCardValid && isCvvValid && isExpiryValid;

  return (
    <div>
      <div className="mx-auto max-w-[700px]">
        <FadeIn className="mb-6 sm:mb-8">
          <h2 className="text-[22px] font-bold text-turquoise dark:text-foreground sm:text-[28px] lg:text-[32px]">
            {t.step4.title}
          </h2>
        </FadeIn>
        {/* Order summary */}
        <div className="mb-6 rounded-[10px] bg-turquoise/5 p-4 dark:bg-dark-surface sm:mb-8 sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-foreground sm:text-lg">
            {t.step4.summary}
          </h3>
          <div className="flex justify-between text-sm text-foreground/70 sm:text-base">
            <span>
              {t.step4.animal}: {form.petName}
            </span>
            <span>{TIER_NAMES[form.tierId] ?? form.tierId}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-semibold text-foreground sm:text-lg">
            <span>{t.step4.total}</span>
            <span>${form.tierPrice}</span>
          </div>
        </div>

        {/* Saved cards dropdown */}
        {savedCards.length > 0 && (
          <div className="mb-4 sm:mb-5">
            <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
              {t.step4.chooseSavedCard}
            </p>
            <div ref={savedCardRef} className="relative">
              <button
                type="button"
                onClick={() => setSavedCardDropdownOpen(!savedCardDropdownOpen)}
                className="grid min-h-12 w-full grid-cols-[1fr_35px] items-stretch overflow-hidden rounded-[5px] border border-border bg-background sm:min-h-14 sm:grid-cols-[1fr_40px] lg:min-h-[65px]"
              >
                <span className="self-center px-2.5 text-center text-sm text-muted-foreground sm:px-4 sm:text-left sm:text-base lg:text-lg">
                  {t.step4.chooseSavedCard}
                </span>
                <span className="flex items-center justify-center border-l border-border bg-turquoise/80">
                  <svg
                    width="17"
                    height="10"
                    viewBox="0 0 17 10"
                    fill="none"
                    className={cn(
                      "transition-transform duration-200",
                      savedCardDropdownOpen && "rotate-180",
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
                <ul className="absolute left-0 right-0 top-full z-10 max-h-[180px] list-none overflow-y-auto rounded-b-[5px] border border-t-0 border-border bg-background shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                  {savedCards.map((card) => (
                    <li key={card.cardNumber}>
                      <button
                        type="button"
                        onClick={() => selectSavedCard(card)}
                        className="block w-full cursor-pointer px-4 py-3 text-left text-sm text-foreground transition-all duration-300 hover:bg-turquoise hover:text-white sm:px-5 sm:py-3.5 sm:text-base lg:text-lg"
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

        {/* Card number + CVV */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:mb-5 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_200px] lg:gap-10">
          <div>
            <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
              <span className="text-turquoise">* </span>
              {t.step4.creditCard}
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
                touched.card && !isCardValid && inputError,
              )}
            />
            {touched.card && !isCardValid && (
              <p
                className="mt-1 text-sm text-[#cc0000] dark:text-[#f56565]"
                role="alert"
              >
                {t.step4.invalidCard}
              </p>
            )}
          </div>
          <div>
            <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
              <span className="text-turquoise">* </span>
              {t.step4.cvv}
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
                touched.cvv && !isCvvValid && inputError,
              )}
            />
            {touched.cvv && !isCvvValid && (
              <p
                className="mt-1 text-sm text-[#cc0000] dark:text-[#f56565]"
                role="alert"
              >
                {t.step4.invalidCvv}
              </p>
            )}
          </div>
        </div>

        {/* Expiration date */}
        <p className="mb-1.5 text-sm text-foreground sm:text-base lg:text-lg">
          <span className="text-turquoise">* </span>
          {t.step4.expirationDate}
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
              <span className="self-center px-2.5 text-center text-sm text-muted-foreground sm:px-4 sm:text-base lg:text-lg">
                {form.expiryMonth || t.step4.month}
              </span>
              <span className="flex items-center justify-center border-l border-border bg-turquoise/80">
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  className={cn(
                    "transition-transform duration-200",
                    monthOpen && "rotate-180",
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
              <ul className="absolute left-0 right-0 top-full z-10 max-h-[180px] list-none overflow-y-auto rounded-b-[5px] border border-t-0 border-border bg-background shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                {MONTHS.map((m) => (
                  <li key={m}>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdate({ expiryMonth: m });
                        setMonthOpen(false);
                      }}
                      className={cn(
                        "block w-full cursor-pointer px-4 py-3 text-left text-sm text-foreground transition-all duration-300 hover:bg-turquoise hover:text-white sm:px-5 sm:py-3.5 sm:text-base lg:text-lg",
                        form.expiryMonth === m && "bg-turquoise text-white",
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
              <span className="self-center px-2.5 text-center text-sm text-muted-foreground sm:px-4 sm:text-base lg:text-lg">
                {form.expiryYear || t.step4.year}
              </span>
              <span className="flex items-center justify-center border-l border-border bg-turquoise/80">
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  className={cn(
                    "transition-transform duration-200",
                    yearOpen && "rotate-180",
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
              <ul className="absolute left-0 right-0 top-full z-10 max-h-[180px] list-none overflow-y-auto rounded-b-[5px] border border-t-0 border-border bg-background shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                {years.map((y) => (
                  <li key={y}>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdate({ expiryYear: y });
                        setYearOpen(false);
                      }}
                      className={cn(
                        "block w-full cursor-pointer px-4 py-3 text-left text-sm text-foreground transition-all duration-300 hover:bg-turquoise hover:text-white sm:px-5 sm:py-3.5 sm:text-base lg:text-lg",
                        form.expiryYear === y && "bg-turquoise text-white",
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

        {/* Save card checkbox */}
        {isLoggedIn && (
          <label className="mb-5 flex cursor-pointer items-center gap-2.5 sm:mb-7 sm:gap-3">
            <input
              type="checkbox"
              checked={form.saveCard}
              onChange={(e) => onUpdate({ saveCard: e.target.checked })}
              className="h-[22px] w-[22px] cursor-pointer appearance-none rounded-[5px] border border-border bg-background transition-all duration-300 checked:border-turquoise checked:bg-turquoise checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27white%27%20stroke-width=%273%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpolyline%20points=%2720%206%209%2017%204%2012%27%3E%3C/polyline%3E%3C/svg%3E')] checked:bg-[length:14px] checked:bg-center checked:bg-no-repeat sm:h-6 sm:w-6"
            />
            <span className="text-sm text-foreground sm:text-base lg:text-lg">
              {t.step4.saveCard}
            </span>
          </label>
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
            onClick={onComplete}
            disabled={!isValid}
            className={cn(
              "flex items-center gap-2 rounded-xl bg-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-300 sm:gap-2.5 sm:px-8 sm:py-3.5 sm:text-base",
              isValid
                ? "cursor-pointer hover:bg-orange-hover hover:shadow-[0_4px_20px_0_rgba(245,128,33,0.25)]"
                : "cursor-not-allowed opacity-50",
            )}
          >
            <span>{t.step4.completeAdoption}</span>
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

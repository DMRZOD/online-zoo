"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Pet } from "@/types/api";

const PRESET_AMOUNTS = [10, 20, 30, 50, 80, 100];

interface DonationStep1Props {
  form: {
    amount: number;
    customAmount: string;
    petId: number | null;
    petName: string;
    isMonthly: boolean;
  };
  pets: Pet[];
  onUpdate: (updates: Record<string, unknown>) => void;
  onNext: () => void;
  currentStep: number;
}

export default function DonationStep1({
  form,
  pets,
  onUpdate,
  onNext,
  currentStep,
}: DonationStep1Props) {
  const t = useTranslations("donationPopup");
  const [isOtherActive, setIsOtherActive] = useState(
    !PRESET_AMOUNTS.includes(form.amount) && form.amount > 0,
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectPreset = (amount: number) => {
    setIsOtherActive(false);
    onUpdate({ amount, customAmount: "" });
  };

  const activateOther = () => {
    setIsOtherActive(true);
    onUpdate({ amount: form.customAmount ? Number(form.customAmount) : 0 });
  };

  const handleCustomAmount = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, "");
    onUpdate({ customAmount: cleaned, amount: cleaned ? Number(cleaned) : 0 });
  };

  const isStep1Valid = form.amount > 0 && form.petId !== null;

  const selectPet = (pet: Pet) => {
    onUpdate({ petId: pet.id, petName: pet.commonName });
    setDropdownOpen(false);
  };

  return (
    <div>
      {/* Step title */}
      <h4 className="border-b border-border px-4 pb-2 pt-4 text-sm font-semibold text-foreground sm:px-6 sm:pb-2.5 sm:pt-6 sm:text-base lg:px-[120px] lg:pb-2.5 lg:pt-[50px] lg:text-lg">
        {t("step1Title")}
      </h4>

      {/* Step body */}
      <div className="px-2.5 py-2.5 sm:px-[77px] sm:py-[77px] lg:px-[120px] lg:py-[50px]">
        {/* Label */}
        <p className="mb-1.5 text-[13px] text-foreground sm:mb-2 sm:text-sm lg:mb-2.5 lg:text-lg">
          <span className="text-turquoise">* </span>
          {t("chooseAmount")}
        </p>

        {/* Amount buttons grid */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:mb-6 sm:grid-cols-3 sm:gap-4 lg:mb-10 lg:grid-cols-6 lg:gap-5">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => selectPreset(amt)}
              className={cn(
                "min-h-12 cursor-pointer rounded-[5px] text-sm font-semibold uppercase transition-all duration-300 sm:min-h-14 sm:text-base lg:min-h-[65px] lg:text-lg",
                !isOtherActive && form.amount === amt
                  ? "bg-turquoise text-white"
                  : "bg-turquoise/50 hover:bg-turquoise text-white",
              )}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Other amount row */}
        <div className="mb-5 grid grid-cols-2 md:grid-cols-[200px_200px] gap-3 sm:gap-4 lg:gap-10 sm:mb-6 lg:mb-10">
          <button
            type="button"
            onClick={activateOther}
            className={cn(
              "min-h-12 cursor-pointer rounded-[5px] text-sm font-semibold uppercase transition-all duration-300 sm:min-h-14 sm:text-base lg:min-h-[65px] lg:text-lg",
              isOtherActive
                ? "bg-turquoise text-white"
                : "bg-turquoise/50 hover:bg-turquoise text-white",
            )}
          >
            {t("otherAmount")}
          </button>
          <input
            type="text"
            inputMode="numeric"
            value={form.customAmount}
            onChange={(e) => handleCustomAmount(e.target.value)}
            onFocus={activateOther}
            className="min-h-12 rounded-[5px] border border-border bg-transparent px-3 text-sm text-foreground transition-all duration-100 placeholder:text-muted-foreground focus:border-turquoise focus:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] focus:outline-none sm:min-h-14 sm:px-4 sm:text-base lg:min-h-[65px] lg:px-5 lg:text-lg"
          />
        </div>

        {/* For special pet row */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-6 sm:gap-4 lg:mb-10 lg:grid-cols-[200px_minmax(200px,1fr)] lg:gap-10">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cn(
              "min-h-12 w-[200px] justify-self-center md:justify-self-start cursor-pointer rounded-[5px] text-sm font-semibold uppercase transition-all duration-300 sm:min-h-14 sm:text-base lg:min-h-[65px] lg:text-lg",
              form.petId
                ? "bg-turquoise text-white"
                : "bg-turquoise/50 text-white hover:bg-turquoise",
            )}
          >
            {t("forSpecialPet")}
          </button>

          {/* Custom dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="grid min-h-12 w-full grid-cols-[1fr_35px] items-stretch overflow-hidden rounded-[5px] border border-border bg-background sm:min-h-14 sm:grid-cols-[1fr_40px] lg:min-h-[65px]"
            >
              <span className="self-center px-2.5 text-center text-[13px] text-muted-foreground sm:px-4 sm:text-left sm:text-sm lg:text-lg">
                {form.petName || t("chooseFavourite")}
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
                    dropdownOpen && "rotate-180",
                  )}
                >
                  <path
                    d="M0.359375 0.358887L8.11695 8.35889L16.3594 0.358887"
                    stroke="currentColor"
                  />
                </svg>
              </span>
            </button>

            {/* Dropdown list */}
            {dropdownOpen && (
              <ul className="absolute left-0 right-0 top-full z-10 max-h-[180px] list-none overflow-y-auto rounded-b-[5px] border border-t-0 border-border bg-background shadow-[0_4px_12px_rgba(0,0,0,0.1)] scrollbar-thin sm:max-h-[220px]">
                {pets.map((pet) => (
                  <li key={pet.id}>
                    <button
                      type="button"
                      onClick={() => selectPet(pet)}
                      className={cn(
                        "block w-full cursor-pointer px-4 py-3 text-left text-[13px] text-foreground transition-all duration-300 hover:bg-turquoise hover:text-white sm:px-5 sm:py-3.5 sm:text-sm lg:text-lg",
                        form.petId === pet.id && "bg-turquoise text-white",
                      )}
                    >
                      {pet.commonName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Monthly recurring checkbox */}
        <label className="mb-5 flex cursor-pointer items-center gap-2.5 sm:mb-7 sm:gap-3 lg:mb-[50px] lg:gap-5">
          <input
            type="checkbox"
            checked={form.isMonthly}
            onChange={(e) => onUpdate({ isMonthly: e.target.checked })}
            className="h-[22px] w-[22px] cursor-pointer appearance-none rounded-[5px] border border-border bg-background transition-all duration-300 checked:border-turquoise checked:bg-turquoise checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27white%27%20stroke-width=%273%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpolyline%20points=%2720%206%209%2017%204%2012%27%3E%3C/polyline%3E%3C/svg%3E')] checked:bg-[length:14px] checked:bg-center checked:bg-no-repeat sm:h-6 sm:w-6 lg:h-[30px] lg:w-[30px] lg:checked:bg-[length:16px]"
          />
          <span className="text-[13px] text-foreground sm:text-sm lg:text-lg">
            {t("monthlyGift")}
          </span>
        </label>

        {/* Navigation */}
        <div className="mt-5 flex flex-col items-center gap-4 sm:mt-[50px] sm:flex-row justify-between sm:gap-5">
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

          {/* Next button */}
          <button
            type="button"
            onClick={onNext}
            disabled={!isStep1Valid}
            className={cn(
              "flex w-full min-w-0 items-center justify-center gap-2 rounded-[5px] bg-turquoise px-5 py-4 text-sm font-semibold uppercase text-white transition-all duration-300 sm:text-base order-1 sm:order-3 sm:w-[213px] sm:min-w-[200px] lg:gap-2.5 lg:px-6 lg:py-[26px] lg:text-lg",
              isStep1Valid
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

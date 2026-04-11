"use client";

import { cn } from "@/lib/utils";

interface StepperTranslations {
  selectAnimal: string;
  selectLevel: string;
  yourDetails: string;
  securePayment: string;
  certificate: string;
}

interface AdoptionStepperProps {
  currentStep: number;
  translations: StepperTranslations;
}

const STEPS = [
  "selectAnimal",
  "selectLevel",
  "yourDetails",
  "securePayment",
  "certificate",
] as const;

export default function AdoptionStepper({
  currentStep,
  translations: t,
}: AdoptionStepperProps) {
  return (
    <div className="mb-8 overflow-x-auto sm:mb-12">
      <div className="flex min-w-[500px] items-center">
        {STEPS.map((key, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={key} className={cn("flex items-center", i < STEPS.length - 1 ? "flex-1" : "shrink-0")}>
              <div className="flex flex-1 flex-col items-center gap-2">
                {/* Step circle */}
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300 sm:h-10 sm:w-10 sm:text-base",
                    isActive
                      ? "border-turquoise bg-turquoise text-white"
                      : isCompleted
                        ? "border-turquoise bg-turquoise/10 text-turquoise"
                        : "border-border text-foreground/40",
                  )}
                >
                  {isCompleted ? (
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                      className="text-turquoise"
                    >
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                {/* Label */}
                <span
                  className={cn(
                    "text-center text-[11px] font-medium leading-tight sm:text-xs",
                    isActive
                      ? "font-semibold text-turquoise"
                      : isCompleted
                        ? "text-turquoise"
                        : "text-foreground/40",
                  )}
                >
                  {t[key]}
                </span>
              </div>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-0.5 w-full sm:mx-2",
                    stepNum < currentStep ? "bg-turquoise" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

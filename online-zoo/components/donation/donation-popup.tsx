"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { useDonationPopup } from "./donation-context";
import DonationStep1 from "./donation-step1";
import DonationStep2 from "./donation-step2";
import DonationStep3 from "./donation-step3";
import { useAuth } from "@/hooks/use-auth";
import { getPets, submitDonation } from "@/lib/api/endpoints";
import { TOKEN_KEY, SAVED_CARDS_KEY } from "@/lib/constants";
import type { Pet, SavedCard } from "@/types/api";

interface FormState {
  amount: number;
  customAmount: string;
  petId: number | null;
  petName: string;
  isMonthly: boolean;
  name: string;
  email: string;
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  saveCard: boolean;
}

const initialFormState: FormState = {
  amount: 0,
  customAmount: "",
  petId: null,
  petName: "",
  isMonthly: false,
  name: "",
  email: "",
  cardNumber: "",
  cvv: "",
  expiryMonth: "",
  expiryYear: "",
  saveCard: false,
};

export default function DonationPopup() {
  const { isOpen, initialPetId, initialPetName, closeDonation } =
    useDonationPopup();
  const { user } = useAuth();
  const t = useTranslations("donationPopup");

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const updateForm = useCallback((updates: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setForm({
        ...initialFormState,
        petId: initialPetId,
        petName: initialPetName,
        name: user?.name ?? "",
        email: user?.email ?? "",
      });

      getPets().then((result) => {
        if (result.ok) setPets(result.data.data);
      });
    }
  }, [isOpen, initialPetId, initialPetName, user]);

  // Body scroll lock + ESC key
  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDonation();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeDonation]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, 3) as 1 | 2 | 3);
  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1) as 1 | 2 | 3);

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem(TOKEN_KEY) ?? undefined;
      const result = await submitDonation(
        {
          name: form.name,
          email: form.email,
          amount: form.amount,
          petId: form.petId ?? 0,
        },
        token
      );

      if (result.ok) {
        // Save card to localStorage if checkbox was checked
        if (form.saveCard && form.cardNumber) {
          const newCard: SavedCard = {
            cardNumber: form.cardNumber,
            expiryMonth: form.expiryMonth,
            expiryYear: form.expiryYear,
            cvv: form.cvv,
          };
          try {
            const existing: SavedCard[] = JSON.parse(
              localStorage.getItem(SAVED_CARDS_KEY) ?? "[]",
            );
            const filtered = existing.filter(
              (c) => c.cardNumber !== newCard.cardNumber,
            );
            filtered.push(newCard);
            localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(filtered));
          } catch {
            /* ignore */
          }
        }

        setToast({
          message: t("successToast", {
            amount: form.amount,
            petName: form.petName || "the zoo",
          }),
          isError: false,
        });
        closeDonation();
      } else {
        setToast({ message: t("errorToast"), isError: true });
      }
    } catch {
      setToast({ message: t("errorToast"), isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
            onClick={() => setToast(null)}
            className={`fixed left-1/2 top-0 z-[4000] -translate-x-1/2 cursor-pointer rounded-b-[5px] px-6 py-4 text-center font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] ${
              toast.isError ? "bg-[#cc0000]" : "bg-turquoise"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[3000] grid place-items-center p-3 sm:p-4 lg:p-5"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 cursor-pointer bg-black/60"
              onClick={closeDonation}
            />

            {/* Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-[920px] overflow-hidden rounded-[5px] bg-background text-foreground shadow-[0_4px_50px_rgba(0,0,0,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Orange header */}
              <div className="flex h-16 items-center justify-center bg-orange px-4 sm:h-20 lg:h-[135px]">
                <h3 className="text-center text-lg font-medium uppercase text-white sm:text-[22px] sm:leading-tight lg:text-[42px] lg:font-medium">
                  {t("headerTitle")}
                </h3>
              </div>

              {/* Scrollable body */}
              <div className="max-h-[calc(100vh-120px)] overflow-y-auto sm:max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-200px)]">
                {currentStep === 1 && (
                  <DonationStep1
                    form={form}
                    pets={pets}
                    onUpdate={updateForm}
                    onNext={handleNext}
                    currentStep={currentStep}
                  />
                )}
                {currentStep === 2 && (
                  <DonationStep2
                    form={form}
                    onUpdate={updateForm}
                    onNext={handleNext}
                    onBack={handleBack}
                    currentStep={currentStep}
                  />
                )}
                {currentStep === 3 && (
                  <DonationStep3
                    form={form}
                    onUpdate={updateForm}
                    onBack={handleBack}
                    onComplete={handleComplete}
                    isSubmitting={isSubmitting}
                    currentStep={currentStep}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

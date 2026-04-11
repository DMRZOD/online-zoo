"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@/i18n/navigation";
import { ADOPTIONS_KEY } from "@/lib/constants";
import type { Pet, AdoptionRecord, SavedCard } from "@/types/api";
import type { PetAssetMap } from "@/types/pet";
import { SAVED_CARDS_KEY } from "@/lib/constants";
import AdoptionLanding from "./adoption-landing";
import AdoptionStepper from "./adoption-stepper";
import AdoptionStep1Animal from "./adoption-step1-animal";
import AdoptionStep2Level from "./adoption-step2-level";
import AdoptionStep3Details from "./adoption-step3-details";
import AdoptionStep4Payment from "./adoption-step4-payment";
import AdoptionStep5Certificate from "./adoption-step5-certificate";

export interface AdoptionFormState {
  petId: number | null;
  petName: string;
  petImage: string;
  tierId: string;
  tierPrice: number;
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  isGift: boolean;
  recipientName: string;
  giftMessage: string;
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  saveCard: boolean;
}

const initialFormState: AdoptionFormState = {
  petId: null,
  petName: "",
  petImage: "",
  tierId: "",
  tierPrice: 0,
  name: "",
  email: "",
  address: "",
  city: "",
  postcode: "",
  isGift: false,
  recipientName: "",
  giftMessage: "",
  cardNumber: "",
  cvv: "",
  expiryMonth: "",
  expiryYear: "",
  saveCard: false,
};

export interface AdoptionTranslations {
  pageTitle: string;
  heroTitle: string;
  heroText: string;
  heroTextExtended: string;
  adoptOnline: string;
  keepInTouch: string;
  keepInTouchText: string;
  fromRibbits: string;
  fromRibbitsText: string;
  yourAdoptions: string;
  adoptedOn: string;
  level: string;
  stepper: {
    selectAnimal: string;
    selectLevel: string;
    yourDetails: string;
    securePayment: string;
    certificate: string;
  };
  step1: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    adopt: string;
    showMore: string;
  };
  step2: {
    title: string;
    chosenAnimal: string;
    cub: string;
    bronze: string;
    silver: string;
    gold: string;
    includes: string;
    certificate: string;
    factSheet: string;
    cuddlyToy: string;
    tour: string;
    bookmark: string;
    pen: string;
    activities: string;
    bestValue: string;
  };
  step3: {
    title: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    address: string;
    addressPlaceholder: string;
    city: string;
    cityPlaceholder: string;
    postcode: string;
    postcodePlaceholder: string;
    isGift: string;
    recipientName: string;
    recipientPlaceholder: string;
    giftMessage: string;
    giftMessagePlaceholder: string;
  };
  step4: {
    title: string;
    creditCard: string;
    cvv: string;
    expirationDate: string;
    month: string;
    year: string;
    saveCard: string;
    chooseSavedCard: string;
    completeAdoption: string;
    invalidCard: string;
    invalidCvv: string;
    summary: string;
    animal: string;
    total: string;
  };
  step5: {
    title: string;
    subtitle: string;
    certificateTitle: string;
    certifiedText: string;
    hasAdopted: string;
    atLevel: string;
    dateLabel: string;
    printCertificate: string;
    backToAdoption: string;
    adoptAnother: string;
  };
  validation: {
    invalidName: string;
    invalidEmail: string;
    required: string;
  };
  auth: {
    signInRequired: string;
    signInText: string;
    signIn: string;
    register: string;
  };
  back: string;
  next: string;
}

interface AdoptionClientProps {
  pets: Pet[];
  assets: PetAssetMap;
  translations: AdoptionTranslations;
}

export default function AdoptionClient({
  pets,
  assets,
  translations: t,
}: AdoptionClientProps) {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  // 0 = landing, 1-5 = flow steps
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<AdoptionFormState>(initialFormState);
  const [viewingAdoption, setViewingAdoption] = useState<AdoptionRecord | null>(null);
  const [adoptions, setAdoptions] = useState<AdoptionRecord[]>(() => {
    try {
      const raw = localStorage.getItem(ADOPTIONS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const updateForm = useCallback((updates: Partial<AdoptionFormState>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleStartAdoption = () => {
    if (!isLoggedIn) {
      router.push("/sign-in");
      return;
    }
    setForm({
      ...initialFormState,
      name: user?.name ?? "",
      email: user?.email ?? "",
    });
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setCurrentStep((s) => Math.min(s + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = () => {
    // Save card if checked
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

    // Create adoption record
    const newAdoption: AdoptionRecord = {
      id: crypto.randomUUID(),
      petId: form.petId!,
      petName: form.petName,
      petImage: form.petImage,
      tierId: form.tierId,
      tierPrice: form.tierPrice,
      adopterName: form.name,
      adopterEmail: form.email,
      address: `${form.address}, ${form.city}, ${form.postcode}`,
      giftMessage: form.giftMessage,
      isGift: form.isGift,
      recipientName: form.recipientName,
      createdAt: new Date().toISOString(),
    };

    const updated = [...adoptions, newAdoption];
    localStorage.setItem(ADOPTIONS_KEY, JSON.stringify(updated));
    setAdoptions(updated);

    // Move to certificate step
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToLanding = () => {
    setCurrentStep(0);
    setForm(initialFormState);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewCertificate = (adoption: AdoptionRecord) => {
    setViewingAdoption(adoption);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromViewing = () => {
    setViewingAdoption(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Viewing an existing adoption certificate
  if (viewingAdoption) {
    return (
      <section className="min-h-screen pb-[50px] pt-[30px] sm:pb-[80px] sm:pt-[40px] lg:pb-[100px] lg:pt-[50px]">
        <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
          <AdoptionStep5Certificate
            adoption={viewingAdoption}
            translations={t}
            onBackToLanding={handleBackFromViewing}
            viewOnly
          />
        </div>
      </section>
    );
  }

  // Landing page
  if (currentStep === 0) {
    return (
      <AdoptionLanding
        translations={t}
        adoptions={adoptions}
        isLoggedIn={isLoggedIn}
        onStartAdoption={handleStartAdoption}
        onViewCertificate={handleViewCertificate}
      />
    );
  }

  // Multi-step flow
  return (
    <section className="min-h-screen pb-[50px] pt-[30px] sm:pb-[80px] sm:pt-[40px] lg:pb-[100px] lg:pt-[50px]">
      <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
        <AdoptionStepper currentStep={currentStep} translations={t.stepper} />

        {currentStep === 1 && (
          <AdoptionStep1Animal
            pets={pets}
            assets={assets}
            form={form}
            translations={t}
            onUpdate={updateForm}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <AdoptionStep2Level
            form={form}
            translations={t}
            onUpdate={updateForm}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <AdoptionStep3Details
            form={form}
            translations={t}
            onUpdate={updateForm}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <AdoptionStep4Payment
            form={form}
            translations={t}
            onUpdate={updateForm}
            onBack={handleBack}
            onComplete={handleComplete}
          />
        )}
        {currentStep === 5 && (
          <AdoptionStep5Certificate
            form={form}
            translations={t}
            onBackToLanding={handleBackToLanding}
            onAdoptAnother={handleStartAdoption}
          />
        )}
      </div>
    </section>
  );
}

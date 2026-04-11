import { connection } from "next/server";
import { getTranslations } from "next-intl/server";
import { getPets } from "@/lib/api/endpoints";
import petData from "@/data/data.json";
import type { PetAssetMap } from "@/types/pet";
import AdoptionClient from "@/components/adoption/adoption-client";

const assets: PetAssetMap = petData as PetAssetMap;

export default async function AdoptionPage() {
  await connection();
  const t = await getTranslations("adoption");
  const result = await getPets();
  const pets = result.ok ? result.data.data : [];

  const translations = {
    pageTitle: t("pageTitle"),
    heroTitle: t("heroTitle"),
    heroText: t("heroText"),
    heroTextExtended: t("heroTextExtended"),
    adoptOnline: t("adoptOnline"),
    keepInTouch: t("keepInTouch"),
    keepInTouchText: t("keepInTouchText"),
    fromRibbits: t("fromRibbits"),
    fromRibbitsText: t("fromRibbitsText"),
    yourAdoptions: t("yourAdoptions"),
    adoptedOn: t("adoptedOn"),
    level: t("level"),
    stepper: {
      selectAnimal: t("stepper.selectAnimal"),
      selectLevel: t("stepper.selectLevel"),
      yourDetails: t("stepper.yourDetails"),
      securePayment: t("stepper.securePayment"),
      certificate: t("stepper.certificate"),
    },
    step1: {
      title: t("step1.title"),
      subtitle: t("step1.subtitle"),
      searchPlaceholder: t("step1.searchPlaceholder"),
      adopt: t("step1.adopt"),
      showMore: t("step1.showMore"),
    },
    step2: {
      title: t("step2.title"),
      chosenAnimal: t("step2.chosenAnimal"),
      cub: t("step2.cub"),
      bronze: t("step2.bronze"),
      silver: t("step2.silver"),
      gold: t("step2.gold"),
      includes: t("step2.includes"),
      certificate: t("step2.certificate"),
      factSheet: t("step2.factSheet"),
      cuddlyToy: t("step2.cuddlyToy"),
      tour: t("step2.tour"),
      bookmark: t("step2.bookmark"),
      pen: t("step2.pen"),
      activities: t("step2.activities"),
      bestValue: t("step2.bestValue"),
    },
    step3: {
      title: t("step3.title"),
      name: t("step3.name"),
      namePlaceholder: t("step3.namePlaceholder"),
      email: t("step3.email"),
      emailPlaceholder: t("step3.emailPlaceholder"),
      address: t("step3.address"),
      addressPlaceholder: t("step3.addressPlaceholder"),
      city: t("step3.city"),
      cityPlaceholder: t("step3.cityPlaceholder"),
      postcode: t("step3.postcode"),
      postcodePlaceholder: t("step3.postcodePlaceholder"),
      isGift: t("step3.isGift"),
      recipientName: t("step3.recipientName"),
      recipientPlaceholder: t("step3.recipientPlaceholder"),
      giftMessage: t("step3.giftMessage"),
      giftMessagePlaceholder: t("step3.giftMessagePlaceholder"),
    },
    step4: {
      title: t("step4.title"),
      creditCard: t("step4.creditCard"),
      cvv: t("step4.cvv"),
      expirationDate: t("step4.expirationDate"),
      month: t("step4.month"),
      year: t("step4.year"),
      saveCard: t("step4.saveCard"),
      chooseSavedCard: t("step4.chooseSavedCard"),
      completeAdoption: t("step4.completeAdoption"),
      invalidCard: t("step4.invalidCard"),
      invalidCvv: t("step4.invalidCvv"),
      summary: t("step4.summary"),
      animal: t("step4.animal"),
      total: t("step4.total"),
    },
    step5: {
      title: t("step5.title"),
      subtitle: t("step5.subtitle"),
      certificateTitle: t("step5.certificateTitle"),
      certifiedText: t("step5.certifiedText"),
      hasAdopted: t("step5.hasAdopted"),
      atLevel: t("step5.atLevel"),
      dateLabel: t("step5.dateLabel"),
      printCertificate: t("step5.printCertificate"),
      backToAdoption: t("step5.backToAdoption"),
      adoptAnother: t("step5.adoptAnother"),
    },
    validation: {
      invalidName: t("validation.invalidName"),
      invalidEmail: t("validation.invalidEmail"),
      required: t("validation.required"),
    },
    auth: {
      signInRequired: t("auth.signInRequired"),
      signInText: t("auth.signInText"),
      signIn: t("auth.signIn"),
      register: t("auth.register"),
    },
    back: t("back"),
    next: t("next"),
  };

  return <AdoptionClient pets={pets} assets={assets} translations={translations} />;
}

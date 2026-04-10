import { connection } from "next/server";
import { getTranslations } from "next-intl/server";
import { getPets } from "@/lib/api/endpoints";
import petData from "@/data/data.json";
import type { PetAssetMap } from "@/types/pet";
import MeetTheAnimalsClient from "@/components/meet-the-animals/meet-the-animals-client";

const assets: PetAssetMap = petData as PetAssetMap;

export default async function MeetTheAnimalsPage() {
  await connection();
  const t = await getTranslations("meetTheAnimals");
  const result = await getPets();
  const pets = result.ok ? result.data.data : [];

  const translations = {
    title: t("title"),
    description: t("description"),
    searchLabel: t("searchLabel"),
    searchPlaceholder: t("searchPlaceholder"),
    all: t("all"),
    showMore: t("showMore"),
    noResults: t("noResults"),
  };

  return (
    <MeetTheAnimalsClient
      pets={pets}
      assets={assets}
      translations={translations}
    />
  );
}

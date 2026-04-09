import { connection } from "next/server";
import { getTranslations } from "next-intl/server";
import { getPets, getPetById, getCameras } from "@/lib/api/endpoints";
import petData from "@/data/data.json";
import type { PetAssetMap } from "@/types/pet";
import AnimalsPageClient from "@/components/animals/animals-page-client";

const assets: PetAssetMap = petData as PetAssetMap;

function parseInitialPetId(raw?: string): number {
  if (!raw) return 1;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 && n <= 28 ? n : 1;
}

export default async function AnimalsPage({
  searchParams,
}: {
  searchParams: Promise<{ pet?: string }>;
}) {
  await connection();
  const params = await searchParams;
  const initialPetId = parseInitialPetId(params.pet);

  const t = await getTranslations("animals");
  const td = await getTranslations("common.donation");

  const [petsResult, detailResult, camerasResult] = await Promise.all([
    getPets(),
    getPetById(initialPetId),
    getCameras(),
  ]);

  const pets = petsResult.ok ? petsResult.data.data : [];
  const initialDetail = detailResult.ok ? detailResult.data.data : null;
  const cameras = camerasResult.ok ? camerasResult.data.data : [];

  const translations = {
    live: t("live"),
    cams: t("cams"),
    donateNow: t("donateNow"),
    moreLiveViews: t("moreLiveViews"),
    donationTitle: td("title"),
    donationText: td("text"),
    quickDonate: td("quickDonate"),
    donationPlaceholder: td("placeholder"),
    didYouKnow: t("didYouKnow"),
    commonName: t("commonName"),
    scientificName: t("scientificName"),
    type: t("type"),
    size: t("size"),
    diet: t("diet"),
    habitat: t("habitat"),
    range: t("range"),
    viewMap: t("viewMap"),
    error: t("error"),
    loading: t("loading"),
    sidebarError: t("sidebarError"),
    refresh: t("refresh"),
  };

  return (
    <AnimalsPageClient
      pets={pets}
      assets={assets}
      cameras={cameras}
      initialPetId={initialPetId}
      initialDetail={initialDetail}
      translations={translations}
    />
  );
}

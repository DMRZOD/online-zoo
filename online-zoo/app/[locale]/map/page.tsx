import { getTranslations } from "next-intl/server";
import MapSection from "@/components/map/map-section";

export default async function MapPage() {
  const t = await getTranslations("map");

  return <MapSection translations={{ title: t("title") }} />;
}

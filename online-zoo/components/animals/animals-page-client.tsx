"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { usePetSelection } from "@/hooks/use-pet-selection";
import { getPetById } from "@/lib/api/endpoints";
import type { Pet, PetDetail, Camera } from "@/types/api";
import type { PetAssetMap } from "@/types/pet";
import AnimalSidebar from "./animal-sidebar";
import LiveCamsSection from "./live-cams-section";
import AnimalDonationSection from "./animal-donation-section";
import AnimalInfoSection from "./animal-info-section";

interface AnimalsTranslations {
  live: string;
  cams: string;
  donateNow: string;
  moreLiveViews: string;
  donationTitle: string;
  donationText: string;
  quickDonate: string;
  donationPlaceholder: string;
  didYouKnow: string;
  commonName: string;
  scientificName: string;
  type: string;
  size: string;
  diet: string;
  habitat: string;
  range: string;
  viewMap: string;
  error: string;
  loading: string;
  sidebarError: string;
  refresh: string;
}

interface AnimalsPageClientProps {
  pets: Pet[];
  assets: PetAssetMap;
  cameras: Camera[];
  initialPetId: number;
  initialDetail: PetDetail | null;
  translations: AnimalsTranslations;
}

export default function AnimalsPageClient({
  pets,
  assets,
  cameras,
  initialPetId,
  initialDetail,
  translations: t,
}: AnimalsPageClientProps) {
  const { selectedPetId, selectPet } = usePetSelection(initialPetId);
  const [petDetail, setPetDetail] = useState<PetDetail | null>(initialDetail);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const currentAsset = assets[String(selectedPetId)];
  const currentVideos = currentAsset?.videos ?? [];


  const fetchDetail = useCallback(async (id: number) => {
    setIsLoading(true);
    const result = await getPetById(id);
    if (result.ok) {
      setPetDetail(result.data.data);
    } else {
      setPetDetail(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedPetId !== initialPetId) {
      fetchDetail(selectedPetId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPetId, fetchDetail]);

  const handleSelectPet = useCallback(
    (id: number) => {
      if (id === selectedPetId) return;
      selectPet(id);
    },
    [selectedPetId, selectPet]
  );

  const animalName = currentAsset?.commonName ?? petDetail?.commonName ?? "";
  const zooImage = currentAsset?.zooImage ?? "";

  return (
    <div className="flex">
      {/* Sidebar (hidden on mobile) */}
      <AnimalSidebar
        pets={pets}
        assets={assets}
        cameras={cameras}
        selectedPetId={selectedPetId}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        onSelectPet={handleSelectPet}
        liveLabel={t.live}
        errorLabel={t.sidebarError}
        refreshLabel={t.refresh}
      />

      {/* Main content */}
      <main className="min-w-0 flex-1">
        {/* Mobile animal selector */}
        <div className="px-2.5 pt-5 sm:px-5 lg:hidden">
          <div className="relative">
            <select
              value={selectedPetId}
              onChange={(e) => handleSelectPet(Number(e.target.value))}
              className="w-full appearance-none rounded-[5px] border-2 border-turquoise bg-background px-5 py-4 pr-12 text-lg font-semibold uppercase text-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turquoise/30 dark:border-turquoise/60"
            >
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.commonName}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-turquoise"
              strokeWidth={2.5}
            />
          </div>
        </div>

        <LiveCamsSection
          animalName={animalName}
          videos={currentVideos}
          translations={{
            live: t.live,
            cams: t.cams,
            donateNow: t.donateNow,
            moreLiveViews: t.moreLiveViews,
          }}
        />

        <AnimalDonationSection
          translations={{
            title: t.donationTitle,
            text: t.donationText,
            quickDonate: t.quickDonate,
            placeholder: t.donationPlaceholder,
          }}
        />

        <AnimalInfoSection
          petDetail={petDetail}
          zooImage={zooImage}
          isLoading={isLoading}
          translations={{
            didYouKnow: t.didYouKnow,
            commonName: t.commonName,
            scientificName: t.scientificName,
            type: t.type,
            size: t.size,
            diet: t.diet,
            habitat: t.habitat,
            range: t.range,
            viewMap: t.viewMap,
            loading: t.loading,
            error: t.error,
          }}
        />
      </main>
    </div>
  );
}

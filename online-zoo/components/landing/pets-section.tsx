import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getPets } from "@/lib/api/endpoints";
import petData from "@/data/data.json";
import type { PetAssetMap } from "@/types/pet";
import { LazyPetsSlider } from "@/components/slider/lazy";
import { FadeIn } from "@/components/ui/motion-wrapper";

const assets: PetAssetMap = petData as PetAssetMap;

export default async function PetsSection() {
  await connection();
  const t = await getTranslations("landing.pets");
  const result = await getPets();
  const pets = result.ok ? result.data.data : [];
  const hasError = !result.ok;

  return (
    <section className="py-[50px] xl:py-[100px] 2xl:py-[150px]">
      {/* Header */}
      <FadeIn className="mx-auto flex max-w-[1480px] flex-col items-center gap-[30px] px-2.5 sm:gap-[50px] lg:px-5 xl:gap-[50px] 2xl:px-10">
        <h3 className="text-center text-[26px] font-medium uppercase text-turquoise sm:text-[54px] sm:font-semibold md:max-w-[400px] lg:max-w-none">
          {t("title")}
        </h3>
        <p className="max-w-[920px] text-center text-lg font-normal leading-[1.5] text-foreground sm:text-[26px] sm:font-medium sm:leading-[1.3] xl:max-w-[830px] 2xl:max-w-[920px]">
          {t("text")}
        </p>
      </FadeIn>

      {/* Spacer after header */}
      <div className="h-[30px] sm:h-[50px] md:h-[50px] 2xl:h-[100px]" />

      {/* Slider with nav */}
      <LazyPetsSlider
        pets={pets}
        assets={assets}
        viewLiveCamLabel={t("viewLiveCam")}
        errorMessage={hasError ? t("error") : undefined}
      />

      {/* Bottom CTA */}
      <FadeIn className="mx-auto hidden max-w-[1480px] px-10 sm:block">
        <Link
          href="/meet-the-animals"
          className="group mx-auto mt-[50px] flex w-[361px] items-center justify-center gap-2.5 rounded-[5px] border border-navy p-[26px] text-lg font-semibold uppercase text-navy transition-all duration-300 hover:border-white hover:bg-navy hover:text-white dark:border-primary dark:text-foreground dark:hover:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground xl:mt-[50px] 2xl:mt-[100px]"
        >
          <span>{t("chooseFavourite")}</span>
          <Image
            src="/icons/arrow-right-navy.svg"
            alt=""
            width={25}
            height={22}
            className="transition-all duration-300 group-hover:brightness-0 group-hover:invert dark:brightness-0 dark:invert dark:group-hover:brightness-100"
          />
        </Link>
      </FadeIn>
    </section>
  );
}

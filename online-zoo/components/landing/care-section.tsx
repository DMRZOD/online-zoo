import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LazyCareSlider } from "@/components/slider/lazy";
import { FadeIn } from "@/components/ui/motion-wrapper";

const careCards = [
  { image: "/images/care/panda.jpg", alt: "Panda", textKey: "panda" },
  { image: "/images/care/tiger.jpg", alt: "Tiger", textKey: "tiger" },
  { image: "/images/care/lemur.jpg", alt: "Lemur", textKey: "lemur" },
  { image: "/images/care/eagle.jpg", alt: "Eagle", textKey: "eagle" },
] as const;

export default async function CareSection() {
  const t = await getTranslations("landing.care");

  const texts = careCards.map((card) => t(card.textKey));

  return (
    <section className="py-[50px] lg:py-[100px] 2xl:py-[150px]">
      {/* Header */}
      <FadeIn className="mx-auto flex max-w-[1480px] flex-col items-center gap-[30px] px-2.5 sm:gap-[50px] lg:px-5 2xl:px-10">
        <h3 className="max-w-[655px] text-center text-[26px] font-medium uppercase text-turquoise sm:text-[54px] sm:font-semibold">
          {t("title")}
        </h3>
        <p className="max-w-[540px] text-center text-lg font-normal leading-[1.5] text-foreground sm:text-[26px] sm:font-medium sm:leading-[1.3] lg:max-w-[600px]">
          {t("text")}
        </p>
      </FadeIn>

      {/* Slider / Grid */}
      <div className="mx-auto mt-[30px] max-w-[1480px] sm:mt-[50px] lg:mt-[70px] lg:px-5 2xl:mt-[100px] 2xl:px-10">
        <LazyCareSlider
          cards={
            careCards as unknown as {
              image: string;
              alt: string;
              textKey: string;
            }[]
          }
          texts={texts}
          feedLabel={t("feed")}
        />
      </div>

      {/* Choose Your Favourite button */}
      <div className="mx-auto max-w-[1480px] px-2.5 sm:px-5 2xl:px-10">
        <Link
          href="/animals"
          className="group mx-auto mt-[30px] flex w-full items-center justify-center gap-2.5 rounded-[5px] border border-navy p-[9px] text-lg font-semibold uppercase text-navy transition-all duration-300 hover:border-white hover:bg-navy hover:text-white dark:border-primary dark:text-foreground dark:hover:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground sm:mt-[50px] sm:w-[361px] sm:p-[26px] 2xl:mt-[100px]"
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
      </div>

      {/* Touch the Animal image */}
      <FadeIn className="mx-auto mt-[80px] sm:mt-[100px] 2xl:mt-[150px]">
        <Image
          src="/images/care/touch-the-animal.jpg"
          alt="Touch The Animal"
          width={1920}
          height={800}
          className="w-full object-cover"
        />
      </FadeIn>
    </section>
  );
}

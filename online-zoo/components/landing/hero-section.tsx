import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default async function HeroSection() {
  const t = await getTranslations("landing.hero");

  return (
    <section className="hero-bg py-5 sm:py-[50px] lg:py-[100px] xl:py-[150px]">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-5 sm:gap-[30px] xl:gap-[50px] px-2.5 lg:px-5 xl:px-10">
        <h2 className="max-w-[890px] text-[40px] font-extrabold uppercase leading-tight tracking-[0.01em] text-turquoise md:text-[72px] xl:text-[82px]">
          {t("title")}
        </h2>
        <p className="max-w-[340px] text-lg font-normal leading-[1.5] text-foreground md:max-w-[430px]">
          {t("text")}
        </p>
        <Link
          href="/animals"
          className="flex w-full items-center justify-center gap-2.5 rounded-[5px] bg-orange p-[11.5px] text-lg font-semibold uppercase text-white transition-all duration-300 hover:bg-orange-hover hover:shadow-[0_4px_30px_0_rgba(245,128,33,0.3)] active:scale-[1.03] sm:w-[240px] sm:p-[26px]"
        >
          <span>{t("cta")}</span>
          <Image src="/icons/arrow-right.svg" alt="" width={25} height={22} />
        </Link>
      </div>
      <Image
        src="/images/hero/hero-bg-mobile.jpg"
        alt=""
        width={320}
        height={291}
        className="mt-5 block w-full sm:hidden"
        priority
      />
    </section>
  );
}

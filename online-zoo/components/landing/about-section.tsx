import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function AboutSection() {
  const t = await getTranslations("landing.about");

  return (
    <section id="about">
      {/* Welcome */}
      <div className="pt-[30px] pb-[25px] sm:pt-[100px] md:pb-[35px] xl:pt-[150px] xl:pb-[75px]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-x-10 gap-y-[30px] px-0 md:px-5 min-[820px]:px-[100px] xl:px-10 grid-cols-[minmax(0,660px)] xl:grid-cols-[minmax(0,560px)_minmax(0,800px)]">
          <div className="order-2 px-2.5 sm:px-5 md:px-0 xl:order-none">
            <h3 className="mb-[30px] text-[26px] font-medium uppercase text-turquoise sm:text-[54px] sm:font-semibold xl:mb-[50px]">
              {t("welcomeTitle")}
            </h3>
            <p className="text-lg font-normal leading-[1.5] text-foreground xl:max-w-[560px]">
              {t("welcomeText")}
            </p>
          </div>
          <Image
            src="/images/about/welcome.jpg"
            alt="Welcome Photo"
            width={800}
            height={531}
            className="order-1 w-full rounded-[5px] xl:order-none"
          />
        </div>
      </div>

      {/* How We Work */}
      <div className="pt-[25px] pb-[50px] sm:pb-[100px] md:pt-[35px] xl:pt-[75px] xl:pb-[150px]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-x-10 gap-y-[30px] px-0 md:px-5 min-[820px]:px-[100px] xl:px-10 grid-cols-[minmax(0,660px)] justify-end xl:grid-cols-[minmax(0,800px)_minmax(0,560px)] xl:justify-normal">
          <Image
            src="/images/about/how-we-work.jpg"
            alt="Eagles Photo"
            width={800}
            height={531}
            className="w-full rounded-[5px]"
          />
          <div className="px-2.5 sm:px-5 md:px-0">
            <h3 className="mb-[30px] text-[26px] font-medium uppercase text-turquoise sm:text-[54px] sm:font-semibold xl:mb-[50px]">
              {t("howWeWorkTitle")}
            </h3>
            <p className="text-lg font-normal leading-[1.5] text-foreground xl:max-w-[560px]">
              {t("howWeWorkText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import DonateButton from "@/components/donation/donate-button";

const steps = [
  {
    number: "01",
    image: "/images/feed/feed-1.jpg",
    icon: "/icons/feed-icon-1.svg",
    titleKey: "step1Title",
    textKey: "step1Text",
  },
  {
    number: "02",
    image: "/images/feed/feed-2.jpg",
    icon: "/icons/feed-icon-2.svg",
    titleKey: "step2Title",
    textKey: "step2Text",
  },
  {
    number: "03",
    image: "/images/feed/feed-3.jpg",
    icon: "/icons/feed-icon-3.svg",
    titleKey: "step3Title",
    textKey: "step3Text",
  },
] as const;

export default async function FeedSection() {
  const t = await getTranslations("landing.feed");

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-[1480px] px-2.5 py-[30px] sm:px-5 sm:py-[50px] lg:px-10 xl:py-[100px]">
        <h3 className="mb-[30px] text-[26px] font-medium uppercase sm:text-[54px] sm:font-semibold xl:mb-[50px]">
          {t("title")}
        </h3>

        <div className="flex flex-col gap-[30px] xl:gap-[50px]">
          {steps.map((step) => (
            <div key={step.number}>
              {/* Step header */}
              <div className="mb-[20px] flex items-center gap-[10px] md:gap-[90px] sm:mb-[30px] xl:mb-[40px]">
                <span className="shrink-0 text-[26px] font-medium leading-none">
                  {step.number}
                </span>
                <span className="h-px w-full bg-white" />
              </div>

              {/* Step body */}
              <div className="flex flex-col items-center gap-[20px] text-center sm:gap-[30px] xl:flex-row xl:items-start xl:gap-[40px] xl:text-left">
                <Image
                  src={step.image}
                  alt={t(step.titleKey)}
                  width={560}
                  height={370}
                  className="w-full max-w-[560px] shrink-0 rounded-[7px] object-cover xl:w-[460px] 2xl:w-[560px]"
                />

                <div className="flex flex-col items-center xl:items-start">
                  <Image
                    src={step.icon}
                    alt=""
                    width={60}
                    height={60}
                    className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px]"
                  />
                  <h4 className="mt-[15px] text-[22px] font-semibold leading-tight sm:mt-[20px] sm:text-[26px] xl:mt-[30px]">
                    {t(step.titleKey)}
                  </h4>
                  <p className="mt-[15px] max-w-[600px] text-base font-normal leading-[1.5] text-white/80 sm:mt-[20px] sm:text-lg">
                    {t(step.textKey)}
                  </p>

                  {step.number === "03" && (
                    <DonateButton className="mt-[30px] flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[5px] bg-orange p-[11.5px] text-lg font-semibold uppercase text-white transition-all duration-300 hover:bg-orange-hover hover:shadow-[0_4px_30px_0_rgba(245,128,33,0.3)] active:scale-[1.03] sm:mt-[50px] sm:w-[240px] sm:p-[18px]">
                      <span>{t("donateNow")}</span>
                      <Image
                        src="/icons/arrow-right.svg"
                        alt=""
                        width={25}
                        height={22}
                      />
                    </DonateButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

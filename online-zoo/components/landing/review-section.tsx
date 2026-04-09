import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getFeedback } from "@/lib/api/endpoints";
import { LazyReviewSlider } from "@/components/slider/lazy";
import { FadeIn } from "@/components/ui/motion-wrapper";

export default async function ReviewSection() {
  await connection();
  const t = await getTranslations("landing.review");
  const result = await getFeedback();
  const feedback = result.ok ? result.data.data : [];
  const hasError = !result.ok;

  return (
    <section className="review-bg overflow-hidden py-10 lg:py-20 xl:py-[100px] 2xl:py-[150px]">
      <div className="mx-auto max-w-[1480px] px-2.5 sm:px-5 lg:px-10 xl:grid xl:grid-cols-[440px_1fr] xl:grid-rows-[auto_auto] xl:gap-x-10 2xl:grid-cols-[560px_1fr]">
        {/* Header — left column on desktop */}
        <FadeIn className="text-center sm:text-left xl:col-start-1 xl:row-start-1">
          <h3 className="max-w-[440px] text-[26px] font-medium uppercase text-white sm:text-[54px] sm:font-semibold">
            {t("title")}
          </h3>
          <p className="mt-[30px] text-lg font-normal leading-[1.5] text-white sm:text-[26px] sm:font-medium sm:leading-[1.3] xl:mt-[50px]">
            {t("text")}
          </p>
        </FadeIn>

        {/* Slider — right column on desktop, spans both rows */}
        <FadeIn
          delay={0.1}
          className="mt-[30px] sm:mt-[50px] xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:mt-0"
        >
          <LazyReviewSlider
            feedback={feedback}
            errorMessage={hasError ? t("error") : undefined}
          />
        </FadeIn>
      </div>

      {/* Leave Feedback button — left column bottom on desktop */}
      <div className="mx-auto max-w-[1480px] px-2.5 sm:px-5 lg:px-10">
        <div className="mt-10 flex justify-center sm:mt-[50px] sm:justify-start xl:col-start-1 xl:row-start-2 xl:mt-[375px]">
          <Link
            href="/contact"
            className="flex w-[300px] items-center justify-center gap-2.5 rounded-[5px] border border-white p-[11.5px] text-lg font-semibold uppercase text-white transition-all duration-300 hover:bg-turquoise hover:border-turquoise active:scale-[1.01] active:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] sm:w-[360px] sm:p-[26px]"
          >
            <span>{t("leaveFeedback")}</span>
            <Image src="/icons/arrow-right.svg" alt="" width={25} height={22} />
          </Link>
        </div>
      </div>

      {/* Bottom spacer for background image visibility on mobile/tablet */}
      <div className="h-[350px] sm:h-[500px] lg:h-[400px] xl:h-0" />
    </section>
  );
}

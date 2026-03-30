"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { PetDetail } from "@/types/api";

interface AnimalInfoSectionProps {
  petDetail: PetDetail | null;
  zooImage: string;
  isLoading: boolean;
  translations: {
    didYouKnow: string;
    commonName: string;
    scientificName: string;
    type: string;
    size: string;
    diet: string;
    habitat: string;
    range: string;
    viewMap: string;
    loading: string;
    error: string;
  };
}

export default function AnimalInfoSection({
  petDetail,
  zooImage,
  isLoading,
  translations: t,
}: AnimalInfoSectionProps) {
  if (isLoading) {
    return (
      <section className="px-2.5 py-[50px] sm:px-5 sm:py-[100px] lg:px-10 lg:py-[150px]">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-turquoise border-t-transparent" />
            <span className="ml-4 text-lg text-foreground">{t.loading}</span>
          </div>
        </div>
      </section>
    );
  }

  if (!petDetail) {
    return (
      <section className="px-2.5 py-[50px] sm:px-5 sm:py-[100px] lg:px-10 lg:py-[150px]">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex items-center justify-center py-20">
            <div className="mx-auto max-w-[500px] rounded-[5px] px-10 py-12 text-center shadow-[0_4px_50px_0_rgba(0,0,0,0.15)] dark:shadow-[0_4px_50px_0_rgba(0,0,0,0.4)]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mb-5"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#f58021"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 7v5"
                  stroke="#f58021"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16" r="0.75" fill="#f58021" />
              </svg>
              <p className="text-[22px] font-medium leading-snug text-foreground">
                {t.error}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const facts = [
    { label: t.commonName, value: petDetail.commonName },
    { label: t.scientificName, value: petDetail.scientificName },
    { label: t.type, value: petDetail.type },
    { label: t.size, value: petDetail.size },
    { label: t.diet, value: petDetail.diet },
    { label: t.habitat, value: petDetail.habitat },
    { label: t.range, value: petDetail.range },
  ];

  return (
    <section className="px-2.5 py-[50px] sm:px-5 sm:py-[100px] lg:px-10 lg:py-[150px]">
      <div className="mx-auto max-w-[1480px]">
        {/* Header card */}
        <div className="mx-auto max-w-[1040px] rounded-[5px] px-5 py-[30px] text-center shadow-[0_4px_50px_0_rgba(0,0,0,0.25)] sm:px-[60px] sm:py-[50px] dark:shadow-[0_4px_50px_0_rgba(0,0,0,0.5)]">
          <h4 className="text-[26px] font-medium uppercase leading-tight text-turquoise sm:text-[42px]">
            {t.didYouKnow}
          </h4>
          <p className="mt-5 text-[18px] md:text-[26px] font-normal leading-[1.5] text-foreground">
            {petDetail.description}
          </p>
        </div>

        {/* Content: facts + image */}
        <div className="mt-[50px] flex flex-col gap-10 sm:mt-[100px] lg:mt-[150px] xl:flex-row xl:justify-between">
          {/* Facts list */}
          <div className="relative order-2 max-w-[600px] xl:order-1">
            <dl>
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="mb-[18px] flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5"
                >
                  <dt className="text-[22px] font-medium leading-[1.3] text-foreground sm:text-[26px]">
                    {fact.label}:
                  </dt>
                  <dd className="text-lg font-normal leading-[1.5] text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* View Map button */}
            <div className="mt-8 flex">
              <Link
                href="/map"
                className="group flex w-[240px] items-center justify-center gap-2.5 rounded-[5px] border border-transparent px-6 py-6 transition-all duration-300 hover:bg-orange [&:hover_span]:text-white [&:hover_svg_path]:fill-white"
              >
                <span className="text-lg font-semibold uppercase text-orange transition-colors duration-300">
                  {t.viewMap}
                </span>
                <svg
                  width="28"
                  height="25"
                  viewBox="0 0 28 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.878 0.135121C14.6728 0.224325 14.4865 0.355065 14.3296 0.519851C14.1723 0.684221 14.0476 0.879485 13.9624 1.09446C13.8773 1.30944 13.8335 1.5399 13.8335 1.77265C13.8335 2.00539 13.8773 2.23586 13.9624 2.45083C14.0476 2.66581 14.1723 2.86107 14.3296 3.02544L21.1185 10.1365H1.80205C1.32411 10.1365 0.865757 10.3738 0.527808 10.7963C0.189858 11.2187 0 11.7917 0 12.3891C0 12.9865 0.189858 13.5594 0.527808 13.9819C0.865757 14.4043 1.32411 14.6416 1.80205 14.6416H21.1193L14.3296 21.7536C14.0125 22.0859 13.8344 22.5366 13.8344 23.0064C13.8344 23.4763 14.0125 23.927 14.3296 24.2592C14.6467 24.5915 15.0767 24.7782 15.5252 24.7782C15.9736 24.7782 16.4037 24.5915 16.7208 24.2592L26.8527 13.6423C27.01 13.478 27.1348 13.2827 27.2199 13.0677C27.305 12.8528 27.3489 12.6223 27.3489 12.3895C27.3489 12.1568 27.305 11.9263 27.2199 11.7114C27.1348 11.4964 27.01 11.3011 26.8527 11.1367L16.7208 0.519851C16.5639 0.355065 16.3775 0.224325 16.1724 0.135121C15.9672 0.0459159 15.7473 0 15.5252 0C15.3031 0 15.0831 0.0459159 14.878 0.135121Z"
                    className="fill-orange transition-colors duration-300"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Animal image */}
          <div className="shrink-0 order-1 xl:order-2">
            <Image
              src={zooImage}
              alt={petDetail.commonName}
              width={440}
              height={440}
              className="h-auto w-full rounded-[5px] object-cover xl:w-[440px]"
            />
          </div>
        </div>

        {/* Detailed description */}
        <p className="mt-[50px] max-w-[1160px] text-lg font-normal leading-[1.5] text-foreground">
          {petDetail.detailedDescription}
        </p>
      </div>
    </section>
  );
}

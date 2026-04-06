"use client";

import Image from "next/image";
import { useDonationPopup } from "@/components/donation/donation-context";

interface AnimalDonationSectionProps {
  translations: {
    title: string;
    text: string;
    quickDonate: string;
    placeholder: string;
  };
  petId?: number;
  petName?: string;
}

export default function AnimalDonationSection({
  translations: t,
  petId,
  petName,
}: AnimalDonationSectionProps) {
  const { openDonation } = useDonationPopup();
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto flex max-w-[1480px] flex-col items-center gap-[30px] px-5 py-[30px] text-center sm:py-[50px] lg:px-10 xl:flex-row xl:items-start xl:justify-between xl:gap-10 xl:text-left">
        {/* Content */}
        <div className="max-w-[660px] xl:max-w-[600px]">
          <h4 className="mb-5 text-[26px] font-medium uppercase leading-tight sm:text-[42px] xl:mb-[30px]">
            {t.title}
          </h4>
          <p className="text-lg font-normal leading-[1.5]">{t.text}</p>
        </div>

        {/* Action */}
        <div className="flex shrink-0 flex-col items-center xl:items-start">
          <span className="mb-4 text-[26px] font-medium xl:mb-5">
            {t.quickDonate}
          </span>
          <button onClick={() => openDonation({ petId, petName })} className="group flex h-[45px] w-[300px] cursor-pointer items-center overflow-hidden rounded-[5px] border border-white sm:h-[74px] sm:w-[320px]">
            <span className="flex-1 text-center text-base font-semibold uppercase sm:text-lg">
              {t.placeholder}
            </span>
            <span className="flex h-full w-[60px] items-center justify-center bg-orange transition-colors duration-300 group-hover:bg-orange-hover sm:w-[80px]">
              <Image
                src="/icons/arrow-right.svg"
                alt=""
                width={25}
                height={22}
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

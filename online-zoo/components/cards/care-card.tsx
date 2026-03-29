import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface CareCardProps {
  image: string;
  alt: string;
  text: string;
  feedLabel: string;
}

export default function CareCard({ image, alt, text, feedLabel }: CareCardProps) {
  return (
    <Link
      href="/animals"
      className="group flex flex-col overflow-hidden rounded-[5px] bg-navy transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_4px_30px_0_rgba(32,17,61,0.3)] md:max-lg:grid md:max-lg:grid-cols-2"
    >
      <div className="relative h-[350px] md:max-lg:h-full lg:h-auto lg:max-h-[373px]">
        <Image
          src={image}
          alt={alt}
          width={440}
          height={373}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-h-[220px] flex-col items-center justify-between gap-[5px] px-[25px] py-[15px] sm:min-h-[285px] sm:gap-[30px] sm:px-[25px] sm:pb-[50px] sm:pt-[30px] md:max-lg:px-[20px] md:max-lg:pb-[34px] md:max-lg:pt-[66px]">
        <p className="text-center text-lg font-normal leading-[1.5] text-white/90">
          {text}
        </p>

        <span className="flex items-center gap-2.5 rounded-[5px] px-[26px] py-[26px] text-xl font-semibold uppercase text-orange transition-all duration-300 group-hover:bg-orange group-hover:text-white">
          <span>{feedLabel}</span>
          <Image
            src="/icons/arrow-right-orange.svg"
            alt=""
            width={28}
            height={25}
            className="transition-all duration-300 group-hover:brightness-0 group-hover:invert"
          />
        </span>
      </div>
    </Link>
  );
}

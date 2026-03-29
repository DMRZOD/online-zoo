import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Pet } from "@/types/api";
import type { PetAsset } from "@/types/pet";

interface PetCardProps {
  pet: Pet;
  asset: PetAsset;
  viewLiveCamLabel: string;
}

export default function PetCard({ pet, asset, viewLiveCamLabel }: PetCardProps) {
  return (
    <Link
      href={`/animals?pet=${pet.id}`}
      className="group relative flex w-[300px] flex-col overflow-hidden rounded-[5px] bg-navy transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_4px_30px_0_rgba(32,17,61,0.5)] dark:bg-[#1a1528] md:w-[440px] md:h-[747px]"
    >
      {/* Label */}
      <div className="absolute top-0 left-0 z-10 rounded-br-[5px] bg-navy px-5 py-3 text-[26px] font-medium leading-[1.3] text-white dark:bg-[#1a1528] dark:text-[#ebe6f5]">
        {pet.name}
      </div>

      {/* Image */}
      <div className="aspect-[300/280] w-full overflow-hidden md:aspect-[440/436]">
        <Image
          src={asset.cardImage}
          alt={pet.commonName}
          width={440}
          height={436}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-between p-[15px_15px_10px] md:h-[311px] md:p-[30px_30px_50px]">
        <div className="flex flex-col gap-[15px] md:gap-5">
          <div className="text-center text-[26px] font-medium leading-[1.3] text-white dark:text-[#ebe6f5]">
            {pet.commonName}
          </div>
          <div className="text-center text-lg font-normal leading-[1.5] text-white dark:text-[#ebe6f5]">
            {pet.description}
          </div>
        </div>
        <button
          type="button"
          className="mt-4 flex w-[240px] cursor-pointer items-center justify-center gap-2.5 rounded-[5px] py-6 text-[20px] font-semibold uppercase text-orange transition-all duration-300 group-hover:bg-orange group-hover:text-white md:mt-0"
        >
          <span>{viewLiveCamLabel}</span>
          <svg
            width="28"
            height="25"
            viewBox="0 0 28 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.878 0.135121C14.6728 0.224325 14.4865 0.355065 14.3296 0.519851C14.1723 0.684221 14.0476 0.879485 13.9624 1.09446C13.8773 1.30944 13.8335 1.5399 13.8335 1.77265C13.8335 2.00539 13.8773 2.23586 13.9624 2.45083C14.0476 2.66581 14.1723 2.86107 14.3296 3.02544L21.1185 10.1365H1.80205C1.32411 10.1365 0.865757 10.3738 0.527808 10.7963C0.189858 11.2187 0 11.7917 0 12.3891C0 12.9865 0.189858 13.5594 0.527808 13.9819C0.865757 14.4043 1.32411 14.6416 1.80205 14.6416H21.1193L14.3296 21.7536C14.0125 22.0859 13.8344 22.5366 13.8344 23.0064C13.8344 23.4763 14.0125 23.927 14.3296 24.2592C14.6467 24.5915 15.0767 24.7782 15.5252 24.7782C15.9736 24.7782 16.4037 24.5915 16.7208 24.2592L26.8527 13.6423C27.01 13.478 27.1348 13.2827 27.2199 13.0677C27.305 12.8528 27.3489 12.6223 27.3489 12.3895C27.3489 12.1568 27.305 11.9263 27.2199 11.7114C27.1348 11.4964 27.01 11.3011 26.8527 11.1367L16.7208 0.519851C16.5639 0.355065 16.3775 0.224325 16.1724 0.135121C15.9672 0.0459159 15.7473 0 15.5252 0C15.3031 0 15.0831 0.0459159 14.878 0.135121Z"
              className="fill-orange transition-all duration-300 group-hover:fill-white"
            />
          </svg>
        </button>
      </div>
    </Link>
  );
}

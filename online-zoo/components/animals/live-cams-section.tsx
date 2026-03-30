"use client";

import type { PetVideos } from "@/types/pet";
import { cn } from "@/lib/utils";
import YouTubeEmbed from "./youtube-embed";
import CamCarousel from "./cam-carousel";

interface LiveCamsSectionProps {
  animalName: string;
  videos: PetVideos[];
  translations: {
    live: string;
    cams: string;
    donateNow: string;
    moreLiveViews: string;
  };
}

export default function LiveCamsSection({
  animalName,
  videos,
  translations: t,
}: LiveCamsSectionProps) {
  const mainVideo = videos[0];
  const sideVideos = videos.slice(1);

  const DonateButton = ({ className }: { className?: string }) => (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center gap-2.5 rounded-[5px] bg-orange px-6 py-[26px] transition-all duration-300 hover:bg-orange-hover hover:shadow-[0_4px_30px_0_rgba(245,128,33,0.3)] active:scale-[1.03]",
        className
      )}
    >
      <span className="text-lg font-semibold uppercase text-white">
        {t.donateNow}
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
          fill="white"
        />
      </svg>
    </button>
  );

  return (
    <section className="px-2.5 pb-[50px] pt-[30px] sm:px-5 sm:pb-[100px] sm:pt-[50px] lg:px-10 lg:pb-[150px]">
      <div className="mx-auto max-w-[1480px]">
        {/* Header */}
        <div className="mb-[30px] flex items-center justify-center sm:mb-[50px] lg:grid lg:grid-cols-[minmax(0,1fr)_auto_1fr] lg:items-center lg:gap-[70px] xl:gap-[70px]">
          <h3 className="text-center text-[26px] font-medium uppercase leading-tight text-turquoise sm:text-[54px] sm:font-semibold lg:col-start-2">
            {t.live} {animalName} {t.cams}
          </h3>
          {/* Desktop donate button (lg+) */}
          <DonateButton className="hidden lg:flex lg:w-[240px] lg:justify-self-end" />
        </div>

        {/* Main video */}
        {mainVideo && (
          <div className="mb-[50px] sm:mb-[100px]">
            <YouTubeEmbed
              videoId={mainVideo.id}
              title={mainVideo.title}
              autoLoad
            />
          </div>
        )}

        {/* Tablet donate button (sm to lg) */}
        <DonateButton className="mx-auto mb-[30px] hidden w-[212px] py-[13px] sm:flex lg:hidden" />

        {/* More live views */}
        {sideVideos.length > 0 && (
          <>
            <h4 className="uppercase mb-[20px] text-center text-[22px] font-medium text-foreground sm:mb-[30px] sm:text-[26px]">
              {t.moreLiveViews}
            </h4>
            <CamCarousel videos={sideVideos} />
          </>
        )}

        {/* Mobile donate button (<sm) */}
        <DonateButton className="mt-[50px] flex w-full py-[11.5px] sm:hidden" />
      </div>
    </section>
  );
}

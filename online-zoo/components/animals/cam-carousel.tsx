"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PetVideos } from "@/types/pet";
import YouTubeEmbed from "./youtube-embed";

interface CamCarouselProps {
  videos: PetVideos[];
}

export default function CamCarousel({ videos }: CamCarouselProps) {
  const [activeCam, setActiveCam] = useState(0);

  const goPrev = () => {
    setActiveCam((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goNext = () => {
    setActiveCam((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="flex items-center gap-3 xl:gap-[13px]">
      {/* Left arrow */}
      <button
        type="button"
        onClick={goPrev}
        className="hidden h-[60px] w-[60px] shrink-0 cursor-pointer items-center justify-center rounded-[5px] border border-white/30 transition-all duration-300 hover:bg-white/10 lg:grid xl:h-[84px] xl:w-[80px]"
        aria-label="Previous camera"
      >
        <Image
          src="/icons/arrow-left-navy.svg"
          alt=""
          width={22}
          height={25}
        />
      </button>

      {/* Cam thumbnails */}
      <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-5">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={cn(
              "relative overflow-hidden rounded-[10px]",
              index === activeCam && "ring-[3px] ring-orange"
            )}
          >
            {/* Cam header overlay */}
            <div className="absolute top-0 left-0 z-10 flex h-[34px] items-center gap-2.5 rounded-br-[5px] border border-white/30 px-4 sm:h-[44px] sm:px-5">
              <span className="text-base font-medium text-white sm:text-[22px] xl:text-[26px]">
                {video.title}
              </span>
              <Image
                src="/icons/live-cam.svg"
                alt=""
                width={16}
                height={13}
                className="sm:h-4 sm:w-5"
              />
            </div>

            <YouTubeEmbed videoId={video.id} title={video.title} />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        onClick={goNext}
        className="hidden h-[60px] w-[60px] shrink-0 cursor-pointer items-center justify-center rounded-[5px] border border-white/30 transition-all duration-300 hover:bg-white/10 lg:grid xl:h-[84px] xl:w-[80px]"
        aria-label="Next camera"
      >
        <Image
          src="/icons/arrow-right-navy.svg"
          alt=""
          width={22}
          height={25}
        />
      </button>
    </div>
  );
}

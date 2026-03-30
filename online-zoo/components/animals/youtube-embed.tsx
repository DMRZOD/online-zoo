"use client";

import { useState } from "react";
import Image from "next/image";
import { YOUTUBE_EMBED_BASE } from "@/lib/constants";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoLoad?: boolean;
  className?: string;
}

export default function YouTubeEmbed({
  videoId,
  title = "Video",
  autoLoad = false,
  className = "",
}: YouTubeEmbedProps) {
  const [showIframe, setShowIframe] = useState(autoLoad);

  if (showIframe) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden rounded-[5px] ${className}`}>
        <iframe
          src={`${YOUTUBE_EMBED_BASE}${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowIframe(true)}
      className={`group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-[5px] ${className}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        className="object-cover"
        unoptimized
      />
      {/* Play button overlay */}
      <span className="absolute top-1/2 left-1/2 flex h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] bg-black/50 transition-colors duration-300 group-hover:bg-orange">
        <span className="ml-1 h-0 w-0 border-t-[10px] border-b-[10px] border-l-[20px] border-t-transparent border-b-transparent border-l-white" />
      </span>
    </button>
  );
}

"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export default function BlurImage({ className, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed via ...props
    <Image
      {...props}
      className={cn(
        "transition-[filter] duration-700 ease-out",
        loaded ? "blur-0" : "blur-sm",
        className,
      )}
      onLoad={() => setLoaded(true)}
    />
  );
}

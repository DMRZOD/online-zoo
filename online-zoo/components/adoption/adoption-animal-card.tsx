"use client";

import { motion } from "motion/react";
import BlurImage from "@/components/ui/blur-image";

interface AdoptionAnimalCardProps {
  id: number;
  commonName: string;
  cardImage: string;
  index: number;
  adoptLabel: string;
  onSelect: (id: number, name: string, image: string) => void;
}

export default function AdoptionAnimalCard({
  id,
  commonName,
  cardImage,
  index,
  adoptLabel,
  onSelect,
}: AdoptionAnimalCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="group overflow-hidden rounded-[10px] bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-dark-surface">
        <div className="relative aspect-[4/3] overflow-hidden">
          <BlurImage
            src={cardImage}
            alt={commonName}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 920px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="line-clamp-1 text-base font-semibold text-navy dark:text-foreground sm:text-lg">
            {commonName}
          </h3>
          <button
            onClick={() => onSelect(id, commonName, cardImage)}
            className="flex cursor-pointer items-center gap-1.5 rounded-[5px] bg-turquoise px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_4px_20px_0_rgba(0,160,146,0.3)] sm:px-5 sm:py-2.5 sm:text-base"
          >
            {adoptLabel}
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              className="text-white"
            >
              <path
                d="M7 1L11 5M11 5L7 9M11 5H1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

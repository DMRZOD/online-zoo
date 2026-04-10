"use client";

import { motion } from "motion/react";
import BlurImage from "@/components/ui/blur-image";
import { Link } from "@/i18n/navigation";

interface AnimalGridCardProps {
  id: number;
  commonName: string;
  cardImage: string;
  index: number;
}

export default function AnimalGridCard({
  id,
  commonName,
  cardImage,
  index,
}: AnimalGridCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/webcams?pet=${id}`}
        className="group block overflow-hidden rounded-[10px] bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-dark-surface"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <BlurImage
            src={cardImage}
            alt={commonName}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 920px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="px-4 py-3">
          <h3 className="text-base font-semibold text-navy dark:text-foreground sm:text-lg">
            {commonName}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

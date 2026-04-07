"use client";

import { useRef, useState, useCallback, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import CareCard from "@/components/cards/care-card";

const TRANSITION_MS = 500;
const WHEEL_THRESHOLD = 100;

interface CareCardData {
  image: string;
  alt: string;
  textKey: string;
}

interface CareSliderProps {
  cards: CareCardData[];
  texts: string[];
  feedLabel: string;
}

export default function CareSlider({ cards, texts, feedLabel }: CareSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const wheelAccum = useRef(0);
  const isGrid = useSyncExternalStore(
    (cb) => {
      const handler = () => {
        setCurrentIndex(0);
        wheelAccum.current = 0;
        cb();
      };
      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    },
    () => window.innerWidth >= 920,
    () => false
  );

  const moveNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setAnimate(true);
    setCurrentIndex((prev) => {
      const next = (prev + 1) % cards.length;
      return next;
    });
    setTimeout(() => {
      setAnimate(false);
      isAnimatingRef.current = false;
    }, TRANSITION_MS);
  }, [cards.length]);

  const movePrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setAnimate(true);
    setCurrentIndex((prev) => {
      const next = (prev - 1 + cards.length) % cards.length;
      return next;
    });
    setTimeout(() => {
      setAnimate(false);
      isAnimatingRef.current = false;
    }, TRANSITION_MS);
  }, [cards.length]);

  useEffect(() => {
    if (isGrid) return;
    const track = trackRef.current;
    if (!track) return;
    const section = track.closest("section");
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) return;
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX === 0 || absX <= absY) return;

      e.preventDefault();
      wheelAccum.current += e.deltaX;

      if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
        if (wheelAccum.current > 0) {
          moveNext();
        } else {
          movePrev();
        }
        wheelAccum.current = 0;
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [isGrid, moveNext, movePrev]);

  // Grid mode (lg+)
  if (isGrid) {
    return (
      <div className="grid grid-cols-2 gap-5 xl:gap-[20px] 2xl:grid-cols-3 2xl:gap-[40px]">
        {/* Koala featured image */}
        <div className="col-span-2 overflow-hidden rounded-[5px]">
          <Image
            src="/images/care/koala.jpg"
            alt="Koala"
            width={920}
            height={658}
            className="h-full w-full object-cover 2xl:max-xl:scale-x-[-1]"
          />
        </div>

        {/* Care cards */}
        {cards.map((card, i) => (
          <CareCard
            key={card.textKey}
            image={card.image}
            alt={card.alt}
            text={texts[i]}
            feedLabel={feedLabel}
          />
        ))}
      </div>
    );
  }

  // Carousel mode (<lg)
  return (
    <div ref={trackRef}>
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: animate ? `transform ${TRANSITION_MS}ms ease` : "none",
          }}
        >
          {cards.map((card, i) => (
            <div key={card.textKey} className="w-full shrink-0 px-2.5 sm:px-5">
              <CareCard
                image={card.image}
                alt={card.alt}
                text={texts[i]}
                feedLabel={feedLabel}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-[30px] flex justify-center gap-2.5">
        {cards.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (isAnimatingRef.current) return;
              isAnimatingRef.current = true;
              setAnimate(true);
              setCurrentIndex(i);
              setTimeout(() => {
                setAnimate(false);
                isAnimatingRef.current = false;
              }, TRANSITION_MS);
            }}
            className={`h-3 w-3 shrink-0 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-navy dark:bg-white"
                : "border border-navy/60 bg-transparent dark:border-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

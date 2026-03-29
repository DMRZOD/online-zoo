"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import PetCard from "@/components/cards/pet-card";
import type { Pet } from "@/types/api";
import type { PetAssetMap } from "@/types/pet";

const TRANSITION_MS = 500;
const WHEEL_THRESHOLD = 100;

interface PetsSliderProps {
  pets: Pet[];
  assets: PetAssetMap;
  viewLiveCamLabel: string;
  errorMessage?: string;
}

export default function PetsSlider({
  pets,
  assets,
  viewLiveCamLabel,
  errorMessage,
}: PetsSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(pets);
  const isAnimatingRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(false);
  const wheelAccum = useRef(0);
  const groupSizeRef = useRef(2);
  const stepWidthRef = useRef(0);

  const computeMetrics = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length < 2) return;

    const firstLeft = cards[0].offsetLeft;
    const uniqueLefts = [
      ...new Set(cards.map((c) => c.offsetLeft)),
    ].sort((a, b) => a - b);
    const secondLeft = uniqueLefts[1];
    const step = secondLeft !== undefined ? secondLeft - firstLeft : 0;
    const group = cards.filter((c) => c.offsetLeft === firstLeft).length || 1;

    groupSizeRef.current = group;
    stepWidthRef.current = step;
  }, []);

  useEffect(() => {
    computeMetrics();
    const onResize = () => {
      setOffset(0);
      computeMetrics();
      wheelAccum.current = 0;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [computeMetrics, items]);

  const moveNext = useCallback(() => {
    if (isAnimatingRef.current || stepWidthRef.current === 0) return;
    isAnimatingRef.current = true;
    setAnimate(true);
    setOffset(-stepWidthRef.current);

    setTimeout(() => {
      const gs = groupSizeRef.current;
      setItems((prev) => [...prev.slice(gs), ...prev.slice(0, gs)]);
      setAnimate(false);
      setOffset(0);
      isAnimatingRef.current = false;
    }, TRANSITION_MS);
  }, []);

  const movePrev = useCallback(() => {
    if (isAnimatingRef.current || stepWidthRef.current === 0) return;
    isAnimatingRef.current = true;

    const gs = groupSizeRef.current;
    const sw = stepWidthRef.current;

    // Move last group to front instantly (no animation)
    setAnimate(false);
    setItems((prev) => [...prev.slice(-gs), ...prev.slice(0, -gs)]);
    setOffset(-sw);

    // Force reflow then animate to 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimate(true);
        setOffset(0);
        setTimeout(() => {
          setAnimate(false);
          isAnimatingRef.current = false;
        }, TRANSITION_MS);
      });
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const section = track.closest("section");
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current || stepWidthRef.current === 0) return;
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
  }, [moveNext, movePrev]);

  return (
    <>
      {/* Nav arrows */}
      <div className="mx-auto mb-[50px] hidden max-w-[1480px] items-center justify-center gap-[55px] px-10 sm:flex">
        <button
          type="button"
          onClick={movePrev}
          className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[5px] border border-navy transition-all duration-300 hover:bg-navy dark:border-[#5fd9cc] dark:hover:bg-[#1a1528] [&:hover_img]:brightness-0 [&:hover_img]:invert"
        >
          <Image
            src="/icons/arrow-left-navy.svg"
            alt="Previous"
            width={25}
            height={22}
          />
        </button>
        <button
          type="button"
          onClick={moveNext}
          className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[5px] border border-navy transition-all duration-300 hover:bg-navy dark:border-[#5fd9cc] dark:hover:bg-[#1a1528] [&:hover_img]:brightness-0 [&:hover_img]:invert"
        >
          <Image
            src="/icons/arrow-right-navy.svg"
            alt="Next"
            width={25}
            height={22}
          />
        </button>
      </div>

      {/* Slider */}
      {errorMessage ? (
        <div className="flex w-full items-center justify-center px-2.5">
          <div className="grid h-[120px] w-[500px] place-items-center rounded-[5px] bg-[#fde4e1] p-5 sm:h-[220px] sm:p-10">
            <p className="text-center text-lg font-normal leading-[1.5] text-[#c0392b] sm:text-[26px] sm:font-medium sm:leading-[1.3]">
              {errorMessage}
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-full overflow-hidden pl-2.5 md:pl-5 lg:pl-10">
          <div
            ref={trackRef}
            className="grid w-max grid-flow-col grid-rows-1 gap-2.5 sm:gap-5 md:grid-rows-2 xl:gap-10"
            style={{
              transform: `translateX(${offset}px)`,
              transition: animate
                ? `transform ${TRANSITION_MS}ms ease`
                : "none",
            }}
          >
            {items.map((pet) => {
              const asset = assets[String(pet.id)];
              if (!asset) return null;
              return (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  asset={asset}
                  viewLiveCamLabel={viewLiveCamLabel}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

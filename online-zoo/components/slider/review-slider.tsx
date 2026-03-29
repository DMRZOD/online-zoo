"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import ReviewCard from "@/components/cards/review-card";
import type { Feedback } from "@/types/api";

const TRANSITION_MS = 500;
const WHEEL_THRESHOLD = 100;
const MAX_DOTS = 6;
const DOT_SIZE = 12;
const DOT_GAP = 10;
const DOT_STEP = DOT_SIZE + DOT_GAP;

interface ReviewSliderProps {
  feedback: Feedback[];
  errorMessage?: string;
}

export default function ReviewSlider({
  feedback,
  errorMessage,
}: ReviewSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(feedback);
  const isAnimatingRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(false);
  const wheelAccum = useRef(0);
  const groupSizeRef = useRef(1);
  const stepWidthRef = useRef(0);
  const pageCountRef = useRef(Math.max(1, feedback.length));
  const [currentPage, setCurrentPage] = useState(0);

  const computeMetrics = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length < 2) return;

    const firstLeft = cards[0].offsetLeft;
    const uniqueLefts = [...new Set(cards.map((c) => c.offsetLeft))].sort(
      (a, b) => a - b,
    );
    const secondLeft = uniqueLefts[1];
    const step = secondLeft !== undefined ? secondLeft - firstLeft : 0;
    const group = cards.filter((c) => c.offsetLeft === firstLeft).length || 1;

    groupSizeRef.current = group;
    stepWidthRef.current = step;
    pageCountRef.current = Math.max(1, Math.ceil(feedback.length / group));
  }, [feedback.length]);

  useEffect(() => {
    computeMetrics();
    const onResize = () => {
      setOffset(0);
      setCurrentPage(0);
      computeMetrics();
      wheelAccum.current = 0;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [computeMetrics]);

  const moveNext = useCallback(() => {
    if (isAnimatingRef.current || stepWidthRef.current === 0) return;
    isAnimatingRef.current = true;
    const gs = groupSizeRef.current;
    setAnimate(true);
    setOffset(-stepWidthRef.current);

    setTimeout(() => {
      setItems((prev) => [...prev.slice(gs), ...prev.slice(0, gs)]);
      setAnimate(false);
      setOffset(0);
      isAnimatingRef.current = false;
      setCurrentPage((prev) => (prev + 1) % pageCountRef.current);
    }, TRANSITION_MS);
  }, []);

  const movePrev = useCallback(() => {
    if (isAnimatingRef.current || stepWidthRef.current === 0) return;
    isAnimatingRef.current = true;

    const gs = groupSizeRef.current;
    const sw = stepWidthRef.current;

    setAnimate(false);
    setItems((prev) => [...prev.slice(-gs), ...prev.slice(0, -gs)]);
    setOffset(-sw);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimate(true);
        setOffset(0);
        setTimeout(() => {
          setAnimate(false);
          isAnimatingRef.current = false;
          setCurrentPage(
            (prev) => (prev - 1 + pageCountRef.current) % pageCountRef.current,
          );
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

  if (errorMessage) {
    return (
      <div className="flex w-full items-center justify-center px-2.5">
        <div className="grid h-[120px] w-[500px] place-items-center rounded-[5px] bg-[#fde4e1] p-5 sm:h-[220px] sm:p-10">
          <p className="text-center text-lg font-normal leading-[1.5] text-[#c0392b] sm:text-[26px] sm:font-medium sm:leading-[1.3]">
            {errorMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Slider track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="grid w-max grid-flow-col grid-rows-1 gap-5 lg:grid-rows-2 lg:gap-[30px]"
          style={{
            transform: `translateX(${offset}px)`,
            transition: animate ? `transform ${TRANSITION_MS}ms ease` : "none",
          }}
        >
          {items.map((item) => (
            <ReviewCard key={item.id} feedback={item} />
          ))}
        </div>
      </div>

      {/* Dot indicators — mobile only, sliding window of MAX_DOTS */}
      <div className="mt-[30px] flex justify-center sm:hidden">
        <div
          className="overflow-hidden"
          style={{
            width: Math.min(MAX_DOTS, feedback.length) * DOT_STEP - DOT_GAP,
          }}
        >
          <div
            className="flex gap-2.5 transition-transform duration-300"
            style={{
              transform: `translateX(-${Math.max(0, Math.min(currentPage - Math.floor(MAX_DOTS / 2), feedback.length - MAX_DOTS)) * DOT_STEP}px)`,
            }}
          >
            {Array.from({ length: feedback.length }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 shrink-0 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "bg-white"
                    : "border border-white/60 bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Nav arrows — desktop only */}
      <div className="mt-[60px] hidden items-center justify-start gap-[55px] xl:flex">
        <button
          type="button"
          onClick={movePrev}
          className="group flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[5px] border border-white transition-all duration-300 hover:bg-white"
        >
          <Image
            src="/icons/arrow-left.svg"
            alt="Previous"
            width={25}
            height={22}
            className="transition-all duration-300 group-hover:brightness-0"
          />
        </button>
        <button
          type="button"
          onClick={moveNext}
          className="group flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[5px] border border-white transition-all duration-300 hover:bg-white"
        >
          <Image
            src="/icons/arrow-right.svg"
            alt="Next"
            width={25}
            height={22}
            className="transition-all duration-300 group-hover:brightness-0"
          />
        </button>
      </div>
    </div>
  );
}

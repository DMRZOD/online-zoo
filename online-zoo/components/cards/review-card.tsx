import Image from "next/image";
import type { Feedback } from "@/types/api";

interface ReviewCardProps {
  feedback: Feedback;
}

export default function ReviewCard({ feedback }: ReviewCardProps) {
  return (
    <div className="relative flex w-[300px] flex-col justify-between rounded-[5px] bg-white p-[115px_20px_50px] text-center dark:bg-background sm:h-[371px] sm:w-[523px] sm:p-[50px_30px] xl:h-[463px] xl:w-[515px] xl:p-[136px_50px_70px] xl:text-left">
      <div>
        <Image
          src="/icons/quote.svg"
          alt=""
          width={59}
          height={45}
          className="absolute left-5 top-[50px] sm:left-[40px] sm:top-[40px] xl:left-[50px] xl:top-[50px]"
        />
        <h4 className="text-[26px] font-medium leading-[1.3]">
          {feedback.city}, {feedback.month} {feedback.year}
        </h4>
        <p className="mt-5 text-lg font-normal leading-[1.5]">
          {feedback.text}
        </p>
      </div>
      <span className="mt-5 text-lg font-semibold uppercase">
        {feedback.name}
      </span>
    </div>
  );
}

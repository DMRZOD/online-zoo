"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ContactFormProps {
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  toast: string;
}

const inputClasses =
  "w-full rounded-[5px] border border-border bg-background px-5 py-[17px] text-lg text-foreground placeholder:text-muted-foreground transition-all duration-100 focus:border-turquoise focus:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] focus:outline-none [&:invalid:not(:placeholder-shown)]:border-orange [&:invalid:not(:placeholder-shown)]:bg-[rgba(245,128,33,0.2)] [&:invalid:not(:placeholder-shown)]:outline-none";

export default function ContactForm({
  nameLabel,
  emailLabel,
  subjectLabel,
  messageLabel,
  namePlaceholder,
  emailPlaceholder,
  subjectPlaceholder,
  messagePlaceholder,
  submit,
  toast,
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showToast, setShowToast] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) return;
    formRef.current.reset();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <>
      {/* Toast */}
      <div
        className={`fixed left-1/2 top-0 z-[4000] -translate-x-1/2 cursor-pointer rounded-b-[5px] bg-turquoise px-6 py-4 text-center font-semibold text-white shadow-lg transition-transform duration-300 ${
          showToast ? "translate-y-0" : "-translate-y-full"
        }`}
        onClick={() => setShowToast(false)}
      >
        {toast}
      </div>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full flex-col gap-y-[30px] xl:max-w-[740px]"
      >
        {/* Name */}
        <div className="flex flex-col gap-y-2.5">
          <label className="text-lg font-normal leading-[1.5]">
            <span className="text-turquoise">* </span>
            {nameLabel}
          </label>
          <input
            type="text"
            name="name"
            placeholder={namePlaceholder}
            required
            className={inputClasses}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-y-2.5">
          <label className="text-lg font-normal leading-[1.5]">
            <span className="text-turquoise">* </span>
            {emailLabel}
          </label>
          <input
            type="email"
            name="email"
            placeholder={emailPlaceholder}
            required
            className={inputClasses}
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-y-2.5">
          <label className="text-lg font-normal leading-[1.5]">
            <span className="text-turquoise">* </span>
            {subjectLabel}
          </label>
          <input
            type="text"
            name="subject"
            placeholder={subjectPlaceholder}
            required
            className={inputClasses}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-y-2.5">
          <label className="text-lg font-normal leading-[1.5]">
            <span className="text-turquoise">* </span>
            {messageLabel}
          </label>
          <textarea
            name="message"
            placeholder={messagePlaceholder}
            required
            className={`${inputClasses} h-[200px] resize-y`}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-0 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[5px] bg-turquoise px-7.5 py-[17px] text-lg font-semibold uppercase text-white transition-colors duration-300 hover:bg-turquoise-hover sm:mx-auto sm:mt-5 sm:w-[290px] xl:mx-0 xl:mt-10 xl:w-[360px]"
        >
          <span>{submit}</span>
          <Image
            src="/icons/arrow-right.svg"
            alt=""
            width={25}
            height={22}
            className="brightness-0 invert"
          />
        </button>
      </form>
    </>
  );
}

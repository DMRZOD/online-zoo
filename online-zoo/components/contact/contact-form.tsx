"use client";

import { useState } from "react";
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
  validation: {
    required: string;
    invalidEmail: string;
  };
}

const inputBase =
  "w-full rounded-[5px] border border-border bg-background px-5 py-[17px] text-lg text-foreground placeholder:text-muted-foreground transition-all duration-100 focus:border-turquoise focus:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] focus:outline-none";
const inputError = "border-[#cc0000] bg-[rgba(204,0,0,0.05)]";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  validation,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function getErrors() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = validation.required;
    if (!email.trim()) errs.email = validation.required;
    else if (!EMAIL_RE.test(email.trim())) errs.email = validation.invalidEmail;
    if (!subject.trim()) errs.subject = validation.required;
    if (!message.trim()) errs.message = validation.required;
    return errs;
  }

  const errors = getErrors();

  function shouldShowError(field: string) {
    return (submitted || touched[field]) && errors[field];
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setTouched({});
    setSubmitted(false);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            className={`${inputBase} ${shouldShowError("name") ? inputError : ""}`}
          />
          {shouldShowError("name") && (
            <p className="text-sm text-[#cc0000]" role="alert">{errors.name}</p>
          )}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`${inputBase} ${shouldShowError("email") ? inputError : ""}`}
          />
          {shouldShowError("email") && (
            <p className="text-sm text-[#cc0000]" role="alert">{errors.email}</p>
          )}
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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onBlur={() => handleBlur("subject")}
            className={`${inputBase} ${shouldShowError("subject") ? inputError : ""}`}
          />
          {shouldShowError("subject") && (
            <p className="text-sm text-[#cc0000]" role="alert">{errors.subject}</p>
          )}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => handleBlur("message")}
            className={`${inputBase} h-[200px] resize-y ${shouldShowError("message") ? inputError : ""}`}
          />
          {shouldShowError("message") && (
            <p className="text-sm text-[#cc0000]" role="alert">{errors.message}</p>
          )}
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

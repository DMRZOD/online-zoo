import Image from "next/image";
import ContactForm from "./contact-form";

interface ContactTranslations {
  title: string;
  text: string;
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

interface ContactSectionProps {
  translations: ContactTranslations;
}

export default function ContactSection({ translations }: ContactSectionProps) {
  return (
    <section className="pb-[80px] sm:pb-[100px] xl:pb-[150px]">
      {/* Hero image */}
      <div className="w-full mx-auto max-w-[1400px]">
        <Image
          src="/images/contact/contact.jpg"
          alt="Get in Touch"
          width={1920}
          height={600}
          className="w-full object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1480px] px-2.5 sm:px-5 xl:px-10">
        <div className="mt-[30px] flex flex-col items-center gap-y-[50px] sm:mt-[50px] xl:mt-[150px] xl:flex-row xl:items-start xl:gap-y-0 xl:gap-x-[175px]">
          {/* Info */}
          <div className="w-full max-w-[835px] text-center xl:max-w-[545px] xl:shrink-0 xl:text-left">
            <h2 className="text-[26px] font-semibold uppercase text-turquoise sm:text-[54px]">
              {translations.title}
            </h2>
            <p className="mt-[30px] text-lg font-normal leading-[1.5] xl:mt-[50px]">
              {translations.text}
            </p>
          </div>

          {/* Form */}
          <ContactForm
            nameLabel={translations.nameLabel}
            emailLabel={translations.emailLabel}
            subjectLabel={translations.subjectLabel}
            messageLabel={translations.messageLabel}
            namePlaceholder={translations.namePlaceholder}
            emailPlaceholder={translations.emailPlaceholder}
            subjectPlaceholder={translations.subjectPlaceholder}
            messagePlaceholder={translations.messagePlaceholder}
            submit={translations.submit}
            toast={translations.toast}
            validation={translations.validation}
          />
        </div>
      </div>
    </section>
  );
}

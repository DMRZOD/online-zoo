import { getTranslations } from "next-intl/server";
import ContactSection from "@/components/contact/contact-section";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const translations = {
    title: t("title"),
    text: t("text"),
    nameLabel: t("form.nameLabel"),
    emailLabel: t("form.emailLabel"),
    subjectLabel: t("form.subjectLabel"),
    messageLabel: t("form.messageLabel"),
    namePlaceholder: t("form.namePlaceholder"),
    emailPlaceholder: t("form.emailPlaceholder"),
    subjectPlaceholder: t("form.subjectPlaceholder"),
    messagePlaceholder: t("form.messagePlaceholder"),
    submit: t("form.submit"),
    toast: t("toast"),
  };

  return <ContactSection translations={translations} />;
}

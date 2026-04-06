import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DonationPopupProvider } from "@/components/donation/donation-context";
import DonationPopup from "@/components/donation/donation-popup";
import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Online Zoo",
  description: "Virtual Zoo With Live Animal Cameras",
  icons: {
    icon: "/icons/favicon.svg",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ru" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={montserrat.variable}
    >
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          <DonationPopupProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ThemeToggle />
            <DonationPopup />
          </DonationPopupProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const siteConfig = {
  name: "Online Zoo",
  description: "Virtual Zoo With Live Animal Cameras",
  url: "https://online-zoo-damir.vercel.app",
  ogImage: "/images/hero/hero-desktop.jpg",
  links: {
    youtube: "https://www.youtube.com",
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
  },
  locales: ["en", "ru", "es"] as const,
  defaultLocale: "en" as const,
} as const;

export type SiteConfig = typeof siteConfig;

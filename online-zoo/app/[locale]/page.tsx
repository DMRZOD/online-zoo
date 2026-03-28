import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("common.nav");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-extrabold uppercase text-turquoise tracking-wide">
        Online Zoo
      </h1>
    </div>
  );
}

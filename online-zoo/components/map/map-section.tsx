import BlurImage from "@/components/ui/blur-image";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/motion-wrapper";

interface MapTranslations {
  title: string;
}

const markers = [
  { name: "eagle", alt: "Eagle", icon: "/icons/map/eagle.svg", petId: 5 },
  {
    name: "alligator",
    alt: "Alligator",
    icon: "/icons/map/alligator.svg",
    petId: 4,
  },
  { name: "lion", alt: "Lion", icon: "/icons/map/lion.svg", petId: 7 },
  { name: "gorilla", alt: "Gorilla", icon: "/icons/map/gorilla.svg", petId: 3 },
  { name: "lemur", alt: "Lemur", icon: "/icons/map/lemur.svg", petId: 2 },
  { name: "panda", alt: "Panda", icon: "/icons/map/panda.svg", petId: 1 },
  { name: "tiger", alt: "Tiger", icon: "/icons/map/tiger.svg", petId: 8 },
  { name: "coala", alt: "Koala", icon: "/icons/map/coala.svg", petId: 6 },
];

export default function MapSection({
  translations,
}: {
  translations: MapTranslations;
}) {
  return (
    <section className="flex flex-col items-center pt-5 pb-[50px] gap-y-[30px] lg:pt-[30px] lg:pb-[100px] lg:gap-y-[50px] 2xl:pt-10 2xl:pb-[150px] 2xl:gap-y-[70px]">
      <FadeIn>
        <h2 className="max-w-[300px] sm:max-w-[600px] mx-auto text-center uppercase font-semibold text-[26px] lg:text-[42px] 2xl:text-[54px] text-foreground">
          {translations.title}
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} className="relative w-full mx-auto max-w-[1400px]">
        <BlurImage
          src="/images/map/map.jpg"
          alt="World map"
          width={1920}
          height={960}
          className="w-full h-auto dark:hidden"
        />
        <BlurImage
          src="/images/map/map-dark.jpg"
          alt="World map"
          width={1920}
          height={960}
          className="w-full h-auto hidden dark:block"
        />
        {markers.map((m) => (
          <Link
            key={m.name}
            href={`/webcams?pet=${m.petId}`}
            className={`marker marker_${m.name}`}
          >
            <span className="marker__icon">
              <BlurImage
                src={m.icon}
                alt={m.alt}
                width={40}
                height={40}
                className="w-full h-[20px] lg:h-[50px]"
              />
            </span>
          </Link>
        ))}
      </FadeIn>
    </section>
  );
}

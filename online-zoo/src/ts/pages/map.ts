const petId: Record<string, number> = {
  panda: 1,
  lemur: 2,
  gorilla: 3,
  alligator: 4,
  eagle: 5,
  coala: 6,
  lion: 7,
  tiger: 8,
};

const getPetIdFromMarker = (element: Element): number | null => {
  const className = element.className;
  if (typeof className !== "string") return null;
  const match = className.match(/\bmarker_(\w+)\b/);
  if (!match) return null;
  const key = match[1].toLowerCase();
  const id = petId[key];
  return id != null ? id : null;
};

export const initMapPage = (): void => {
  const wrapper = document.querySelector(".map__wrapper");
  if (!wrapper) return;

  const markers = wrapper.querySelectorAll<HTMLAnchorElement>(".marker");

  markers.forEach((marker) => {
    const petId = getPetIdFromMarker(marker);
    if (petId != null) {
      marker.href = `${"/pages/animals.html"}?pet=${petId}`;
    }
  });
};

import petData from "../../data/data.json";
import { YOUTUBE_EMBED_BASE, EVENT_PET_SELECTED } from "../services/config";
import type { Camera } from "../types/api";
import type { PetAssetMap, PetVideos } from "../types/common";

const assets: PetAssetMap = petData as PetAssetMap;

const getEmbedUrl = (videoId: string): string => {
  return `${YOUTUBE_EMBED_BASE}${videoId}?si=live`;
};

const getVideosForPet = (petId: string): PetVideos[] | null => {
  const pet = assets[String(petId)];
  return pet?.videos?.length ? pet.videos : null;
};

const getCommonName = (petId: string): string =>
  assets[String(petId)]?.commonName ?? "Panda";

const buildIframeHtml = (
  videoId: string,
  title: string = "YouTube video player",
): string => {
  return `
  <iframe
    src="${getEmbedUrl(videoId)}"
    title="${title}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>`;
};

export const renderLive = (
  cameras: Camera[],
  initialPetId?: string | number,
): string => {
  const petId = String(initialPetId ?? cameras[0]?.petId ?? "1");
  const videos = getVideosForPet(petId);
  const title = getCommonName(petId);

  const mainVideoId = videos?.[0]?.id ?? "k-7_sWrR1rk";
  const sideIds = [
    videos?.[1]?.id ?? "j_imkoLouT8",
    videos?.[2]?.id ?? "YdP2fFyjBWQ",
    videos?.[3]?.id ?? "dqT-UlYlg1s",
  ];

  return `
  <section class="live">
    <div class="live__container">
      <div class="live__header">
        <h2 class="live__title">Live ${title} Cams</h2>
        <button class="button-primary live__btn live__btn-1">
          <span>Donate Now</span>
          <img src="/icons/arrow-right.svg" alt="Arrow Right" />
        </button>
      </div>
      <div class="live__video">
        ${buildIframeHtml(mainVideoId)}
      </div>

      <button class="button-primary live__btn live__btn-2">
        <span>Donate Now</span>
        <img src="/icons/arrow-right.svg" alt="Arrow Right" />
      </button>

      <h3 class="live__subtitle">More live views</h3>

      <div class="live__carousel">
        <button class="live__nav">
          <img src="/icons/arrow-left-navy.svg" alt="Union Left" />
        </button>

        <div class="live__cams">
          ${sideIds
            .map(
              (id) => `
          <div class="live__cams-item">
            ${buildIframeHtml(id)}
          </div>`,
            )
            .join("")}
        </div>

        <button class="live__nav">
          <img src="/icons/arrow-right-navy.svg" alt="Union Right" />
        </button>
      </div>

      <button class="button-primary live__btn live__btn-3">
        <span>Donate Now</span>
        <img src="/icons/arrow-right.svg" alt="Arrow Right" />
      </button>
    </div>
  </section>`;
};

export const updateLiveVideos = (petId: string): void => {
  const videos = getVideosForPet(petId);
  if (!videos?.length) return;

  const titleEl = document.querySelector<HTMLElement>(".live__title");
  if (titleEl) {
    titleEl.textContent = `Live ${getCommonName(petId)} Cams`;
  }

  const mainIframe = document.querySelector<HTMLIFrameElement>(
    ".live__video iframe",
  );
  if (mainIframe && videos[0]) {
    mainIframe.src = getEmbedUrl(videos[0].id);
  }

  const carouselItems =
    document.querySelectorAll<HTMLElement>(".live__cams-item");
  [1, 2, 3].forEach((i, idx) => {
    const iframe =
      carouselItems[idx]?.querySelector<HTMLIFrameElement>("iframe");
    const video = videos[i];
    if (iframe && video) {
      iframe.src = getEmbedUrl(video.id);
    }
  });
};

export const initLiveSync = (): void => {
  document.addEventListener(EVENT_PET_SELECTED, ((
    e: CustomEvent<{ petId: string }>,
  ) => {
    if (e.detail?.petId) {
      updateLiveVideos(e.detail.petId);
    }
  }) as EventListener);
};

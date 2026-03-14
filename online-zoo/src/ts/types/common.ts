// Slider
export interface SliderOptions {
  section: HTMLElement;
  track: HTMLElement;
  card: string;
}

export interface SliderMetrics {
  groupSize: number;
  stepWidth: number;
}

// Pet Data
export interface PetVideos {
  id: string;
  title: string;
}

export interface PetAsset {
  commonName: string;
  cardImage: string;
  sidebarIcon: string;
  zooImage: string;
  videos: PetVideos[];
}

export type PetAssetMap = Record<string, PetAsset>;

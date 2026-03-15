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

// Donation State

export interface DonationState {
  amount: number;
  petId: number | null;
  petName: string;
  name: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
}

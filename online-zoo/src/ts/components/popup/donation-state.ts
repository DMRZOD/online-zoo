import type { DonationState } from "../../types/common";

const defaultState: DonationState = {
  amount: 0,
  petId: null,
  petName: "",
  name: "",
  email: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  saveCard: false,
};

let state: DonationState = { ...defaultState };

export function getDonationState(): DonationState {
  return { ...state };
}

export function setDonationState(partial: Partial<DonationState>): void {
  state = { ...state, ...partial };
}

export function resetDonationState(): void {
  state = { ...defaultState };
}

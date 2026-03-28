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

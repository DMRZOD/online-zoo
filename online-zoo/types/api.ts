export interface ApiResponse<T> {
  data: T;
}

export interface Pet {
  id: number;
  name: string;
  commonName: string;
  description: string;
}

export interface PetDetail {
  id: number;
  commonName: string;
  scientificName: string;
  type: string;
  size: string;
  diet: string;
  habitat: string;
  range: string;
  latitude: string;
  longitude: string;
  description: string;
  detailedDescription: string;
}

export interface Feedback {
  id: number;
  city: string;
  month: string;
  year: string;
  text: string;
  name: string;
}

export interface Camera {
  id: number;
  petId: number;
  text: string;
}

export interface RegisterPayload {
  login: string;
  password: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface AuthUser {
  login: string;
  name: string;
  email: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

export interface DonationPayload {
  name: string;
  email: string;
  amount: number;
  petId: number;
}

export interface SavedCard {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: ApiError };

export interface ApiError {
  message: string;
  status: number;
}

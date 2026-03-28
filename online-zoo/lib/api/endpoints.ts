import { getJson, postJson } from "./client";
import { BASE_URL } from "@/lib/constants";
import type {
  ApiResponse,
  Pet,
  PetDetail,
  Feedback,
  Camera,
  RegisterPayload,
  LoginPayload,
  AuthSession,
  AuthUser,
  DonationPayload,
} from "@/types/api";

export const getPets = () =>
  getJson<ApiResponse<Pet[]>>(`${BASE_URL}/pets`);

export const getPetById = (id: number) =>
  getJson<ApiResponse<PetDetail>>(`${BASE_URL}/pets/${id}`);

export const getCameras = () =>
  getJson<ApiResponse<Camera[]>>(`${BASE_URL}/cameras`);

export const getFeedback = () =>
  getJson<ApiResponse<Feedback[]>>(`${BASE_URL}/feedback`);

export const register = (payload: RegisterPayload) =>
  postJson<AuthSession, RegisterPayload>(`${BASE_URL}/auth/register`, payload);

export const login = (payload: LoginPayload) =>
  postJson<AuthSession, LoginPayload>(`${BASE_URL}/auth/login`, payload);

export const getProfile = (token: string) =>
  getJson<ApiResponse<AuthUser>>(`${BASE_URL}/auth/profile`, token);

export const submitDonation = (payload: DonationPayload, token?: string) =>
  postJson<{ success: boolean }, DonationPayload>(
    `${BASE_URL}/donations`,
    payload,
    token
  );

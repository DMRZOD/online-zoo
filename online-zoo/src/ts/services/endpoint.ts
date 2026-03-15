import { BASE_URL } from "./config";
import { getJson, postJson } from "./client";

import type {
  ApiResponse,
  Pet,
  Feedback,
  Camera,
  PetDetail,
  LoginPayload,
  RegisterPayload,
  AuthUser,
  AuthSession,
} from "../types/api";

export const getPets = (): Promise<ApiResponse<Pet[]>> => {
  return getJson<ApiResponse<Pet[]>>(`${BASE_URL}/pets`);
};

export const getFeedback = (): Promise<ApiResponse<Feedback[]>> => {
  return getJson<ApiResponse<Feedback[]>>(`${BASE_URL}/feedback`);
};

export const getCameras = (): Promise<ApiResponse<Camera[]>> => {
  return getJson<ApiResponse<Camera[]>>(`${BASE_URL}/cameras`);
};

export const getPetById = (id: number): Promise<ApiResponse<PetDetail>> => {
  return getJson<ApiResponse<PetDetail>>(`${BASE_URL}/pets/${id}`);
};

export const login = (
  payload: LoginPayload,
): Promise<ApiResponse<AuthSession>> => {
  return postJson<ApiResponse<AuthSession>, LoginPayload>(
    `${BASE_URL}/auth/login`,
    payload,
  );
};

export const register = (
  payload: RegisterPayload,
): Promise<{ data: AuthUser }> => {
  return postJson<{ data: AuthUser }, RegisterPayload>(
    `${BASE_URL}/auth/register`,
    payload,
  );
};

export const getProfile = (token: string): Promise<ApiResponse<AuthUser>> => {
  return getJson<ApiResponse<AuthUser>>(`${BASE_URL}/auth/profile`, token);
};

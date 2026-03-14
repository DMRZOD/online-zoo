import { BASE_URL } from "./config";
import { getJson } from "./client";
import type { ApiResponse, Pet, Feedback, Camera } from "../types/api";

export const getPets = (): Promise<ApiResponse<Pet[]>> => {
  return getJson<ApiResponse<Pet[]>>(`${BASE_URL}/pets`);
};

export const getFeedback = (): Promise<ApiResponse<Feedback[]>> => {
  return getJson<ApiResponse<Feedback[]>>(`${BASE_URL}/feedback`);
};

export const getCameras = (): Promise<ApiResponse<Camera[]>> => {
  return getJson<ApiResponse<Camera[]>>(`${BASE_URL}/cameras`);
};

import { getJson } from "./client";
import type { ApiResponse, Feedback, Pet } from "../types/api";

const BASE_URL =
  "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod";

export const getPets = (): Promise<ApiResponse<Pet[]>> => {
  return getJson<ApiResponse<Pet[]>>(`${BASE_URL}/pets`);
};

export const getFeedback = (): Promise<ApiResponse<Feedback[]>> => {
  return getJson<ApiResponse<Feedback[]>>(`${BASE_URL}/feedback`);
};

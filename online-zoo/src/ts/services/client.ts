import type { ApiError } from "../types/api";

export const getJson = async <T>(url: string): Promise<T> => {
  const response: Response = await fetch(url);

  if (!response.ok) {
    throw { message: "Request failed", status: response.status } as ApiError;
  }

  return (await response.json()) as T;
};

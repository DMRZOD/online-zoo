import type { ApiError } from "../types/api";

export const getJson = async <T>(url: string, token?: string): Promise<T> => {
  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response: Response = await fetch(url, { headers });

  if (!response.ok) {
    throw { message: "Request failed", status: response.status } as ApiError;
  }

  return (await response.json()) as T;
};

export const postJson = async <T, B = object>(
  url: string,
  body: B,
  token?: string,
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response: Response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err: ApiError = {
      message: "Request failed",
      status: response.status,
    };
    try {
      const data = (await response.json()) as { message?: string };
      if (data.message) err.message = data.message;
    } catch {
      // ignore
    }
    throw err;
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
};

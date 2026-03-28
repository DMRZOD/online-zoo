import type { ApiError, Result } from "@/types/api";

export async function getJson<T>(
  url: string,
  token?: string
): Promise<Result<T>> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(url, { headers });

    if (!res.ok) {
      return {
        ok: false,
        error: { message: res.statusText, status: res.status },
      };
    }

    const data: T = await res.json();
    return { ok: true, data };
  } catch {
    return {
      ok: false,
      error: { message: "Network error", status: 0 },
    };
  }
}

export async function postJson<T, B = Record<string, unknown>>(
  url: string,
  body: B,
  token?: string
): Promise<Result<T>> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      let error: ApiError;
      try {
        const json = await res.json();
        error = { message: json.message || res.statusText, status: res.status };
      } catch {
        error = { message: res.statusText, status: res.status };
      }
      return { ok: false, error };
    }

    const data: T = await res.json();
    return { ok: true, data };
  } catch {
    return {
      ok: false,
      error: { message: "Network error", status: 0 },
    };
  }
}

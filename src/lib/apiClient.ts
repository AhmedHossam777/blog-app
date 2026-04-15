import type { IRequestOptions } from "./IRequest";

const BASE_URL = "http://localhost:8080/api/v1";

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise!;
  }
  isRefreshing = true;
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    isRefreshing = false;
    return null;
  }

  refreshPromise = fetch(`${BASE_URL}/auth/refresh-tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }
      return response.json();
    })
    .then((data) => {
      const newAccessToken = data.data.tokens.accessToken;
      const newRefreshToken = data.data.tokens.refreshToken;
      setTokens(newAccessToken, newRefreshToken);
      return newAccessToken;
    })
    .catch((err) => {
      console.error("Error refreshing token:", err);
      clearTokens();
      return null;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
};

export const apiClient = async (
  endpoint: string,
  options: IRequestOptions = {},
) => {
  const { method = "GET", body, headers = {}, requiresAuth = true } = options;
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  if (requiresAuth) {
    let accessToken = getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }

  let response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401 && requiresAuth) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      (config.headers as Record<string, string>)["Authorization"] =
        `Bearer ${newAccessToken}`;
      response = await fetch(`${BASE_URL}${endpoint}`, config);
    } else {
      clearTokens();
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || `Request failed: ${response.status}`);
  }

  return response.json();
};

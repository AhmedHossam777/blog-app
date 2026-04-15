export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface RefreshTokenCredentials {
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

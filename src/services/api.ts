import { ApiConfig, ApiError } from '@/types/api';

export class ApiClient {
  constructor(private config: ApiConfig) {}

  async fetchWithError<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${this.config.baseURL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const response = await fetch(url, {
      headers: this.config.headers,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}
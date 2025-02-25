export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiConfig {
  baseURL: string;
  headers: HeadersInit;
}
import axios from 'axios';
import { PexelsPhoto, PexelsResponse } from '../types/pexels';

class PexelsService {
  private client;
  private baseURL = 'https://api.pexels.com/v1';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      },
    });
  }

  async getCuratedPhotos(page: number = 1, perPage: number = 30): Promise<PexelsResponse> {
    try {
      const response = await this.client.get<PexelsResponse>('/curated', {
        params: {
          page,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching curated photos:', error);
      throw error;
    }
  }

  async searchPhotos(query: string, page: number = 1, perPage: number = 30): Promise<PexelsResponse> {
    try {
      const response = await this.client.get<PexelsResponse>('/search', {
        params: {
          query,
          page,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching photos:', error);
      throw error;
    }
  }

  async getPhotoById(id: number): Promise<PexelsPhoto> {
    try {
      const response = await this.client.get<PexelsPhoto>(`/photos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching photo by id:', error);
      throw error;
    }
  }
}

export const pexelsService = new PexelsService();
import { PexelsResponse, PexelsPhoto, PhotoService } from '@/types/pexels';
import { ApiClient } from '@/services/api';

class PexelsService implements PhotoService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient({
      baseURL: 'https://api.pexels.com/v1',
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      },
    });
  }

  async getCuratedPhotos(page: number = 1, perPage: number = 30): Promise<PexelsResponse> {
    try {
      return await this.client.fetchWithError<PexelsResponse>('/curated', {
        page,
        per_page: perPage,
      });
    } catch (error) {
      console.error('Error fetching curated photos:', error);
      throw error;
    }
  }

  async searchPhotos(query: string, page: number = 1, perPage: number = 30): Promise<PexelsResponse> {
    try {
      return await this.client.fetchWithError<PexelsResponse>('/search', {
        query,
        page,
        per_page: perPage,
      });
    } catch (error) {
      console.error('Error searching photos:', error);
      throw error;
    }
  }

  async getPhotoById(id: string): Promise<PexelsPhoto> {
    try {
      return await this.client.fetchWithError<PexelsPhoto>(`/photos/${parseInt(id)}`);
    } catch (error) {
      console.error('Error fetching photo by id:', error);
      throw error;
    }
  }
}

export const pexelsService = new PexelsService();
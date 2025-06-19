import axios from 'axios';
export interface GenerateResponse {
  taskId: string;
}

export enum ImageStatusEnum {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface ImageStatus {
  status: ImageStatusEnum;
  url?: string;
}

class ImageService {
  private readonly apiUrl = 'http://localhost:4000/api/generate-image';

  async generateImage(prompt: string): Promise<GenerateResponse> {
    const response = await axios.post<GenerateResponse>(this.apiUrl, { prompt });
    return response.data;
  }

  async getImageStatus(taskId: string): Promise<ImageStatus> {
    const response = await axios.get<ImageStatus>(`${this.apiUrl}/status/${taskId}`);
    return response.data;
  }
}

export const imageService = new ImageService();

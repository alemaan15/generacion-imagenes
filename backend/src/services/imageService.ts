import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

enum ImageStatusEnum {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

interface ImageTask {
  id: string;
  prompt: string;
  status: ImageStatusEnum;
  url?: string;
}

class ImageService {
  private tasks: Record<string, ImageTask> = {};

  createTask(prompt: string): ImageTask {
    const id = uuidv4();

    this.tasks[id] = {
      id,
      prompt,
      status: ImageStatusEnum.PROCESSING,
    };

    // Simulación de generación de imagen (cambiarlo en el futuro por una IA real)
    setTimeout(async () => {
      try {
        const response = await axios.get('https://picsum.photos/600', {
          responseType: 'stream', 
        });

        const finalUrl = response.request.res.responseUrl;

        this.tasks[id] = {
          ...this.tasks[id],
          status: ImageStatusEnum.COMPLETED,
          url: finalUrl,
        };
      } catch (error) {
        this.tasks[id].status = ImageStatusEnum.FAILED;
      }
    }, 5000);

    return this.tasks[id];
  }

  getTask(id: string): ImageTask | undefined {
    return this.tasks[id];
  }
}

export const imageService = new ImageService();

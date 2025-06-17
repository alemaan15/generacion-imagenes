import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

type ImageStatus = 'processing' | 'completed' | 'failed';

interface ImageTask {
  id: string;
  prompt: string;
  status: ImageStatus;
  url?: string;
}

class ImageService {
  private tasks: Record<string, ImageTask> = {};

  createTask(prompt: string): ImageTask {
    const id = uuidv4();

    this.tasks[id] = {
      id,
      prompt,
      status: 'processing',
    };

    // Simulación de generación de imagen (puedes cambiarlo por una API real)
    setTimeout(async () => {
      try {
        const response = await axios.get('https://picsum.photos/600', {
          responseType: 'stream', // nos aseguramos de que obtenga la imagen
        });

        const finalUrl = response.request.res.responseUrl; // URL real de la imagen

        this.tasks[id] = {
          ...this.tasks[id],
          status: 'completed',
          url: finalUrl,
        };
      } catch (error) {
        this.tasks[id].status = 'failed';
      }
    }, 5000); // Espera 5 segundos como si la IA estuviera generando

    return this.tasks[id];
  }

  getTask(id: string): ImageTask | undefined {
    return this.tasks[id];
  }
}

export const imageService = new ImageService();

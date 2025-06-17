import { Request, Response } from 'express';
import { imageService } from '../services/imageService';

export const generateImage = (req: Request, res: Response): void => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
     res.status(400).json({ error: 'Prompt requerido' });
    return;
  }

  const task = imageService.createTask(prompt);
   res.status(200).json({ taskId: task.id });
};

// GET /api/generate-image/status/:taskId
export const getImageStatus = (req: Request, res: Response): void => {
  const { taskId } = req.params;

  const task = imageService.getTask(taskId);

  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    return;
  }

   res.status(200).json(task);
};
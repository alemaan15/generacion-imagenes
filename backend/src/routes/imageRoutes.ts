// src/routes/imageRoutes.ts
import { Router } from 'express';
import { generateImage, getImageStatus } from '../controllers/imageController';

const router = Router();

router.post('/', generateImage);
router.get('/status/:taskId', getImageStatus);

export default router;

import { Router } from 'express';
import { generateImage, getImageStatus } from '../controllers/imageController';

const router = Router();

//  /api/generate-image'
router.post('/', generateImage);
router.get('/status/:taskId', getImageStatus);

export default router;

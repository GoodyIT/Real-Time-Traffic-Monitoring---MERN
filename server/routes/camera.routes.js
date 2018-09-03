import { Router } from 'express';
import * as CameraController from '../controllers/camera.controller';
const router = new Router();

// Get all Camera Images
router.route('/cameras').get(CameraController.getCameras);

export default router;

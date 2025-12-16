import { Router } from 'express';
import { UploadController } from '../controllers/uploadController';
import { validateUpload } from '../middleware/upload';

const router = Router();
const uploadController = new UploadController();

export function setUploadRoutes(app: Router) {
    app.post('/upload', validateUpload, uploadController.handleUpload);
}
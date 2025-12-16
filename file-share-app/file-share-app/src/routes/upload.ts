import { Router } from 'express';
import { UploadController } from '../controllers/uploadController';
import multer from 'multer';
import { validateUpload } from '../middleware/upload';

const router = Router();
const uploadController = new UploadController();
const upload = multer({ limits: { fileSize: 1 * 1024 * 1024 * 1024 } }); // 1GB limit

router.post('/upload', upload.single('file'), uploadController.validateUpload, uploadController.handleUpload);

export default router;
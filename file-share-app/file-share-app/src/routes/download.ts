import { Router, Request, Response } from 'express';
import { DownloadController } from '../controllers/downloadController';

const router = Router();
const downloadController = new DownloadController();

router.get('/:link', downloadController.handleDownload);

export default router;
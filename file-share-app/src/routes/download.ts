import { Router } from 'express';
import { DownloadController } from '../controllers/downloadController';

const router = Router();
const downloadController = new DownloadController();

router.get('/:linkId', downloadController.validateLink.bind(downloadController), downloadController.handleDownload.bind(downloadController));

export const setDownloadRoutes = (app) => {
    app.use('/download', router);
};
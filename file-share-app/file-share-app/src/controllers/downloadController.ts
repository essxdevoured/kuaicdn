import { Request, Response } from 'express';
import { FileService } from '../services/fileService';
import { LinkService } from '../services/linkService';

export class DownloadController {
    private fileService: FileService;
    private linkService: LinkService;

    constructor() {
        this.fileService = new FileService();
        this.linkService = new LinkService();
    }

    public handleDownload = async (req: Request, res: Response) => {
        try {
            const { link } = req.params;
            const fileData = await this.linkService.validateLink(link);

            if (!fileData) {
                return res.status(404).json({ message: 'Link is invalid or has expired.' });
            }

            const file = await this.fileService.getFile(fileData.fileId);

            if (!file) {
                return res.status(404).json({ message: 'File not found.' });
            }

            res.set({
                'Content-Disposition': `attachment; filename="${file.originalName}"`,
                'Content-Type': file.contentType,
            });

            const stream = this.fileService.downloadFile(file.fileId);
            stream.pipe(res);
        } catch (error) {
            res.status(500).json({ message: 'Error downloading file.', error });
        }
    };
}
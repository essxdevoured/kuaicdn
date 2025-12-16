import { Request, Response } from 'express';
import { FileService } from '../services/fileService';
import { LinkService } from '../services/linkService';
import { validateUpload } from '../middleware/upload';

export class UploadController {
    private fileService: FileService;
    private linkService: LinkService;

    constructor() {
        this.fileService = new FileService();
        this.linkService = new LinkService();
    }

    public handleUpload = async (req: Request, res: Response) => {
        try {
            const { password, expiration } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'No file uploaded.' });
            }

            const savedFile = await this.fileService.saveFile(file, password, expiration);
            const link = this.linkService.generateLink(savedFile.id);

            res.status(200).json({ link, message: 'File uploaded successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading file.', error });
        }
    };

    public validateUpload = (req: Request, res: Response, next: Function) => {
        const { error } = validateUpload(req.file);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
}
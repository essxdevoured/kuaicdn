import { Request, Response, NextFunction } from 'express';

const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 1GB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip', 'application/x-zip-compressed'];

export const validateUpload = (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    if (file.size > MAX_FILE_SIZE) {
        return res.status(400).json({ error: 'File size exceeds 1GB limit.' });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return res.status(400).json({ error: 'Invalid file type.' });
    }

    next();
};
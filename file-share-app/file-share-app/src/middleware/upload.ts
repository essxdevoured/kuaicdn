import { Request, Response, NextFunction } from 'express';

export const validateUpload = (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const fileSizeLimit = 1 * 1024 * 1024 * 1024; // 1GB
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip'];

    if (file.size > fileSizeLimit) {
        return res.status(400).json({ message: 'File size exceeds the 1GB limit.' });
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, PDF, and ZIP files are allowed.' });
    }

    next();
};
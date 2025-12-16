import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many upload requests from this IP, please try again later.'
});

const downloadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many download requests from this IP, please try again later.'
});

export const rateLimitMiddleware = {
    upload: (req: Request, res: Response, next: NextFunction) => {
        uploadLimiter(req, res, next);
    },
    download: (req: Request, res: Response, next: NextFunction) => {
        downloadLimiter(req, res, next);
    }
};
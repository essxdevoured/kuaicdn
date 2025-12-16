import { Request, Response, NextFunction } from 'express';
import { LinkService } from '../services/linkService';

const linkService = new LinkService();

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { linkId, password } = req.body;

    try {
        const isValid = await linkService.validateLink(linkId, password);
        if (!isValid) {
            return res.status(403).json({ message: 'Invalid password or link has expired.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
import { Request, Response, NextFunction } from 'express';

const rateLimit = (req: Request, res: Response, next: NextFunction) => {
    const userIp = req.ip; // Get user IP address
    const currentTime = Date.now();
    const timeWindow = 60 * 1000; // 1 minute
    const maxUploads = 5; // Maximum uploads allowed in the time window

    // Store upload timestamps in memory (consider using a more persistent store for production)
    if (!global.uploads) {
        global.uploads = {};
    }

    if (!global.uploads[userIp]) {
        global.uploads[userIp] = [];
    }

    // Filter out timestamps older than the time window
    global.uploads[userIp] = global.uploads[userIp].filter(timestamp => currentTime - timestamp < timeWindow);

    if (global.uploads[userIp].length >= maxUploads) {
        return res.status(429).json({ message: 'Too many uploads. Please try again later.' });
    }

    // Record the current upload timestamp
    global.uploads[userIp].push(currentTime);
    next();
};

export default rateLimit;
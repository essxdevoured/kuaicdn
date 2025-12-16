export function validateFileType(file: Express.Multer.File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip'];
    return allowedTypes.includes(file.mimetype);
}

export function validateFileSize(file: Express.Multer.File, maxSize: number): boolean {
    return file.size <= maxSize;
}

export function validateExpirationTime(expiration: number): boolean {
    return expiration >= 5 && expiration <= 86400; // 5 seconds to 24 hours in seconds
}

export function validatePassword(password: string | undefined): boolean {
    return !password || (password && password.length >= 6);
}
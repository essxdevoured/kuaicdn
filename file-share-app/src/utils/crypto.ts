export function hashPassword(password: string): string {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

export function generateToken(length: number): string {
    const crypto = require('crypto');
    return crypto.randomBytes(length).toString('hex');
}
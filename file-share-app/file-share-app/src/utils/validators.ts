import { body } from 'express-validator';

export const validateUpload = [
    body('password')
        .optional()
        .isString()
        .withMessage('Password must be a string.'),
    body('expiration')
        .optional()
        .isInt({ min: 5, max: 86400 })
        .withMessage('Expiration must be an integer between 5 seconds and 24 hours (86400 seconds).'),
    body('file')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('No file uploaded.');
            }
            return true;
        }),
];
import { File } from '../models/File';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export class FileService {
    private uploadDir: string;

    constructor() {
        this.uploadDir = path.join(__dirname, '../../uploads');
    }

    public async saveFile(file: Express.Multer.File, password?: string, expiration?: number): Promise<File> {
        const fileId = uuidv4();
        const filePath = path.join(this.uploadDir, fileId);
        
        // Save the file to the filesystem
        await fs.promises.writeFile(filePath, file.buffer);

        const fileMetadata: File = {
            id: fileId,
            filename: file.originalname,
            password: password || null,
            expiration: expiration || null,
            uploadDate: new Date(),
        };

        // Here you would typically save fileMetadata to the database

        return fileMetadata;
    }

    public async getFile(fileId: string): Promise<Express.Multer.File | null> {
        const filePath = path.join(this.uploadDir, fileId);

        if (fs.existsSync(filePath)) {
            return fs.promises.readFile(filePath);
        }

        return null;
    }
}
import { MongoClient, ObjectId } from 'mongodb';
import { File } from '../models/File';
import { GridFSBucket } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { unlink } from 'fs/promises';

export class FileService {
    private db: MongoClient;
    private bucket: GridFSBucket;

    constructor() {
        this.db = new MongoClient(process.env.MONGODB_URI || '');
        this.bucket = new GridFSBucket(this.db.db('fileShareApp'));
    }

    public async connect() {
        await this.db.connect();
    }

    public async saveFile(file: Express.Multer.File, password: string, expiration: number) {
        const fileId = new ObjectId();
        const uploadStream = this.bucket.openUploadStream(fileId.toString(), {
            contentType: file.mimetype,
            metadata: {
                password,
                expiration,
                originalName: file.originalname,
                createdAt: new Date(),
            },
        });

        uploadStream.end(file.buffer);

        const fileDocument = new File({
            _id: fileId,
            originalName: file.originalname,
            password,
            expiration,
            createdAt: new Date(),
        });

        await fileDocument.save();
        return fileDocument;
    }

    public async getFile(fileId: string) {
        const fileDocument = await File.findById(fileId);
        if (!fileDocument) {
            throw new Error('File not found');
        }
        return fileDocument;
    }

    public async deleteFile(fileId: string) {
        await this.bucket.delete(new ObjectId(fileId));
        await File.deleteOne({ _id: fileId });
    }

    public async cleanupExpiredFiles() {
        const now = new Date();
        const expiredFiles = await File.find({ expiration: { $lt: now } });

        for (const file of expiredFiles) {
            await this.deleteFile(file._id.toString());
        }
    }
}
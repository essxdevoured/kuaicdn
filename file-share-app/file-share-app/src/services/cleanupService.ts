import { MongoClient } from 'mongodb';
import { File } from '../models/File';

export class CleanupService {
    private db: MongoClient;

    constructor(db: MongoClient) {
        this.db = db;
    }

    public async cleanUpExpiredFiles() {
        const currentTime = new Date();
        const expiredFiles = await this.db.collection('files').find({
            expiration: { $lt: currentTime }
        }).toArray();

        if (expiredFiles.length > 0) {
            const fileIds = expiredFiles.map(file => file._id);
            await this.db.collection('files').deleteMany({ _id: { $in: fileIds } });
            // Additional logic to remove files from GridFS can be added here
        }
    }

    public startCleanup(interval: number) {
        setInterval(() => {
            this.cleanUpExpiredFiles().catch(err => console.error('Cleanup error:', err));
        }, interval);
    }
}
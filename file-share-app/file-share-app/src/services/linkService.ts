import { v4 as uuidv4 } from 'uuid';
import { File } from '../models/File';
import mongoose from 'mongoose';

export class LinkService {
    public generateLink(fileId: string): string {
        const uniqueId = uuidv4();
        const link = `${process.env.BASE_URL}/download/${uniqueId}`;
        this.storeLinkMapping(uniqueId, fileId);
        return link;
    }

    private async storeLinkMapping(uniqueId: string, fileId: string): Promise<void> {
        await mongoose.connection.collection('linkMappings').insertOne({ uniqueId, fileId });
    }

    public async getFileId(uniqueId: string): Promise<string | null> {
        const mapping = await mongoose.connection.collection('linkMappings').findOne({ uniqueId });
        return mapping ? mapping.fileId : null;
    }

    public async cleanupExpiredLinks(): Promise<void> {
        const now = new Date();
        await mongoose.connection.collection('linkMappings').deleteMany({ expiration: { $lt: now } });
    }
}
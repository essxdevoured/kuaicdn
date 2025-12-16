import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
    filename: string;
    originalName: string;
    password?: string;
    expiration: Date;
    createdAt: Date;
    updatedAt: Date;
    location: string; // This can be a GridFS ID or a URL
}

const fileSchema: Schema = new Schema({
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    password: { type: String, required: false },
    expiration: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    location: { type: String, required: true }
});

export const FileModel = mongoose.model<IFile>('File', fileSchema);
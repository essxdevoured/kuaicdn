import { GridFSBucket, MongoClient } from 'mongodb';
import { MongoDB_URI } from '../config/database';

let gridFSBucket: GridFSBucket;

export const connectGridFS = async () => {
    const client = new MongoClient(MongoDB_URI);
    await client.connect();
    const db = client.db('fileShareDB'); // Replace with your database name
    gridFSBucket = new GridFSBucket(db, {
        bucketName: 'uploads', // Name of the bucket
    });
};

export const getGridFSBucket = () => {
    if (!gridFSBucket) {
        throw new Error('GridFSBucket not initialized. Call connectGridFS first.');
    }
    return gridFSBucket;
};
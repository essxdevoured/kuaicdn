export interface FileMetadata {
    id: string;
    filename: string;
    password?: string;
    expirationTime: Date;
    uploadDate: Date;
    size: number;
}

export class File {
    constructor(
        public id: string,
        public filename: string,
        public password: string | undefined,
        public expirationTime: Date,
        public uploadDate: Date,
        public size: number
    ) {}

    isExpired(): boolean {
        return new Date() > this.expirationTime;
    }
}
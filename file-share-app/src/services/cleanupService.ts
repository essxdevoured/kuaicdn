export class CleanupService {
    constructor(private fileModel: any) {}

    async cleanupExpiredLinks() {
        const now = new Date();
        await this.fileModel.deleteMany({ expiration: { $lt: now } });
    }

    startCleanup(interval: number) {
        setInterval(() => {
            this.cleanupExpiredLinks().catch(err => console.error('Cleanup error:', err));
        }, interval);
    }
}
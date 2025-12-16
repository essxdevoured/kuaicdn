export class LinkService {
    private links: Map<string, { password?: string; expiration: number }> = new Map();

    generateLink(password?: string, expirationInSeconds: number = 3600): string {
        const linkId = this.createUniqueLinkId();
        const expiration = Date.now() + expirationInSeconds * 1000;
        this.links.set(linkId, { password, expiration });
        return linkId;
    }

    validateLink(linkId: string, password?: string): boolean {
        const linkData = this.links.get(linkId);
        if (!linkData) {
            return false; // Link does not exist
        }
        if (Date.now() > linkData.expiration) {
            this.links.delete(linkId); // Remove expired link
            return false; // Link has expired
        }
        if (linkData.password && linkData.password !== password) {
            return false; // Incorrect password
        }
        return true; // Link is valid
    }

    private createUniqueLinkId(): string {
        return Math.random().toString(36).substr(2, 9); // Simple unique ID generator
    }
}
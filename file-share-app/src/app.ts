import express from 'express';
import { json, urlencoded } from 'body-parser';
import { setUploadRoutes } from './routes/upload';
import { setDownloadRoutes } from './routes/download';
import rateLimit from './middleware/rateLimit';
import { connectToDatabase } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(rateLimit);

// Connect to the database
connectToDatabase();

// Set up routes
setUploadRoutes(app);
setDownloadRoutes(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
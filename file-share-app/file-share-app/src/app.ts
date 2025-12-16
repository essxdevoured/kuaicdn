import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { uploadRoutes } from './routes/upload';
import { downloadRoutes } from './routes/download';
import { config } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully.');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/download', downloadRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
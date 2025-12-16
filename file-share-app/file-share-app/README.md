# File Sharing Application

This project is a file sharing application that allows users to upload files, generate secure links for downloads, and set options for password protection and expiration times. The application is built using Node.js, Express, and MongoDB.

## Features

- File upload with a maximum size of 1GB.
- Generate secure download links.
- Password protection for links.
- Link expiration settings (from 5 seconds to 24 hours).
- Middleware for authentication and rate limiting.
- Uses MongoDB for file storage and metadata management.

## Project Structure

- **src/**: Contains the source code for the application.
  - **app.ts**: Entry point of the application.
  - **controllers/**: Contains controllers for handling requests.
  - **middleware/**: Contains middleware for authentication and validation.
  - **models/**: Contains the MongoDB schema for files.
  - **routes/**: Defines the API routes for uploads and downloads.
  - **services/**: Contains business logic for file handling and link generation.
  - **utils/**: Utility functions for cryptography and validation.
  - **config/**: Configuration files for database and GridFS.

- **public/**: Contains static files for the frontend.
  - **index.html**: Main HTML page for the application.
  - **css/**: Stylesheets for the application.
  - **js/**: JavaScript files for client-side functionality.

- **views/**: Contains EJS templates for rendering pages.
  - **upload.ejs**: Template for the upload page.
  - **download.ejs**: Template for the download page.

- **package.json**: NPM configuration file.
- **tsconfig.json**: TypeScript configuration file.
- **.env.example**: Example environment configuration file.
- **README.md**: Documentation for the project.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd file-share-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Start the application:
   ```
   npm start
   ```

## Usage

- Navigate to the application in your web browser.
- Use the upload form to select a file, set password protection, and choose an expiration time.
- After uploading, you will receive a secure link to download the file.

## License

This project is licensed under the MIT License.
# File: /file-share-app/file-share-app/README.md

# File Share App

A simple file sharing application that allows users to upload files, generate secure links with optional password protection, and set expiration times for those links. The application is built using Node.js and Express, and it is designed to handle file uploads up to 1GB in size.

## Features

- File upload with a maximum size of 1GB
- Generate secure links for file downloads
- Optional password protection for links
- Set expiration times for links (from 5 seconds to 24 hours)
- User-friendly interface for uploading and downloading files
- Middleware for file validation and rate limiting
- Automatic cleanup of expired links

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB (or any other database of your choice)
- EJS for templating
- CSS for styling

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

3. Create a `.env` file based on the `.env.example` file and configure your environment variables.

4. Start the application:

   ```
   npm start
   ```

## Usage

- Navigate to `http://localhost:3000` in your web browser.
- Use the upload form to select a file and set the desired options (password protection and expiration time).
- After uploading, you will receive a link to download the file.
- Use the link to download the file, entering the password if required.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
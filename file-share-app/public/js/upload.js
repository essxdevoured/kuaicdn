const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const passwordInput = document.getElementById('passwordInput');
const expirationInput = document.getElementById('expirationInput');
const submitButton = document.getElementById('submitButton');
const messageDiv = document.getElementById('message');

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const file = fileInput.files[0];
    const password = passwordInput.value;
    const expiration = expirationInput.value;

    if (!file) {
        messageDiv.textContent = 'Please select a file to upload.';
        return;
    }

    if (file.size > 1 * 1024 * 1024 * 1024) {
        messageDiv.textContent = 'File size exceeds 1GB limit.';
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);
    formData.append('expiration', expiration);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            messageDiv.innerHTML = `File uploaded successfully! <a href="${result.link}">Download Link</a>`;
        } else {
            messageDiv.textContent = result.message || 'Upload failed.';
        }
    } catch (error) {
        messageDiv.textContent = 'An error occurred during the upload.';
    }
});
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const passwordInput = document.getElementById('passwordInput');
const expirationInput = document.getElementById('expirationInput');
const progressBar = document.getElementById('progressBar');
const messageBox = document.getElementById('messageBox');

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('password', passwordInput.value);
    formData.append('expiration', expirationInput.value);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            messageBox.textContent = `File uploaded successfully! Access it here: ${result.link}`;
        } else {
            messageBox.textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        messageBox.textContent = 'Error uploading file.';
    }
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Size in MB
        messageBox.textContent = `Selected file: ${file.name} (${fileSize} MB)`;
    }
});
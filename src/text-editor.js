// text-editor.js
class TextEditor {
    constructor(containerId) {
        // Initialize properties
        // this.container = document.getElementById(containerId) || document.createElement('div');

        // Initialize properties
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container element with id '${containerId}' not found`);
        }
        this.textarea = null;
        this.toolbar = null;
        this.sendButton = null;
        this.uploadedImages = new Map(); // Store uploaded image references
        this.isUploading = false;

        // Font options
        this.fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
        this.fontFamilies = [
            'Arial',
            'Times New Roman',
            'Helvetica',
            'Georgia',
            'Courier New',
            'Verdana',
            'Roboto',
            'Open Sans'
        ];
        this.fontStyles = ['Normal', 'Bold', 'Italic', 'Bold Italic'];

        // Initialize the editor
        this.initializeEditor();

        // Add paste event listener after textarea is created
        this.textarea.addEventListener('paste', (e) => this.handleImagePaste(e));
    }

    createSelect(options, defaultValue, onChange) {
        const select = document.createElement('select');
        select.style.cssText = `
            margin-right: 8px;
            padding: 4px;
            border: 1px solid #ddd;
            border-radius: 3px;
            cursor: pointer;
            background: white;
        `;

        options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option;
            optElement.textContent = option;
            select.appendChild(optElement);
        });

        select.value = defaultValue;
        select.addEventListener('change', (e) => onChange(e.target.value));
        return select;
    }

    initializeEditor() {
        // Create toolbar
        this.toolbar = document.createElement('div');
        this.toolbar.className = 'editor-toolbar';
        this.toolbar.style.cssText = `
            border: 1px solid #ddd;
            padding: 8px;
            border-bottom: none;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
        `;

        // Add font controls
        const fontControls = document.createElement('div');
        fontControls.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-right: 16px;';

        // Font family select
        const fontFamilySelect = this.createSelect(
            this.fontFamilies,
            'Arial',
            (value) => this.textarea.style.fontFamily = value
        );
        fontControls.appendChild(fontFamilySelect);

        // Font size select
        const fontSizeSelect = this.createSelect(
            this.fontSizes,
            '14px',
            (value) => this.textarea.style.fontSize = value
        );
        fontControls.appendChild(fontSizeSelect);

        // Font style select
        const fontStyleSelect = this.createSelect(
            this.fontStyles,
            'Normal',
            (value) => {
                switch (value) {
                    case 'Normal':
                        this.textarea.style.fontWeight = 'normal';
                        this.textarea.style.fontStyle = 'normal';
                        break;
                    case 'Bold':
                        this.textarea.style.fontWeight = 'bold';
                        this.textarea.style.fontStyle = 'normal';
                        break;
                    case 'Italic':
                        this.textarea.style.fontWeight = 'normal';
                        this.textarea.style.fontStyle = 'italic';
                        break;
                    case 'Bold Italic':
                        this.textarea.style.fontWeight = 'bold';
                        this.textarea.style.fontStyle = 'italic';
                        break;
                }
            }
        );
        fontControls.appendChild(fontStyleSelect);

        this.toolbar.appendChild(fontControls);

        // Add formatting buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; align-items: center; gap: 4px;';

        const buttons = [
            { text: 'B', command: 'bold', style: 'font-weight: bold;' },
            { text: 'I', command: 'italic', style: 'font-style: italic;' },
            { text: 'U', command: 'underline', style: 'text-decoration: underline;' },
            { text: '•', command: 'bullet', style: '' },
            { text: '1.', command: 'number', style: '' },
            { text: '📷', command: 'image', style: '' }, // &#128247; | 🖼
            { text: '<>', command: 'code', style: 'font-family: monospace;' }
        ]; 

        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.innerHTML = btn.text;
            button.style.cssText = `
                padding: 4px 8px;
                cursor: pointer;
                background: none;
                border: none;
                ${btn.style}
            `;
            button.addEventListener('click', () => this.handleFormatting(btn.command));
            buttonContainer.appendChild(button);
        });

        this.toolbar.appendChild(buttonContainer);

        // Create textarea
        this.textarea = document.createElement('textarea');
        this.textarea.placeholder = 'Review course Q&A before sending a new message to the instructor';
        this.textarea.style.cssText = `
            width: 100%;
            min-height: 100px;
            padding: 12px;
            border: 1px solid #ddd;
            border-top: none;
            resize: vertical;
            font-family: Arial;
            font-size: 14px;
            box-sizing: border-box;
        `;

        // Add input event listener to textarea
        this.textarea.addEventListener('input', () => this.updateSendButtonState());

        // Create send button
        this.sendButton = document.createElement('button');
        this.sendButton.textContent = 'Send';
        // this.sendButton.style.cssText = `
        //     margin-top: 12px;
        //     padding: 8px 24px;
        //     background-color: #a1a1a1;
        //     color: white;
        //     border: none;
        //     border-radius: 4px;
        //     cursor: pointer;
        //     font-size: 14px;
        //     font-weight: bold;
        // `;
        this.sendButton.style.cssText = `
            margin-top: 12px;
            padding: 8px 24px;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: background-color 0.2s ease;
        `;
        this.sendButton.addEventListener('click', () => this.handleSend());

        // Append all elements
        this.container.appendChild(this.toolbar);
        this.container.appendChild(this.textarea);
        this.container.appendChild(this.sendButton);
    }

    // Add new method to update send button state
    updateSendButtonState() {
        const hasContent = this.textarea.value.trim().length > 0;
        this.sendButton.style.backgroundColor = hasContent ? '#000000' : '#a1a1a1';
        this.sendButton.style.cursor = hasContent ? 'pointer' : 'default';
        this.sendButton.disabled = !hasContent;
    }

    handleFormatting(command) {
        const textarea = this.textarea;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const lines = selectedText.split('\n');

        let formattedText = '';
        switch (command) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
            case 'underline':
                formattedText = `__${selectedText}__`;
                break;
            case 'bullet':
                formattedText = lines.map(line => `• ${line}`).join('\n');
                break;
            case 'number':
                formattedText = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
                break;
            case 'image':
                formattedText = `![Image](${selectedText || 'url'})`;
                break;
            case 'code':
                formattedText = `\`${selectedText}\``;
                break;
        }

        textarea.value =
            textarea.value.substring(0, start) +
            formattedText +
            textarea.value.substring(end);

        const newPosition = start + formattedText.length;
        textarea.setSelectionRange(newPosition, newPosition);
        textarea.focus();
    }

    async handleSend() {
        try {

            const content = this.textarea.value.trim();
            if (!content) {
                return;
            }
            if (this.isUploading) {
                console.warn('Please wait for image upload to complete');
                return;
            }

            const messageContent = this.textarea.value.trim();
            if (!messageContent) {
                console.warn('Message cannot be empty');
                return;
            }

            // Disable send button and show loading state
            this.sendButton.disabled = true;
            this.sendButton.textContent = 'Sending...';

            // Extract image markers from the content
            const imageRegex = /!\[Image\]\((.*?)\)/g;
            const matches = [...messageContent.matchAll(imageRegex)];
            const imagePromises = [];

            // Handle each image in the message
            for (const match of matches) {
                const imageUrl = match[1];
                if (imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
                    // This is a local image that needs to be uploaded
                    imagePromises.push(this.uploadImage(imageUrl));
                }
            }

            // Wait for all image uploads to complete
            let processedContent = messageContent;
            if (imagePromises.length > 0) {
                const uploadedImages = await Promise.all(imagePromises);
                uploadedImages.forEach((uploadedUrl, index) => {
                    const originalUrl = matches[index][1];
                    processedContent = processedContent.replace(
                        `![Image](${originalUrl})`,
                        `![Image](${uploadedUrl})`
                    );
                });
            }

            // Prepare the message data
            const messageData = {
                content: processedContent,
                timestamp: new Date().toISOString(),
                images: Array.from(this.uploadedImages.values())
            };

            // Send the message to the server
            const response = await this.sendMessageToServer(messageData);

            if (response.success) {
                // Clear the textarea and uploaded images
                this.textarea.value = '';
                this.uploadedImages.clear();

                // Show success feedback
                this.showFeedback('Message sent successfully', 'success');
            } else {
                throw new Error(response.error || 'Failed to send message');
            }

        } catch (error) {
            console.error('Error sending message:', error);
            this.showFeedback('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            this.sendButton.disabled = false;
            this.sendButton.textContent = 'Send';
            this.isUploading = false;
        }
    }

    async uploadImage(imageUrl) {
        try {
            this.isUploading = true;

            // Convert data URL to Blob if necessary
            let imageBlob = imageUrl;
            if (imageUrl.startsWith('data:')) {
                const response = await fetch(imageUrl);
                imageBlob = await response.blob();
            }

            // Create FormData and append the image
            const formData = new FormData();
            formData.append('image', imageBlob);

            // Upload the image
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const { imageUrl: uploadedUrl } = await response.json();
            this.uploadedImages.set(imageUrl, uploadedUrl);

            return uploadedUrl;

        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Image upload failed');
        }
    }

    async sendMessageToServer(messageData) {
        // Implement your server communication here
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        if (!response.ok) {
            throw new Error('Failed to send message to server');
        }

        return await response.json();
    }

    showFeedback(message, type) {
        // Create feedback element if it doesn't exist
        if (!this.feedbackElement) {
            this.feedbackElement = document.createElement('div');
            this.feedbackElement.style.cssText = `
                margin-top: 8px;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            this.container.appendChild(this.feedbackElement);
        }

        // Set feedback styles based on type
        const styles = {
            success: {
                background: '#e6f4ea',
                color: '#1e4620',
                border: '1px solid #93c49f'
            },
            error: {
                background: '#fce8e6',
                color: '#8c1d18',
                border: '1px solid #f5c2c7'
            }
        };

        Object.assign(this.feedbackElement.style, styles[type]);
        this.feedbackElement.textContent = message;
        this.feedbackElement.style.opacity = '1';

        // Hide feedback after 3 seconds
        setTimeout(() => {
            this.feedbackElement.style.opacity = '0';
        }, 3000);
    }

    // Add this method to handle image paste events
    handleImagePaste(event) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;

        for (const item of items) {
            if (item.type.indexOf('image') === 0) {
                event.preventDefault();

                const blob = item.getAsFile();
                const reader = new FileReader();

                reader.onload = (e) => {
                    const imageUrl = e.target.result;
                    const imageMarkdown = `![Image](${imageUrl})`;

                    // Insert image markdown at cursor position
                    const cursorPos = this.textarea.selectionStart;
                    this.textarea.value =
                        this.textarea.value.substring(0, cursorPos) +
                        imageMarkdown +
                        this.textarea.value.substring(this.textarea.selectionEnd);
                };

                reader.readAsDataURL(blob);
                break;
            }
        }
    }

    // handleSend() {
    //     console.log('Sending message:', this.textarea.value);
    //     this.textarea.value = '';
    // }
}

// Usage
// const editor = new TextEditor('editor-container');
// Add event listener for image paste in the constructor
// this.textarea.addEventListener('paste', (e) => this.handleImagePaste(e));
// Initialization code
document.addEventListener('DOMContentLoaded', () => {
    try {
        const editor = new TextEditor('editor-container');
    } catch (error) {
        console.error('Failed to initialize text editor:', error);
    }
});
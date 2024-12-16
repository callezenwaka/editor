# Editor Project

Building a web editor with vanilla JavaScript

This template should help get you started developing with Vue 3 in Vite.

I'll create a handler for sending messages that includes image upload functionality. We'll add the ability to upload images and handle the message submission.

This implementation provides a complete message sending system with image upload capabilities. Here are the key features:

1. Image Handling:
   - Supports pasting images directly into the editor
   - Automatically uploads images before sending the message
   - Converts image URLs in the message to uploaded image URLs
   - Handles both data URLs and blob URLs

2. Message Processing:
   - Validates message content
   - Processes all images in the message
   - Maintains proper message formatting
   - Handles markdown image syntax

3. Error Handling:
   - Comprehensive error catching and reporting
   - User-friendly error messages
   - Loading states for better UX
   - Prevents double-sending while uploading

4. Visual Feedback:
   - Shows loading state on the send button
   - Displays success/error messages
   - Provides upload progress feedback
   - Automatically clears feedback after a delay

5. State Management:
   - Tracks uploaded images
   - Manages upload state
   - Handles concurrent uploads
   - Cleans up resources after sending

To use this implementation, you'll need to:

1. Set up the server endpoints:
   - `/api/upload` for image uploads
   - `/api/messages` for sending messages

2. Configure your server to:
   - Handle multipart/form-data for image uploads
   - Process JSON data for messages
   - Return appropriate responses

Example server response formats:

```javascript
// Image upload response
{
    success: true,
    imageUrl: "https://your-server.com/uploads/image123.jpg"
}

// Message send response
{
    success: true,
    messageId: "msg123",
    timestamp: "2024-12-16T10:30:00Z"
}
```


## Recommended IDE Setup
[VSCode](https://code.visualstudio.com/)

## Customize configuration
None

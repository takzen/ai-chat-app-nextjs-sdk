# AI Chat Application with Vercel AI SDK

A modern React/Next.js web application featuring AI chat integration with Google Gemini, authentication, file attachments, speech-to-text, and user profile management.

## 🚀 Features

### ✅ Core Features
- **Authentication System** - Mock login with hardcoded credentials
- **AI Chat Integration** - Powered by Google Gemini 2.5 Flash
- **Real-time Message Streaming** - See AI responses appear word by word
- **File Attachments** - Support for images, PDFs, and documents
- **Speech-to-Text** - Voice input using Web Speech API
- **User Profile Management** - Edit name and profile picture
- **Responsive Design** - Clean, modern UI with Tailwind CSS
- **Navigation** - Seamless routing between Chat and Profile pages

### 📁 Supported File Types
- Images: JPEG, PNG, GIF, WebP
- Documents: PDF, TXT, DOC, DOCX

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Varcel AI SDK
- **Icons**: Lucide React
- **Runtime**: Edge Runtime for API routes

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- A Google AI API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## ⚙️ Installation & Setup

### 1. Clone or extract the repository

If you received a Git bundle:
```bash
git clone ai-chat-app.bundle ai-chat-app-sdk
cd ai-chat-app-sdk 
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```

**Important**: Replace `your_google_api_key_here` with your actual Google AI API key.

### 4. Run the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔑 Login Credentials

Use these hardcoded credentials to log in:

- **Email**: `test@example.com`
- **Password**: `password123`

## 📖 Usage Guide

### Chat Page
1. **Send Text Messages**: Type your message and press Enter or click Send
2. **Attach Files**: Click the paperclip icon to attach images or documents
3. **Voice Input**: Click the microphone icon to use speech-to-text (requires browser support)
4. **View Responses**: AI responses stream in real-time

### Profile Page
1. **View Profile**: See your name, email, and profile picture
2. **Edit Profile**: Click "Edit Profile" to modify your information
3. **Change Picture**: Click the edit icon on your avatar to upload a new photo
4. **Save Changes**: Click "Save" to persist your changes locally

### Navigation
- Use the top navbar to switch between Chat and Profile pages
- Click "Logout" to return to the login screen

## 🏗️ Project Structure

```
ai-chat-app/
├── app/
│   ├── (protected)/              # Protected routes group
│   │   ├── chat/
│   │   │   └── page.tsx          # Chat interface
│   │   ├── profile/
│   │   │   └── page.tsx          # User profile page
│   │   └── layout.tsx            # Layout with Navbar for protected routes
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat API endpoint
│   ├── components/
│   │   └── Navbar.tsx            # Navigation component
│   ├── contexts/
│   │   └── AuthContext.tsx       # Authentication context
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Login page
│   └── globals.css               # Global styles
├── .env.local                     # Environment variables (create this)
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing the Application

### Test Authentication
1. Go to `http://localhost:3000`
2. Enter the provided credentials
3. Verify redirection to chat page

### Test Chat Features
1. Send a text message and verify AI response
2. Attach an image and ask about it
3. Use voice input (Chrome/Edge only)
4. Try different file types (PDF, TXT)

### Test Profile Management
1. Navigate to Profile page
2. Edit your name
3. Upload a profile picture
4. Save and refresh to verify persistence

## 🌐 Browser Compatibility

- **Fully Supported**: Chrome, Edge, Safari (latest versions)
- **Speech-to-Text**: Chrome and Edge only (uses Web Speech API)
- **File Upload**: All modern browsers

## 🔧 Troubleshooting

### API Key Issues
**Error**: "API key not configured"
- Ensure `.env.local` exists in the root directory
- Verify `GOOGLE_GENERATIVE_AI_API_KEY` is set correctly
- Restart the development server after adding the key

### Speech-to-Text Not Working
- Check browser compatibility (use Chrome or Edge)
- Allow microphone permissions when prompted
- Check browser console for specific errors

### File Upload Issues
- Verify file type is supported
- Check file size (large files may cause delays)
- Ensure proper MIME type

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Change AI Model
Edit `app/api/chat/route.ts`:
```typescript
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
```

### Change Speech Language
Edit `app/chat/page.tsx`:
```typescript
recognitionRef.current.lang = 'pl-PL'; // For Polish
```

### Modify Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`

## 📝 Notes

- Chat history is stored in memory for the current session only
- Profile data is persisted in browser localStorage
- The application uses Edge Runtime for optimal performance
- Authentication is mocked for demonstration purposes

## 🤝 Development

This project was created as a recruitment task demonstrating:
- Modern React/Next.js development practices
- AI integration with streaming responses
- File handling and multimodal AI interactions
- State management and routing
- Clean, maintainable code structure

## 📄 License

This project is created for recruitment purposes.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all prerequisites are met
3. Ensure environment variables are configured correctly
4. Check browser console for detailed error messages

---

**Built with ❤️ using Next.js and Google Gemini AI**
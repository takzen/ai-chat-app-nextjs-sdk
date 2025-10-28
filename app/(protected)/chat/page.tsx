// app/(protected)/chat/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ChatPage() {
  const { authState } = useAuth();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'streaming';

  useEffect(() => {
    if (authState === 'unauthenticated') router.push('/');
  }, [authState, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup preview URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    
    // Convert to base64 data URL instead of blob URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || isLoading) return;

    const parts: any[] = [];

    // Add file if selected
    if (selectedFile && previewUrl) {
      parts.push({
        type: 'file',
        mediaType: selectedFile.type,
        url: previewUrl,
      });
    }

    // Add text if present
    if (input.trim()) {
      parts.push({
        type: 'text',
        text: input,
      });
    }

    sendMessage({
      role: 'user',
      parts,
    });

    setInput('');
    removeFile();
  };

  if (authState !== 'authenticated') {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full bg-white">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`whitespace-pre-wrap max-w-lg rounded-lg px-4 py-2 shadow ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              <span className="font-bold block mb-1">{m.role === 'user' ? 'You' : 'AI'}</span>
              <div className="space-y-2">
                {m.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return <div key={i}>{part.text}</div>;
                    case 'file':
                      return (
                        <img
                          key={i}
                          src={part.url}
                          alt={part.filename ?? 'image'}
                          className="mt-2 rounded max-w-full max-h-64 object-contain"
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50">
        {/* File Preview */}
        {previewUrl && (
          <div className="mb-3 relative inline-block">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-32 rounded border border-gray-300"
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            disabled={isLoading}
            title="Attach image"
          >
            {selectedFile ? <ImageIcon size={20} className="text-blue-600" /> : <Upload size={20} />}
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something..."
            className="flex-1 rounded-md border border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || (!input.trim() && !selectedFile)}
            className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
// app/(protected)/chat/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function ChatPage() {
  const { authState } = useAuth();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'streaming';

  useEffect(() => {
    if (authState === 'unauthenticated') router.push('/');
  }, [authState, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: input }],
    });

    setInput('');
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
              <span className="font-bold block">{m.role === 'user' ? 'You' : 'AI'}</span>
              <div>
                {m.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return <span key={i}>{part.text}</span>;
                    case 'file':
                      return (
                        <img
                          key={i}
                          src={part.url}
                          alt={part.filename ?? 'image'}
                          className="mt-2 rounded max-w-full"
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

      <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
          className="w-full rounded-md border border-gray-300 p-2 text-black"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
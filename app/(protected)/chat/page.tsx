// app/(protected)/chat/page.tsx
'use client';

import { useChat } from '@ai-sdk/react'; // NOWY, POPRAWNY IMPORT
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function ChatPage() {
  const { authState } = useAuth();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authState === 'unauthenticated') router.push('/');
  }, [authState, router]);

  // Używamy nowego haka z @ai-sdk/react
  const { messages, input, setInput, handleSubmit, isLoading } = useChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (authState !== 'authenticated') {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full bg-white">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Nowy hak 'useChat' zwraca prostszą strukturę wiadomości */}
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`whitespace-pre-wrap max-w-lg rounded-lg px-4 py-2 shadow ${
              m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
            }`}>
              <span className="font-bold block">{m.role === 'user' ? 'You' : 'AI'}</span>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)} // Używamy setInput
          placeholder="Say something..."
          className="w-full rounded-md border border-gray-300 p-2 text-black"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
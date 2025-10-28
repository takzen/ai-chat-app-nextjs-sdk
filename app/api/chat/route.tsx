// app/api/chat/route.ts
import { google } from '@ai-sdk/google'; // ZMIANA: Używamy dostawcy Google
import { convertToCoreMessages, streamText, type CoreMessage } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: google('gemini-2.5-flash'), // ZMIANA: Używamy naszego modelu Google
    system: 'You are a helpful assistant.', // Ten prompt jest opcjonalny, ale pomaga modelowi
    messages: messages,
  });

  // Używamy DOKŁADNIE tej samej funkcji zwrotnej, co w Twoim szablonie,
  // ponieważ jest ona wymagana przez hak useChat z @ai-sdk/react.
  // Nazwa toAIStreamResponse jest już niepoprawna dla tej wersji.
  return result.toAIStreamResponse();
}
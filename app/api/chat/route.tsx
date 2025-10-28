// app/api/chat/route.ts
import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

export const runtime = 'edge';
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-pro'),
    system: 'You are a helpful assistant.',
    messages: convertToModelMessages(messages),
  });

  // Używamy toUIMessageStreamResponse() zgodnie z nowym szablonem
  return result.toUIMessageStreamResponse();

}
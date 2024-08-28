// src/services/openaiService.ts

import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Ensure this is defined in your .env file

const openaiUrl = 'https://api.openai.com/v1/completions';

interface CompletionRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export async function getCompletion(request: CompletionRequest): Promise<string> {
  try {
    const response = await axios.post(
      openaiUrl,
      {
        model: 'text-davinci-003', // Choose the model you want to use
        prompt: request.prompt,
        max_tokens: request.maxTokens || 100,
        temperature: request.temperature || 0.5,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].text || '';
  } catch (error) {
    console.error('Error fetching completion:', error);
    throw error; // Rethrow or handle it as needed
  }
}

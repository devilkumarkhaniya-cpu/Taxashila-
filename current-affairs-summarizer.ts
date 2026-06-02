'use server';
/**
 * @fileOverview A current affairs summarizer AI agent.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CurrentAffairsSummarizerInputSchema = z.object({
  articleContent: z.string().describe('The full text content of the current affairs article to be summarized.'),
});
export type CurrentAffairsSummarizerInput = z.infer<typeof CurrentAffairsSummarizerInputSchema>;

const CurrentAffairsSummarizerOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the current affairs article, focusing on key information relevant for competitive exams.'),
  keyPoints: z.array(z.string()).describe('A list of key takeaways or bullet points from the article.'),
});
export type CurrentAffairsSummarizerOutput = z.infer<typeof CurrentAffairsSummarizerOutputSchema>;

export async function summarizeCurrentAffairs(input: CurrentAffairsSummarizerInput): Promise<CurrentAffairsSummarizerOutput> {
  return currentAffairsSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'currentAffairsSummarizerPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: CurrentAffairsSummarizerInputSchema},
  output: {schema: CurrentAffairsSummarizerOutputSchema},
  prompt: `You are an expert AI assistant specialized in summarizing current affairs for competitive exam preparation. Your goal is to provide concise, accurate, and highly relevant summaries that help students quickly grasp the most important information.

Summarize the following current affairs article. Focus on the core facts, implications, and any details that are likely to be tested in exams. Ensure the summary is easy to understand and includes a list of key points.

Article:
{{{articleContent}}}`,
});

const currentAffairsSummarizerFlow = ai.defineFlow(
  {
    name: 'currentAffairsSummarizerFlow',
    inputSchema: CurrentAffairsSummarizerInputSchema,
    outputSchema: CurrentAffairsSummarizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


'use server';
/**
 * @fileOverview An AI flow that converts raw text or OCR data into formatted HTML for study materials.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ContentConverterInputSchema = z.object({
  rawText: z.string().describe('The raw text extracted from a PDF or image or pasted by the user.'),
  subject: z.string().describe('The subject category for context.'),
});
export type ContentConverterInput = z.infer<typeof ContentConverterInputSchema>;

const ContentConverterOutputSchema = z.object({
  formattedHtml: z.string().describe('Clean, styled HTML using Tailwind classes consistent with the app theme.'),
});
export type ContentConverterOutput = z.infer<typeof ContentConverterOutputSchema>;

export async function convertToStudyMaterial(input: ContentConverterInput): Promise<ContentConverterOutput> {
  return contentConverterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentConverterPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: ContentConverterInputSchema },
  output: { schema: ContentConverterOutputSchema },
  prompt: `You are an expert educational content editor for Takshashila. 
Your task is to take raw, messy text (which might come from OCR or raw notes) and convert it into a beautiful, structured HTML study module.

Context:
Subject: {{{subject}}}

Instructions:
1. Wrap the content in a <div class="space-y-12 font-sans pb-10">.
2. Use <h2 class="text-4xl font-black font-headline uppercase tracking-tighter text-foreground"> for main titles.
3. Use <section class="space-y-6"> for grouping content.
4. Use <div class="bg-blue-50 p-6 rounded-2xl border"> for definitions or highlights.
5. Use <div class="p-8 bg-zinc-50 border-2 rounded-3xl"> for example problems.
6. Ensure all mathematical notations or steps are clear.
7. Focus on readability and professional academic look.

Raw Text:
{{{rawText}}}`,
});

const contentConverterFlow = ai.defineFlow(
  {
    name: 'contentConverterFlow',
    inputSchema: ContentConverterInputSchema,
    outputSchema: ContentConverterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

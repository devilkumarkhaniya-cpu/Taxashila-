
'use server';
/**
 * @fileOverview An AI agent that generates multiple-choice questions for various subjects and topics.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MCQGenerationInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate MCQs (e.g., Maths, Reasoning, English, or Mixed).'),
  topic: z.string().describe('The specific topic within the subject (e.g., Percentage, Blood Relations, or All Topics).'),
  numQuestions: z.number().int().min(1).max(50).default(15).describe('The number of questions to generate.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium').describe('The difficulty level of the questions.'),
});
export type MCQGenerationInput = z.infer<typeof MCQGenerationInputSchema>;

const MCQSchema = z.object({
  question: z.string().describe('The multiple-choice question text.'),
  options: z.array(z.string()).min(4).max(4).describe('Exactly 4 options.'),
  correctAnswer: z.string().describe('The correct answer (must match one option).'),
});

const MCQGenerationOutputSchema = z.object({
  mcqs: z.array(MCQSchema).describe('A list of generated multiple-choice questions.'),
});
export type MCQGenerationOutput = z.infer<typeof MCQGenerationOutputSchema>;

export async function generateMCQs(input: MCQGenerationInput): Promise<MCQGenerationOutput> {
  return aiMCQGenerationFlow(input);
}

const mcqGenerationPrompt = ai.definePrompt({
  name: 'mcqGenerationPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: MCQGenerationInputSchema },
  output: { schema: MCQGenerationOutputSchema },
  prompt: `You are an expert educator for Gujarat competitive exams like GPSC and GSSSB.

Generate {{numQuestions}} multiple-choice questions for:
Subject: {{{subject}}}
Topic: {{{topic}}}
Difficulty: {{{difficulty}}}

Strict Rules:
1. Each question must have exactly 4 options.
2. The 'correctAnswer' must be identical to one of the options.
3. If subject is "Reasoning" and topic is "Blood Relation", ensure logical consistency.
4. Output must be a valid JSON array of mcqs.`,
});

const aiMCQGenerationFlow = ai.defineFlow(
  {
    name: 'aiMCQGenerationFlow',
    inputSchema: MCQGenerationInputSchema,
    outputSchema: MCQGenerationOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await mcqGenerationPrompt(input);
      if (!output || !output.mcqs || output.mcqs.length === 0) {
        throw new Error("No MCQs generated. Please try again.");
      }
      return output;
    } catch (error) {
      console.error("AI Generation Error:", error);
      throw error;
    }
  }
);

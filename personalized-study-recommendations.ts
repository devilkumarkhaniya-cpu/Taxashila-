
'use server';
/**
 * @fileOverview An AI-powered tool that analyzes student test performance and provides personalized study recommendations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedStudyRecommendationsInputSchema = z.object({
  testResults: z.array(
    z.object({
      subject: z.string().describe('The subject of the test (e.g., Maths, Reasoning).'),
      topic: z.string().describe('The specific topic within the subject (e.g., Percentage, Blood Relations).'),
      score: z.number().describe('The score obtained in the test.'),
      maxScore: z.number().describe('The maximum possible score for the test.'),
      timeTakenSeconds: z.number().describe('The time taken to complete the test in seconds.'),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the test.'),
    })
  ).describe('An array of mock test results for the student.'),
  studentGoals: z.string().optional().describe('Optional: Specific goals or target exams for the student.'),
});
export type PersonalizedStudyRecommendationsInput = z.infer<typeof PersonalizedStudyRecommendationsInputSchema>;

const PersonalizedStudyRecommendationsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the student\'s overall performance and key areas for improvement.'),
  recommendations: z.array(
    z.object({
      subject: z.string().describe('The subject for which the recommendation is given.'),
      topic: z.string().describe('The specific topic within the subject to focus on.'),
      identifiedWeakness: z.string().describe('A description of the specific weakness identified.'),
      reasoning: z.string().describe('Explanation of why this topic/weakness was identified.'),
      suggestedStudyMaterials: z.array(z.string()).describe('Specific types of study materials recommended.'),
      suggestedPracticeActions: z.array(z.string()).describe('Actionable steps for practice.'),
    })
  ).describe('Detailed personalized study recommendations based on test performance.'),
});
export type PersonalizedStudyRecommendationsOutput = z.infer<typeof PersonalizedStudyRecommendationsOutputSchema>;

export async function personalizedStudyRecommendations(input: PersonalizedStudyRecommendationsInput): Promise<PersonalizedStudyRecommendationsOutput> {
  return personalizedStudyRecommendationsFlow(input);
}

const personalizedStudyRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedStudyRecommendationsPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {
    schema: PersonalizedStudyRecommendationsInputSchema
  },
  output: {schema: PersonalizedStudyRecommendationsOutputSchema},
  prompt: `You are an Intelligent Performance Analyst for Takshashila, an EdTech platform. Your goal is to analyze a student's mock test performance and provide personalized study recommendations.

Student's Performance Data:
{{#each testResults}}
- Subject: {{{subject}}}
  Topic: {{{topic}}}
  Score: {{{score}}}/{{{maxScore}}}
  Time: {{{timeTakenSeconds}}}s
  Difficulty: {{{difficulty}}}
{{/each}}

{{#if studentGoals}}
Student's Goals: {{{studentGoals}}}
{{/if}}

Analysis Task:
1. Identify patterns in accuracy and speed across subjects.
2. Pinpoint specific weaknesses.
3. Provide actionable, high-yield study paths and practice steps for the weakest areas.
4. Ensure the summary is encouraging but data-driven.`,
});

const personalizedStudyRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedStudyRecommendationsFlow',
    inputSchema: PersonalizedStudyRecommendationsInputSchema,
    outputSchema: PersonalizedStudyRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedStudyRecommendationsPrompt(input);
    return output!;
  }
);

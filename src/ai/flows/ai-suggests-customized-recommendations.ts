'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing customized health suggestions
 *  and recommendations based on the user's current pregnancy phase (Pre, During, Post).
 *
 * - aiSuggestsCustomizedRecommendations - A function that triggers the flow and returns AI-generated suggestions.
 * - AISuggestsCustomizedRecommendationsInput - The input type for the aiSuggestsCustomizedRecommendations function.
 * - AISuggestsCustomizedRecommendationsOutput - The output type for the aiSuggestsCustomizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISuggestsCustomizedRecommendationsInputSchema = z.object({
  pregnancyPhase: z
    .enum(['Pre', 'During', 'Post'])
    .describe('The current pregnancy phase of the user.'),
  userInfo: z.string().optional().describe('Additional information about the user.'),
});
export type AISuggestsCustomizedRecommendationsInput = z.infer<
  typeof AISuggestsCustomizedRecommendationsInputSchema
>;

const AISuggestsCustomizedRecommendationsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('AI-generated health suggestions and recommendations.'),
});
export type AISuggestsCustomizedRecommendationsOutput = z.infer<
  typeof AISuggestsCustomizedRecommendationsOutputSchema
>;

export async function aiSuggestsCustomizedRecommendations(
  input: AISuggestsCustomizedRecommendationsInput
): Promise<AISuggestsCustomizedRecommendationsOutput> {
  return aiSuggestsCustomizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSuggestsCustomizedRecommendationsPrompt',
  input: {schema: AISuggestsCustomizedRecommendationsInputSchema},
  output: {schema: AISuggestsCustomizedRecommendationsOutputSchema},
  prompt: `You are a helpful AI assistant specialized in providing customized health suggestions and recommendations to users based on their current pregnancy phase.

  The user is in the {{{pregnancyPhase}}} phase.

  {% if userInfo %}
  Here's some additional information about the user: {{{userInfo}}}
  {% endif %}

  Provide relevant and practical suggestions tailored to this phase. Focus on key aspects such as nutrition, exercise, mental well-being, and any specific concerns related to the current stage.
  Suggestions should be direct and to the point.
  `,
});

const aiSuggestsCustomizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiSuggestsCustomizedRecommendationsFlow',
    inputSchema: AISuggestsCustomizedRecommendationsInputSchema,
    outputSchema: AISuggestsCustomizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

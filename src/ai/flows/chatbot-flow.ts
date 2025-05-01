'use server';
/**
 * @fileOverview Chatbot AI flow for GenSyx Solutions.
 *
 * - getChatbotResponse - Handles user queries about the company.
 * - ChatbotInput - The input type for the chatbot flow.
 * - ChatbotOutput - The return type for the chatbot flow.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

// Define input schema
const ChatbotInputSchema = z.object({
  query: z.string().describe('The user\'s question about GenSyx Solutions.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

// Define output schema
const ChatbotOutputSchema = z.object({
  reply: z.string().describe('The chatbot\'s response to the user query.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// Wrapper function to call the flow
export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

// Define the Genkit prompt
const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {
    schema: ChatbotInputSchema,
  },
  output: {
    schema: ChatbotOutputSchema,
  },
  prompt: `You are a helpful and friendly chatbot assistant for GenSyx Solutions. Your purpose is to answer questions about the company, its services, projects, mission, vision, and contact information based ONLY on the context provided below. Be concise and helpful. If the question is outside the scope of the provided context or asks for opinions, politely decline to answer.

Context about GenSyx Solutions:
- **Mission:** To empower businesses with innovative and effective digital solutions that drive growth, enhance brand visibility, and create lasting connections with their audiences. We strive to be the catalyst for our clients' digital success stories.
- **Vision:** To be a leading digital services provider, recognized for our creativity, technical excellence, and commitment to client success. We envision a future where businesses of all sizes can leverage the power of digital technology to achieve their full potential.
- **Services:** Web Design & Development, SEO Strategy, Branding & Identity, Digital Marketing Strategy, Social Media Management, Google Business Profile Optimization.
- **Featured Projects:** GPT3 Integration (AI solutions), Travela Booking Platform (travel planning), Caterserv Event Planning (vendor booking), Modern E-Commerce Store (online retail). Project links are available on the website.
- **Contact:** gensyx6@gmail.com, 9361104465, Coimbatore, India.
- **About:** Founded on innovation and client-centricity. Grown into a comprehensive digital services agency focused on adapting to the digital landscape and delivering exceptional digital experiences through strong client partnerships. Expertise spans web development, SEO, branding, digital marketing, social media, etc.
- **Social Media:** GitHub (https://github.com/Gensyx-Solutions), X/Twitter (https://x.com/GensyxSolutions), LinkedIn (https://www.linkedin.com/company/gensyx-solutions/)


User Query: {{{query}}}

Answer the user's query based *only* on the context above. Keep your reply concise and relevant.
`,
});

// Define the Genkit flow
const chatbotFlow = ai.defineFlow<
  typeof ChatbotInputSchema,
  typeof ChatbotOutputSchema
>(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;

    if (!output) {
        throw new Error("Chatbot flow failed to generate a response.");
    }
    return output;
  }
);
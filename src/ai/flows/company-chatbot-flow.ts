
'use server';
/**
 * @fileOverview Genkit flow for the company assistant chatbot.
 * - companyChatbotFlow - Handles chat interactions, providing company info, services, and contact details.
 * - ChatbotInput - Input schema for the chatbot flow.
 * - ChatbotOutput - Output schema for the chatbot flow.
 */

import { ai } from '@/ai/ai-instance';
import { generate } from 'genkit/ai';
import { AIMessage, HumanMessage } from 'genkit/model';
import { z } from 'genkit';
import type { MessageData } from 'genkit/model'; // Use type import

// Define company information directly in the prompt context for simplicity
const companyInfo = {
  name: 'GenSyx Solutions',
  description: 'GenSyx Solutions empowers businesses with innovative and effective digital solutions that drive growth, enhance brand visibility, and create lasting connections with their audiences. We specialize in web development, SEO, branding, digital marketing, social media management, and Google Business Profile optimization.',
  services: [
    { title: "Website Design & Development", description: "Building responsive, high-performance websites.", link: "/services/website-design" },
    { title: "SEO Strategy", description: "Boosting visibility on search engines.", link: "/services/seo" },
    { title: "Branding & Identity", description: "Crafting memorable logos and brand identities.", link: "/services/branding" },
    { title: "Digital Marketing", description: "Data-driven strategies for lead generation.", link: "/services/digital-marketing" },
    { title: "Social Media Management", description: "Engaging content and community growth.", link: "/services/social-media" },
    { title: "Google Business Profile", description: "Optimizing your Google profile for local visibility.", link: "/services/google-profile" },
  ],
  contact: {
    email: 'gensyx6@gmail.com',
    phone: '9361104465',
    location: 'Coimbatore, India',
    page: '/contact',
  },
  socialMedia: [
    { name: 'GitHub', link: 'https://github.com/Gensyx-Solutions' },
    { name: 'X (Twitter)', link: 'https://x.com/i/flow/login?redirect_after_login=%2FGensyxSolutions' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/company/gensyx-solutions/' },
    { name: 'Instagram', link: 'https://www.instagram.com/gensyx_solutions?igsh=OTduZ3RibWI2Nm5m' },
  ],
};

// Helper function to format context information for the prompt
const formatContext = (info: typeof companyInfo) => {
  const servicesList = info.services.map(s => `- ${s.title}: ${s.description} (More info: ${s.link})`).join('\n');
  const socialLinks = info.socialMedia.map(s => `- ${s.name}: ${s.link}`).join('\n');
  return `
Company Name: ${info.name}
Company Description: ${info.description}

Services Offered:
${servicesList}

Contact Information:
- Email: ${info.email}
- Phone: ${info.phone}
- Location: ${info.location}
- Contact Page: ${info.contact.page}

Social Media:
${socialLinks}
  `.trim();
};

const companyContext = formatContext(companyInfo);

// Define Zod Schemas
const ChatbotMessageSchema = z.object({
  role: z.enum(['user', 'model', 'system', 'tool']), // Adjusted roles based on Genkit types
  content: z.array(z.object({ text: z.string() })),
});
export type ChatbotMessage = z.infer<typeof ChatbotMessageSchema>;

const ChatbotInputSchema = z.object({
  message: z.string().describe('The latest message from the user.'),
  history: z.array(ChatbotMessageSchema).optional().describe('The history of the conversation.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// Define the Prompt
const chatbotPrompt = ai.definePrompt(
  {
    name: 'companyChatbotPrompt',
    input: { schema: ChatbotInputSchema },
    output: { schema: ChatbotOutputSchema },
    system: `
You are a friendly and helpful AI assistant for GenSyx Solutions.
Your goal is to answer user questions about the company, its services, and how to contact them.
Be concise and informative.
Use the provided context below to answer questions accurately.
If asked about services, briefly describe them and provide the link for more details.
If asked for contact information or social media, provide the details clearly, including links.
Do not answer questions unrelated to GenSyx Solutions or its services. Politely decline off-topic requests.
Do not make up information not present in the context. If you don't know the answer, say so politely.

CONTEXT:
---
${companyContext}
---
`,
    messages: [
      // Map history from input schema to Genkit message types
      '{{#each history}}',
      '{{#if (eq role "user")}}',
      '{{#each content}}', // Iterate through content parts (though we expect only text here)
      '{{new "User" text=text}}',
      '{{/each}}',
      '{{/if}}',
      '{{#if (eq role "model")}}',
      '{{#each content}}',
      '{{new "Model" text=text}}',
      '{{/each}}',
      '{{/if}}',
      '{{/each}}',
      '{{new "User" text=message}}', // Add the latest user message
    ],
    output: {
       format: 'text', // Request plain text output
    }
  },
  // Postprocessor to extract the text response
  async (inputData) => {
    const result = await generate({
      model: 'googleai/gemini-1.5-flash', // Use a known compatible model
      prompt: inputData.prompt,
      history: inputData.history as MessageData[], // Cast history correctly
      config: { temperature: 0.5 }, // Adjust temperature for creativity vs factualness
      output: {
          format: 'text',
          schema: ChatbotOutputSchema, // Keep schema for potential future structured output needs
      }
    });

    const textResponse = result.text; // Access text directly in Genkit 1.x

    if (!textResponse) {
      console.error("Chatbot flow received no text response from the model.");
      return { response: "I'm sorry, I couldn't generate a response right now. Please try again." };
    }

    return { response: textResponse };
  }
);


// Define the Flow
const companyChatbotFlow = ai.defineFlow(
  {
    name: 'companyChatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
     // Map input history to MessageData[] expected by the prompt/generate call
    const historyForPrompt: MessageData[] = (input.history ?? []).map(msg => {
        // Assuming each message content array has exactly one text part based on schema
        const messageText = msg.content[0]?.text ?? '';
        if (msg.role === 'user') {
            return new HumanMessage(messageText);
        } else if (msg.role === 'model') {
            return new AIMessage(messageText);
        }
        // Handle other roles if necessary, or filter them out
        return null;
    }).filter(Boolean) as MessageData[]; // Filter out nulls and assert type


    // Call the prompt, which now includes the generate call and postprocessing
     const promptResult = await chatbotPrompt({
        message: input.message,
        history: historyForPrompt, // Pass the formatted history
     });

     // The prompt definition already handles extracting the text, so we just return it.
     // If promptResult is null or undefined, provide a default response.
     if (!promptResult || !promptResult.response) {
         console.error("Chatbot flow: Prompt did not return a valid response object.");
         return { response: "I'm having trouble responding right now. Please try again later." };
     }


    return { response: promptResult.response };
  }
);


// Exported async wrapper function
export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  console.log("Calling companyChatbotFlow with input:", JSON.stringify(input));
  try {
    const result = await companyChatbotFlow(input);
     if (!result || typeof result.response !== 'string') {
       console.error("Chatbot flow returned invalid data:", result);
       throw new Error("Chatbot flow returned invalid data.");
     }
    console.log("Received response from companyChatbotFlow:", JSON.stringify(result));
    return result;
  } catch (error: any) {
    console.error("Error in getChatbotResponse calling companyChatbotFlow:", error);
    // Rethrow the error to the caller (e.g., the React component)
    // Ensure the specific error message (like the API Key error) is propagated
    throw new Error(`Failed to get chatbot response from flow: ${error.message || 'Unknown error during flow execution'}`);
  }
}
